import { SubjectRepository } from "../repositories/SubjectRepository";

export class SubjectService {
	private repository = new SubjectRepository()

	async createSubject(name: any) {
		if (name == undefined || name == null) throw new Error("Request invalido. Campo 'name' não encontrado.")
		const nameStr = name as string
		if (nameStr.length < 3 || nameStr.length > 64) throw new Error("'Name' deve conter entre 3 e 64 caracteres")
		await this.repository.createSubject(nameStr)
	}

	async listSubjects(name: any) {
		if (name == undefined || name == null || name == "") {
			return await this.repository.listAllSubjects()
		} else {
			return await this.repository.searchSubjects(name as string)
		}
	}

	async deleteSubject(id: any) {
		if (id == undefined || id == null || id == "") throw new Error("Request invalido. 'id' necessário")
		if (await this.repository.findSubject(id) == null) throw new Error("Id invalido. Subject não encontrada")
		await this.repository.deleteSubject(id as string)
	}
}