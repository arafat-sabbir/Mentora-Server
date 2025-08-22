// Import the model
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import CourseModel from '../course/course.model';
import ModuleModel from '../module/module.model';
import PdfnoteModel from '../pdfnote/pdfnote.model';
import UserProgressModel from '../user-progress/user-progress.model';
import { TLecture } from './lecture.interface';
import LectureModel from './lecture.model';

// Service function to create a new lecture.
const createLecture = async (data: TLecture) => {
  const module = await ModuleModel.findOne({ _id: data?.moduleId });
  if (!module) {
    throw new AppError(404, 'module not found');
  }
  const lectureExist = await LectureModel.findOne({
    title: data.title,
    moduleId: data.moduleId,
    videoUrl: data.videoUrl,
  });

  if (lectureExist) {
    throw new AppError(400, 'Lecture Already Exist');
  }
  const existedLecture = await LectureModel.find({
    moduleId: data.moduleId,
  });
  const lectureNumber = existedLecture.length + 1;
  console.log(existedLecture?.length, lectureNumber, 'lectureNumber');
  data.lectureNumber = lectureNumber;
  const newLecture = await LectureModel.create(data);
  return newLecture;
};

const getLectureByModule = async (moduleId: string) => {
  const module = await ModuleModel.findById(moduleId);
  if (!module) {
    throw new AppError(404, 'Module not found');
  }
  return await LectureModel.find({ moduleId });
};

// Service function to retrieve a single lecture by ID.
const getLectureById = async (id: string) => {
  return await LectureModel.findById(id);
};

// Service function to retrieve multiple lecture based on query parameters.
const getAllLecture = async (query: object) => {
  return await LectureModel.find(query);
};

const updateLecture = async (id: string, data: object) => {
  const lecture = await LectureModel.findById(id);
  if (!lecture) {
    throw new AppError(404, 'Lecture Not Found');
  }
  const payload: Record<string, unknown> = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value && value !== '') {
      payload[key] = value;
    }
  });
  return await LectureModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteLecture = async (id: string) => {
  const lecture = await LectureModel.findById(id);
  if (!lecture) {
    throw new AppError(404, 'Lecture Not Found');
  }
  return await LectureModel.deleteOne({ _id: id });
};

// import { AppError } from "../utils/AppError"; // use your own error helper

type ObjectIdString = string;

