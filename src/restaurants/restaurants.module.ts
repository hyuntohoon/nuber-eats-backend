import { Module } from '@nestjs/common';
import { Restaruant } from './entities/restaruant.entity';
import { RestaurantResolver } from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurants.service';
@Module({
  imports: [TypeOrmModule.forFeature([Restaruant])],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
