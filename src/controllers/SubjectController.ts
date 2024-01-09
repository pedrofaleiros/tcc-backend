import { Request, Response } from "express";
import { SubjectService } from "../services/SubjectService";

export class SubjectController {

	private service = new SubjectService()

	constructor() {
		this.createSubject = this.createSubject.bind(this)
		this.listSubjects = this.listSubjects.bind(this)
		this.deleteSubject = this.deleteSubject.bind(this)
	}

	async createSubject(req: Request, res: Response) {
		const { name } = req.body
		await this.service.createSubject(name)
		return res.json({ status: 'criado com sucesso' })
	}

	async listSubjects(req: Request, res: Response) {
		const name = req.query.name
		const data = await this.service.listSubjects(name)
		return res.json({
			length: data.length,
			data: data
		})
	}

	async deleteSubject(req: Request, res: Response) {
		const id = req.query.id
		await this.service.deleteSubject(id)
		return res.json({ status: 'deletado com sucesso' })
	}
}