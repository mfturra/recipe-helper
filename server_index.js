// Import dotenv module and load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express app
const app = express();
const port = 5000;

// Serve static files from a public directory
app.use(express.static('public'));

// Add middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post('/process-user-input', async (req, res) => {
  const userInput = req.body.setupTextarea;

  if (userInput) {
    // Simulate loading and processing
    console.log('Simulating loading...');
    console.log('Processing user input:'. userInput);

    // Simulate fetching bot reply and directions
    const botReply = await fetchBotReply(userInput);
    const directions = await fetchDirections(userInput);
    const ingredients = await fetchIngredients(userInput);

    // Send JSON response with results
    res.json({ botReply, directions, ingredients });
  } else {
    res.status(400).json({ error: 'Invalid input' });
  }
})

// Setup configuration to OpenAI account using API key
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

// Establish an OpenAI instance (i.e. connection)
const openai = new OpenAIApi(configuration)

// Configure the model & response, while outputting response to console
async function fetchBotReply(overview) {
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `Generate a short message to enthusiastically say "${overview}" sounds delicious and you need a moment
    to process the request.`,
    max_tokens: 60
  })
  shoppingCartText.innerText = response.data.choices[0].text.trim()
  console.log(response);
  return 'Simulated bot reply: ' + overview;
}

