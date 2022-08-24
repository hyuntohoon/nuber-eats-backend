import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Restaruant } from '../entities/restaruant.entity';

//@ArgsType() // 전체를 전송 ,inputtpye은 따로
@InputType()
export class CreateRestaurantDto extends OmitType(Restaruant, ['id']) {}
