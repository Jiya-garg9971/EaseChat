import express from 'express';
import {accessChat,fetchChat} from '../controller/chatController.js';

const router=express.Router();
router.route("/").post(accessChat);
router.route("/").get(fetchChat);
// router.route("/group").post(createGrpChat);
// router.route("/rename").put(renameGrp);
// router.route("/groupremove").put(removeFromGrp);
// router.route("/groupadd").put(addToGrp);
export default router;