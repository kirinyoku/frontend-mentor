const _BASE_URL = 'https://restcountries.com/v2/';

export const _ALL_COUNTRIES = `${_BASE_URL}all?fields=name,capital,flags,population,region`;

export const searchByCountry = (name) => `${_BASE_URL}name/${name}`;

export const filterByCode = (codes) => `${_BASE_URL}alpha?codes=${codes.join(',')}`;