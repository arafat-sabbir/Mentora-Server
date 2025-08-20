# LMS API Endpoints Documentation

## Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
      "email": "student@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
      "email": "student@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "email": "student@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student"
  }
}
```

## Course Management (Admin Only)

### 4. Create Course
**POST** `/api/courses`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
title: "React Complete Course"
description: "Learn React from basics to advanced"
price: 99.99
thumbnail: [file upload]
```

**Response:**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
    "title": "React Complete Course",
    "description": "Learn React from basics to advanced",
    "price": 99.99,
    "thumbnail": "/uploads/thumbnails/course-64f5a1b2c3d4e5f6g7h8i9j1.jpg",
    "createdBy": "64f5a1b2c3d4e5f6g7h8i9j0",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### 5. Get All Courses (Admin)
**GET** `/api/courses`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
      "title": "React Complete Course",
      "description": "Learn React from basics to advanced",
      "price": 99.99,
      "thumbnail": "/uploads/thumbnails/course-64f5a1b2c3d4e5f6g7h8i9j1.jpg",
      "createdBy": {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
        "firstName": "Admin",
        "lastName": "User"
      },
      "isActive": true,
      "moduleCount": 5,
      "lectureCount": 25,
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

### 6. Get Course by ID
**GET** `/api/courses/:courseId`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
    "title": "React Complete Course",
    "description": "Learn React from basics to advanced",
    "price": 99.99,
    "thumbnail": "/uploads/thumbnails/course-64f5a1b2c3d4e5f6g7h8i9j1.jpg",
    "createdBy": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
      "firstName": "Admin",
      "lastName": "User"
    },
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "modules": [
      {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j2",
        "title": "Introduction to React",
        "moduleNumber": 1,
        "lectureCount": 5
      }
    ]
  }
}
```

### 7. Update Course
**PUT** `/api/courses/:courseId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Request Body:**
```
title: "React Complete Course - Updated"
description: "Updated description"
price: 89.99
thumbnail: [file upload] (optional)
```

**Response:**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
    "title": "React Complete Course - Updated",
    "description": "Updated description",
    "price": 89.99,
    "thumbnail": "/uploads/thumbnails/course-64f5a1b2c3d4e5f6g7h8i9j1.jpg",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 8. Delete Course
**DELETE** `/api/courses/:courseId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

## Module Management (Admin Only)

### 9. Create Module
**POST** `/api/courses/:courseId/modules`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Introduction to React"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Module created successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j2",
    "title": "Introduction to React",
    "moduleNumber": 1,
    "courseId": "64f5a1b2c3d4e5f6g7h8i9j1",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 10. Get Modules by Course
**GET** `/api/courses/:courseId/modules`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j2",
      "title": "Introduction to React",
      "moduleNumber": 1,
      "courseId": "64f5a1b2c3d4e5f6g7h8i9j1",
      "isActive": true,
      "lectureCount": 5,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 11. Update Module
**PUT** `/api/modules/:moduleId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "React Fundamentals"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Module updated successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j2",
    "title": "React Fundamentals",
    "moduleNumber": 1,
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

### 12. Delete Module
**DELETE** `/api/modules/:moduleId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "Module and all associated lectures deleted successfully"
}
```

## Lecture Management (Admin Only)

### 13. Create Lecture
**POST** `/api/modules/:moduleId/lectures`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "What is React?",
  "videoUrl": "https://www.youtube.com/embed/FRjlF74_EZk"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lecture created successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j3",
    "title": "What is React?",
    "videoUrl": "https://www.youtube.com/embed/FRjlF74_EZk",
    "moduleId": "64f5a1b2c3d4e5f6g7h8i9j2",
    "lectureNumber": 1,
    "isActive": true,
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 14. Get Lectures by Module
**GET** `/api/modules/:moduleId/lectures`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j3",
      "title": "What is React?",
      "videoUrl": "https://www.youtube.com/embed/FRjlF74_EZk",
      "moduleId": "64f5a1b2c3d4e5f6g7h8i9j2",
      "lectureNumber": 1,
      "isActive": true,
      "pdfNotesCount": 2,
      "createdAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

