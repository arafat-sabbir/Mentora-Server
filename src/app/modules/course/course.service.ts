// Import the model
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import deleteFileIfExists from '../../utils/deleteFileIsExist';
import LectureModel from '../lecture/lecture.model';
import UserProgressModel from '../user-progress/user-progress.model';
import { TCourse } from './course.interface';
import CourseModel from './course.model';
import ModuleModel from '../module/module.model';

// Service function to create a new course.
const createCourse = async (data: TCourse) => {
  const course = await CourseModel.findOne({ title: data.title });
  if (course) {
    throw new AppError(400, 'Course for this topic already exist');
  }
  const newCourse = await CourseModel.create(data);
  return newCourse;
};

// Service function to update a course by ID.

const updateCourse = async (id: string, data: TCourse) => {
  const payload: Record<string, any> = {};

  const courseExist = await CourseModel.findById(id);
  if (!courseExist) {
    throw new AppError(404, 'Course Not Found');
  }
  Object.entries(data).forEach(([key, value]) => {
    if (value && value !== '') {
      payload[key] = value;
    }
  });
  if (courseExist.thumbnail) {
    await deleteFileIfExists(courseExist.thumbnail);
  }
  const course = await CourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return course;
};

// Service function to retrieve a single course by ID.
const getCourseById = async (id: string) => {
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new AppError(404, 'Course Not Found');
  }
  return course;
};

// Service function to retrieve single course based on query parameters.
const getAllCourse = async (query: object) => {
  return await CourseModel.find(query);
};

// Service function to retrieve single course based on query parameters.
const deleteCourse = async (id: string) => {
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new AppError(404, 'Course Not Found');
  }
  // Delete old thumbnail if a new one is provided
  if (course.thumbnail) {
    await deleteFileIfExists(course.thumbnail);
  }
  return await CourseModel.deleteOne({ _id: id });
};

const getAllCourseWithProgressForStudent = async (userId: string, query: any) => {
  const userObjId = new Types.ObjectId(userId);

  const courses = await CourseModel.aggregate([
    { $match: query },

    // 1) Lookup modules for each course
    {
      $lookup: {
        from: ModuleModel.collection.name,
        localField: '_id',
        foreignField: 'courseId',
        as: 'modules',
      },
    },

    // 2) Lookup lectures for all modules
    {
      $lookup: {
        from: LectureModel.collection.name,
        let: { moduleIds: '$modules._id' },
        pipeline: [
          { $match: { $expr: { $in: ['$moduleId', '$$moduleIds'] } } },
          { $project: { _id: 1 } },
        ],
        as: 'lectures',
      },
    },

    // 3) Lookup user progress for these lectures
    {
      $lookup: {
        from: UserProgressModel.collection.name,
        let: { lectureIds: '$lectures._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $in: ['$lectureId', '$$lectureIds'] }, { $eq: ['$userId', userObjId] }],
              },
            },
          },
          { $project: { lectureId: 1, isCompleted: 1 } },
        ],
        as: 'userProgress',
      },
    },
    // 4) Calculate progress
    {
      $addFields: {
        'progress.totalLectures': { $size: '$lectures' },
        'progress.completedLectures': {
          $size: {
            $filter: { input: '$userProgress', as: 'p', cond: { $eq: ['$$p.isCompleted', true] } },
          },
        },
      },
    },

    {
      $addFields: {
        'progress.percentage': {
          $cond: [
            { $gt: ['$progress.totalLectures', 0] },
            {
              $round: [
                {
                  $multiply: [
                    { $divide: ['$progress.completedLectures', '$progress.totalLectures'] },
                    100,
                  ],
                },
                0,
              ],
            },
            0,
          ],
        },
      },
    },

    // 5) Project only necessary fields
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        thumbnail: 1,
        progress: 1,
        price: 1,
      },
    },
  ]);

  return courses;
};

export const getSingleCourseContent = async (courseId: string, userId: string) => {
  console.log({ courseId, userId });
  // Aggregate to fetch course, modules, and lectures
  const course = await CourseModel.aggregate([
    {
      $match: { _id: new Types.ObjectId(courseId) },
    },
    {
      $lookup: {
        from: 'modules',
        localField: '_id',
        foreignField: 'courseId',
        as: 'modules',
        pipeline: [
          {
            $sort: { moduleNumber: 1 }, // Sort by moduleNumber instead of createdAt
          },
          {
            $lookup: {
              from: 'lectures',
              localField: '_id',
              foreignField: 'moduleId',
              as: 'lectures',
              pipeline: [
                {
                  $sort: { lectureNumber: 1 }, // Sort by lectureNumber
                },
              ],
            },
          },
        ],
      },
    },
  ]);

  if (!course || course.length === 0) {
    throw new AppError(404, 'Course Not Found');
  }

  // Fetch user progress for the course, only include completed lectures
  const userProgress = await UserProgressModel.find({
    userId: new Types.ObjectId(userId),
    courseId: new Types.ObjectId(courseId),
    isCompleted: true, // Only include completed lectures
  }).select('lectureId');

  // Debug: Log userProgress to verify
  console.log('UserProgress:', userProgress);

  // Create a set of unlocked lecture IDs from user progress
  const unlockedLectureIds = new Set(userProgress.map((progress) => progress.lectureId.toString()));

  // Debug: Log unlockedLectureIds to verify
  console.log('Unlocked Lecture IDs:', Array.from(unlockedLectureIds));

  // Add unlocked field to each lecture
  const courseData = course[0];
  courseData.modules = courseData.modules.map((module, moduleIndex) => {
    module.lectures = module.lectures.map((lecture, lectureIndex) => {
      // First lecture of the first module is always unlocked
      const isFirstLectureOfFirstModule = moduleIndex === 0 && lectureIndex === 0;
      const isUnlocked =
        isFirstLectureOfFirstModule || unlockedLectureIds.has(lecture._id.toString());
      // Debug: Log each lecture's unlocked status
      console.log(
        `Lecture ${
          lecture._id
        }: isFirst=${isFirstLectureOfFirstModule}, inProgress=${unlockedLectureIds.has(
          lecture._id.toString()
        )}, unlocked=${isUnlocked}`
      );
      return {
        ...lecture,
        unlocked: isUnlocked,
      };
    });
    return module;
  });

  return courseData;
};

export const courseServices = {
  createCourse,
  getCourseById,
  getAllCourse,
  updateCourse,
  deleteCourse,
  getAllCourseWithProgressForStudent,
  getSingleCourseContent,
};

