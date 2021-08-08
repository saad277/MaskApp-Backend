import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "click123",
  database: "maskapp",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true
};