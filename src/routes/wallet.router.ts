import express from "express";
import {
	handleCreateWallet, handleDeleteWallet,
	handleGetAllWallets,
	handleGetWallet,
	handleUpdateWallet
} from "../controllers/wallet.controller";


const router = express.Router();

router.post("/", handleCreateWallet);
router.get("/", handleGetAllWallets);
router.get("/:id", handleGetWallet);
router.put("/:id", handleUpdateWallet);
router.delete("/:id", handleDeleteWallet);

export default router;
