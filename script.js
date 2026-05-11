// тындекс метрика для счётчика
function updateCounter() {
    const counterElement = document.getElementById('totalCounter');
    if (!counterElement) return;

    let totalViews = localStorage.getItem('total_site_visits');
    if (!totalViews) {
        totalViews = 0;
    }

    let isSessionCounted = sessionStorage.getItem('session_active');

    if (!isSessionCounted) {
        totalViews = parseInt(totalViews) + 1;
        localStorage.setItem('total_site_visits', totalViews);
        sessionStorage.setItem('session_active', 'true');
    }

    counterElement.innerText = totalViews;

    // запрашиваем живую цифру у тындекса
    const counterId = 109151123;
    window.addEventListener('load', () => {
        try {
            if (typeof ym !== 'undefined') {
                ym(counterId, 'get', 'pageviews', function(viewsCount) {
                    if (typeof viewsCount !== 'undefined') {
                        counterElement.innerText = viewsCount;
                    }
                });
            }
        } catch (e) {
            console.error("Ошибка Метрики:", e);
        }
    });
}


// Логика навигационной стрелки
function handleScrollUp() {
    const btn = document.getElementById("scrollUp");
    if (!btn) return;

    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

// Запуск функций при загрузке страницы
window.onload = function() {
    updateCounter();
};

// Запуск при скролле
window.onscroll = function() {
    handleScrollUp();
};

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('showJsonBtn');
    const output = document.getElementById('jsonOutput');
    const content = document.getElementById('jsonContent');

    if (btn && output) {
        btn.addEventListener('click', () => {
            // Проверяем, скрыт ли блок в данный момент
            const isHidden = output.style.display === 'none';

            if (isHidden) {
                // Если скрыт — показываем
                const userData = {
                username: "you",
                id: 1729,           
                learning: true,     
                adress: {"planet": "Earth"},
                skills: ["Math", "Sleep"],
                empty: null
                };

                content.textContent = JSON.stringify(userData, null, 4);
                output.style.display = 'block';
                btn.textContent = 'Скрыть пример JSON'; // Меняем текст на кнопке
            } else {
                // Если уже показан — скрываем
                output.style.display = 'none';
                btn.textContent = 'Показать пример JSON-объекта'; // Возвращаем исходный текст
            }
        });
    }
});

// ajax 
const factBtn = document.getElementById('loadFactBtn');
const factDisplay = document.getElementById('factDisplay');
const factText = document.getElementById('factText');

if (factBtn) {
    factBtn.addEventListener('click', () => {
        factBtn.textContent = 'Загрузка...';
        factBtn.disabled = true;

        // AJAX запрос через Fetch
        fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
            .then(response => response.json())
            .then(data => {
                factText.textContent = data.text;
                factDisplay.style.display = 'block';
                
                factBtn.textContent = 'Еще один факт';
                factBtn.disabled = false;
            })
            .catch(error => {
                factText.textContent = 'Проверьте интернет.';
                factDisplay.style.display = 'block';
                factBtn.disabled = false;
                console.error('Ошибка AJAX:', error);
            });
    });
}

// api
const loadCatBtn = document.getElementById('loadCatBtn');
const catDisplay = document.getElementById('catDisplay');
const catImage = document.getElementById('catImage');

if (loadCatBtn) {
    loadCatBtn.addEventListener('click', () => {
        loadCatBtn.textContent = 'Ищем котика...';
        loadCatBtn.disabled = true;

        // Запрос к The Cat API
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => {
                // Извлекаем URL из JSON-ответа
                const imgUrl = data[0].url;
                
                catImage.src = imgUrl;
                catDisplay.style.display = 'block';
                
                loadCatBtn.textContent = 'Еще котика!';
                loadCatBtn.disabled = false;
            })
            .catch(error => {
                console.error('Ошибка:', error);
                loadCatBtn.textContent = 'Ошибка загрузки';
                loadCatBtn.disabled = false;
            });
    });
}


