import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { async } from 'rxjs';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaruant } from './entities/restaruant.entity'; // 우리는 이제부터 Restaruant => entity의 Restaruantd을 표현한다.
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaruant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query((returns) => Restaruant) // query => get
  restaurants(): Promise<Restaruant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation((returns) => Boolean) // mutation => put, del, post
  async createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
