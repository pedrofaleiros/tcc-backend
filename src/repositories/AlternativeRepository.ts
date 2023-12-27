import { AlternativeEntity } from "../models/entities/AlternativeEntity"
import { AlternativeResponse } from "../models/response/AlternativeResponse"
import { QuestionResponse } from "../models/response/QuestionResponse"

interface AlternativeRepository {
	createAlternative(alternative: AlternativeEntity): Promise<string>
	getQuestionAlternatives(question_id: string): Promise<Array<AlternativeResponse>>
	questionHasTrueAlternative(question_id: string): Promise<boolean>
}

export { AlternativeRepository }