interface Params {
	id: string | null
	text: string
}

class AlternativeResponse {
	id: string | null
	text: string

	constructor(params: Params) {
		this.id = params.id
		this.text = params.text
	}
}

export { AlternativeResponse }