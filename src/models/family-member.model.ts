import mongoose, { Document, Schema } from "mongoose";


interface IFamilyMember extends Document {
	user: string
	family: string
	first_name: string
	last_name: string
}


const FamilyMemberSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: "User", required: true},
	family: {type: Schema.Types.ObjectId, ref: "Family", required: true},
	first_name: String,
	last_name: String,
})

export const FamilyMember = mongoose.model<IFamilyMember>('FamilyMember', FamilyMemberSchema);
