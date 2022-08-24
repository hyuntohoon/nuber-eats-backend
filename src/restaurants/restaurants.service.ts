import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaruant } from './entities/restaruant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaruant) // Restaruant entity inject
    private readonly restaurants: Repository<Restaruant>, // class name = restaruants, Restaruant entity를 가진 Repository
  ) {}
  getAll(): Promise<Restaruant[]> {
    // 비동기 작업임을 선언
    return this.restaurants.find(); // async method이기 때문에 Promise가 필요
  }
  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantDto> {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }
}
