if (!user || !token) {
    alert("you have to log in first")
    window.location.replace(baseURL + "/forms/login/login.html");
}
let humanCases, animalCases;
const userImage = document.querySelector("#user-info img");
userImage.src = userProfile.image;
const userName = document.querySelector("#user-info h2");

if(user.id === userId){
    userName.innerHTML = `${userProfile.firstName} ${userProfile.lastName} <a href="" id="edit"><i class="fas fa-pen"></i></a>`;
    saveActionType("edit", "#edit", `${baseURL}/forms/signup/signup.html`)
}else {
    userName.innerHTML = `${userProfile.firstName} ${userProfile.lastName} `
}
axios
    .get(`${backendURL}userCases?userId=${userId}`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response => {
        humanCases = response.data.humanCases;
        animalCases = response.data.animalCases;
        renderingCases(animalCases, filters, "/singleCase/animalSingleCase/singleCase.html", "species", ".animalContainer");
        renderingCases(humanCases, filters, "/singleCase/singleCase.html", "name", ".humanContainer");
    })
    .catch(error => {
        console.log(error);
        if (error.response) {
            alert(error.response.data.message)
        } else {
            alert("something went wrong")
            // window.location.replace(baseURL + "/landingpage/landing");
        }
    });
