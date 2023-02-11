import { Request } from "express";
import { User } from "../models/user";

export interface CustomRequest extends Request{
    auth: User,
    profile: User
};
