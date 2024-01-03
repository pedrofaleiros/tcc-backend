import { CategoryRepository } from "../../repositories/CategoryRepository";
import { PrismaCategoryRepository } from "../../repositories/impl/PrismaCategoryRepository";
import { CategoryService } from "../CategoryService";

class CategoryServiceImpl implements CategoryService {

	private repository: CategoryRepository

	constructor() {
		this.repository = new PrismaCategoryRepository()
	}

	async createCategory(category_name: string): Promise<string> {
		if (category_name == "" || category_name.length < 3 || category_name.length > 64) {
			throw new Error("Nome invalido")
		}
		return await this.repository.createCategory(category_name);
	}

	async deleteCategory(category_id: string): Promise<string> {
		if (!this.repository.findCategory(category_id)) {
			throw new Error("Categoria nao encontrada")
		}
		return this.repository.deleteCategory(category_id)
	}

	async listCategories(): Promise<object[]> {
		return this.repository.listCategories()
	}

}

export { CategoryServiceImpl }