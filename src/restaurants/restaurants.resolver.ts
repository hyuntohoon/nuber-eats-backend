import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaruant } from './entities/restaruant.entity'; // 우리는 이제부터 Restaruant => entity의 Restaruantd을 표현한다.
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaruant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query((returns) => Restaruant)
  restaurants(): Promise<Restaruant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation((returns) => Boolean)
  createRestaurant(
    @Args()
    createRestaurantInput: createRestaurantDto, // 이렇게 오브젝트를 따로 만들고(dto) 이를 불러와서 한번에 생성할 수 있다.
  ): boolean {
    console.log(createRestaurantInput);
    return true;
  }
}
