const saveCaseType = (caseType, elementId) => {
    const element = document.querySelector(elementId)
    if(element){
        element.addEventListener('click', (e) => {
            saveToLocalStorage("caseType", caseType)
        })
    }
}
function removeActiveClass() {
    let filterItems = document.getElementsByClassName("filter__item");
    for (var i = 0; i < filterItems.length; i++) {
        filterItems[i].classList.remove("active");
    }
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
var dropdown = document.getElementsByClassName("dropdown-btn");
for (var i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}
const saveActionType = (actionType, elementId, editUrl) => {
    const element = document.querySelector(elementId)
    if (element) {
        element.href = editUrl
        element.addEventListener('click', (e) => {
            saveToLocalStorage("actionType", actionType)
        })
    }
}

const generateCasesDom = (cases,pageUrl, containerName) => {
    const container = document.querySelector(containerName)
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
        const casesButton = document.querySelectorAll(`${containerName} .case-button`)
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

const renderingCases = (casesArray, filters, pageUrl, key, containerName) => {
    const container = document.querySelector(containerName)
    let filteredCases = casesArray.filter((caseItem) => filters.filterBy !== '' ? caseItem.area === filters.filterBy : casesArray)
    filteredCases = filteredCases.filter((caseItem) => caseItem[key].toLowerCase().includes(filters.searchText.toLowerCase()))    
    container.innerHTML = ''
    generateCasesDom(filteredCases, pageUrl, containerName)
}
const signoutButton = document.querySelector('#signout');
signoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeLocalStorageItem('user');
    removeLocalStorageItem('token');
    alert('you have signed out successfully')
    window.location.replace(baseURL + "/landingPage/landing.html");
})

if(user && token){
    document.getElementById("register").style.display = "none";
}else{
    document.getElementById("my-account").style.display = "none";
}
document.getElementById("myPage").addEventListener('click', (e) => {
    saveToLocalStorage("userProfile", user)
    saveToLocalStorage("userId", user.id)
})