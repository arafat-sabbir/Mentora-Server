import { Request, Response, NextFunction } from 'express';

const convertFilePath = (req: Request, res: Response, next: NextFunction) => {
  // Handle single file upload (req.file)
  if (req.file) {
    const fullPath = req.file.path;
    const relativePath = fullPath.split('public')[1];
    req.file.path = relativePath.replace(/\\/g, '/'); // /uploads/filename.png
  }

  // Handle multiple files (req.files)
  if (req.files) {
    if (Array.isArray(req.files)) {
      // When upload.array() was used
      req.files.forEach((file) => {
        const fullPath = file.path;
        const relativePath = fullPath.split('public')[1];
        file.path = relativePath.replace(/\\/g, '/');
      });
    } else {
      // When upload.fields() was used → req.files is an object
      Object.values(req.files).forEach((fileArray) => {
        fileArray.forEach((file: Express.Multer.File) => {
          const fullPath = file.path;
          const relativePath = fullPath.split('public')[1];
          file.path = relativePath.replace(/\\/g, '/');
        });
      });
    }
  }

  next(); // Continue
};

export default convertFilePath;
