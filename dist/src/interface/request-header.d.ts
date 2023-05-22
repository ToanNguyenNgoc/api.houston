import { Request } from "express";
export interface RequestHeader<Data> extends Request {
    user: Data;
}
