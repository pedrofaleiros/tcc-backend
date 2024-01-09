import { QuestionEntity } from "../entities/QuestionEntity"
import { AlternativeDTO } from "./AlternativeDTO"

interface Params {
	image_url: string | null
	content: string
	level: number
	alternatives: AlternativeDTO[]
	subjectsId: string[]
}

class QuestionDTO {
	image_url: string | null
	content: string
	level: number
	alternatives: AlternativeDTO[]
	subjectsId: string[]

	constructor(params: Params) {
		this.image_url = params.image_url
		this.content = params.content
		this.level = params.level
		this.alternatives = params.alternatives
		this.subjectsId = params.subjectsId
	}

	toEntity(): QuestionEntity {
		return new QuestionEntity({
			id: null,
			image_url: this.image_url,
			content: this.content,
			level: this.level,
		})
	}

	static fromRequestBody(reqBody: any): QuestionDTO {
		if (!reqBody.content) throw new Error('Content is required')
		if (!reqBody.level) throw new Error('Level is required')

		const alternatives: AlternativeDTO[] = getAlternatives(reqBody)
		const subjects: string[] = getSubjects(reqBody)

		return new QuestionDTO({
			content: reqBody.content,
			level: parseInt(reqBody.level),
			image_url: reqBody.imageUrl,
			alternatives: alternatives,
			subjectsId: subjects,
		});
	}
}

export { QuestionDTO }

function getAlternatives(reqBody: any) {
	if (reqBody.alternatives == undefined || reqBody.alternatives == null) throw new Error("Alternativas invalidas")

	const alternatives: AlternativeDTO[] = []
	try {
		const list = reqBody.alternatives as Array<{ text: string; value: boolean }>
		list.forEach((e) => {
			alternatives.push(AlternativeDTO.fromRequestBody(e))
		})
	} catch (error) {
		throw new Error("Alternativas invalida")
	}
	return alternatives
}

function getSubjects(reqBody: any) {
	const subjects: string[] = []
	if (reqBody.subjects != undefined && reqBody.subjects != null) {
		try {
			const list2 = reqBody.subjects as Array<{ id: string }>
			list2.forEach((e) => {
				subjects.push(e.id)
			})
		} catch (error) {
			throw new Error("subjects invalido")
		}
	}
	return subjects
}
