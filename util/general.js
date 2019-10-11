const baseURL = "file:///home/fgomaa/Desktop/صدقة.نت/sdqh-frontend";
const backendURL = "https://shrouded-scrubland-71994.herokuapp.com/";
const token = getLocalStorageItem("token");
let caseId = getLocalStorageItem("caseId");
let caseType = getLocalStorageItem("caseType");
let user = getLocalStorageItem("user");
const filters = {
    searchText: '',
    filterBy: ''
}