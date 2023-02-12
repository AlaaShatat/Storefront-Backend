import { Request } from "express";
import { User } from "../types/User";

export interface CustomRequest extends Request{
    auth: User,
    profile: User
};
