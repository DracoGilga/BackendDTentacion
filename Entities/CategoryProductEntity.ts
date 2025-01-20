import { Model } from 'objection';

export class CategoryProductEntity extends Model {
    static tableName = 'category_product';

    id!: number;
    categoryName!: string;
    categoryDescription!: string;
}