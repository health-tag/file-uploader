import { JobDto } from '@shared/models/job';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('job')
export class JobController {

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  addJob(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() jobData: JobDto
  ) {
    console.log(jobData);
    console.log(files);
  }
}
