interface Params {
	id: string | null
	text: string
	value: boolean
	question_id: string
}

class AlternativeEntity {
	id: string | null
	text: string
	value: boolean	
	question_id: string

	constructor(params: Params) {
		this.id = params.id
		this.text = params.text
		this.value = params.value
		this.question_id = params.question_id
	}
}

export { AlternativeEntity }