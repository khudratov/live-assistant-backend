import mongoose, { Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
	_id: Types.ObjectId;
	email: string;
	password: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

userSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
	return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
