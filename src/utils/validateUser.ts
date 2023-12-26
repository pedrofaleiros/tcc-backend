import { UserDTO } from "../models/dtos/UserDTO";

export function validateUser(user: UserDTO) {
	if (!validateUsername(user.username)) throw new Error('Username invalido')
	if (!validatePassword(user.password)) throw new Error('Senha invalida')
	if (!validateFullName(user.fullname)) throw new Error('Nome invalido')
	if (!validateEmail(user.email)) throw new Error('Email invalido')
}

function validateUsername(name: string): boolean {
	if (name.length > 30 || name.length < 3) {
		return false;
	}
	if (!/^[a-zA-Z0-9]+$/.test(name)) {
		return false;
	}
	return true;
}

function validatePassword(password: string): boolean {
	if (password.length < 8) {
		return false;
	}
	if (!/\d/.test(password)) {
		return false;
	}
	if (!/[a-zA-Z]/.test(password)) {
		return false;
	}
	const specialCharacters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	if (!specialCharacters.test(password)) {
		return false;
	}
	if (/\s/.test(password)) {
		return false;
	}
	return true;
}

function validateFullName(fullName: string): boolean {
	// Verifica se o nome completo contém apenas letras e espaços
	const validName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/.test(fullName);

	// Verifica se o nome completo tem pelo menos dois nomes (nome e sobrenome)
	const hasAtLeastTwoNames = fullName.trim().split(' ').length >= 2;

	return validName && hasAtLeastTwoNames;
}

function validateEmail(email: string): boolean {
	// Expressão regular para validar o e-mail
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	return emailRegex.test(email);
}
