const mods = [
    {
        id: 1,
        title: "Реалистичный свет фар",
        author: "FinnishDev",
        category: "graphics",
        image: "https://via.placeholder.com/400x250/1a1a2e/ffffff?text=Фары",
        downloads: 1240,
        rating: 4.8,
        description: "Мод заменяет стандартные желтые фары на яркий ксенон с эффектом линз. Теперь ездить темными зимними ночами гораздо приятнее.",
        fileUrl: "mods/realistic_lights.zip"
    },
    {
        id: 2,
        title: "Двигатель от ГАЗ-24",
        author: "SovietSwap",
        category: "cars",
        image: "https://via.placeholder.com/400x250/0f3460/ffffff?text=Двигатель",
        downloads: 3500,
        rating: 4.9,
        description: "Свап двигателя на легендарный советский ЗМЗ. Больше мощности, больше дыма из выхлопной трубы.",
        fileUrl: "mods/gaz24_engine.zip"
    },
    {
        id: 3,
        title: "Снег на зеркалах",
        author: "WeatherMan",
        category: "graphics",
        image: "https://via.placeholder.com/400x250/16213e/ffffff?text=Зеркала",
        downloads: 890,
        rating: 4.5,
        description: "Динамическое накопление снега на зеркалах заднего вида в зависимости от времени поездки.",
        fileUrl: "mods/mirror_snow.zip"
    },
    {
        id: 4,
        title: "Радио 'Голос Финляндии'",
        author: "RadioFin",
        category: "utility",
        image: "https://via.placeholder.com/400x250/0f3460/ffffff?text=Радио",
        downloads: 2100,
        rating: 4.7,
        description: "Добавляет в салон магнитолу с настоящими финскими хитами 80-х и 90-х годов.",
        fileUrl: "mods/finnish_radio.zip"
    }
];

const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const statusElem = document.getElementById('status');
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');

let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'new';

function renderCards() {
    statusElem.textContent = 'Загрузка модов...';
    statusElem.style.display = 'block';
    
    setTimeout(() => {
        let filtered = mods.filter(mod => {
            const matchesSearch = mod.title.toLowerCase().includes(currentSearch) || 
            mod.author.toLowerCase().includes(currentSearch);
            const matchesCategory = currentFilter === 'all' || mod.category === currentFilter;
            return matchesSearch && matchesCategory;
        });

        filtered.sort((a, b) => {
            if (currentSort === 'new') return b.id - a.id;
            if (currentSort === 'old') return a.id - b.id;
            if (currentSort === 'rating') return b.rating - a.rating;
            return 0;
        });

        if (filtered.length === 0) {
            cardsContainer.innerHTML = '<p class="status">Модов не найдено.</p>';
            return;
        }

        cardsContainer.innerHTML = filtered.map(mod => `
            <div class="card" data-id="${mod.id}">
                <img alt="${mod.title}" class="card-thumb" id="01a1aaef-c3c6-76c3-b360-03fff7f6718e">
                <div class="card-body">
                    <h3 class="card-title">${mod.title}</h3>
                    <p class="card-meta">
                        <span>${mod.author}</span>
                        <span>⭐ ${mod.rating}</span>
                    </p>
                    <p class="card-meta">
                        <span>📥 ${formatNumber(mod.downloads)}</span>
                        <span>${getCategoryName(mod.category)}</span>
                    </p>
                    <button class="btn btn-download" onclick="openModal(${mod.id})">Подробнее</button>
                </div>
            </div>
        `).join('');
        statusElem.style.display = 'none';
    }, 300);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.', ',') + 'K';
    }
    return num.toString();
}

function getCategoryName(cat) {
    const names = { cars: 'Транспорт', graphics: 'Графика', utility: 'Утилиты' };
    return names[cat] || 'Разное';
}

function openModal(id) {
    const mod = mods.find(m => m.id === id);
    if (!mod) return;

    document.getElementById('modalTitle').textContent = mod.title;
    document.getElementById('modalAuthor').textContent = `Автор: ${mod.author}`;
    document.getElementById('modalDescription').textContent = mod.description;
    document.getElementById('modalImage').src = mod.image;
    document.getElementById('modalDownloads').textContent = `Скачиваний: ${formatNumber(mod.downloads)}`;
    document.getElementById('modalRating').textContent = `Рейтинг: ${mod.rating}`;
    document.getElementById('downloadBtn').href = mod.fileUrl;

    simulateDownload(id);

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function simulateDownload(id) {
    console.log(`Запрос на сервер: скачивание мода ID ${id}`);
    const mod = mods.find(m => m.id === id);
    if (mod) mod.downloads++;
    document.getElementById('modalDownloads').textContent = `Скачиваний: ${formatNumber(mod.downloads)}`;
}

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
});
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    renderCards();
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderCards();
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tab-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentFilter = btn.dataset.tab;
        renderCards();
    });
});

renderCards();