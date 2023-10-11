//dropdown menu
const selectContinent = document.querySelector(".dropdown-menu");
const dropdownList = document.querySelector(".dropdown-list");
const selectOptions = dropdownList.querySelectorAll("li");
//countries
const countriesContainer = document.querySelector(".countries-container");
//searchbar
const searchbar = document.querySelector(".search-bar");
//utilities
const utilities = document.querySelector(".utilities");
//url api changers for filtering
let region;
let endpoint;
let countryName;
//country div
const addCountryStructure = (src, alt, name, population, region, capital)=>{
    const newLink = document.createElement("a");
    newLink.href = `/country/${name}`;
    newLink.setAttribute("id", `${name}`);
    newLink.addEventListener("click", countryDetail);
    const newDiv = document.createElement("div");
    newLink.append(newDiv);
    newDiv.classList.add("country-wrapper");
    countriesContainer.append(newLink);
    newDiv.innerHTML = `
        <img src=${src} alt=${alt}>
        <div class="content">
            <h2>${name}</h2>
            <p class="population">
                <span class="content-text-bold">Population:</span> ${population.toLocaleString("en-us", {
        style: "decimal"
    })}
            </p>
            <p class="region"><span class="content-text-bold">Region:</span> ${region}</p>
            <p class="capital"><span class="content-text-bold">Capital:</span> ${capital}</p>
        </div>

    `;
};
let url = "https://restcountries.com/v3.1/all";
const currentURL = window.location.pathname.split("/");
const currentCountry = currentURL[currentURL.length - 1];
//handle countries
const fetchCountries = async ()=>{
    await fetch(url).then((response)=>response.json()).then((response)=>{
        response.forEach((country)=>{
            addCountryStructure(country.flags.png, country.flag, country.name.common, country.population, country.region, country.capital);
        });
    }).catch((err)=>console.log(err));
};
//handle dropdown menu
selectContinent.addEventListener("click", ()=>{
    dropdownList.classList.toggle("blocked");
});
selectOptions.forEach((option)=>option.addEventListener("click", (event)=>{
        selectContinent.innerText = event.target.innerText;
        region = event.target.getAttribute("value");
        dropdownList.classList.remove("blocked");
        countriesContainer.innerHTML = "";
        url = `https://restcountries.com/v3.1/region/${region.toLowerCase()}`;
        fetchCountries();
    }));
//handle searchbar
searchbar.addEventListener("input", ()=>{
    endpoint = searchbar.value;
    if (endpoint.length > 0) url = `https://restcountries.com/v3.1/name/${endpoint}`;
    countriesContainer.innerHTML = "";
    fetchCountries();
    if (searchbar.value.length <= 0 && region !== undefined) {
        url = `https://restcountries.com/v3.1/region/${region.toLowerCase()}`;
        fetchCountries();
    } else if (searchbar.value.length <= 0 && region === undefined) {
        url = "https://restcountries.com/v3.1/all";
        fetchCountries();
    }
});
//single country structure 
const singleCountryStructure = (src, alt, singleCountryName, nativeName, population, countryRegion, subregion, capital, topLevelDomain, currencies, languages)=>{
    const newDiv = document.createElement("div");
    newDiv.classList.add("single-country-wrapper");
    const newButton = document.createElement("button");
    newButton.classList.add("back-btn");
    newButton.innerText = "Back";
    newButton.addEventListener("click", ()=>{
        region === undefined ? url = "https://restcountries.com/v3.1/all" : url = `https://restcountries.com/v3.1/region/${region.toLowerCase()}`;
        countriesContainer.innerHTML = "";
        utilities.style.visibility = "visible";
        history.back();
        fetchCountries();
    });
    countriesContainer.append(newDiv);
    newDiv.innerHTML = `
        <div class='country-info-wrapper'>
            <img src=${src} alt=${alt} >
            <div class='content-wrapper'>
                <div class='left-side-content'>
                    <h2>${singleCountryName}</h2>
                    <p><strong>Native name: </strong>${nativeName}</p>
                    <p>
                        <strong>Population: </strong>
                        ${population.toLocaleString("en-US")}
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
    `;
    newDiv.prepend(newButton);
};
// country details page
const countryDetail = async (e)=>{
    e.preventDefault();
    countriesContainer.innerHTML = "";
    utilities.style.visibility = "hidden";
    countryName = e.target.closest("a").id;
    url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    history.pushState(null, null, `/country/${countryName}`);
    await fetch(url).then((response)=>response.json()).then((response)=>{
        singleCountryStructure(response[0].flags.png, response[0].flag, response[0].name.common, Object.values(response[0].name.nativeName).length > 2 ? Object.values(response[0].name.nativeName)[2].common : Object.values(response[0].name.nativeName)[0].common, response[0].population, response[0].region, response[0].subregion, response[0].capital, response[0].tld[0], Object.values(response[0].currencies)[0].name, Object.values(response[0].languages).join(", "));
    });
};
//on page load display all, after refresh depends on the URL
if (window.location.pathname === "/") fetchCountries();
else {
    url = `https://restcountries.com/v3.1/name/${currentCountry}?fullText=true`;
    fetch(url).then((response)=>response.json()).then((response)=>{
        singleCountryStructure(response[0].flags.png, response[0].flag, response[0].name.common, Object.values(response[0].name.nativeName).length > 2 ? Object.values(response[0].name.nativeName)[2].common : Object.values(response[0].name.nativeName)[0].common, response[0].population, response[0].region, response[0].subregion, response[0].capital, response[0].tld[0], Object.values(response[0].currencies)[0].name, Object.values(response[0].languages).join(", "));
    });
}

//# sourceMappingURL=index.de158e3a.js.map
