import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TypeEvidenceService } from './services/type_evidence.service';


@Controller('orders/type_evidence')
export class TypeEvidenceController {
  constructor(private readonly typeEvidenceService: TypeEvidenceService) { }

  @Get("/getAll")
  async get(@Request() req: Request): Promise<any> {
    let response = await this.typeEvidenceService.getAll();

    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };

  }

  @Get("/getById/:idTipoEvidencia")
  async getById(@Request() req: Request, @Param('idTipoEvidencia') idTipoEvidencia: number,): Promise<any> {
    let response = await this.typeEvidenceService.getById(idTipoEvidencia);

    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };

  }

}
