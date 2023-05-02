function sortNumbers() {
const inputStr = document.getElementById("inputNumbers").value;
const numbers = inputStr.split(",").map(num => parseInt(num));

// find mistakes
const regex = /^[0-9,]+$/;
if (!/^[0-9, ]+$/.test(inputStr)) {
  swal({
    title: "ERROR!",
    text: "Wpisano niepoprawny znak!",
    icon: "error",
  });
  return;
}

// obliczenie czasu wykonania operacji
const start = Date.now(); 

// wykonanie algorytmu
heapSort(numbers);
document.getElementById("outputNumbers").textContent = numbers.join(", ");

const end = Date.now(); 

const timeInMs = end - start;
const minutes = Math.floor(timeInMs / 60000);
const seconds = Math.floor((timeInMs % 60000) / 1000);
const milliseconds = timeInMs % 1000; 

alert(`Czas wykonania operacji: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}
        \nKliknij 'OK', aby zobaczyć wynik`);
}

// algorytm sortowania 
function heapSort(arr) {
buildMaxHeap(arr);
for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapify(arr, 0, i);
    displaySort(arr, i - 1);
}
displaySort(arr, -1);
}

function buildMaxHeap(arr) {
const n = arr.length;
for (let i = Math.floor(n / 2); i >= 0; i--) {
    heapify(arr, i, n);
}
}

function heapify(arr, i, n) {
const left = 2 * i + 1;
const right = 2 * i + 2;
let largest = i;

if (left < n && arr[left] > arr[largest]) {
    largest = left;
}

if (right < n && arr[right] > arr[largest]) {
    largest = right;
}

if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, largest, n);
}
}

function swap(arr, i, j) {
const temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
}

// wizualizacja wyniku
function displaySort(arr, index) {
const outputNumbers = document.getElementById("outputNumbers");
outputNumbers.innerHTML = arr.map((num, i) => {
    if (i > index) {
    return `<span class="sorted">${num}</span>`;
    } else {
    return num;
    }
}).join(", ");
}
