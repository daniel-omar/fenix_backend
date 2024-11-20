import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

export class AuthJwtService {

    constructor(
        private jwtService: JwtService
    ) { }

    getJwtToken(payload: JwtPayload) {

        const token = this.jwtService.sign(payload);
        return token;

    }
}