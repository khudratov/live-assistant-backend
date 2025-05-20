import mongoose, { Document, Schema } from "mongoose";


interface IFamilyMember extends Document {
	user_id: string;
	family_id: string
}


const FamilyMemberSchema = new Schema({
	user_id: {type: Schema.Types.ObjectId, ref: "User"},
	family_id: {type: Schema.Types.ObjectId, ref: "Family"},
	first_name: String,
	last_name: String,
})

export const FamilyMember = mongoose.model<IFamilyMember>('FamilyMember', FamilyMemberSchema);
