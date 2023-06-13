import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
export declare class GenerateToken {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(id: number, email: string): Promise<any>;
    generateRefreshToken(req: Request, id: number, email: string): Promise<string>;
}
