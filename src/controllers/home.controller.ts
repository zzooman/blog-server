import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/services/app.service';

@Controller('/api')
export class HomeController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
