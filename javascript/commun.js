// ========== وظيفة البحث المباشر ==========
document.getElementById('search-input').addEventListener('input', function(e) {
    const query = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h3')? .textContent.toLowerCase() || '';
        const ingredients = card.querySelector('.ingredients') ? .textContent.toLowerCase() || '';
        const author = card.querySelector('.author') ? .textContent.toLowerCase() || '';
        const badge = card.querySelector('.card-badge') ? .textContent.toLowerCase() || '';
        const description = card.querySelector('.description') ? .textContent.toLowerCase() || '';

        const allText = `${title} ${ingredients} ${author} ${badge} ${description}`;

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
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // إغلاق القائمة عند النقر على أي رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = burger.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// ========== فلترة البطاقات ==========
const filterButtons = document.querySelectorAll('.filter-btn');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.dataset.filter;
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = card.dataset.category === filterValue ? 'block' : 'none';
                }
            });
        });
    });

}
