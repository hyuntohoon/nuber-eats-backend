import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { Restaruant } from './restaurants/entities/restaruant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // configMoudle => 각 환경 설정을 돕는 모듈
      //환경 설정이 왜 필요한가? => 테스트 서버와 실제 배포 서버를 다루는 여러 설정이 같을 수 없고
      // 이를 분리하여 사용하고자 ConfigModule를 쓴다.
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      //이는 FilePath를 설정하는 것인데, 현제 사용하는 환경이 dev라면 .env.dev사용하고, 아니면 .env.test의 환경설정을 불러온다.
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      // 지금 프로세스가 "prod"상태라면 불러오는 것을 무시한다.
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(), // 토큰 지정을 위한 private key, 사용자가 해당 토큰을 수정할 경우 이를 알기위해
        //env파일에 https://randomkeygen.com/에서 키값을 가져온다.
        //이렇게 키값을 따로 관리해야 사용자가 가짜 토큰을 보낸 것인지, 확인하여 관리할 수 있다.
      }),
      //shcema를 검사하는 과정인데, joi를 사용하여, 타입과, 필수인지 아닌지를 설정한다.
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      // JS로 작성된 entity를 통해 schema를 생성, 수정, 삭제 하는 것
      // 개발 시 편의성을 높이지만 실제 shema를 신경쓰지 않고 자바 entity만 신경쓴다면
      // 데이터를 다 날릴 수 있음
      // 그래서 테스트 상황에만 이를 적용할 수 있음
      logging: process.env.NODE_ENV !== 'prod',
      entities: [User],
    }),
    //typeOrm => 백엔드 서버

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    UsersModule,

    CommonModule,

    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
