let data, image;
const form = document.getElementById('signup')
const imageFile = document.getElementById('image')
imageFile.addEventListener("change", (e)=>{
    image = e.target.files[0]
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const gender = document.getElementById('gender').value
    const birthDate = document.getElementById('birthdate').value
    const image = document.getElementById('image').value
    
    let data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("password", password);
    data.append("birthDate", birthDate);
    data.append("gender", gender);
    data.append("image", image);
    // if (image) {
    //     data.append("file", image);
    // }

    axios
        .post(backendURL+"signup", data, {
            headers: {
                accept: "application/json",
                "Accept-Language": "en-US,en;q=0.8",
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`
            }
        })
        .then(function (response) {
            data = response.data;
            localStorage.clear();
            saveToLocalStorage("token", data.token)
            saveToLocalStorage("user", data.user)
            window.location.replace(baseURL + "/landingPage/landing.html");
        })
        .catch(function (error) {
            console.log(error);
            alert(error.response.data.message)
        });
})