### 15. Get All Lectures (Admin - with filters)
**GET** `/api/lectures?courseId=:courseId&moduleId=:moduleId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j3",
      "title": "What is React?",
      "videoUrl": "https://www.youtube.com/embed/FRjlF74_EZk",
      "lectureNumber": 1,
      "module": {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j2",
        "title": "Introduction to React",
        "moduleNumber": 1
      },
      "course": {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
        "title": "React Complete Course"
      },
      "pdfNotesCount": 2,
      "createdAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

### 16. Update Lecture
**PUT** `/api/lectures/:lectureId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Introduction to React - What is React?",
  "videoUrl": "https://www.youtube.com/embed/FRjlF74_EZk"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lecture updated successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j3",
    "title": "Introduction to React - What is React?",
    "videoUrl": "https://www.youtube.com/embed/FRjlF74_EZk",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

### 17. Delete Lecture
**DELETE** `/api/lectures/:lectureId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "Lecture and all associated PDF notes deleted successfully"
}
```

## PDF Notes Management (Admin Only)

### 18. Upload PDF Notes
**POST** `/api/lectures/:lectureId/pdf-notes`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
title: "React Concepts Notes"
pdfFile: [file upload]
```

**Response:**
```json
{
  "success": true,
  "message": "PDF note uploaded successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j4",
    "title": "React Concepts Notes",
    "fileName": "react-concepts-notes.pdf",
    "filePath": "/uploads/pdf-notes/lecture-64f5a1b2c3d4e5f6g7h8i9j3-react-concepts-notes.pdf",
    "lectureId": "64f5a1b2c3d4e5f6g7h8i9j3",
    "createdAt": "2024-01-15T12:30:00.000Z"
  }
}
```

### 19. Get PDF Notes by Lecture
**GET** `/api/lectures/:lectureId/pdf-notes`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j4",
      "title": "React Concepts Notes",
      "fileName": "react-concepts-notes.pdf",
      "filePath": "/uploads/pdf-notes/lecture-64f5a1b2c3d4e5f6g7h8i9j3-react-concepts-notes.pdf",
      "lectureId": "64f5a1b2c3d4e5f6g7h8i9j3",
      "createdAt": "2024-01-15T12:30:00.000Z"
    }
  ]
}
```

### 20. Delete PDF Note
**DELETE** `/api/pdf-notes/:noteId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "PDF note deleted successfully"
}
```

## User Panel - Course Browsing

### 21. Get Public Courses (All Users)
**GET** `/api/public/courses`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
      "title": "React Complete Course",
      "description": "Learn React from basics to advanced",
      "price": 99.99,
      "thumbnail": "/uploads/thumbnails/course-64f5a1b2c3d4e5f6g7h8i9j1.jpg",
      "instructor": {
        "firstName": "Admin",
        "lastName": "User"
      },
      "moduleCount": 5,
      "lectureCount": 25,
      "rating": 4.8,
      "studentsEnrolled": 150
    }
  ]
}
```

### 22. Get Course Details (Public)
**GET** `/api/public/courses/:courseId`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
    "title": "React Complete Course",
    "description": "Learn React from basics to advanced",
    "price": 99.99,
    "thumbnail": "/uploads/thumbnails/course-64f5a1b2c3d4e5f6g7h8i9j1.jpg",
    "instructor": {
      "firstName": "Admin",
      "lastName": "User"
    },
    "modules": [
      {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j2",
        "title": "Introduction to React",
        "moduleNumber": 1,
        "lectures": [
          {
            "_id": "64f5a1b2c3d4e5f6g7h8i9j3",
            "title": "What is React?",
            "lectureNumber": 1
          }
        ]
      }
    ],
    "totalLectures": 25,
    "rating": 4.8,
    "studentsEnrolled": 150,
    "reviews": [
      {
        "user": "John D.",
        "rating": 5,
        "comment": "Excellent course!"
      }
    ]
  }
}
```

## Enrollment Management

### 23. Enroll in Course
**POST** `/api/enrollments`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "courseId": "64f5a1b2c3d4e5f6g7h8i9j1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully enrolled in course",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j5",
    "userId": "64f5a1b2c3d4e5f6g7h8i9j0",
    "courseId": "64f5a1b2c3d4e5f6g7h8i9j1",
    "enrolledAt": "2024-01-15T13:00:00.000Z",
    "isActive": true
  }
}
```

### 24. Get User Enrollments
**GET** `/api/enrollments`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j5",
      "course": {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
        "title": "React Complete Course",
        "thumbnail": "/uploads/thumbnails/course-64f5a1b2c3d4e5f6g7h8i9j1.jpg",
        "totalLectures": 25
      },
      "enrolledAt": "2024-01-15T13:00:00.000Z",
      "progress": {
        "completedLectures": 5,
        "totalLectures": 25,
        "percentage": 20
      }
    }
  ]
}
```

