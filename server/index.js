import express from 'express';
import postRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Serve static files from the public/uploads folder
app.use('/upload', express.static(path.join(__dirname, 'public/uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'../client/public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// File upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ filename: req.file.filename });
});

// API routes
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Start the server
app.listen(8800, () => {
  console.log('Server is running on port 8800');
});
