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

// Handle user input and communicate with the Python chatbot script
app.post('/chat', (req, res) => {
  const userMessage = req.body.message; // Get the user's message from the request
  const pythonProcess = spawn('python3', ['wiki.py']);

  pythonProcess.on('error', (err) => {
    console.error('Error starting Python process:', err);
    // Handle the error gracefully, e.g., by sending an error response to the client
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
