# LMS API Endpoints Documentation

## Authentication Endpoints

### 1. Register User **(Public)**

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

### 2. Login User **(Public)**

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

### 3. Get Current User **(Admin | Student)**

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

## Course Management

### 4. Create Course **(Admin)**

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

### 5. Get All Courses (Admin Dashboard) **(Admin)**

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

### 6. Get Course by ID **(Admin)**

**GET** `/api/courses/:courseId`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

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

### 7. Update Course **(Admin)**

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

### 8. Delete Course **(Admin)**

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

## Module Management

### 9. Create Module **(Admin)**

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

### 10. Get Modules by Course **(Admin | Student)**

**GET** `/api/courses/:courseId/modules`

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

### 11. Update Module **(Admin)**

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

### 12. Delete Module **(Admin)**

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

## Lecture Management

### 13. Create Lecture **(Admin)**

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

### 14. Get Lectures by Module **(Admin | Student)**

**GET** `/api/modules/:moduleId/lectures`

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
      "moduleId": "64f5a1b2c3d4e5f6g7h8i9j2",
      "lectureNumber": 1,
      "isActive": true,
      "pdfNotesCount": 2,
      "createdAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

### 15. Get All Lectures (Admin Dashboard with filters) **(Admin)**

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

### 16. Update Lecture **(Admin)**

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

### 17. Delete Lecture **(Admin)**

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

## PDF Notes Management

### 18. Upload PDF Notes **(Admin)**

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

### 19. Get PDF Notes by Lecture **(Admin | Student)**

**GET** `/api/lectures/:lectureId/pdf-notes`

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

### 20. Delete PDF Note **(Admin)**

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

### 21. Get Public Courses (Course Catalog) **(Public)**

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

### 22. Get Course Details (Public Course Page) **(Public)**

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

### 23. Enroll in Course **(Student)**

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

### 24. Get User Enrollments **(Student)**

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

### 25. Get Enrolled Course Content (Learning Interface) **(Student)**

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

### 26. Get Lecture Content (Video Player Page) **(Student)**

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

### 27. Search Lectures **(Student)**

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

### 28. Mark Lecture as Complete **(Student)**

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

### 29. Get User Progress for Course **(Student)**

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
    "completedLectureIds": ["64f5a1b2c3d4e5f6g7h8i9j3", "64f5a1b2c3d4e5f6g7h8i9j6"],
    "lastAccessedLecture": {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j6",
      "title": "React Components"
    }
  }
}
```

## File Download/Streaming

### 30. Download PDF Note **(Student)**

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

### 31. View PDF Note (Stream) **(Student)**

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

### 32. Get Dashboard Statistics **(Admin)**

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
    "totalRevenue": 15750.0,
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
        "revenue": 14850.0
      }
    ]
  }
}
```

### 33. Get Course Analytics **(Admin)**

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
    "revenue": 14850.0,
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

### 34. Get All Students **(Admin)**

**GET** `/api/admin/students`

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
      "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "enrolledCourses": 3,
      "completedCourses": 1,
      "totalProgress": 45.2,
      "lastActivity": "2024-01-15T14:00:00.000Z",
      "createdAt": "2024-01-10T10:00:00.000Z"
    }
  ]
}
```

### 35. Get Enrollment Analytics **(Admin)**

**GET** `/api/admin/enrollments/analytics`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalEnrollments": 420,
    "thisMonthEnrollments": 45,
    "enrollmentGrowth": 15.2,
    "averageEnrollmentsPerCourse": 28,
    "monthlyEnrollments": [
      {
        "month": "January",
        "year": 2024,
        "count": 45
      }
    ],
    "courseWiseEnrollments": [
      {
        "courseId": "64f5a1b2c3d4e5f6g7h8i9j1",
        "courseName": "React Complete Course",
        "enrollmentCount": 150
      }
    ]
  }
}
```

## User Dashboard & Profile

### 36. Get User Dashboard **(Student)**

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

### 37. Update User Profile **(Admin | Student)**

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

