import { Request, Response } from "express"
import { CategoryService } from "../services/CategoryService"
import { CategoryServiceImpl } from "../services/impl/CategoryServiceImpl"

class CategoryController {
	private service: CategoryService

	constructor() {
		this.service = new CategoryServiceImpl()
		this.create = this.create.bind(this)
		this.delete = this.delete.bind(this)
		this.list = this.list.bind(this)
	}

	async create(req: Request, res: Response) {
		const name = req.body.name as string
		await this.service.createCategory(name)
		return res.json({ status: 'created' })
	}

	async delete(req: Request, res: Response) {
		const id = req.query.category_id as string
		await this.service.deleteCategory(id)
		return res.json({ status: 'deleted' })
	}

	async list(req: Request, res: Response) {
		const response = await this.service.listCategories()
		return res.json({ categories: response })
	}
}

export { CategoryController }