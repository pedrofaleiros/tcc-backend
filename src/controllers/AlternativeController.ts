import { Request, Response } from "express";
import { AlternativeService } from "../services/AlternativeService";
import { AlternativeServiceImpl } from "../services/impl/AlternativeServiceImpl";
import { AlternativeDTO } from "../models/dtos/AlternativeDTO";

class AlternativeController {
	private service: AlternativeService

	constructor() {
		this.service = new AlternativeServiceImpl()
		this.createAlternative = this.createAlternative.bind(this)
	}

	async createAlternative(req: Request, res: Response) {
		const alternative = AlternativeDTO.fromRequestBody(req.body)

		const response = await this.service.createAlternative(alternative)

		return res.json({ status: response })
	}
}

export { AlternativeController }