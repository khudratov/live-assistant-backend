import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import familyRoutes from "./routes/family.routes";
import { protectMiddleware } from "./middlewares/auth.middleware";
import familyMemberRoutes from "./routes/family-member.routes";
import usersRoutes from "./routes/users.routes";
import walletRouter from "./routes/wallet.router";
import expenseRoutes from "./routes/expense.routes";
import cors from 'cors'
import userRoutes from "./routes/user.route";
import userExpenseRoutes from "./routes/userExpense.routes";


dotenv.config();
const app = express();
const MONGODB_URI = process.env.MONGODB_URI!;
const PORT = process.env.PORT!;

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', protectMiddleware, userRoutes);
app.use('/api/user/expenses', userExpenseRoutes);
app.use('/admin/families', protectMiddleware, familyRoutes);
app.use('/admin/family-members', protectMiddleware, familyMemberRoutes);
app.use('/admin/users', protectMiddleware, usersRoutes);
app.use('/admin/wallets', protectMiddleware, walletRouter);
app.use('/admin/expenses', expenseRoutes);

mongoose.connect(MONGODB_URI).then(() => {
	console.log('MongoDB connected');

	app.listen(PORT, () => {
		console.log('Server running on port', PORT);
	})
});

export default app;
