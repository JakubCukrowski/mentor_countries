//dropdown menu

const selectContinent = document.querySelector('.dropdown-menu');
const dropdownList = document.querySelector('.dropdown-list');
const selectOptions = dropdownList.querySelectorAll('li');

//countries

const countriesContainer = document.querySelector('.countries-container');

const addCountryStructure = (src, alt, name, population, region, capital) => {
    const newDiv = document.createElement('div')
    newDiv.classList.add('country-wrapper')
    countriesContainer.append(newDiv)
    newDiv.innerHTML = `
        <img src=${src} alt=${alt}>
        <div class="content">
            <h2>${name}</h2>
            <p class="population">Population: ${population}</p>
            <p class="region">Region: ${region}</p>
            <p class="capital">Capital: ${capital}</p>
        </div>

    `
}

const url = 'https://restcountries.com/v3.1/all';

//handle countries


fetch(url)
    .then(response => response.json())
    .then(response => response.forEach(country => {
        addCountryStructure(
            country.flags.png, 
            country.flag, 
            country.name.common, 
            country.population, 
            country.region,
            country.capital)
    }))
    .catch(err => console.log(err));


selectContinent.addEventListener('click', () => {
    dropdownList.classList.toggle('blocked')
})

selectOptions.forEach(option => option.addEventListener('click', (event) => {
    selectContinent.innerText = event.target.innerText
    dropdownList.classList.remove('blocked')
}))