## User Learning - Course Content Access

### 25. Get Enrolled Course Content
**GET** `/api/enrolled-courses/:courseId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "course": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
      "title": "React Complete Course",
      "description": "Learn React from basics to advanced",
      "thumbnail": "/uploads/thumbnails/course-64f5a1b2c3d4e5f6g7h8i9j1.jpg"
    },
    "modules": [
      {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j2",
        "title": "Introduction to React",
        "moduleNumber": 1,
        "lectures": [
          {
            "_id": "64f5a1b2c3d4e5f6g7h8i9j3",
            "title": "What is React?",
            "lectureNumber": 1,
            "isUnlocked": true,
            "isCompleted": true,
            "pdfNotesCount": 2
          },
          {
            "_id": "64f5a1b2c3d4e5f6g7h8i9j6",
            "title": "React Components",
            "lectureNumber": 2,
            "isUnlocked": true,
            "isCompleted": false,
            "pdfNotesCount": 1
          },
          {
            "_id": "64f5a1b2c3d4e5f6g7h8i9j7",
            "title": "React Props",
            "lectureNumber": 3,
            "isUnlocked": false,
            "isCompleted": false,
            "pdfNotesCount": 3
          }
        ]
      }
    ],
    "progress": {
      "completedLectures": 5,
      "totalLectures": 25,
      "percentage": 20
    }
  }
}
```

### 26. Get Lecture Content (for enrolled users)
**GET** `/api/lectures/:lectureId/content`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j3",
    "title": "What is React?",
    "videoUrl": "https://www.youtube.com/embed/FRjlF74_EZk",
    "lectureNumber": 1,
    "module": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j2",
      "title": "Introduction to React",
      "moduleNumber": 1
    },
    "course": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
      "title": "React Complete Course"
    },
    "pdfNotes": [
      {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j4",
        "title": "React Concepts Notes",
        "fileName": "react-concepts-notes.pdf",
        "filePath": "/uploads/pdf-notes/lecture-64f5a1b2c3d4e5f6g7h8i9j3-react-concepts-notes.pdf"
      }
    ],
    "isUnlocked": true,
    "isCompleted": true,
    "nextLecture": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j6",
      "title": "React Components",
      "isUnlocked": true
    },
    "previousLecture": null
  }
}
```

### 27. Search Lectures
**GET** `/api/enrolled-courses/:courseId/search?q=searchTerm`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j3",
      "title": "What is React?",
      "lectureNumber": 1,
      "module": {
        "title": "Introduction to React",
        "moduleNumber": 1
      },
      "isUnlocked": true,
      "isCompleted": true
    }
  ]
}
```

## Progress Tracking

### 28. Mark Lecture as Complete
**POST** `/api/progress/complete`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "lectureId": "64f5a1b2c3d4e5f6g7h8i9j3",
  "courseId": "64f5a1b2c3d4e5f6g7h8i9j1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lecture marked as complete",
  "data": {
    "progress": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j8",
      "userId": "64f5a1b2c3d4e5f6g7h8i9j0",
      "courseId": "64f5a1b2c3d4e5f6g7h8i9j1",
      "lectureId": "64f5a1b2c3d4e5f6g7h8i9j3",
      "isCompleted": true,
      "completedAt": "2024-01-15T14:00:00.000Z"
    },
    "nextLectureUnlocked": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j6",
      "title": "React Components"
    }
  }
}
```

### 29. Get User Progress for Course
**GET** `/api/progress/:courseId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courseId": "64f5a1b2c3d4e5f6g7h8i9j1",
    "totalLectures": 25,
    "completedLectures": 5,
    "percentage": 20,
    "completedLectureIds": [
      "64f5a1b2c3d4e5f6g7h8i9j3",
      "64f5a1b2c3d4e5f6g7h8i9j6"
    ],
    "lastAccessedLecture": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j6",
      "title": "React Components"
    }
  }
}
```

## File Download/Streaming

### 30. Download PDF Note
**GET** `/api/pdf-notes/:noteId/download`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="react-concepts-notes.pdf"
[PDF File Stream]
```

### 31. View PDF Note (Stream)
**GET** `/api/pdf-notes/:noteId/view`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```
Content-Type: application/pdf
[PDF File Stream for viewing in browser]
```

## Admin Analytics & Reports

