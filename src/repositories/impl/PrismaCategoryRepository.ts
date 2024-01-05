import prismaClient from "../../prisma/PrismaClient";
import { CategoryRepository } from "../CategoryRepository";

class PrismaCategoryRepository implements CategoryRepository {
	async findCategory(category_id: string): Promise<boolean> {
		return await prismaClient.category.findUnique({ where: { id: category_id } }) != null
	}

	async createCategory(category_name: string): Promise<void> {
		await prismaClient.category.create({ data: { name: category_name } })
	}

	async deleteCategory(category_id: string): Promise<void> {
		await prismaClient.category.delete({ where: { id: category_id } })
	}

	async listCategories(): Promise<object[]> {
		return await prismaClient.category.findMany()
	}
}

export { PrismaCategoryRepository }