console.log('CLient side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#error-message');
const weatherMessage = document.querySelector('#weather-message');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    errorMessage.textContent = 'Loading..';
    weatherMessage.textContent = '';

    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response => {
        response.json().then((data) => {
            if(data.error){
                errorMessage.textContent = data.error;
            }
            else{
                errorMessage.textContent = data.location;
                weatherMessage.textContent = data.forecast;
            }
        });
    }));
});