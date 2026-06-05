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

const works = [
    { id: 1, title: "Источники питания. Батарейки и аккумуляторы", pages: [11, 12, 13, 14, 15, 16] },
    { id: 2, title: "Переключатели", pages: [17, 18, 19] },
    { id: 3, title: "Источники света. Лампы и светодиоды", pages: [20, 21, 22, 23, 24] },
    { id: 4, title: "Электродвигатель и генератор", pages: [25, 26, 27, 28] },
    { id: 5, title: "Резисторы и реостаты", pages: [29, 30, 31, 32] },
    { id: 6, title: "Параллельное и последовательное соединение", pages: [33, 34, 35] },
    { id: 7, title: "Проводники и диэлектрики", pages: [36, 37] },
    { id: 8, title: "Катушка индуктивности", pages: [38, 39] },
    { id: 9, title: "Электроизмерительные приборы", pages: [40, 41, 42, 43] },
    { id: 10, title: "Микрофон", pages: [44, 45] },
    { id: 11, title: "Громкоговорители", pages: [46, 47] },
    { id: 12, title: "Конденсаторы", pages: [48, 49, 50, 51] },
    { id: 13, title: "Диод", pages: [52, 53] },
    { id: 14, title: "Биполярные транзисторы", pages: [54, 55, 56] },
    { id: 15, title: "Тиристор", pages: [57, 58] },
    { id: 16, title: "Радиоприемники", pages: [59, 60] },
    { id: 17, title: "Фоторезистор", pages: [61, 62, 63] },
    { id: 18, title: "Интегральные микросхемы", pages: [64, 65, 66] },
    { id: 19, title: "Цифровая техника. Семисегментный индикатор", pages: [67, 68, 69] },
    { id: 20, title: "Цифровая техника. Логические элементы", pages: [70, 71] },
    { id: 21, title: "Цифровая техника. Диктофон", pages: [72, 73] }
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

// --- Parts grid ---
function renderPartsGrid(filter) {
    const grid = document.getElementById('partsGrid');
    grid.innerHTML = '';
    const codes = Object.keys(parts).map(Number).sort((a, b) => a - b);
    codes.forEach(code => {
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
            <h3>№${val} — ${parts[val]}</h3>
        </div>`;
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
        li.innerHTML = `<a href="#" data-work="${w.id}">
            <span class="work-number">№${w.id}</span>${w.title}
        </a>`;
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

// --- Modal ---
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');

function showPartModal(code) {
    modalBody.innerHTML = `
        <h2>№${code} — ${parts[code]}</h2>
        <img src="parts/part_${code}.png" alt="${parts[code]}">`;
    modal.classList.remove('hidden');
}

function openWorkModal(work) {
    let html = `<h2>Занятие №${work.id}: ${work.title}</h2>`;
    work.pages.forEach(p => {
        html += `<img src="pages/page_${p}.png" alt="Страница ${p}" loading="lazy">`;
    });
    modalBody.innerHTML = html;
    modal.classList.remove('hidden');
    modalBody.parentElement.scrollTop = 0;
}

document.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.add('hidden');
});

modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.add('hidden');
});