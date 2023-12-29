import { AlternativeEntity } from "../models/entities/AlternativeEntity"
import { AlternativeResponse } from "../models/response/AlternativeResponse"
import { QuestionResponse } from "../models/response/QuestionResponse"

interface AlternativeRepository {
	addAlternatives(alternatives: AlternativeEntity[]): Promise<string>
	createAlternative(alternative: AlternativeEntity): Promise<void>
}

export { AlternativeRepository }