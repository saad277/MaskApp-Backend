import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, MediaModule],
  providers: [],
})
export class AppModule {}
