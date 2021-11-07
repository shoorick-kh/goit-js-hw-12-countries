import apiService from './fetchCountries';
import debounce from 'lodash.debounce';
import cardMarkup from '../templates/card.hbs';
import listMarkup from '../templates/list.hbs';
import '@pnotify/core/dist/Material.css';
import { errorAlert } from '@pnotify/core';

const refs = {
  inputForm: document.querySelector('.js-input'),
  cardContainer: document.querySelector('js-card'),
};

refs.inputForm.addEventListener('input', debounce(onSearchForm, 500));

function onSearchForm(evt) {
  evt.preventDefault();
  const searchQuery = evt.target.value;
  //   clearContainer();
  apiService.fetchCountry(searchQuery).then(renderCard).catch(errorFetch);
}

function renderCard(countries) {
  let numberOfCountries = countries.length;

  if (numberOfCountries === 1) {
    refs.cardContainer.innerHTML = cardMarkup(countries);
  } else if (numberOfCountries <= 10) {
    refs.cardContainer.innerHTML = listMarkup(countries);
  } else if (numberOfCountries > 10) {
    errorAlert({
      title: 'Atention!',
      text: 'Need correct name of country, or may be more letters of name...',
      delay: 5000,
    });
  }
}

function clearContainer() {
  refs.cardContainer.innerHTML = '';
}

function errorFetch() {
  alert('Error... maintenance is impossible now!');
}
