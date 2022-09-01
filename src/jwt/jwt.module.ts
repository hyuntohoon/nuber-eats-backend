import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      // providers => 축약어인데, provide와 use~로 이루어져있음.
      // 여기서 provide => inject할 변수명을 말하며, 해당 파일 내부 construct할 변수명을 묻는다.
      //  또한 use~는 여러가지 function이 있는데, 사용하고자 하는 것을 말한다.
      exports: [JwtService],
    };
  }
}