export const getLectureContent = async (userId: ObjectIdString, lectureId: ObjectIdString) => {
  const lectureObjId = new Types.ObjectId(lectureId);
  const userObjId = new Types.ObjectId(userId);

  // Use actual collection names from your models to avoid hard-coding
  const MODULES = ModuleModel.collection.name; // "modules"
  const COURSES = CourseModel.collection.name; // "courses"
  const LECTURES = LectureModel.collection.name; // "lectures"
  const PDFNOTES = PdfnoteModel.collection.name; // "pdfnotes"
  const USERPROGRESS = UserProgressModel.collection.name; // "userprogresses"

  const result = await LectureModel.aggregate([
    // 1) start with this lecture
    { $match: { _id: lectureObjId } },

    // 2) join module
    {
      $lookup: {
        from: MODULES,
        localField: 'moduleId',
        foreignField: '_id',
        as: 'module',
      },
    },
    { $unwind: '$module' },

    // 3) join course via module.courseId
    {
      $lookup: {
        from: COURSES,
        localField: 'module.courseId',
        foreignField: '_id',
        as: 'course',
      },
    },
    { $unwind: '$course' },

    // 4) gather pdf notes for this lecture
    {
      $lookup: {
        from: PDFNOTES,
        let: { lectureId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$lectureId', '$$lectureId'] } } },
          {
            $project: {
              _id: 1,
              title: 1,
              filePath: '$pdfUrl',
              fileName: { $last: { $split: ['$pdfUrl', '/'] } }, // derive a filename from URL/path
            },
          },
        ],
        as: 'pdfNotes',
      },
    },

    // 5) find NEXT lecture in same module (lectureNumber > current)
    {
      $lookup: {
        from: LECTURES,
        let: { modId: '$module._id', currNo: '$lectureNumber' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$moduleId', '$$modId'] }, { $gt: ['$lectureNumber', '$$currNo'] }],
              },
            },
          },
          { $sort: { lectureNumber: 1 } },
          { $limit: 1 },
          { $project: { _id: 1, title: 1 } },
        ],
        as: 'nextLecture',
      },
    },

    // 6) find PREVIOUS lecture in same module (lectureNumber < current)
    {
      $lookup: {
        from: LECTURES,
        let: { modId: '$module._id', currNo: '$lectureNumber' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$moduleId', '$$modId'] }, { $lt: ['$lectureNumber', '$$currNo'] }],
              },
            },
          },
          { $sort: { lectureNumber: -1 } },
          { $limit: 1 },
          { $project: { _id: 1, title: 1 } },
        ],
        as: 'previousLecture',
      },
    },

    // 7) current lecture progress (for this user)
    {
      $lookup: {
        from: USERPROGRESS,
        let: { lecId: '$_id', uId: userObjId, cId: '$module.courseId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$lectureId', '$$lecId'] },
                  { $eq: ['$userId', '$$uId'] },
                  { $eq: ['$courseId', '$$cId'] },
                ],
              },
            },
          },
          { $project: { isCompleted: 1 } },
        ],
        as: 'progress',
      },
    },

    // 8) previous lecture progress (to compute isUnlocked)
    {
      $lookup: {
        from: USERPROGRESS,
        let: {
          prevId: { $arrayElemAt: ['$previousLecture._id', 0] },
          uId: userObjId,
          cId: '$module.courseId',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$lectureId', '$$prevId'] },
                  { $eq: ['$userId', '$$uId'] },
                  { $eq: ['$courseId', '$$cId'] },
                  { $eq: ['$isCompleted', true] },
                ],
              },
            },
          },
          { $limit: 1 },
        ],
        as: 'prevProgress',
      },
    },

    // 9) compute booleans and normalize next/prev structures
    {
      $addFields: {
        // true if any progress doc has isCompleted === true
        isCompleted: {
          $anyElementTrue: {
            $map: {
              input: '$progress',
              as: 'p',
              in: '$$p.isCompleted',
            },
          },
        },

        // unlock rule: no previous lecture OR previous lecture completed
        isUnlocked: {
          $cond: [
            {
              $or: [
                { $eq: [{ $size: '$previousLecture' }, 0] },
                { $gt: [{ $size: '$prevProgress' }, 0] },
              ],
            },
            true,
            false,
          ],
        },

        // squash arrays into single objects or null, and add nextLecture.isUnlocked
        nextLecture: {
          $cond: [
            { $gt: [{ $size: '$nextLecture' }, 0] },
            {
              $mergeObjects: [
                { $arrayElemAt: ['$nextLecture', 0] },
                { isUnlocked: true }, // or your own rule
              ],
            },
            null,
          ],
        },
        previousLecture: {
          $cond: [
            { $gt: [{ $size: '$previousLecture' }, 0] },
            { $arrayElemAt: ['$previousLecture', 0] },
            null,
          ],
        },
      },
    },

    // 10) final shape
    {
      $project: {
        _id: 1,
        title: 1,
        videoUrl: 1,
        lectureNumber: 1,
        module: {
          _id: '$module._id',
          title: '$module.title',
          moduleNumber: '$module.moduleNumber',
        },
        course: {
          _id: '$course._id',
          title: '$course.title',
        },
        pdfNotes: 1,
        isUnlocked: 1,
        isCompleted: 1,
        nextLecture: 1,
        previousLecture: 1,
      },
    },
  ]);

  if (!result.length) {
    // throw new AppError(404, "Lecture Not Found");
    const e = new Error('Lecture Not Found');
    // @ts-ignore
    e.statusCode = 404;
    throw e;
  }

  return result[0];
};

export const lectureServices = {
  createLecture,
  getLectureById,
  getAllLecture,
  getLectureByModule,
  updateLecture,
  deleteLecture,
  getLectureContent
};