### 32. Get Dashboard Statistics (Admin)
**GET** `/api/admin/dashboard-stats`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCourses": 15,
    "totalStudents": 250,
    "totalEnrollments": 420,
    "totalRevenue": 15750.00,
    "recentEnrollments": [
      {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j5",
        "student": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "course": {
          "title": "React Complete Course"
        },
        "enrolledAt": "2024-01-15T13:00:00.000Z"
      }
    ],
    "popularCourses": [
      {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
        "title": "React Complete Course",
        "enrollmentCount": 150,
        "revenue": 14850.00
      }
    ]
  }
}
```

### 33. Get Course Analytics (Admin)
**GET** `/api/admin/courses/:courseId/analytics`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "course": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
      "title": "React Complete Course"
    },
    "enrollmentCount": 150,
    "revenue": 14850.00,
    "completionRate": 65.5,
    "averageProgress": 78.2,
    "moduleProgress": [
      {
        "moduleNumber": 1,
        "title": "Introduction to React",
        "completionRate": 85.5
      }
    ],
    "lectureProgress": [
      {
        "lectureNumber": 1,
        "title": "What is React?",
        "completionRate": 92.0
      }
    ]
  }
}
```

## User Dashboard & Profile

### 34. Get User Dashboard
**GET** `/api/user/dashboard`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "enrolledCourses": 3,
    "completedCourses": 1,
    "totalLearningHours": 45.5,
    "recentActivity": [
      {
        "type": "lecture_completed",
        "lecture": {
          "title": "React Components"
        },
        "course": {
          "title": "React Complete Course"
        },
        "completedAt": "2024-01-15T14:00:00.000Z"
      }
    ],
    "continueWatching": [
      {
        "course": {
          "_id": "64f5a1b2c3d4e5f6g7h8i9j1",
          "title": "React Complete Course",
          "thumbnail": "/uploads/thumbnails/course-64f5a1b2c3d4e5f6g7h8i9j1.jpg"
        },
        "lastWatchedLecture": {
          "_id": "64f5a1b2c3d4e5f6g7h8i9j6",
          "title": "React Components"
        },
        "progress": 20
      }
    ]
  }
}
```

### 35. Update User Profile
**PUT** `/api/user/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "updatedAt": "2024-01-15T15:00:00.000Z"
  }
}
```

## Additional Utility Endpoints

### 36. Upload File (Generic)
**POST** `/api/upload`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
file: [file upload]
type: "thumbnail" | "pdf" | "video"
```

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "fileName": "uploaded-file.jpg",
    "filePath": "/uploads/thumbnails/uploaded-file.jpg",
    "fileSize": 245760,
    "mimeType": "image/jpeg"
  }
}
```

### 37. Check Enrollment Status
**GET** `/api/courses/:courseId/enrollment-status`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isEnrolled": true,
    "enrollmentDate": "2024-01-15T13:00:00.000Z",
    "progress": {
      "completedLectures": 5,
      "totalLectures": 25,
      "percentage": 20
    }
  }
}
```

## Error Response Format

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

## Authentication & Authorization Notes

### Authentication Required:
- All endpoints except `/api/auth/*` and `/api/public/*` require authentication
- Include `Authorization: Bearer <token>` header

### Admin Only Endpoints:
- All `/api/courses` CRUD operations
- All `/api/modules` CRUD operations  
- All `/api/lectures` CRUD operations
- All `/api/pdf-notes` upload/delete operations
- All `/api/admin/*` endpoints

### Student Access:
- Can access enrolled course content
- Can track their own progress
- Can view public course information
- Cannot modify any content

## Implementation Notes

### Sequential Lecture Unlocking Logic:
1. First lecture of each course is always unlocked
2. Next lecture unlocks only when previous lecture is completed
3. Check `UserProgress` model to determine completion status
4. Frontend should disable/hide locked lectures

### File Upload Considerations:
1. Implement file size limits (e.g., 100MB for videos, 10MB for PDFs)
2. Validate file types (only allow specific formats)
3. Use unique file names to prevent conflicts
4. Store files outside web root for security

### Progress Tracking:
1. Create `UserProgress` record when lecture is completed
2. Update course progress percentage in real-time
3. Unlock next lecture automatically
4. Send notifications for milestones (if implementing)

### Performance Optimizations:
1. Use pagination for lecture lists
2. Implement caching for frequently accessed data
3. Optimize database queries with proper indexing
4. Use CDN for static file delivery

### Security Considerations:
1. Validate user enrollment before serving content
2. Implement rate limiting for API endpoints
3. Sanitize all user inputs
4. Use HTTPS for all file uploads/downloads
5. Implement proper CORS policies