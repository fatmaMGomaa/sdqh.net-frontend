let cases = [];
let filteredCases;

const container = document.querySelector('.container')
axios
    .get(`${backendURL}allCases?caseType=human`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response => {
        cases = response.data.cases;
        console.log(cases);
        renderingCases(cases, filters, "/singleCase/singleCase.html", "name")
    })
    .catch(error => {
        console.log(error);
        alert("something went wrong")
    });

document.querySelector('.filter__all').addEventListener('click', (e) => {
    filters.filterBy = ''
    renderingCases(cases, filters, "/singleCase/singleCase.html", "name")
})
document.querySelector('.filter__egypt').addEventListener('click', (e) => {
    filters.filterBy = 'مصر'
    renderingCases(cases, filters, "/singleCase/singleCase.html", "name")
})

document.querySelector('.filter__ksa').addEventListener('click', (e) => {
    filters.filterBy = 'السعودية'
    renderingCases(cases, filters, "/singleCase/singleCase.html", "name")
})

document.querySelector('.filter__uae').addEventListener('click', (e) => {
    filters.filterBy = 'الامارات'
    renderingCases(cases, filters, "/singleCase/singleCase.html", "name")
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderingCases(cases, filters, "/singleCase/singleCase.html", "name")
})