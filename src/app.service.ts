import { Injectable } from '@nestjs/common';
import type { HealthCheckDto } from './app.dto';

@Injectable()
export class AppService {
  getHealthCheck(): HealthCheckDto {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
