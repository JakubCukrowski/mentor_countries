//section id=top
const topSection = document.querySelector('#top');

//dropdown menu

const selectContinent = document.querySelector('.dropdown-menu');
const dropdownList = document.querySelector('.dropdown-list');
const selectOptions = dropdownList.querySelectorAll('li');

//countries container

const countriesContainer = document.querySelector('.countries-container');

//searchbar
const searchbar = document.querySelector('.search-bar');

//utilities container to delete
const utilitiesContainer = document.querySelector('.utilities__container')

// countries variable, storing fetched data

let countries;

//url api changers for filtering
let region;
let endpoint;
let countryName;

let url = 'https://restcountries.com/v3.1/all';
const currentURL = window.location.pathname.split('/');

//reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
const currentCountryName = decodeURIComponent(currentURL[currentURL.length - 1])

let currentCountry;

//handle response, store it in 'countries' variable

const fetchCountries = async () => {
    await fetch(url)
    .then(response => response.json())
    .then(response => {
        countries = response.map(country => {
            return {
                commonName: country.name.common,
                nativeName: country.name.nativeName,
                languages: country.languages,
                images: country.flags,
                isoCode: country.flag,
                population: country.population,
                region: country.region,
                subregion: country.subregion,
                capital: country.capital,
                topLevelDomain: country.tld,
                currencies: country.currencies,
                borders: country.borders || null
            }
        });
        
        if (window.location.pathname === '/') {
            countries.forEach(country => {
                addCountryStructure(
                    country.images.png,
                    country.isoCode,
                    country.commonName,
                    country.population,
                    country.region,
                    country.capital
                )
            })
        } else {
            currentCountry = countries.find(country => country.commonName === currentCountryName)
            utilitiesContainer.classList.add('no-display');
            singleCountryStructure(
                currentCountry.images.png, 
                currentCountry.isoCode,
                currentCountry.commonName,
                Object.values(currentCountry.nativeName).length > 2 
                    ? Object.values(currentCountry.nativeName)[2].common
                    : Object.values(currentCountry.nativeName)[0].common,
                currentCountry.population,
                currentCountry.region,
                currentCountry.subregion,
                currentCountry.capital, 
                currentCountry.topLevelDomain,
                Object.values(currentCountry.currencies)[0].name,
                Object.values(currentCountry.languages).join(', '),
                currentCountry.borders
            )
        }
    })
    .catch(err => console.log(err));
}

//country div
const addCountryStructure = (src, alt, name, population, region, capital) => {
    const newLink = document.createElement('a');
    newLink.href = `/country/${name}`
    newLink.setAttribute('id', `${name}`);
    newLink.addEventListener('click', countryDetail)
    const newDiv = document.createElement('div');
    newLink.append(newDiv);
    newDiv.classList.add('country-wrapper');
    countriesContainer.append(newLink);
    newDiv.innerHTML = `
        <img src=${src} alt=${alt}>
        <div class="content">
            <h2>${name}</h2>
            <p class="population">
                <span class="content-text-bold">Population:</span> ${population.toLocaleString('en-us', {style: 'decimal'})}
            </p>
            <p class="region"><span class="content-text-bold">Region:</span> ${region}</p>
            <p class="capital"><span class="content-text-bold">Capital:</span> ${capital}</p>
        </div>

    `
}

//handle dropdown menu

const handleSelectContinent = () => {
    dropdownList.classList.toggle('blocked');
}

selectContinent.addEventListener('click', handleSelectContinent)

const handleOptions = (event) => {
    selectContinent.innerText = event.target.innerText;
    region = event.target.getAttribute('value');
    dropdownList.classList.remove('blocked');
    countriesContainer.innerHTML = '';
    url = `https://restcountries.com/v3.1/region/${region.toLowerCase()}`;
    fetchCountries();
}

selectOptions.forEach(option => option.addEventListener('click', handleOptions))

//handle searchbar

