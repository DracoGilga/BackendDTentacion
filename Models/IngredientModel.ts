import { IngredientEntity } from "../Entities/IngredientEntity";

export class IngredientModel {
    static async findById(id: number): Promise<IngredientEntity | null> {
        const ingredient = await IngredientEntity.query().findById(id);
        return ingredient || null;
    }

    static async findAll(): Promise<IngredientEntity[]> {
        return await IngredientEntity.query();
    }

    static async create(ingredientData: Partial<IngredientEntity>): Promise<IngredientEntity> {
        return await IngredientEntity.query().insert(ingredientData);
    }

    static async updateById(id: number, updateData: Partial<IngredientEntity>): Promise<IngredientEntity | null> {
        return await IngredientEntity.query().patchAndFetchById(id, updateData);
    }

    static async deleteById(id: number): Promise<number> {
        return await IngredientEntity.query().deleteById(id);
    }
}