import prismaClient from "../prisma/PrismaClient";

export class SubjectRepository {

	async createSubject(name: string) {
		await prismaClient.subject.create({ data: { name: name } })
	}

	async listAllSubjects() {
		const data = await prismaClient.subject.findMany()
		return data
	}

	async searchSubjects(name: string) {
		const data = await prismaClient.subject.findMany({
			where: {
				name: {
					contains: name,
					mode: "insensitive"
				}
			}
		})
		return data
	}

	async findSubject(id: string) {
		return await prismaClient.subject.findUnique({ where: { id: id } })
	}

	async deleteSubject(id: string) {
		await prismaClient.subject.delete({ where: { id: id } })
	}
}