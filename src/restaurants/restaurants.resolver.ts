import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaruant } from './entities/restaruant.entity'; // 우리는 이제부터 Restaruant => entity의 Restaruantd을 표현한다.

@Resolver((of) => Restaruant)
export class RestaurantResolver {
  @Query((returns) => Restaruant)
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaruant[] {
    return [];
  }
  @Mutation((returns) => Boolean)
  createRestaurant(
    @Args()
    createRestaurantInput: createRestaurantDto,
  ): boolean {
    console.log(createRestaurantInput);
    return true;
  }
}
