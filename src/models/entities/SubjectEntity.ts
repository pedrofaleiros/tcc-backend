
interface Params {
	subjectId: string
	questionId: string
}
export class SubjectEntity {
	subjectId: string
	questionId: string

	constructor(p: Params) {
		this.subjectId = p.subjectId
		this.questionId = p.questionId
	}

	static fromListDTO(subjects: string[], questionId: string): SubjectEntity[] {
		const entities: SubjectEntity[] = []
		subjects.forEach((sub) => {
			entities.push(new SubjectEntity({
				questionId: questionId,
				subjectId: sub,
			}))
		})
		return entities
	}
}