### 38. Change Password **(Admin | Student)**

**PUT** `/api/user/change-password`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**

```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## Additional Utility Endpoints

### 39. Upload File (Generic) **(Admin)**

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

### 40. Check Enrollment Status **(Student)**

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

### 41. Get Course Prerequisites **(Public)**

**GET** `/api/public/courses/:courseId/prerequisites`

**Response:**

```json
{
  "success": true,
  "data": {
    "prerequisites": ["Basic JavaScript knowledge", "HTML & CSS fundamentals"],
    "difficulty": "Intermediate",
    "estimatedDuration": "40 hours",
    "language": "English"
  }
}
```

### 42. Get Course Reviews **(Public)**

**GET** `/api/public/courses/:courseId/reviews`

**Response:**

```json
{
  "success": true,
  "data": {
    "averageRating": 4.8,
    "totalReviews": 156,
    "ratingDistribution": {
      "5": 120,
      "4": 25,
      "3": 8,
      "2": 2,
      "1": 1
    },
    "reviews": [
      {
        "_id": "64f5a1b2c3d4e5f6g7h8i9j9",
        "user": "John D.",
        "rating": 5,
        "comment": "Excellent course! Very well structured.",
        "createdAt": "2024-01-14T10:00:00.000Z"
      }
    ]
  }
}
```

### 43. Submit Course Review **(Student)**

**POST** `/api/courses/:courseId/reviews`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**

```json
{
  "rating": 5,
  "comment": "Excellent course! Very well structured."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j9",
    "userId": "64f5a1b2c3d4e5f6g7h8i9j0",
    "courseId": "64f5a1b2c3d4e5f6g7h8i9j1",
    "rating": 5,
    "comment": "Excellent course! Very well structured.",
    "createdAt": "2024-01-15T16:00:00.000Z"
  }
}
```

### 44. Get User Learning Statistics **(Student)**

**GET** `/api/user/learning-stats`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalEnrollments": 5,
    "completedCourses": 2,
    "inProgressCourses": 3,
    "totalLearningHours": 127.5,
    "averageProgress": 68.4,
    "completionRate": 40.0,
    "monthlyProgress": [
      {
        "month": "January",
        "year": 2024,
        "hoursLearned": 25.5,
        "lecturesCompleted": 15
      }
    ],
    "streakDays": 7,
    "achievements": [
      {
        "title": "First Course Completed",
        "description": "Completed your first course",
        "unlockedAt": "2024-01-10T15:00:00.000Z"
      }
    ]
  }
}
```

### 45. Search All Courses **(Public)**

**GET** `/api/public/courses/search?q=searchTerm&category=programming&minPrice=0&maxPrice=200&difficulty=beginner`

**Response:**

```json
{
  "success": true,
  "data": {
    "courses": [
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
        "rating": 4.8,
        "studentsEnrolled": 150,
        "category": "programming",
        "difficulty": "intermediate"
      }
    ],
    "totalResults": 1,
    "currentPage": 1,
    "totalPages": 1
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

## Access Control Summary

### **Public** (No Authentication Required):

- Authentication endpoints (register/login)
- Course catalog browsing
- Course details viewing
- Course search
- Course reviews viewing

### **Admin** (Admin Role Required):

- All course management (CRUD)
- All module management (CRUD)
- All lecture management (CRUD)
- PDF notes upload/delete
- File uploads
- Analytics and dashboard stats
- Student management
- Enrollment analytics

### **Student** (Student Role Required):

- Course enrollment
- Learning content access (enrolled courses only)
- Progress tracking
- PDF downloads
- User dashboard
- Profile management
- Course reviews submission
- Learning statistics

### **Admin | Student** (Any Authenticated User):

- Profile viewing/updating
- Password change
- Basic user info access
- Getting modules/lectures (with proper enrollment checks for students)

## Implementation Notes

### Sequential Lecture Unlocking Logic:

1. First lecture of each course is always unlocked for enrolled students
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
6. Students can only access content from enrolled courses
7. Admin can access all content regardless of enrollment
