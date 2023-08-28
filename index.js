import { OpenAI } from "openai";
import { process } from './env';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

document.getElementById("submit-btn").addEventListener("click", () => {
  const recipeName = document.getElementById("name").value;
  const recipeDesc = document.getElementById("desc").value;
  const recipeTarget = document.getElementById("target").value;
  getRecipeSuggestion(recipeName, recipeDesc, recipeTarget);
})


async function getRecipeSuggestion(recipeName, recipeDesc, recipeTarget) {
  const response = await openai.completions.create({
    model: "babbage-002",
    prompt: `Use a cuisine type, a recipe description and a target prep time to create a food recipe's ingredient list.
    ###
    cuisine type: Greek Lamb Kleftiko
    cuisine description: Fall-apart-tender Greek lamb roast to feed a crowd. 
    target prep time: 20 min
    ingredients: 3.5lbs of leg of lamb, 2.5 tbsp dried oregano, 1 tbsp dried thyme, 1 tbsp dried parsley, 1 tbsp dijon 
    mustard, juice of 1 lemon, 1 tbsp red wine vinegar, 0.5 cup white wine, extra virgin olive oil to preference.
    ###
    cuisine type: Baked Cod with Lemon and Garlic
    cuisine description: Baked cod with a Mediterranean twist! Includes some spices and a mix of lemon juice, EVOO and lots of garlic.
    target prep time: 10 min
    ingredients: 1.5lbs of Cod fillets, 0.25 cup chopped fresh parsley leaves, 5 tbsp fresh lemon juice, 5 tbsp of EVOO, 2 tbsp melted butter, 
    5 garlic cloves, 0.33 cup of all purpose flour, 1 tsp ground coriander, 0.75 tsp sweet Spanish paprika, 0.75 tsp ground cumin, salt & pepper 
    to taste.
    ###
    cuisine type: ${recipeName}
    cuisine description: ${recipeDesc}
    target prep time: ${recipeTarget}
    ingredients: 
    `,
    max_tokens: 100,
  });
  document.getElementById('ad-output').insertAdjacentText('beforeend', response.data.choices[0].text.trim())
  document.getElementById('ad-input').style.display = 'none'
  document.getElementById('ad-output').style.display = 'block'
  console.log(response)
}