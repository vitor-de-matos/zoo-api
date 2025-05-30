import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nutrition } from '../entity/nutrition.entity';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { INutritionRepo } from '../interface/nutrition-repo.interface';
import { Between, FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateNutritionDTO } from '../dtos/create-nutrition.dto';
import { FindNutritionRecordDTO } from '../dtos/find-nutrition.dto';
import { UpdateNutritionDTO } from '../dtos/update-nutrition.dto';

@Injectable()
export class NutritionRepository implements INutritionRepo {
  constructor(
    @InjectRepository(Nutrition, DB_PG_DATABASE)
    private readonly repository: Repository<Nutrition>,
  ) {}

  async create(nutritionDTO: CreateNutritionDTO): Promise<number> {
    const result = await this.repository.save(nutritionDTO);
    return result.id;
  }

  async find(filters: FindNutritionRecordDTO): Promise<{
    data: Nutrition[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Nutrition> = {
      where: {
        ...(filters.minDailyCalories !== undefined &&
        filters.maxDailyCalories !== undefined
          ? {
              date: Between(filters.minDailyCalories, filters.maxDailyCalories),
            }
          : filters.minDailyCalories !== undefined
            ? { dailyCalories: filters.minDailyCalories }
            : filters.maxDailyCalories !== undefined
              ? { dailyCalories: filters.maxDailyCalories }
              : {}),
        ...(filters.dietType && {
          dietType: ILike(`%${filters.dietType}%`),
        }),
        ...(filters.animalId && { animal: { id: filters.animalId } }),
        ...(filters.foodItems && {
          foodItems: ILike(`%${filters.foodItems}%`),
        }),
        ...(filters.feedingMethod && {
          feedingMethod: ILike(`%${filters.feedingMethod}%`),
        }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { animal: true },
    };

    const [data, totalItems] = await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: data, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Nutrition | undefined> {
    const nutrition = await this.repository.findOne({
      where: { id: id },
      relations: { animal: true },
    });
    if (!nutrition) {
      throw new NotFoundException({
        message: 'Nutrição não encontrada',
      });
    }
    return nutrition;
  }

  async update(
    nutritionId: number,
    nutritionDTO: UpdateNutritionDTO,
  ): Promise<Nutrition> {
    const nutrition = await this.repository.findOne({
      where: { id: nutritionId },
    });

    if (!nutrition) {
      throw new NotFoundException({
        message: 'Nutrição não encontrada',
      });
    }

    const UpdateNutrition = await this.repository.save({
      ...nutrition,
      ...nutritionDTO,
    });

    return UpdateNutrition;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
