import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import familyRoutes from "./routes/family.routes";
import { protectMiddleware } from "./middlewares/auth.middleware";
import familyMemberRoutes from "./routes/family-member.routes";

dotenv.config();
const app = express();
const MONGODB_URI = process.env.MONGODB_URI!;
const PORT = process.env.PORT!;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/families', protectMiddleware, familyRoutes);
app.use('/api/family-members', protectMiddleware, familyMemberRoutes);

mongoose.connect(MONGODB_URI).then(() => {
	console.log('MongoDB connected');

	app.listen(PORT, () => {
		console.log('Server running on port', PORT);
	})
});

export default app;
