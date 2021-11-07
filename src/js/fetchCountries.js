function fetchCountry(name) {
  const url = `https://restcountries.com/v2/name/${name}`;
  return fetch(url).then(response => response.json());
}

export default { fetchCountry };
