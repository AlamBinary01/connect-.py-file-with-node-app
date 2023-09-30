def chatbot(question):
    question = question.lower()  # Convert the question to lowercase for case-insensitive matching

    if 'name' in question:
        return "My name is ChatBot."

    elif 'build date' in question or 'creation date' in question:
        return "I was built on September 30, 2023."

    else:
        return "I'm sorry, I don't understand that question."

if __name__ == "__main__":
    print("ChatBot: Hello! How can I help you today?")

    while True:
        user_input = input("You: ").strip()

        if user_input.lower() == 'exit':
            print("ChatBot: Goodbye!")
            break

        response = chatbot(user_input)
        print("ChatBot:", response)
