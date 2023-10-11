//section id=top
let e,t,n;const a=document.querySelector("#top"),s=document.querySelector(".dropdown-menu"),c=document.querySelector(".dropdown-list"),o=c.querySelectorAll("li"),r=document.querySelector(".countries-container"),l=document.querySelector(".search-bar"),i=document.querySelector(".utilities__container"),d=(e,t,n,a,s,c)=>{let o=document.createElement("a");o.href=`/country/${n}`,o.setAttribute("id",`${n}`),o.addEventListener("click",E);let l=document.createElement("div");o.append(l),l.classList.add("country-wrapper"),r.append(o),l.innerHTML=`
        <img src=${e} alt=${t}>
        <div class="content">
            <h2>${n}</h2>
            <p class="population">
                <span class="content-text-bold">Population:</span> ${a.toLocaleString("en-us",{style:"decimal"})}
            </p>
            <p class="region"><span class="content-text-bold">Region:</span> ${s}</p>
            <p class="capital"><span class="content-text-bold">Capital:</span> ${c}</p>
        </div>

    `};let p="https://restcountries.com/v3.1/all";const u=window.location.pathname.split("/"),m=u[u.length-1],v=async()=>{await fetch(p).then(e=>e.json()).then(e=>{e.forEach(e=>{d(e.flags.png,e.flag,e.name.common,e.population,e.region,e.capital)})}).catch(e=>console.log(e))},g=()=>{c.classList.toggle("blocked")};s.addEventListener("click",g);const h=t=>{s.innerText=t.target.innerText,e=t.target.getAttribute("value"),c.classList.remove("blocked"),r.innerHTML="",p=`https://restcountries.com/v3.1/region/${e.toLowerCase()}`,v()};o.forEach(e=>e.addEventListener("click",h));//handle searchbar
const L=n=>{(t=n.target.value).length>0&&(p=`https://restcountries.com/v3.1/name/${t}`,r.innerHTML="",v()),n.target.value.length<=0&&void 0!==e?(p=`https://restcountries.com/v3.1/region/${e.toLowerCase()}`,v()):n.target.value.length<=0&&void 0===e&&(p="https://restcountries.com/v3.1/all",v())};l.addEventListener("input",L);//single country structure 
const b=(t,n,a,s,c,o,l,i,d,u,m)=>{let g=document.createElement("div");g.classList.add("single-country-wrapper");let h=document.createElement("button");h.classList.add("back-btn"),h.innerText="Back",h.addEventListener("click",()=>{p=void 0===e?"https://restcountries.com/v3.1/all":`https://restcountries.com/v3.1/region/${e.toLowerCase()}`,r.innerHTML="",$(),history.back(),v()}),r.append(g),g.innerHTML=`
        <div class='country-info-wrapper'>
            <img src=${t} alt=${n} >
            <div class='content-wrapper'>
                <div class='left-side-content'>
                    <h2>${a}</h2>
                    <p><strong>Native name: </strong>${s}</p>
                    <p>
                        <strong>Population: </strong>
                        ${c.toLocaleString("en-US")}
                    </p>
                    <p>
                        <strong>Region: </strong>
                        ${o}
                    </p>
                    <p>
                        <strong>Sub Region: </strong>
                        ${l}
                    </p>
                    <p>
                        <strong>Capital: </strong>
                        ${i}
                    </p>
                </div>
                <div class='right-side-content'>
                    <p>
                        <strong>Top Level Domain: </strong>
                        ${d}
                    </p>
                    <p>
                        <strong>Currencies: </strong>
                        ${u}
                    </p>
                    <p>
                        <strong>Languages: </strong>
                        ${m}
                    </p>
                </div>
            </div>
        </div>
    `,g.prepend(h)},E=async e=>{e.preventDefault(),r.innerHTML="",i.remove(),n=e.target.closest("a").id,p=`https://restcountries.com/v3.1/name/${n}?fullText=true`,history.pushState(null,null,`/country/${n}`),await fetch(p).then(e=>e.json()).then(e=>{b(e[0].flags.png,e[0].flag,e[0].name.common,Object.values(e[0].name.nativeName).length>2?Object.values(e[0].name.nativeName)[2].common:Object.values(e[0].name.nativeName)[0].common,e[0].population,e[0].region,e[0].subregion,e[0].capital,e[0].tld[0],Object.values(e[0].currencies)[0].name,Object.values(e[0].languages).join(", "))})},$=()=>{let e=document.createElement("div");e.classList.add("container","utilities__container"),a.append(e);let t=document.createElement("div");t.classList.add("utilities"),e.append(t);let n=document.createElement("span");n.classList.add("search-bar-wrapper"),t.append(n);let s=document.createElement("input");s.setAttribute("type","text"),s.setAttribute("placeholder","Search for a country..."),s.classList.add("search-bar"),s.addEventListener("input",L),n.append(s);let o=document.createElement("div");o.classList.add("dropdown"),e.append(o);let r=document.createElement("button");r.classList.add("dropdown-menu"),r.innerText="Filter by Region",r.addEventListener("click",g),o.append(r);let l=document.createElement("ul");l.classList.add("dropdown-list"),o.append(c);let i=document.createElement("li"),d=document.createElement("li"),p=document.createElement("li"),u=document.createElement("li"),m=document.createElement("li");i.setAttribute("value","Africa"),d.setAttribute("value","Americas"),p.setAttribute("value","Asia"),u.setAttribute("value","Europe"),m.setAttribute("value","Oceania"),i.addEventListener("click",h),d.addEventListener("click",h),p.addEventListener("click",h),u.addEventListener("click",h),m.addEventListener("click",h),l.append(i,d,p,u,m)};//on page load display all, after refresh depends on the URL
"/"===window.location.pathname?v():(p=`https://restcountries.com/v3.1/name/${m}?fullText=true`,i.remove(),fetch(p).then(e=>e.json()).then(e=>{b(e[0].flags.png,e[0].flag,e[0].name.common,Object.values(e[0].name.nativeName).length>2?Object.values(e[0].name.nativeName)[2].common:Object.values(e[0].name.nativeName)[0].common,e[0].population,e[0].region,e[0].subregion,e[0].capital,e[0].tld[0],Object.values(e[0].currencies)[0].name,Object.values(e[0].languages).join(", "))}));//# sourceMappingURL=index.fc1f1223.js.map

//# sourceMappingURL=index.fc1f1223.js.map
