import prismaClient from "../../prisma/PrismaClient";
import { CategoryRepository } from "../CategoryRepository";

class PrismaCategoryRepository implements CategoryRepository {

	async findCategory(category_id: string): Promise<boolean> {
		return await prismaClient.category.findUnique({
			where: { id: category_id }
		}) != null
	}

	async createCategory(category_name: string): Promise<string> {
		await prismaClient.category.create({
			data: {
				name: category_name
			}
		})
		return 'created'
	}

	async deleteCategory(category_id: string): Promise<string> {
		await prismaClient.category.delete({
			where: { id: category_id }
		})
		return "deleted"
	}

	async listCategories(): Promise<object[]> {
		const response = await prismaClient.category.findMany()
		return response
	}

}

export { PrismaCategoryRepository }