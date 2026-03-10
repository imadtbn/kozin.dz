// ========== وظيفة البحث المباشر ==========
document.getElementById('search-input').addEventListener('input', function(e) {
    const query = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h3') ? .textContent.toLowerCase() || '';
        const ingredients = card.querySelector('.ingredients') ? .textContent.toLowerCase() || '';
        const author = card.querySelector('.author') ? .textContent.toLowerCase() || '';
        const badge = card.querySelector('.card-badge') ? .textContent.toLowerCase() || '';

        // description غير موجود في البطاقات، يمكن تركه أو إزالته
        const allText = `${title} ${ingredients} ${author} ${badge}`;

        card.style.display = allText.includes(query) ? 'block' : 'none';
    });
});

// ========== قائمة البرجر للشاشات الصغيرة ==========
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = burger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // إغلاق القائمة عند النقر على أي رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = burger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// فلترة البطاقات
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // تحديث الزر النشط
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.dataset.filter;

        cards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                card.style.display = card.dataset.category === filterValue ? 'block' : 'none';
            }
        });
    });
});