const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

async function loadRecipe() {

const files = [
"../data/algerien.json",
"../data/salads.json",
"../data/diet.json",
"../data/traditional-desserts.json",
"../data/modern-desserts.json"
];

let recipes = [];

for (const file of files) {

const res = await fetch(file);
const data = await res.json();

recipes = recipes.concat(data);

}

const recipe = recipes.find(r => r.slug === slug);

if (!recipe) return;

renderRecipe(recipe);
createRecipeSchema(recipe);

}

function renderRecipe(recipe){

document.getElementById("title").textContent = recipe.title;

document.getElementById("image").src = recipe.image;

document.getElementById("image").alt = recipe.title;

document.getElementById("description").textContent = recipe.description;

document.getElementById("method").textContent = recipe.method;

const ul = document.getElementById("ingredients");

recipe.ingredients.forEach(i=>{
const li=document.createElement("li");
li.textContent=i;
ul.appendChild(li);
});

document.title = recipe.title + " | كوزينة DZ";

document.getElementById("meta-description").content = recipe.description;

}

function createRecipeSchema(recipe){

const schema = {
"@context":"https://schema.org",
"@type":"Recipe",
"name":recipe.title,
"image":recipe.image,
"description":recipe.description,
"author":{
"@type":"Person",
"name":recipe.author
},
"datePublished":recipe.date,
"recipeIngredient":recipe.ingredients,
"recipeInstructions":[
{
"@type":"HowToStep",
"text":recipe.method
}
]
};

const script=document.createElement("script");

script.type="application/ld+json";

script.textContent=JSON.stringify(schema);

document.head.appendChild(script);

}

loadRecipe();