const handleSearchbar = (e) => {
    endpoint = e.target.value;
    if (endpoint.length > 0) {
        url = `https://restcountries.com/v3.1/name/${endpoint}`;
        countriesContainer.innerHTML = '';
        fetchCountries();
    }
    
    if (e.target.value.length <= 0 && region !== undefined) {
        url = `https://restcountries.com/v3.1/region/${region.toLowerCase()}`;
        fetchCountries();
    } else if (e.target.value.length <= 0 && region === undefined) {
        url = 'https://restcountries.com/v3.1/all';
        fetchCountries();
    }
}

searchbar.addEventListener('input', handleSearchbar)

//single country structure 

const singleCountryStructure = (
    src,
    alt,
    singleCountryName,
    nativeName,
    population,
    countryRegion,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borderCountries
    ) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('single-country-wrapper')
    const newButton = document.createElement('button');
    newButton.classList.add('back-btn');
    newButton.innerText = 'Back';
    newButton.addEventListener('click', () => {
        region === undefined 
        ? url = 'https://restcountries.com/v3.1/all' 
        : url = `https://restcountries.com/v3.1/region/${region.toLowerCase()}`;
        countriesContainer.innerHTML = '';
        utilitiesContainer.classList.remove('no-display');
        searchbar.value = '';
        history.back();
        fetchCountries();
    })
    countriesContainer.append(newDiv);
    newDiv.innerHTML = `
        <div class='country-data-wrapper'>
            <img src=${src} alt=${alt} >
            <div class='country-info-wrapper'>
                <h2>${singleCountryName}</h2>
                <div class='content-wrapper'>
                    <div class='left-side-content'>
                        <p><strong>Native name: </strong>${nativeName}</p>
                        <p>
                            <strong>Population: </strong>
                            ${population.toLocaleString('en-US')}
                        </p>
                        <p>
                            <strong>Region: </strong>
                            ${countryRegion}
                        </p>
                        <p>
                            <strong>Sub Region: </strong>
                            ${subregion}
                        </p>
                        <p>
                            <strong>Capital: </strong>
                            ${capital}
                        </p>
                    </div>
                    <div class='right-side-content'>
                        <p>
                            <strong>Top Level Domain: </strong>
                            ${topLevelDomain}
                        </p>
                        <p>
                            <strong>Currencies: </strong>
                            ${currencies}
                        </p>
                        <p>
                            <strong>Languages: </strong>
                            ${languages}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `
    newDiv.prepend(newButton);
    const countryInfoWrapper = newDiv.querySelector('.country-info-wrapper');

    //check if country has aany neighbours, if yes, add buttons
    if (borderCountries) {
        const borderButtonsContainer = document.createElement('div');
        borderButtonsContainer.classList.add('border-buttons-container')
        borderButtonsContainer.innerHTML = `<p><strong>Border Counties: </strong></p>`
        for (let i = 0; i < borderCountries.length; i++) {
            const borderCountryButton = document.createElement('button');
            borderCountryButton.classList.add('border-country-btn');
            borderCountryButton.id = borderCountries[i]

            borderCountryButton.innerText = borderCountries[i];
            borderButtonsContainer.append(borderCountryButton)
        }

        countryInfoWrapper.append(borderButtonsContainer);
    }
}

// country details page

const countryDetail = async (e) => {
    e.preventDefault();
    countriesContainer.innerHTML = '';
    utilitiesContainer.classList.add('no-display');
    countryName = e.target.closest('a').id;
    currentCountry = countries.find(country => country.commonName === countryName);
    history.pushState(null, null, `/country/${countryName}`)
    singleCountryStructure(
        currentCountry.images.png, 
        currentCountry.isoCode,
        currentCountry.commonName,
        Object.values(currentCountry.nativeName).length > 2 
            ? Object.values(currentCountry.nativeName)[2].common
            : Object.values(currentCountry.nativeName)[0].common,
        currentCountry.population,
        currentCountry.region,
        currentCountry.subregion,
        currentCountry.capital, 
        currentCountry.topLevelDomain,
        Object.values(currentCountry.currencies)[0].name,
        Object.values(currentCountry.languages).join(', '),
        currentCountry.borders
    )
}


fetchCountries()