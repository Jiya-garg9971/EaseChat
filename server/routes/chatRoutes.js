import express from 'express';
import {accessChat,fetchChat,createGrpChat, renameGrp, removeFromGrp, addToGrp} from '../controller/chatController.js';
import protect from '../errorhandler/authentication.js';

const router=express.Router();
router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChat);
router.route("/group").post(protect,createGrpChat);
router.route("/rename").put(protect,renameGrp);
router.route("/groupremove").put(protect,removeFromGrp);
router.route("/groupadd").put(protect,addToGrp);
export default router;