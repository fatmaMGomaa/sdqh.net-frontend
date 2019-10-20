let data;
const actionType = getLocalStorageItem("actionType");
removeLocalStorageItem("actionType");
const form = document.getElementById('signup');
const formButton = document.getElementById('add-edit-btn')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const password = document.getElementById('password')
const gender = document.getElementById('gender')
const birthDate = document.getElementById('birthdate')
const image = document.getElementById('image')
// const imageFile = document.getElementById('image')
// imageFile.addEventListener("change", (e)=>{
//     image = e.target.files[0]
// })

if (actionType === "edit") {
    const newPassword = document.getElementById('newPassword');
    const newPasswordDiv = document.getElementById('addNewPassword');
    newPasswordDiv.style.display="block"
    formButton.textContent = "تعديل";
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
    gender.value = user.gender;
    birthDate.value = user.birthDate;
    image.value = user.image;
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let data = new FormData();
    data.append("firstName", firstName.value);
    data.append("lastName", lastName.value);
    data.append("email", email.value);
    data.append("password", password.value);
    data.append("birthDate", birthDate.value);
    data.append("gender", gender.value);
    data.append("image", image.value);
    // if (image) {
    //     data.append("file", image);
    // }
    if (actionType === "edit") {
        data.append("newPassword", newPassword.value);
        axios
            .put(`${backendURL}editUser`, data, {
                headers: {
                    accept: "application/json",
                    "Accept-Language": "en-US,en;q=0.8",
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    Authorization: `bearer ${token}`
                }
            })
            .then(function (response) {
                data = response.data;
                saveToLocalStorage("token", data.token)
                saveToLocalStorage("user", data.user)
                saveToLocalStorage("userId", data.user.id)
                saveToLocalStorage("userProfile", data.user)
                window.location.replace(baseURL + "/userProfile/userProfile.html");
                alert("your profile was updated successfully")
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("something went wrong")
                    window.location.replace(baseURL + "/userProfile/userProfile.html");
                }
            });
    }else {
        axios
            .post(backendURL + "signup", data, {
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
                saveToLocalStorage("userId", data.user.id)
                saveToLocalStorage("userProfile", data.user)
                window.location.replace(baseURL + "/landingPage/landing.html");
            })
            .catch(function (error) {
                console.log(error);
                alert(error.response.data.message)
            });
    }
})