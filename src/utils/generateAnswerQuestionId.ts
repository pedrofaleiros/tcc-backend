export function generateAnswerQuestionId(user_id: string, question_id: string): string {
	return `${user_id}${question_id}`
}