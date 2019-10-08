const token = getLocalStorageItem("token");
const caseType = getLocalStorageItem("caseType");
const baseURL = "https://sdqh-net.netlify.com";
const backendURL = "https://shrouded-scrubland-71994.herokuapp.com/";
let cases = [];
let filteredCases;
const filters = {
    searchText: '',
    filterBy: ''
}

const container = document.querySelector('.container')
axios
    .get(`${backendURL}allCases?caseType=${caseType}`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response => {
        cases = response.data.cases;
        console.log(cases);
        if(cases.length === 0){
            container.innerHTML = "<h2>لا يوجد حالات لعرضها</h2>"
        }else {
            // let imagePath;
            for (var i = 0; i < cases.length; i++) {
                // imagePath = `${backendURL}${cases[i]["image"]}`
                var div = document.createElement("div");
                div.className = "content";
                div.innerHTML =
                `<div class="right">
                    <img src=${cases[i]["image"]} alt=${cases[i]["name"] || cases[i]["species"]} />
                </div>
                <div class="left">
                    <div class="top">
                        <h2>${ cases[i]["name"] || cases[i]["species"]}</h2>
                        <p class="date"><i class="far fa-clock"></i> <time>${ cases[i]["createdAt"].split('T')[0]}</time>، <i class="fas fa-map-marker-alt"></i> ${cases[i]["area"]}</p>
                    </div>
                    <div class="middle">
                        <p>${ cases[i]["description"].substring(0, 120)}...</p>
                    </div>
                    <div class="bottom">
                        <button type="button" id=${cases[i]["id"]}>المزيد</button>
                    </div>
                 </div>`;
                container.appendChild(div);
            } 
            const casesButton = document.querySelectorAll('button')
            casesButton.forEach((caseButton) => {
                caseButton.addEventListener('click', (e) => {
                    caseId = e.target.id
                    console.log(caseId)
                    saveToLocalStorage("caseId", caseId)
                    if(caseType === "human"){
                        window.location.replace(baseURL + `/singleCase/singleCase.html`);
                    } else if (caseType === "animal"){
                        window.location.replace(baseURL + `singleCase/animalSingleCase/singleCase.html`);
                    }
                })
            })
        }
    })
    .catch(error => {
        console.log(error);
        alert("something went wrong")
    });

// const egyptFilter = document.querySelector('.filter__egypt')
// egyptFilter.addEventListener('click', (e) => {
//     cases.forEach((item)=>{
//         if(item.area === 'مصر'){

//         }
//     })
// })

// const filterBy = function (casesArray, filterKey) {
//     filteredCases = []
//     casesArray.forEach((item) => {
//         if (item.area === filterKey) {
//             filteredCases.push(item)
//         }
//     })
//     if(filteredCases.length === 0){

//     }
// }