# General Overview
OpenAI GPT capabilities were explored through builds of a recipe generator and chatbot. 

## Use Cases
### Recipe Helper
The webpage generates unique and specific recipes based on the users input. After the user inputs the type of dish that they'd like to create, an enthusiastic message is generated using a few-shot approach in response to the users query as the full recipe and cooking instructions are loading. Once the recipe is generated it includes an ingredients list along with directions on how to prepare and cook the dish. A few-shot approach was utilized to generate a new recipe based on specific example inputs to provide the GPT model with a specific "voice" in it's responses.

Terraform was used to spin up an AWS EC2 instance to create build a functioning webpage that's accessible through an external IP address.

### Chatbot
Chatbot webpage build was initiated to allow the user to ask general questions to the GPT model.

## Next Steps
- Continue troubleshooting process to connect local web app to AWS EC2 instance using JS build.
- Build out a functioning chatbot that successfully processes user requests.  


#### Build attempt
1. Upon downloading the repo, proceed with a quick start workflow using the following script in your terminal.
   - npm install
   - npm start
