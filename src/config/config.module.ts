import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validateConfig } from './config.validation';

/**
 * Global configuration module that validates environment variables
 * before the application starts. The application will crash if
 * critical variables are missing or invalid.
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validate: validateConfig,
      validationOptions: {
        allowUnknown: false,
        abortEarly: false,
      },
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
