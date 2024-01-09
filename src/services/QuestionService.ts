import { AlternativeDTO } from "../models/dtos/AlternativeDTO";
import { QuestionDTO } from "../models/dtos/QuestionDTO";
import { AlternativeEntity } from "../models/entities/AlternativeEntity";
import { SubjectEntity } from "../models/entities/SubjectEntity";
import { QuestionRepository } from "../repositories/QuestionRepository";

export class QuestionService {

	private repository = new QuestionRepository()

	async listQuestions(subjectId: any, level: any) {
		if (subjectId != undefined && subjectId != null) {
			return await this.repository.listQuestionsBySubject(subjectId as string)
		}

		if (level != undefined && level != null) {
			const _level = parseInt(level)
			return await this.repository.listQuestionsByLevel(_level)
		}

		return await this.repository.listQuestions()
	}

	async createQuestion(question: QuestionDTO) {
		if (question.content.length < 3 || question.content.length > 512) throw new Error("'content' invalido")
		if (question.level < 0 || question.level > 5) throw new Error("'level' invalido")

		this.validateAlternatives(question.alternatives)
		await this.validateSubjects(question.subjectsId)

		const questionId = await this.repository.createQuestion(question.toEntity())

		try {
			await this.repository.addAlternatives(AlternativeEntity.fromListDTO(question.alternatives, questionId))
			await this.repository.addSubjects(SubjectEntity.fromListDTO(question.subjectsId, questionId))
		} catch (error) {
			await this.repository.deleteQuestion("questionId")
			throw error
		}
	}

	async deleteQuestion(id: any) {
		if (id == undefined || id == null || id == "") throw new Error("Request invalido. 'questionId' necessario")

		if (await this.repository.getQuestion(id) == null) {
			throw new Error("Questao não encontrada");
		}

		await this.repository.deleteQuestion(id)
	}

	private validateAlternatives(alternatives: AlternativeDTO[]) {
		if (alternatives.length < 3 || alternatives.length > 5) throw new Error("Questao deve conter entre 3 e 5 alternativas");
		let trueCont = 0
		alternatives.forEach((alt) => {
			if (alt.text == "" || alt.text.length > 128) throw new Error("Alternativa 'text' invalido")
			if (alt.value == true) trueCont += 1
		})
		if (trueCont != 1) throw new Error("Questao deve conter 1 alternativa correta")
	}

	private async validateSubjects(subjects: string[]) {
		for (let i = 0; i < subjects.length; i++) {
			if (subjects[i] == "" || await this.repository.findSubject(subjects[i]) == null) {
				throw new Error("'subjectId' invalido")
			}
		}
	}
}