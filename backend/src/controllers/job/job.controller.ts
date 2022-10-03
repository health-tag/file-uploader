import { Job, JobDto, JobEntity } from '@shared/models/job';
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

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

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
    let id = crypto.randomUUID();
    let job = new JobEntity();
    job.id = id;
    job.type = jobDto.type;
    job.dataDate = jobDto.dataDate;
    job.taskDate = new Date();

    let targetDir = `./workingdir/${id}`;
    await fsp.mkdir(targetDir);
    files.forEach(async (file) => {
      let newfilePath = `${targetDir}/${file.filename}`;
      await fsp.rename(file.path, newfilePath);
      job.files.push(file.filename);
    });

    await this.jobService.addJobAsync(job);
  }

  @Delete()
  async deleteJob(@Param('id') id: string) {
    await this.jobService.deleteJobAsync(id);
  }

  @Get('/run')
  async runJob(@Param('id') id: string) {
    await this.jobService.runJobAsync(id);
  }

  @Get(":id")
  getJob(@Param('id') id: string): Promise<Job> {
    return this.jobService.getJobAsync(id);
  }

  @Get()
  async getJobs(): Promise<Array<Job>> {
    return []; //await this.jobService.getJobsAsync();
  }

  @Get('/test2')
  async getJobs2(): Promise<Array<Job>> {
    Logger.log("GG")
    return await this.jobService.getJobsAsync();
  }
}
