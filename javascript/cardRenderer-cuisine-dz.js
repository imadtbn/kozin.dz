const container = document.getElementById("recipesContainer");

fetch("../data recipes/recipes-cuisine.json")
.then(res => res.json())
.then(data => {

data.recipes
.filter(r => r.category.includes("algerian"))
.forEach(recipe => {

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<div class="card-image">
    <img src="${recipe.image}" alt="${recipe.title}">
    <span class="card-badge">${recipe.badge}</span>
</div>

<div class="card-content">
    <h3>${recipe.title}</h3>
    <p class="ingredients">${recipe.ingredients}</p>

    <div class="card-footer">
        <span>${recipe.author}</span>
        <button class="view-btn">عرض الوصفة</button>
    </div>
</div>
`;

card.querySelector(".view-btn").onclick = () => openRecipe(recipe);

container.appendChild(card);

});

});


const modal = document.getElementById("recipeModal");

function openRecipe(recipe){

document.getElementById("modalImage").src = recipe.image;
document.getElementById("modalTitle").innerText = recipe.title;
document.getElementById("modalIngredients").innerText = recipe.ingredients;
document.getElementById("modalSteps").innerText = recipe.steps;
document.getElementById("modalAuthor").innerText = "الوصفة من: " + recipe.author;

let social = "";

if(recipe.social?.facebook)
social += `<a href="${recipe.social.facebook}" target="_blank"><i class="fab fa-facebook"></i></a>`;

if(recipe.social?.tiktok)
social += `<a href="${recipe.social.tiktok}" target="_blank"><i class="fab fa-tiktok"></i></a>`;

document.getElementById("modalSocial").innerHTML = social;

modal.style.display = "flex";
}

document.querySelector(".close-modal").onclick = () =>{
modal.style.display = "none";
}

window.onclick = (e)=>{
if(e.target == modal) modal.style.display="none";
}