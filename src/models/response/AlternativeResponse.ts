interface Params {
	id: string | null
	text: string
	value: boolean
}

class AlternativeResponse {
	id: string | null
	text: string
	value: boolean

	constructor(params: Params) {
		this.id = params.id
		this.text = params.text
		this.value = params.value
	}
}

export { AlternativeResponse }