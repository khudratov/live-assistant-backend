import { User } from '../models/user.model';


export const createUser = async (data: {
	email: string;
	password: string
}) => {
	return await User.create(data);
};

export const getAllUsers = async () => {
	return User.find();
};

export const getUserById = async (id: string) => {
	return User.findById(id);
};

export const updateUser = async (id: string, data: Partial<{
	email: string;
	password: string
}>) => {
	const user = await User.findById(id);
	if (!user) return null;

	if (data.email) user.email = data.email;
	if (data.password) user.password = data.password;

	return await user.save();
};

export const deleteUser = async (id: string) => {
	return User.findByIdAndDelete(id);
};
