import './config'

import express from 'express';
import mongoose from 'mongoose';
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


const app = express();
const MONGODB_URI = process.env.MONGODB_URI!;
const PORT = Number(process.env.PORT!);

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
	console.log('MongoDB connected', MONGODB_URI);

	app.listen(PORT, '0.0.0.0', () => {
		console.log(`Server running on http://0.0.0.0:${PORT}`);
	});

});

export default app;
