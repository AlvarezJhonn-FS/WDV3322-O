// Imports your SCSS stylesheet
import './styles/index.scss';

import carData from '../src/data/car-dataset.json';

const yearSelect = document.getElementById('yearSelect');
const makeSelect = document.getElementById('makeSelect');
const modelSelect = document.getElementById('modelSelect');

const unique = (arr) => [...new Set(arr)];

const populateYears = () => {
    const years = unique(carData.map(car => car.year)).sort();
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    });
  };
  
  yearSelect.addEventListener('change', () => {
    makeSelect.disabled = false;
    makeSelect.innerHTML = '<option value="">Select Make</option>';
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    modelSelect.disabled = true;
  
    const selectedYear = yearSelect.value;
    const makes = unique(carData
      .filter(car => car.year == selectedYear)
      .map(car => car.Manufacturer)); // <-- Updated this line
    makes.forEach(make => {
      const option = document.createElement('option');
      option.value = make;
      option.textContent = make;
      makeSelect.appendChild(option);
    });
  });
  
  makeSelect.addEventListener('change', () => {
    modelSelect.disabled = false;
    modelSelect.innerHTML = '<option value="">Select Model</option>';
  
    const selectedYear = yearSelect.value;
    const selectedMake = makeSelect.value;
    const models = unique(carData
      .filter(car => car.year == selectedYear && car.Manufacturer == selectedMake)
      .map(car => car.model)); // <-- 'model' is fine here
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  });
  
  modelSelect.addEventListener('change', () => {
    const selectedYear = yearSelect.value;
    const selectedMake = makeSelect.value;
    const selectedModel = modelSelect.value;
  
    const foundCar = carData.find(car =>
      car.year == selectedYear &&
      car.Manufacturer == selectedMake &&
      car.model == selectedModel
    );
  
    if (foundCar) {
      console.log('Car details:', foundCar);
    }
  });
  

populateYears();
