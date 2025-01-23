import { Module } from '@nestjs/common';
import { TypeEvidenceService } from './services/type_evidence.service';
import { TypeEvidenceDao } from './dao/type_evidence.dao';
import { TypeEvidenceController } from './type_evidence.controller';

@Module({
  controllers: [TypeEvidenceController],
  providers: [
    TypeEvidenceService,
    TypeEvidenceDao],
  imports: []
})
export class TypeEvidenceModule { }
