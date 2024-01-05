import { CategoryRepository } from "../../repositories/CategoryRepository";
import { PrismaCategoryRepository } from "../../repositories/impl/PrismaCategoryRepository";
import { CategoryService } from "../CategoryService";

class CategoryServiceImpl implements CategoryService {

	private repository: CategoryRepository

	constructor() {
		this.repository = new PrismaCategoryRepository()
	}

	async createCategory(category_name: any): Promise<void> {
		if (category_name == null || category_name == undefined) throw new Error("Nome invalido");

		const name = category_name as string
		if (name == "" || name.length < 3 || name.length > 64) {
			throw new Error("Nome invalido")
		}

		await this.repository.createCategory(name);
	}

	async deleteCategory(category_id: any): Promise<void> {
		if (category_id == null || category_id == undefined) throw new Error("Id invalido");

		const id = category_id as string

		if (!await this.repository.findCategory(id)) {
			throw new Error("Categoria nao encontrada")
		}
		await this.repository.deleteCategory(id)
	}

	async listCategories(): Promise<object[]> {
		return await this.repository.listCategories()
	}

}

export { CategoryServiceImpl }