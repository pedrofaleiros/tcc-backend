import { AlternativeEntity } from "../models/entities/AlternativeEntity";
import { QuestionEntity } from "../models/entities/QuestionEntity";
import { SubjectEntity } from "../models/entities/SubjectEntity";
import prismaClient from "../prisma/PrismaClient";

const questionSelect = {
	id: true,
	content: true,
	level: true,
	imageUrl: true,
	alternatives: {
		select: {
			id: true,
			text: true,
		}
	},
	// questionSubjects: {
	// 	select: {
	// 		Subject: true
	// 	}
	// },
	userQuestions: {
		select: {
			correct: true,
			tries: true,
			alternativeId: true
		}
	}
};
export class QuestionRepository {

	async getQuestion(id: string) {
		return await prismaClient.question.findUnique({
			where: { id: id },
			select: questionSelect,
		})
	}

	async listQuestions() {
		const data = await prismaClient.question.findMany({
			select: {
				id: true,
				content: true,
				level: true,
				imageUrl: true,
				alternatives: {
					select: {
						id: true,
						text: true,
					}
				},
				userQuestions: {
					select: {
						correct: true,
						tries: true,
						alternativeId: true
					}
				}
			}
		})
		return data
	}

	async listQuestionsByLevel(level: number) {
		const data = await prismaClient.question.findMany({
			where: { level: level },
			select: questionSelect
		})
		return data
	}

	async listQuestionsBySubject(id: string) {
		const data = await prismaClient.question.findMany({
			where: {
				questionSubjects: {
					some: {
						subjectId: id
					}
				}
			},
			select: questionSelect
		})
		return data
	}



	async addAlternatives(alternatives: AlternativeEntity[]) {
		for (let i = 0; i < alternatives.length; i++) {
			await prismaClient.alternative.create({
				data: {
					text: alternatives[i].text,
					value: alternatives[i].value,
					questionId: alternatives[i].question_id,
				}
			})
		}
	}

	async addSubjects(subjects: SubjectEntity[]) {
		for (let i = 0; i < subjects.length; i++) {
			await prismaClient.questionSubject.create({
				data: {
					subjectId: subjects[i].subjectId,
					questionId: subjects[i].questionId,
				}
			})
		}
	}

	async createQuestion(question: QuestionEntity): Promise<string> {
		const data = await prismaClient.question.create({
			data: {
				content: question.content,
				level: question.level,
				imageUrl: question.image_url,
			},
			select: { id: true }
		})
		return data.id
	}

	async deleteQuestion(id: string) {
		await prismaClient.question.delete({ where: { id: id } })
	}

	async findSubject(id: string) {
		return await prismaClient.subject.findUnique({ where: { id: id } })
	}
}