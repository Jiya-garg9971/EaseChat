import express from "express";
import {Registeruser,authdetails, allUsers} from "../controller/userController.js";
const Path=new express.Router();
 Path.route("/").post(Registeruser).get(allUsers);
Path.post("/login",authdetails);
export default Path;

