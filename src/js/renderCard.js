import apiService from './fetchCountries';
import debounce from 'lodash.debounce';
import cardMarkup from '../templates/card.hbs';
import listMarkup from '../templates/list.hbs';
import '@pnotify/core/dist/Material.css';
import { error } from '@pnotify/core';

const refs = {
  inputForm: document.querySelector('.js-input'),
  cardContainer: document.querySelector('.js-card'),
};

refs.inputForm.addEventListener('input', debounce(onSearchForm, 500));

function onSearchForm(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.value.trim();
  clearContainer();
  apiService.fetchCountry(searchQuery).then(renderCard).catch(errorFetch);
}

function renderCard(country) {
  console.log(country);
  let numberOfCountries = country.length;

  if (numberOfCountries === 1) {
    refs.cardContainer.innerHTML = cardMarkup(country);
  } else if (numberOfCountries <= 10) {
    refs.cardContainer.innerHTML = listMarkup(country);
  } else if (numberOfCountries > 10) {
    error({
      delay: 2000,
      title: 'Atention!',
      text: 'Need correct name of country, or may be more letters of name...',
      styling: 'material',
      width: '400px',
    });
  }
}

function clearContainer() {
  refs.cardContainer.innerHTML = '';
}

function errorFetch() {
  alert('Error... maintenance is impossible now!');
}
