import mongoose, { Document, Types } from "mongoose";


interface IWallet extends Document {
	_id: Types.ObjectId
	familyMember: Types.ObjectId;
	balance: number
}


const walletSchema = new mongoose.Schema({
	balance: {
		type: Number,
		required: true,
	},
	familyMember: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'FamilyMember',
		required: true
	},
})


export const Family = mongoose.model<IWallet>('Wallet', walletSchema);


