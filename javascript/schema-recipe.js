function createRecipeSchema(recipe) {

const schema = {
"@context": "https://schema.org",
"@type": "Recipe",
"name": recipe.title,
"image": recipe.image,
"description": recipe.description,
"author": {
"@type": "Person",
"name": recipe.author
},
"datePublished": recipe.date,
"recipeIngredient": recipe.ingredients,
"recipeInstructions": recipe.method
};

const script = document.createElement("script");
script.type = "application/ld+json";
script.textContent = JSON.stringify(schema);

document.head.appendChild(script);

}