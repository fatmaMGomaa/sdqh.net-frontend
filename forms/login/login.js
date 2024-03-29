const form = document.getElementById('login')
let data;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    axios.post(`${backendURL}login`, {
        email,
        password
    })
        .then(function (response) {
            data = response.data
            localStorage.clear();
            saveToLocalStorage("token", data.token)
            saveToLocalStorage("user", data.user)
            saveToLocalStorage("userId", data.user.id)
            saveToLocalStorage("userProfile", data.user)
            window.location.replace(baseURL+"/landingPage/landing.html");
        })
        .catch(function (error) {
            console.log(error);
            alert(error.response.data.message)
        });
})