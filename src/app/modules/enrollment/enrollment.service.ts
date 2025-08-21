// Import the model
import AppError from '../../errors/AppError';
import CourseModel from '../course/course.model';
import { TEnrollment } from './enrollment.interface';
import EnrollmentModel from './enrollment.model';
import { Types } from 'mongoose';

// Service function to create a new enrollment.
const enrollNewStudent = async (data: Partial<TEnrollment>) => {
  const course = await CourseModel.findById(data.courseId);
  if (!course) {
    throw new AppError(404, 'Course Not Found');
  }
  const enrollmentExist = await EnrollmentModel.findOne({
    courseId: data.courseId,
    userId: data.userId,
  });
  if (enrollmentExist) {
    throw new AppError(400, 'You Are Already Enrolled In This Course');
  }
  const newEnrollment = await EnrollmentModel.create(data);
  return newEnrollment;
};

// Service function to retrieve a single enrollment by ID.
const getEnrollmentById = async (id: string) => {
  return await EnrollmentModel.findById(id);
};

// Service function to retrieve multiple enrollment based on query parameters.
const getAllEnrollment = async (query: object) => {
  return await EnrollmentModel.find(query);
};

// Service function to retrieve multiple enrollment based on query parameters.
const getAllStudentEnrollments = async (userId: Pick<TEnrollment, 'userId'>) => {
  const result = await EnrollmentModel.find({ userId: userId }).populate('Course');
  return result;
};

 const getEnrolledCourseContent = async (userId: string, courseId: string) => {
  const objectCourseId = new Types.ObjectId(courseId);
  const objectUserId = new Types.ObjectId(userId);

  const result = await CourseModel.aggregate([
    // 1. Match the course
    { $match: { _id: objectCourseId } },

    // 2. Lookup modules
    {
      $lookup: {
        from: 'modules',
        localField: '_id',
        foreignField: 'courseId',
        as: 'modules',
      },
    },

    // 3. Unwind modules
    { $unwind: { path: '$modules', preserveNullAndEmptyArrays: true } },

    // 4. Lookup lectures for each module
    {
      $lookup: {
        from: 'lectures',
        localField: 'modules._id',
        foreignField: 'moduleId',
        as: 'modules.lectures',
      },
    },

    // 5. Add pdfNotesCount per lecture
    {
      $unwind: { path: '$modules.lectures', preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: 'pdfnotes',
        let: { lectureId: '$modules.lectures._id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$lectureId', '$$lectureId'] } } },
          { $count: 'count' },
        ],
        as: 'pdfNotes',
      },
    },
    {
      $addFields: {
        'modules.lectures.pdfNotesCount': {
          $ifNull: [{ $arrayElemAt: ['$pdfNotes.count', 0] }, 0],
        },
      },
    },
    { $project: { pdfNotes: 0 } },

    // 6. Add user progress per lecture
    {
      $lookup: {
        from: 'userprogresses',
        let: { courseId: '$_id', lectureId: '$modules.lectures._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$courseId', '$$courseId'] },
                  { $eq: ['$lectureId', '$$lectureId'] },
                  { $eq: ['$userId', objectUserId] },
                ],
              },
            },
          },
        ],
        as: 'progressDoc',
      },
    },
    {
      $addFields: {
        'modules.lectures.isCompleted': {
          $cond: [{ $gt: [{ $size: '$progressDoc' }, 0] }, true, false],
        },
        'modules.lectures.isUnlocked': true, // Replace with real logic
      },
    },
    { $project: { progressDoc: 0 } },

    // 7. Group back lectures under modules
    {
      $group: {
        _id: {
          courseId: '$_id',
          moduleId: '$modules._id',
        },
        course: {
          $first: {
            _id: '$_id',
            title: '$title',
            description: '$description',
            thumbnail: '$thumbnail',
          },
        },
        moduleTitle: { $first: '$modules.title' },
        moduleNumber: { $first: '$modules.moduleNumber' },
        lectures: { $push: '$modules.lectures' },
      },
    },

    // 8. Group modules back under course
    {
      $group: {
        _id: '$_id.courseId',
        course: { $first: '$course' },
        modules: {
          $push: {
            _id: '$_id.moduleId',
            title: '$moduleTitle',
            moduleNumber: '$moduleNumber',
            lectures: '$lectures',
          },
        },
      },
    },

    // 9. Calculate progress stats
    {
      $addFields: {
        'progress.totalLectures': {
          $sum: {
            $map: {
              input: '$modules',
              as: 'm',
              in: { $size: '$$m.lectures' },
            },
          },
        },
        'progress.completedLectures': {
          $sum: {
            $map: {
              input: '$modules',
              as: 'm',
              in: {
                $size: {
                  $filter: {
                    input: '$$m.lectures',
                    as: 'lec',
                    cond: { $eq: ['$$lec.isCompleted', true] },
                  },
                },
              },
            },
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
  ]);

  return result[0] || null;
};

export const enrollmentServices = {
  enrollNewStudent,
  getEnrollmentById,
  getAllEnrollment,
  getAllStudentEnrollments,
  getEnrolledCourseContent,
};

