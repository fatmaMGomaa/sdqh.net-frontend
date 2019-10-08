const userLocation = getLocalStorageItem("location");
const user = getLocalStorageItem("user");
const token = getLocalStorageItem("token");
const baseURL = "https://sdqh-net.netlify.com";
const backendURL = "https://shrouded-scrubland-71994.herokuapp.com/";

if (!user || !token) {
    alert("you have to log in first")
    window.location.replace(baseURL + "/forms/login/login.html");
}
if (!userLocation) {
    alert("you have to turn on yor GPS to know your current location")
    window.location.replace(baseURL + "/index/animal/index.html");
}

let data, image;
const form = document.getElementById('animal')
const imageFile = document.getElementById('image')
imageFile.addEventListener("change", (e) => {
    image = e.target.files[0]
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value
    const city = document.getElementById('city').value
    const address = document.getElementById('address').value
    const uniqueSign = document.getElementById('unique-sign').value
    const description = document.getElementById('description').value
    const mobileNumber = document.getElementById('mobile-number').value
    const image = document.getElementById('image').value
    const lat = userLocation.lat;
    const lng = userLocation.lng;
    const userId = user.id;

    let data = new FormData();
    data.append("name", name);
    data.append("city", city);
    data.append("address", address);
    data.append("uniqueSign", uniqueSign);
    data.append("description", description);
    data.append("mobileNumber", mobileNumber);
    data.append("lat", lat);
    data.append("lng", lng);
    data.append("userId", userId);
    data.append("image", image);
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
            alert(error.response.data.message)
        });
})