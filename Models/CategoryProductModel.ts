import { Model } from 'objection';

export class CategoryProductModel extends Model {
    static tableName = 'category_product';

    id!: number;
    categoryName!: string;
    categoryDescription!: string;

    static async findById(id: number): Promise<CategoryProductModel | null> {
        return await this.query().findById(id) || null;
    }

    static async findAll(): Promise<CategoryProductModel[]> {
        return await this.query();
    }

    static async create(categoryProductData: Partial<CategoryProductModel>): Promise<CategoryProductModel> {
        return await this.query().insert(categoryProductData);
    }

    static async updateById(id: number, updateData: Partial<CategoryProductModel>): Promise<CategoryProductModel | null> {
        return await this.query().patchAndFetchById(id, updateData) || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await this.query().deleteById(id);
    }
}