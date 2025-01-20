import { Model } from 'objection';

export class IngredientEntity extends Model {
    static tableName = 'ingredients';

    id!: number;
    name!: string;
    quantity!: number;
    unitPrice!: number;
}