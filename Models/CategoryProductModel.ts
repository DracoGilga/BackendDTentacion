import { CategoryProductEntity } from "../Entities/CategoryProductEntity";

export class CategoryProductModel {
    static async findById(id: number): Promise<CategoryProductEntity | null> {
        const categoryProduct = await CategoryProductEntity.query().findById(id);
        return categoryProduct || null;
    }

    static async findAll(): Promise<CategoryProductEntity[]> {
        return await CategoryProductEntity.query();
    }

    static async create(categoryProductData: Partial<CategoryProductEntity>): Promise<CategoryProductEntity> {
        return await CategoryProductEntity.query().insert(categoryProductData);
    }

    static async updateById(id: number, updateData: Partial<CategoryProductEntity>): Promise<CategoryProductEntity | null> {
        return await CategoryProductEntity.query().patchAndFetchById(id, updateData);
    }

    static async deleteById(id: number): Promise<number> {
        return await CategoryProductEntity.query().deleteById(id);
    }
}