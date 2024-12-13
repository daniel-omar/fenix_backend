import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { DocumentTypeService } from './services/document_type.service';


@Controller('users/document_type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) { }

  @Get("/getList")
  async getList(@Request() req: Request): Promise<any> {
    let response = await this.documentTypeService.getList();

    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };

  }

}
