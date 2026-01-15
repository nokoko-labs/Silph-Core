import { Module } from '@nestjs/common';
import { RedisModule } from '@/cache/redis.module';
import { ConfigModule } from '@/config/config.module';
import { DatabaseModule } from '@/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, DatabaseModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
