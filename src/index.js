import './css/styles.css';
var debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCountries ';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { country } from './templates/country.hbs';
import { Countries } from './templates/Countries.hbs';

const DEBOUNCE_DELAY = 300;
const countryRequest = document.querySelector('#search-box');
countryRequest.addEventListener('input', debounce(handlerInput, DEBOUNCE_DELAY));
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function handlerInput(event) {
  event.preventDefault();
  const countryName = countryRequest.value.trim();
  fetchCountries(countryName).then(renderMarkap).catch(showError);
  // .finally(() => countryRequest.reset());
}
function showError() {
  Notify.failure('Oops, there is no country with that name', { width: '400px' });
}
function renderMarkap(countryUser) {
  const numberOfCountries = countryUser.length;

  if (numberOfCountries <= 10 && numberOfCountries >= 2) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    countryList.innerHTML = allCountries(countryUser);
  } else if (numberOfCountries === 1) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    countryInfo.innerHTML = country(countryUser);
  } else {
    Notify.info('Too many matches found. Please enter a more specific name.', { width: '400px' });
  }
}
