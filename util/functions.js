const humanCaseType = () => {
    const humanCase = document.querySelector('#human')
    if(humanCase){
        humanCase.addEventListener('click', (e) => {
            saveToLocalStorage("caseType", "human")
        })
    }
}

const animalCaseType = () => {
    const animalCase = document.querySelector('#animal')
    if(animalCase){
        animalCase.addEventListener('click', (e) => {
            saveToLocalStorage("caseType", "animal")
        })
    }
}

const generateCasesDom = (cases,pageUrl) => {
    if (cases.length === 0) {
        container.innerHTML = "<h2>لا يوجد حالات لعرضها</h2>"
    } else {
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
                        <button type="button" class="case-button" id=${cases[i]["id"]}>المزيد</button>
                    </div>
                 </div>`;
            container.appendChild(div);
        }
        const casesButton = document.querySelectorAll('.case-button')
        casesButton.forEach((caseButton) => {
            caseButton.addEventListener('click', (e) => {
                caseId = e.target.id
                console.log(caseId)
                saveToLocalStorage("caseId", caseId)
                if (cases[0]["name"]){
                    saveToLocalStorage("caseType", "human");
                }else {
                    saveToLocalStorage("caseType", "animal");
                }
                window.location.replace(baseURL + pageUrl);
            })
        })
    }
}

const renderingCases = (casesArray, filters, pageUrl, key) => {
    let filteredCases = casesArray.filter((caseItem) => filters.filterBy !== '' ? caseItem.area === filters.filterBy : casesArray)
    filteredCases = filteredCases.filter((caseItem) => caseItem[key].toLowerCase().includes(filters.searchText.toLowerCase()))    
    container.innerHTML = ''
    generateCasesDom(filteredCases, pageUrl)
}