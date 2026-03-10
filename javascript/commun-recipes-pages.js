(function() {
    // التأكد من وجود بيانات الوصفات
    if (!window.recipesData || !Array.isArray(window.recipesData)) {
        console.warn('window.recipesData غير موجودة أو ليست مصفوفة في هذه الصفحة.');
        return;
    }
    

    // ترتيب الوصفات حسب تاريخ النشر (الأحدث أولاً)
    // نتوقع أن التاريخ بصيغة YYYY-MM-DD
    window.recipesData.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
        }
        return 0;
    });

    let visibleCount = 4; // عدد البطاقات الظاهر حالياً
    const container = document.querySelector('.cards-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (!container) return;

    // دالة عرض البطاقات
    function renderCards() {
        // تطبيق الفلتر النشط
        let filteredRecipes = window.recipesData;
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter && activeFilter.dataset.filter !== 'all') {
            const filterValue = activeFilter.dataset.filter;
            filteredRecipes = window.recipesData.filter(recipe => recipe.category === filterValue);
        }

        // عرض فقط visibleCount بطاقة
        const recipesToShow = filteredRecipes.slice(0, visibleCount);

        container.innerHTML = '';
        recipesToShow.forEach(recipe => {
            if (typeof window.createRecipeCard === 'function') {
                container.innerHTML += window.createRecipeCard(recipe);
            } else {
                console.error('دالة createRecipeCard غير معرفة');
            }
        });

        // إخفاء زر المزيد إذا انتهت البطاقات
        if (loadMoreBtn) {
            if (visibleCount >= filteredRecipes.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex'; // أو حسب تصميمك
            }
        }
    }

    // مستمع لزر المزيد
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 4;
            renderCards();
        });
    }

    // مستمع لأزرار الفلترة
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            visibleCount = 4; // إعادة التعيين إلى 4
            renderCards();
        });
    });

    // العرض الأولي
    renderCards();
})();