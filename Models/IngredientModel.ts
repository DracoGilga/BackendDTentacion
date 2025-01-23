import { Model } from 'objection';

export class IngredientModel extends Model {
    static tableName = 'ingredients';

    id!: number;
    name!: string;
    quantity!: number;
    unitPrice!: number;

    static async findById(id: number): Promise<IngredientModel | null> {
        return await this.query().findById(id) || null;
    }

    static async findAll(): Promise<IngredientModel[]> {
        return await this.query();
    }

    static async create(ingredientData: Partial<IngredientModel>): Promise<IngredientModel> {
        return await this.query().insert(ingredientData);
    }

    static async updateById(id: number, updateData: Partial<IngredientModel>): Promise<IngredientModel | null> {
        return await this.query().patchAndFetchById(id, updateData) || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await this.query().deleteById(id);
    }
}