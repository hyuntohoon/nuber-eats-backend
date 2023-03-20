import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findById(decoded['id']);

          req['user'] = user;
        } catch (e) {}
      }
    }
    next();
  }
}
// GraphQL Context => Apollo Server를 이용해서 http headers로 보낸 User 값을 GraphQL로 가져온다.
// Appollo server에는 context라는 함수가 있고 이는 req마다 req property를 가진 object를 받는다.
// 그러니까 우리는 header 내 값을 공유하기 위해 전역변수 같은 개념을 위해(global) Apollo server의 context를 사용한다.
// 미들웨어 => 라우터 핸들러 전에 호출되는 함수이다.
// 이는 express처럼, 혹은 express로 사용할 수 있는데
// req, res, next를 변수로 받아와서 사용한다.
