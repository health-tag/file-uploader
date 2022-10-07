import { Job, JobDto, JobEntity } from '@shared/models/job';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Delete,
  Post,
  UploadedFiles,
  UseInterceptors,
  Param,
  Logger,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JobService } from '@services/job.service';
import { promises as fsp } from 'fs';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';

let FLASK_URL = 'http://python:105/api';

@Controller('api/job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './workingdir/tmp',
      }),
    }),
  )
  async addJob(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() jobDto: JobDto,
  ) {
    let id = randomUUID();
    let job = new JobEntity();
    job.id = id;
    job.type = jobDto.type;
    job.dataDate = new Date(jobDto.dataDate);
    job.taskDate = new Date();
    await this.jobService.addJobAsync(files, job);
  }

  @Delete()
  deleteJob(@Param('id') id: string) {
    this.jobService.deleteJobAsync(id);
  }
/*
  @Get(':id/queue')
  async queueJob(@Param('id') id: string) {
    let r = await this.httpService.axiosRef.get(`${FLASK_URL}/queue/${id}`);
    console.log(r.statusText);
    console.log(r.data);
    this.jobService.updateJobStateAsync(id, 'queue');
  }

  @Get('/start')
  async startQueue() {
    let r = await this.httpService.axiosRef.get(`${FLASK_URL}/start`);
    console.log(r.statusText);
    console.log(r.data);
  }

  @Get(':id/run')
  runJob(@Param('id') id: string) {
    this.jobService.updateJobStateAsync(id, 'run');
  }

  @Get(':id/finish')
  finishJob(@Param('id') id: string) {
    this.jobService.updateJobStateAsync(id, 'finish');
  }
*/
  @Get(':id')
  getJob(@Param('id') id: string): Promise<Job> {
    return this.jobService.getJobAsync(id);
  }

  @Get(':id/log')
  getJobLog(@Param('id') id: string): Promise<string> {
    return this.jobService.getJobLogAsync(id);
  }

  @Get(':id/result')
  getJobResult(@Param('id') id: string): Promise<string> {
    return this.jobService.getJobResultAsync(id);
  }

  @Get()
  getJobs(): Promise<Array<Job>> {
    return this.jobService.getJobsAsync();
  }
}
