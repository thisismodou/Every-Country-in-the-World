const $ = selector => document.querySelector(selector);

let search = $('#search-bar');
let mainContent = $('#main-content');

const countries = [];

fetch('https://restcountries.eu/rest/v2/all')
  .then(res => res.json())
  .then(allCountries => {
    countries.push(...allCountries);

    renderContent(allCountries);
  });

function renderContent(data) {
  let card = '';

  data.map(country => {
    const {
      flag,
      name,
      nativeName,
      capital,
      region,
      population,
      currencies: [{ code }],
      callingCodes
    } = country;

    return (card += `<div class="card">
    <div class="card-img">
      <img class="flag" src="${flag}" alt="${name + "'s " + 'flag'}" />
    </div>

    <div class="card-title">
      <h4 id="country-name">${name}</h4>
      <h6 id="native-name">${nativeName}</h6>
    </div>

    <div class="card-info-container">
      <div class="card-info">
        <p class="card-info-left">Capital</p>
        <p id="capital" class="card-info-right">${capital}</p>
      </div>
      <div class="card-info">
        <p class="card-info-left">Region</p>
        <p id="region" class="card-info-right">${region}</p>
      </div>
      <div class="card-info">
        <p class="card-info-left">Population</p>
        <p id="population" class="card-info-right">${numberWithCommas(
          population
        )}</p>
      </div>
      <div class="card-info">
        <p class="card-info-left">Currency</p>
        <p id="currency-code" class="card-info-right">${code}</p>
      </div>
      <div class="card-info">
        <p class="card-info-left">Calling Code</p>
        <p id="calling-code" class="card-info-right">+${callingCodes[0]}</p>
      </div>
    </div>
  </div>`);
  });

  mainContent.innerHTML = card;
}

function findMatches(wordToMatch, countries) {
  return countries.filter(country => {
    const regex = new RegExp(wordToMatch, 'gi');
    return (
      country.name.match(regex) ||
      country.capital.match(regex) ||
      country.region.match(regex)
    );
  });
}

function displayMatches() {
  const matchList = findMatches(this.value, countries);

  const content = matchList
    .map(country => {
      const {
        flag,
        name,
        nativeName,
        capital,
        region,
        population,
        currencies: [{ code }],
        callingCodes
      } = country;

      return `<div class="card">
      <div class="card-img">
        <img class="flag" src="${flag}" alt="${name + "'s " + 'flag'}" />
      </div>

      <div class="card-title">
        <h4 id="country-name">${name}</h4>
        <h6 id="native-name">${nativeName}</h6>
      </div>

      <div class="card-info-container">
        <div class="card-info">
          <p class="card-info-left">Capital</p>
          <p id="capital" class="card-info-right">${capital}</p>
        </div>
        <div class="card-info">
          <p class="card-info-left">Region</p>
          <p id="region" class="card-info-right">${region}</p>
        </div>
        <div class="card-info">
          <p class="card-info-left">Population</p>
          <p id="population" class="card-info-right">${numberWithCommas(
            population
          )}</p>
        </div>
        <div class="card-info">
          <p class="card-info-left">Currency</p>
          <p id="currency-code" class="card-info-right">${code}</p>
        </div>
        <div class="card-info">
          <p class="card-info-left">Calling Code</p>
          <p id="calling-code" class="card-info-right">+${callingCodes[0]}</p>
        </div>
      </div>
    </div>`;
    })
    .join('');

  mainContent.innerHTML = content;
}

// Add comma(s) to population numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

search.addEventListener('input', displayMatches);
