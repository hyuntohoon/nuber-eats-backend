import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType() // 전체를 전송 ,inputtpye은 따로
export class createRestaurantDto {
  @Field((type) => String)
  @IsString()
  name: string;

  @Field((type) => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @IsString()
  address: string;

  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  ownersName: string;
}
