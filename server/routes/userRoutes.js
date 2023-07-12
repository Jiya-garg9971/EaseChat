import express from "express";
import {Registeruser,authdetails, allUsers} from "../controller/userController.js";
import protect from "../errorhandler/authentication.js";

const router = express.Router();
router.post('/', Registeruser);
router.get('/', protect,allUsers);

router.post('/login', authdetails);

export default router;


