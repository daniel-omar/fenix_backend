import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsEmail()
    correo: string;

    @IsString()
    nombre: string;

    @IsString()
    apellido_paterno: string;

    @IsString()
    apellido_materno: string;

    @MinLength(6)
    clave: string;
}
