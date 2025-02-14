# General Overview
When OpenAI released ChatGPT, they made GPT tools main stream. Capturing audiences with it's ability to generate new content from what appeared to be thin air. This repository is an attempt to explore how to effectively utilize GPT models to generate new content in specific web apps. JavaScript builds for a recipe generator and chatbot were the medium to test out these new tools.

## 🗂️ Use Cases
![alt text](https://github.com/mfturra/recipe-helper/blob/main/static/imgs/recipe-helper-home.png)
## 🥘 Recipe Helper
### 🛠️ Tools
JavaScript, OpenAI, HTML, CSS

### 📋 Briefing
The webpage generates unique and specific recipes based on the users input. After the user inputs the type of dish that they'd like to create, an enthusiastic message is generated using a few-shot approach in response to the users query as the full recipe and cooking instructions are loading. Once the recipe is generated it includes an ingredients list along with directions on how to prepare and cook the dish. A few-shot approach was utilized to generate a new recipe based on specific example inputs to provide the GPT model with a specific "voice" in it's responses.

Terraform was used to spin up an AWS EC2 instance to create a functioning webpage that's accessible through an external IP address.

### 💬 Chatbot
### 🛠️ Tools
JavaScript, OpenAI, HTML, CSS

### 📋 Briefing
Chatbot webpage build was initiated to allow the user to ask general questions to the GPT model.

## Install Instructions
Upon downloading the repo, proceed with a quick start workflow using the following script in your terminal.
- `npm install`
- `npm start`
