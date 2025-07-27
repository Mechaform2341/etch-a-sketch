let currentMode = 'black';
let currentColor = '#000000';

const container = document.querySelector('.flex-grid-container');
const gridSizeSlider = document.querySelector('#gridSize');
const sizeValue = document.querySelector('#sizeValue');
const sizeValue2 = document.querySelector('#sizeValue2');

const blackBtn = document.querySelector('#blackBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const shadeBtn = document.querySelector('#shadeBtn');
const colorPicker = document.querySelector('#colorPicker');
const clearBtn = document.querySelector('#clearBtn');

function getRandomColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function shadeColor(color){
    let rgb = color.match(/\d+/g);
    if(!rgb) return 'rgb(0, 0, 0)';
    let [r, g, b] = rgb.map(Number);
    r = Math.max(0, r - 25);
    g = Math.max(0, r - 25);
    b = Math.max(0, r - 25);
    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size){
    container.innerHTML = '';
    const cellSize = 480 / size;

    for(let i = 0; i < size * size; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;

        cell.addEventListener('mouseover', () => {
            if(currentMode === 'black'){
                cell.style.backgroundColor = '#000';
            }
            else if(currentMode === 'rainbow'){
                cell.style.backgroundColor = getRandomColor();
            }
            else if(currentMode === 'shade'){
                const current = getComputedStyle(cell).backgroundColor;
                cell.style.backgroundColor = shadeColor(current);
            }
            else if(currentMode === 'color'){
                cell.style.backgroundColor = currentColor;
            }
        });
        container.appendChild(cell);
    }
}

gridSizeSlider.addEventListener('input', () => {
    const size = gridSizeSlider.value;
    sizeValue.textContent = size;
    sizeValue2.textContent = size;
    createGrid(size);
});

clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
});

blackBtn.addEventListener('click', () => currentMode = 'black');
rainbowBtn.addEventListener('click', () => currentMode = 'rainbow');
shadeBtn.addEventListener('click', () => currentMode = 'shade');
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    currentMode = 'color';
});

createGrid(gridSizeSlider.value);