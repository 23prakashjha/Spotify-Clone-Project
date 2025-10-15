import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import songRouter from './src/routes/songRoutes.js';
import albumRouter from './src/routes/albumRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Connect to Cloudinary
connectCloudinary();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);

// ✅ Test endpoint
app.get('/', (req, res) => res.send('API Working'));

// ✅ Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
