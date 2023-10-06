//dropdown menu
const selectContinent = document.querySelector(".dropdown-menu");
const dropdownList = document.querySelector(".dropdown-list");
const selectOptions = dropdownList.querySelectorAll("li");
//countries
const countriesContainer = document.querySelector(".countries-container");
//searchbar
const searchbar = document.querySelector(".search-bar");
//url api changers for filtering
let region;
let endpoint;
//country div
const addCountryStructure = (src, alt, name, population, region, capital)=>{
    const newDiv = document.createElement("div");
    newDiv.classList.add("country-wrapper");
    countriesContainer.append(newDiv);
    newDiv.innerHTML = `
        <img src=${src} alt=${alt}>
        <div class="content">
            <h2>${name}</h2>
            <p class="population"><span class="content-text-bold">Population:</span> ${population.toLocaleString("en-us", {
        style: "decimal"
    })}</p>
            <p class="region"><span class="content-text-bold">Region:</span> ${region}</p>
            <p class="capital"><span class="content-text-bold">Capital:</span> ${capital}</p>
        </div>

    `;
};
let url = "https://restcountries.com/v3.1/all";
//handle countries
const fetchCountries = async ()=>{
    await fetch(url).then((response)=>response.json()).then((respone)=>{
        respone.forEach((country)=>{
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
fetchCountries();

//# sourceMappingURL=index.de158e3a.js.map
