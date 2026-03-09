// تحميل بيانات JSON وعرض البطاقات
let recipesData = [];

async function loadRecipes() {
    try {
        const response = await fetch('../data/algerien.json'); // تأكد من المسار الصحيح
        recipesData = await response.json();
        renderCards('all');
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        // يمكن عرض رسالة للمستخدم
    }
}

function renderCards(filter) {
    const container = document.getElementById('algerien-cards');
    container.innerHTML = ''; // تفريغ الحاوية

    const filtered = filter === 'all' ? recipesData : recipesData.filter(r => r.category === filter);

    filtered.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = recipe.id;
        card.dataset.category = recipe.category;

        card.innerHTML = `
<div class="card-image">
    <img src="${recipe.image}" alt="${recipe.title}">
    <span class="card-badge algerien-${recipe.category}">${recipe.badge}</span>
</div>
<div class="card-content">
    <h3>${recipe.title}</h3>
    <p class="ingredients">مقادير: ${recipe.ingredients.join('، ')}</p>
    <div class="card-footer">
        <span class="date"><i class="far fa-calendar-alt"></i> ${recipe.date}</span>
        <span class="author">نشر: ${recipe.author}</span>
    </div>
</div>
`;

        // إضافة حدث النقر لفتح النافذة المنبثقة
        card.addEventListener('click', () => showModal(recipe));
        container.appendChild(card);
    });
}

function showModal(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalBody = modal.querySelector('.modal-body');
    const videoHtml = recipe.video ? `
<div class="video-container">
<iframe width="100%" height="280" src="${recipe.video}" frameborder="0" allowfullscreen></iframe>
</div>
` : '';

modalBody.innerHTML = `
<div class="recipe-modal">

    <h2 class="recipe-title">${recipe.title}</h2>

    <div class="recipe-image">
        <img src="${recipe.image}" alt="${recipe.title}">
    </div>

    <div class="recipe-meta">
        <span><i class="far fa-calendar"></i> ${recipe.date}</span>
        <span><i class="fas fa-user"></i> ${recipe.author}</span>
    </div>

    <div class="recipe-description">
        <h3>الوصف</h3>
        <p>${recipe.description}</p>
    </div>

    <div class="recipe-ingredients">
        <h3>المقادير</h3>
        <p>${recipe.ingredients}</p>
    </div>

    <div class="recipe-method">
        <h3>طريقة التحضير</h3>
        <p>${recipe.method}</p>
    </div>

    ${recipe.video ? `
    <div class="recipe-video">
        <iframe src="${recipe.video}" allowfullscreen></iframe>
    </div>
    ` : ''}

    <div class="recipe-author">
        <h3>معلومات الناشر</h3>
        <p>الناشر: ${recipe.author}</p>
        <a href="${recipe.authorLink}" target="_blank" class="contact-btn">
            <i class="fas fa-link"></i> رابط التواصل
        </a>
    </div>

</div>
`;

    modal.style.display = 'block';
}

// إغلاق النافذة المنبثقة
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('recipeModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// أزرار التصفية
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCards(btn.dataset.filter);
    });
});

// بدء التحميل  
loadRecipes();