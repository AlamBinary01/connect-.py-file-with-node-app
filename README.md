# connect-.py-file-with-node-app
Node. js can run python script by using the standard child_process module. If we use the exec() function, our command will run and its output will be available to us in a callback. If we use the spawn() module, its output will be available via event listeners.
## code (index.js)
``` js
const express = require('express');
const bodyParser = require('body-parser'); // Add bodyParser to parse the request body
const app = express();
const { spawn } = require('child_process');

// Use bodyParser middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post('/chat', (req, res) => {
  const userMessage = req.body.message; 
  const pythonProcess = spawn('python3', ['your_file_name.py']);

  pythonProcess.on('error', (err) => {
    console.error('Error starting Python process:', err);
  });
  
  let chatbotResponse = ''; 

  pythonProcess.stdout.on('data', (data) => {
    chatbotResponse += data.toString();
  });

  pythonProcess.stdout.on('end', () => {
    res.send(chatbotResponse);
  });

  pythonProcess.stdin.write(userMessage + '\n');
  pythonProcess.stdin.end();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
## HTML File
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chatbot</title>
</head>
<body>
  <h1>Chat with the Chatbot</h1>
  <div id="chat-window">
    <div id="response"></div>
    <form id="chat-form">
      <input type="text" id="user-input" placeholder="Type your message">
      <button type="submit">Send</button>
    </form>
  </div>

  <script>
    const form = document.getElementById('chat-form');
    const responseDiv = document.getElementById('response');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userInput = document.getElementById('user-input').value.trim();

      if (userInput.toLowerCase() === 'exit') {
        responseDiv.innerHTML += "<p>ChatBot: Goodbye!</p>";
        form.style.display = 'none';  // Hide the input field and send button
        return;
      }

      responseDiv.innerHTML += "<p>You: " + userInput + "</p>";

      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.text();
      responseDiv.innerHTML += "<p>ChatBot: " + data + "</p>";
      document.getElementById('user-input').value = '';  // Clear the input field
    });
  </script>
</body>
</html>

```
## python file code

``` python
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
```
## Final Output
![image](https://github.com/AlamBinary01/connect-.py-file-with-node-app/assets/86626270/0f917796-1d39-4875-8ed1-ceb55dbfe9a0)
