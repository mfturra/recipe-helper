// Import dotenv module and load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express app
const app = express();
const port = 5000;

// Add middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Serve static files from a public directory
app.use(express.static('public'));

// Setup configuration to OpenAI account using API key
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

// Establish an OpenAI instance (i.e. connection)
const openai = new OpenAIApi(configuration)

// GET route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/public_index.html');
});

// POST route
app.post('/generate-recipe', async(req, res) => {
  const userInput = req.body.userInput;

  // Generate output
  res.send('Generating the recipe for you...');

  if (userInput) {
    try {
      // Simulate fetching bot reply and directions
      const botReply = await fetchBotReply(userInput);
      const directions = await fetchDirections(userInput);
      const ingredients = await fetchIngredients(userInput);
    
    // Send JSON response with results
    res.json({ botReply: 'Processing complete for: ' + botReply,
                direction: directions,
                ingredients: ingredients});
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({ error: 'An error occurred while generating the recipe.' });
  }
  } else {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Configure the model & response, while outputting response to console
async function fetchBotReply(overview) {
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `Generate a short message to enthusiastically say "${overview}" sounds delicious and you need a moment
    to process the request.`,
    max_tokens: 60
  })
  // shoppingCartText.innerText = response.data.choices[0].text.trim()
  console.log(response);
  return 'Simulated bot reply: ' + overview;
};

// Generate cooking directions using these prompt examples
async function fetchDirections(overview) {
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `Generate a professional native chef's cooking directions based on the user's protein :${overview}`,
    max_tokens: 450
  })
  const overview = response.data.choices[0].text.trim()
  console.log('Fetching directions...');
  // document.getElementById('output-text').innerText = ingredients
  // fetchIngredients(ingredients)
};

// Generate ingredient list
async function fetchIngredients(ingredients) {
  const response = await openai.createCompletion({
    model:  'text-davinci-002',
    prompt: `Generate a detailed professional native chef's list of ingredients in bullet points before directions that the user would need to season their protein :${ingredients}`,
    max_tokens: 100
  })
  const ingredients = response.data.choices[0].text.trim()
  console.log('Fetching ingredients list...');
  // document.getElementById('view-result-btn').addEventListener('click', ()=>{
  //   document.getElementById('setup-container').style.display = 'none'
  //   document.getElementById('output-container').style.display = 'flex'
}

app.listen(port, () => {
  console.log('Server is listening on port: ${port}');
});