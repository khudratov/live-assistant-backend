import mongoose, { Document, Types } from "mongoose";


interface IFamily extends Document {
	_id: Types.ObjectId
	name: string
	user: Types.ObjectId;
}


const familySchema = new mongoose.Schema({
	name: {
		type: String, required: true
	},
	// TODO: replace to user
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
})


export const Family = mongoose.model<IFamily>('Family', familySchema);


