import { User } from '../models/user.model';
import { generateToken } from '../utils/generateToken';


export class AuthService {
	static async register(email: string, password: string) {
		const existingUser = await User.findOne({email});
		if (existingUser) throw new Error('User already exists');

		const user = await User.create({email, password});
		const token = generateToken(user._id.toString());

		return {token};
	}

	static async login(email: string, password: string) {
		const user = await User.findOne({email});
		if (!user) throw new Error('Invalid email or password');

		const isMatch = await user.comparePassword(password);
		if (!isMatch) throw new Error('Invalid email or password');

		const token = generateToken(user._id.toString());

		return {token};
	}
}
