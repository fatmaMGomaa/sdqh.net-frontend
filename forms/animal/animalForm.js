const userLocation = getLocalStorageItem("location");
const actionType = getLocalStorageItem("actionType");
removeLocalStorageItem("actionType");
let theCase;

if (!user || !token) {
    alert("you have to log in first")
    window.location.replace(baseURL + "/forms/login/login.html");
}
if (!userLocation) {
    alert("you have to turn on your GPS to know your current location")
    window.location.replace(baseURL + "/index/animal/index.html");
}

let data;
const form = document.getElementById('animal');
const formButton = document.getElementById('add-edit-btn')
const name = document.getElementById('name')
const city = document.getElementById('city')
const address = document.getElementById('address')
const uniqueSign = document.getElementById('unique-sign')
const description = document.getElementById('description')
const mobileNumber = document.getElementById('mobile-number')
const image = document.getElementById('image')
// const imageFile = document.getElementById('image')
// imageFile.addEventListener("change", (e) => {
//     image = e.target.files[0]
// })
if (actionType === "edit") {
    formButton.textContent = "تعديل"
    axios
        .get(`${backendURL}singleCase/${caseId}?caseType=animal`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
        .then(response => {
            theCase = response.data.case;
            name.value = theCase.species;
            city.value = theCase.area;
            address.value = theCase.address;
            uniqueSign.value = theCase.uniqueSign;
            description.value = theCase.description;
            mobileNumber.value = theCase.phone;
            image.value = theCase.image;
        })
        .catch(error => {
            console.log(error);
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("something went wrong")
                window.location.replace(baseURL + "/landingPage/landing.html");
            }
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const lat = userLocation.lat;
    const lng = userLocation.lng;
    const userId = user.id;

    let data = new FormData();
    data.append("name", name.value);
    data.append("city", city.value);
    data.append("address", address.value);
    data.append("uniqueSign", uniqueSign.value);
    data.append("description", description.value);
    data.append("mobileNumber", mobileNumber.value);
    data.append("image", image.value);

    if (actionType === "edit") {
        axios
            .put(`${backendURL}editCase/${theCase.id}/${theCase.userId}?caseType=animal`, data, {
                headers: {
                    accept: "application/json",
                    "Accept-Language": "en-US,en;q=0.8",
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    Authorization: `bearer ${token}`
                }
            })
            .then(function (response) {
                data = response.data;
                window.location.replace(baseURL + "/index/animal/index.html");
                alert("case was edited successfully")
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("something went wrong")
                    window.location.replace(baseURL + "/landingPage/landing.html");
                }
            });
    } else {
        data.append("lat", lat);
        data.append("lng", lng);
        data.append("userId", userId);

        // if (image) {
        //     data.append("file", image);
        // }

        axios
            .post(`${backendURL}addCase?caseType=animal`, data, {
                headers: {
                    accept: "application/json",
                    "Accept-Language": "en-US,en;q=0.8",
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    Authorization: `bearer ${token}`
                }
            })
            .then(function (response) {
                data = response.data;
                window.location.replace(baseURL + "/index/animal/index.html");
                alert("Animal case was added successfully")
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("something went wrong")
                    window.location.replace(baseURL + "/landingPage/landing.html");
                }
            });
        }
})