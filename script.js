const parts = {
    1: "Шайба с 1 соединительной клеммой",
    2: "Провод с 2 соединительными клеммами",
    3: "Провод с 3 соединительными клеммами",
    4: "Провод с 4 соединительными клеммами",
    5: "Провод с 5 соединительными клеммами",
    6: "Провод с 6 соединительными клеммами",
    7: "Провод с 7 соединительными клеммами",
    11: "Пьезоизлучатель",
    12: "Сенсорная пластина",
    13: "Геркон",
    14: "Кнопка",
    15: "Выключатель",
    16: "Фоторезистор",
    17: "Красный светодиод",
    18: "Лампа 2.5V",
    19: "Батареи",
    20: "Динамик",
    21: "Музыкальная интегральная схема",
    22: "Сигнальная интегральная схема",
    23: "Интегральная схема «Звёздные войны»",
    24: "Электродвигатель",
    25: "Катушка индуктивности",
    26: "Зелёный светодиод",
    27: "Лампа 6V",
    28: "Микрофон",
    29: "Усилитель мощности",
    30: "Резистор 100 Ом",
    31: "Резистор 1 кОм",
    32: "Резистор 5.1 кОм",
    33: "Резистор 10 кОм",
    34: "Резистор 100 кОм",
    40: "Конденсатор 0.02 мкФ",
    41: "Конденсатор 0.1 мкФ",
    42: "Конденсатор электролитический 10 мкФ",
    43: "Конденсатор электролитический 100 мкФ",
    44: "Конденсатор электролитический 470 мкФ",
    50: "Усилитель высокой частоты",
    51: "PNP-транзистор",
    52: "NPN-транзистор",
    53: "Переменный резистор",
    54: "Переменный конденсатор",
    55: "Высокочастотная интегральная схема FM-диапазона",
    56: "Гальванометр",
    57: "Диод",
    58: "Семисегментный индикатор",
    59: "Тиристор",
    62: "Интегральная схема цифровой записи"
};

const categories = {
    "Все": null,
    "Провода": [1, 2, 3, 4, 5, 6, 7],
    "Переключатели": [13, 14, 15],
    "Резисторы": [16, 30, 31, 32, 33, 34, 53],
    "Конденсаторы": [40, 41, 42, 43, 44, 54],
    "Светодиоды и лампы": [17, 18, 26, 27, 58],
    "Микросхемы": [21, 22, 23, 29, 50, 55, 62],
    "Транзисторы": [51, 52, 59],
    "Прочее": [11, 12, 19, 20, 24, 25, 28, 56, 57]
};
let activeCategory = "Все";

const works = [
    { id: 1, title: "Источники питания. Батарейки и аккумуляторы", pages: [11, 12, 13, 14, 15, 16] },
    { id: 2, title: "Переключатели", pages: [17, 18, 19] },
    { id: 3, title: "Источники света. Лампочки и светодиоды", pages: [20, 21, 22, 23, 24] },
    { id: 4, title: "Электродвигатель и электрогенератор", pages: [25, 26, 27, 28] },
    { id: 5, title: "Резисторы и реостаты", pages: [29, 30, 31, 32] },
    { id: 6, title: "Последовательное и параллельное соединение", pages: [33, 34, 35] },
    { id: 7, title: "Проводники и диэлектрики", pages: [36, 37] },
    { id: 8, title: "Катушка индуктивности", pages: [38, 39] },
    { id: 9, title: "Электроизмерительные приборы", pages: [40, 41, 42, 43] },
    { id: 10, title: "Громкоговорители", pages: [44, 45] },
    { id: 11, title: "Микрофон", pages: [46, 47] },
    { id: 12, title: "Конденсаторы", pages: [48, 49, 50, 51] },
    { id: 13, title: "Диод", pages: [52, 53] },
    { id: 14, title: "Биполярные транзисторы", pages: [54, 55, 56] },
    { id: 15, title: "Тиристор", pages: [57] },
    { id: 16, title: "Радиоприемники", pages: [58, 59, 60] },
    { id: 17, title: "Фоторезистор", pages: [61, 62, 63, 64] },
    { id: 18, title: "Интегральные микросхемы", pages: [65, 66] },
    { id: 19, title: "Семисегментный светодиодный индикатор", pages: [67, 68] },
    { id: 20, title: "Логические элементы", pages: [69, 70] },
    { id: 21, title: "Цифровой диктофон", pages: [71, 72, 73] }
];

// --- Tab navigation ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab + '-section').classList.add('active');
    });
});

