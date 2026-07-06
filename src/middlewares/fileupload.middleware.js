import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        // Absolute path — relative paths break in Vercel serverless
        cb(null, path.join(__dirname, '../../public/images/'));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    },
})


export const uploadFile = multer({
    storage: storageConfig,
});