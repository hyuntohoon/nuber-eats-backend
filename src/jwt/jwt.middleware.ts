import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function JwtMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers);
  next();
}
// 미들웨어 => 라우터 핸들러 전에 호출되는 함수이다.
// 이는 express처럼, 혹은 express로 사용할 수 있는데
// req, res, next를 변수로 받아와서 사용한다.
