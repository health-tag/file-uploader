import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller('api/meta')
export class MetaController {

  @Get("fhir-public-url")
  hello() {
    return process.env.FHIR_SERVER_PUBLIC_URL ?? "http://localhost:8080/fhir";
  }
}
