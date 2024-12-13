import { Module } from '@nestjs/common';
import { DocumentTypeService } from './services/document_type.service';
import { DocumentTypeDao } from './dao/document_type.dao';
import { DocumentTypeController } from './document_type.controller';

@Module({
  controllers: [DocumentTypeController],
  providers: [
    DocumentTypeService,
    DocumentTypeDao],
  imports: []
})
export class DocumentTypeModule { }