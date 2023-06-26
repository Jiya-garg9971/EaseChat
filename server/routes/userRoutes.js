import express from "express";
import {Registeruser,authdetails, allUsers} from "../controller/userController.js";

const router = express.Router();
router.post('/', Registeruser);
router.get('/', allUsers);

router.post('/login', authdetails);

export default router;