// --- Category filters ---
function renderCategories() {
    const container = document.getElementById('categoryFilters');
    Object.keys(categories).forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'cat-btn' + (cat === activeCategory ? ' active' : '');
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            activeCategory = cat;
            container.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('partSearch').value = '';
            document.getElementById('partResult').innerHTML = '';
            document.getElementById('partsGrid').style.display = '';
            renderPartsGrid();
        });
        container.appendChild(btn);
    });
}
renderCategories();

// --- Parts grid ---
function renderPartsGrid(filter) {
    const grid = document.getElementById('partsGrid');
    grid.innerHTML = '';
    const codes = Object.keys(parts).map(Number).sort((a, b) => a - b);
    codes.forEach(code => {
        if (activeCategory !== "Все" && !categories[activeCategory].includes(code)) return;
        if (filter && !String(code).includes(filter) &&
            !parts[code].toLowerCase().includes(filter.toLowerCase())) return;
        const card = document.createElement('div');
        card.className = 'part-card';
        card.innerHTML = `<img src="parts/part_${code}.png" alt="${parts[code]}" loading="lazy">
            <div class="part-code">№${code}</div>
            <div class="part-name">${parts[code]}</div>`;
        card.addEventListener('click', () => showPartModal(code));
        grid.appendChild(card);
    });
}
renderPartsGrid();

// --- Part search ---
document.getElementById('partSearch').addEventListener('input', function() {
    const val = this.value.trim();
    const result = document.getElementById('partResult');
    if (val && parts[val]) {
        result.innerHTML = `<div class="part-detail">
            <img src="parts/part_${val}.png" alt="${parts[val]}">
            <h3>№${val} — ${parts[val]}</h3></div>`;
        document.getElementById('partsGrid').style.display = 'none';
    } else {
        result.innerHTML = '';
        document.getElementById('partsGrid').style.display = '';
        renderPartsGrid(val);
    }
});

// --- Works list ---
function renderWorksList(filter) {
    const list = document.getElementById('worksList');
    list.innerHTML = '';
    works.forEach(w => {
        const match = !filter ||
            w.title.toLowerCase().includes(filter.toLowerCase()) ||
            String(w.id).includes(filter);
        const li = document.createElement('li');
        if (!match) li.classList.add('hidden-work');
        li.innerHTML = `<a href="#"><span class="work-number">№${w.id}</span>${w.title}</a>`;
        li.querySelector('a').addEventListener('click', e => {
            e.preventDefault();
            openWorkModal(w);
        });
        list.appendChild(li);
    });
}
renderWorksList();

document.getElementById('workSearch').addEventListener('input', function() {
    renderWorksList(this.value.trim());
});

// --- Modal with navigation ---
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
let currentWorkIndex = -1;

function showPartModal(code) {
    currentWorkIndex = -1;
    modalBody.innerHTML = `<h2>№${code} — ${parts[code]}</h2>
        <img src="parts/part_${code}.png" alt="${parts[code]}">`;
    modal.classList.remove('hidden');
}

function openWorkModal(work) {
    currentWorkIndex = works.findIndex(w => w.id === work.id);
    renderWorkContent(work);
    modal.classList.remove('hidden');
    modalBody.parentElement.scrollTop = 0;
}

function renderWorkContent(work) {
    let html = `<h2>Занятие №${work.id}: ${work.title}</h2>`;
    work.pages.forEach(p => {
        html += `<img src="pages/page_${p}.png" alt="Стр. ${p}" loading="lazy">`;
    });
    html += `<div class="modal-nav">`;
    if (currentWorkIndex > 0)
        html += `<button id="prevWork">Предыдущая</button>`;
    else html += `<span></span>`;
    if (currentWorkIndex < works.length - 1)
        html += `<button id="nextWork">Следующая</button>`;
    else html += `<span></span>`;
    html += `</div>`;
    modalBody.innerHTML = html;
    const prev = document.getElementById('prevWork');
    const next = document.getElementById('nextWork');
    if (prev) prev.addEventListener('click', () => {
        currentWorkIndex--;
        renderWorkContent(works[currentWorkIndex]);
        modalBody.parentElement.scrollTop = 0;
    });
    if (next) next.addEventListener('click', () => {
        currentWorkIndex++;
        renderWorkContent(works[currentWorkIndex]);
        modalBody.parentElement.scrollTop = 0;
    });
}

document.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.add('hidden');
});
document.querySelector('.modal-overlay').addEventListener('click', () => {
    modal.classList.add('hidden');
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.add('hidden');
});