import { AlternativeDTO } from "../models/dtos/AlternativeDTO"

interface AlternativeService {
	createAlternative(alternative: AlternativeDTO): Promise<string>
}

export { AlternativeService }