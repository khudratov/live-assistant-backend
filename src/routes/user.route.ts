import { Router } from "express";
import { getUserDetail } from "../controllers/user.controller";


const route = Router()


route.get('/me', getUserDetail)


export default route;