// Generate cooking directions using these prompt examples
async function fetchDirections(overview) {
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `Generate a professional native chef's cooking directions based on the user's protein :${overview},
    
    ###
    overview: Easy one pan Spanish chicken and rice is made with simple seasoning that come together with zesty, bold 
    flavors in this one pot, 30 minute meal. 
    ingredients:
      - 4 boneless skinless chicken breasts - OR 6 chicken thighs
      - 3 tablespoons vegetable or canola oil
      - 1 cup uncooked white rice
      - 2 ¼ cups low sodium chicken broth
      - 1 lemon
      - chopped cilantro or parsley - for garnish

      Seasoning for the chicken
      - 2 teaspoons smoked paprika
      - 1 teaspoon garlic powder
      - 1 teaspoon salt
      - 1 teaspoons ground cumin
      - 1 teaspoon chili powder
      - 1 teaspoon coriander - (see note)
      - 0.25 teaspoon Italian seasoning
    
    directions:
    In a small bowl whisk together all ingredients for the Spanish seasoning mix. Divide in half and set aside. Cut the 
    lemon in half, then thinly slice one half - for garnish - and reserve the other half for juicing later in the recipe.
    Place chicken in a medium bowl. Drizzle with 2 tablespoons oil, then toss to coat well. Use half of the prepared seasoning 
    mix to rub on both sides of each piece of chicken. Drizzle a large skillet with remaining 1 tablespoon of oil and bring 
    to medium heat. Cook chicken for 2-3 minutes on each side until browned. Transfer to a plate. (It won't be cooked through at this point)
    Add rice, chicken broth, juice from 1/2 of the lemon, and remaining seasoning mix and stir to combine. Return chicken to the pan on 
    top of the rice. Cover and cook for 20-25 minutes until liquid is absorbed, rice is tender, and chicken is cooked through. Garnish with
    lemon slices and freshly chopped cilantro or parsley and serve immediately.

    ###
    overview: No-fail roasted leg of lamb recipe, with a special Mediterranean seasoning, will give you the BEST lamb roast every single time.
    ingredients:
      - 4-to-5-pound leg of lamb bone-in, fat trimmed. Make sure a little fat remains, as this helps the meat remain juicy
      - Extra virgin olive oil.
      - Garlic cloves, peeled and sliced. To stick directly into small cuts made in the lamb meat.
      - Gold potatoes and a yellow onion, peeled and cut into wedges (optional)

      Seasoning for Mediterranean Lamb
      - Whole garlic cloves, peeled
      - Dried oregano
      - Dried mint flakes
      - Paprika
      - Ground nutmeg
      - Extra virgin olive oil
      - Fresh lemon juice

    directions: Take lamb out of the fridge. Be sure to take the lamb out of the fridge about 1 hour before cooking to get it closer to room 
    temperature. This will help it reach a higher temperature faster in the oven, reducing cooking time and ensuring more juicy meat. 
    Prepare the seasoning or rub. This rub is best prepared in a food processor. Combine 15 peeled garlic cloves, 2 tablespoons dried oregano, 
    2 tablespoons dried mint flakes, 1 tablespoon paprika, ½ tablespoon nutmeg, ½ cup olive oil and the juice of 2 lemons. Run the processor 
    until the rub is smooth. Set aside for now. Salt and broil the lamb leg. Season the meat generously with kosher salt and black pepper. 
    Place the lamb on a wire rack and place it on the top rack of the oven, under the broiler. Broil in the oven for 5 to 7 minutes on each 
    side until it gets some color. It helps to rotate the lamb while it is under the broiler so it gains color evenly. Season the lamb. 
    Remove the lamb from the oven and allow it to cool enough to handle. Peel and slice 5 garlic cloves. The slices should be quite large, 
    even just halving each clove lengthwise would work. the wire rack with the lamb leg into a deep roasting pan and pour 2 cups of water 
    into the bottom of the roasting pan. Make slits all over the meat and insert a slice of garlic into each one.Apply the wet rub to the 
    lamb (make sure it is covered on all sides). Ensure the lamb is in the middle of the wire rack.
    Season the potatoes. After peeling and cutting 8 gold potatoes and 1 yellow onion into wedges, add them to a bowl and season with 1 
    teaspoon paprika, 1 teaspoon garlic powder, and some kosher salt. Arrange the potatoes and onions in the roasting pan around the lamb. 
    If you're going for slow-roasted lamb, don't add the potatoes to the pan yet). Roast (two options): For medium lamb (pink on the 
    inside, cover the roasting pan with the meat and potatoes with foil so make sure it's tented over so it doesn't touch the lamb. 
    Roast on the middle rack of a 325 degrees F-heated oven for 1 hour. Then remove the foil and roast for a little longer until you 
    reach slightly less than your desired doneness. Be sure to check internal temperature with a meat thermometer to prevent over or undercooking. 
    For slow-roasted lamb (fall-apart meat), leave the potatoes out for now. Tent a large piece of foil over the roasting pan so make sure it 
    does not touch the lamb then place the pan on the middle rack of the 325 degrees F heated-oven. Roast covered for about 4 to 4 ½ hours. Add 
    the potatoes and onions and return the pan to the oven, covered, for 1 to 1 ½ hours or so. Remove the foil and return the pan to the oven for 
    another 15 to 20 minutes.
    
    ###
    overview: ${overview}
    ingredients:

    directions:
    `,
    max_tokens: 450
  })
  const ingredients = response.data.choices[0].text.trim()
  console.log('Fetching directions...');
  return 'Simulated cooking directions: ' + overview;
  // document.getElementById('output-text').innerText = ingredients
  // fetchIngredients(ingredients)
}

// Generate ingredient list
async function fetchIngredients(ingredients) {
  const response = await openai.createCompletion({
    model:  'text-davinci-002',
    prompt: `Generate a detailed professional native chef's list of ingredients in bullet points before directions that the user would need to season their protein :${ingredients}`,
    max_tokens: 100
  })

  setupInputContainer.innerHTML = `<button id="view-result-btn" class="view-result-btn">View Results</button>`
  console.log('Fetching ingredients list...');
  return 'Simulated ingredients list: ' + overview;
  // document.getElementById('view-result-btn').addEventListener('click', ()=>{
  //   document.getElementById('setup-container').style.display = 'none'
  //   document.getElementById('output-container').style.display = 'flex'
}

app.listen(port, () => {
  console.log('Server is listening on post ${port}');
})