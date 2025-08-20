import fs from 'fs';
import path from 'path';

const deleteFileIfExists = async (filePath: string) => {
  const fullFilePath = path.join(process.cwd(), 'public', filePath);
  try {
    await fs.promises.access(fullFilePath, fs.constants.F_OK); // check existence
    await fs.promises.unlink(fullFilePath);
    console.log('Deleted file:', fullFilePath);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // File not found, safe to ignore
      console.warn('File already missing, skipping delete:', fullFilePath);
    } else {
      console.error('Error deleting file:', err);
    }
  }
};
export default deleteFileIfExists;
