import json

def save_question_to_json(question, filename="question.json"):
    with open(filename, 'w') as file:
        json.dump(question, file, indent=4)
    print(f"Questão salva em '{filename}'.")

def format_question():
    content = input("\n\033[31m Enunciado da questão: \033[0m")
    level = int(input("\033[31m Nível da questão: \033[0m"))
    num_alternatives = int(input("\033[31m Numero de alternativas: \033[0m"))

    alternatives = []
    for i in range(num_alternatives):
        text = input(f"\n\t\033[32m Texto da alternativa {i + 1}? \033[0m")
        value = input(f"\t\033[32m Valor da alternativa {i + 1}\033[34m (true/false)? \033[0m").lower()[0] == 't'
        alternatives.append({"text": text, "value": value})

    question = {
        "content": content,
        "level": level,
        "alternatives": alternatives
    }

    save_question_to_json(question)

format_question()
