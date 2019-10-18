let theCase, comments;
const container = document.querySelector('.container');

axios
    .get(`${backendURL}singleCase/${caseId}?caseType=${caseType}`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response => {
        theCase = response.data.case;
        console.log(theCase)
        comments = theCase.comments;
        if (!theCase) {
            container.innerHTML = "<h1>لا يوجد حالة لعرضها</h1>"
        } else {
            // let imagePath = `${backendURL}${theCase.image}`;
            if (theCase["phone"] === "" || theCase["phone"]=== " "){
                theCase["phone"] = "لا يوجد"
            }
            container.innerHTML = 
            `<div class="content">
                <div class="right">
                    <img src=${ theCase.image } alt=${theCase["name"] || theCase["species"]}/>
                </div>
                <div class="left">
                    <div class="top">
                        <h2>${ theCase["name"] || theCase["species"]}</h2>
                        <p class="date"><i class="far fa-clock"></i> <time>${ theCase["createdAt"].split('T')[0]}</time></p>
                    </div>
                    <div class="middle">
                        <p>${ theCase["description"]}</p>
                        <ul>
                            <li><i class="fas fa-location-arrow"></i> ${ theCase["address"]}</li>
                            <li><i class="fas fa-map-pin"></i> ${ theCase["uniqueSign"]}</li>
                            <li><i class="fas fa-map-marker-alt"></i> ${ theCase["area"]}</li>
                        </ul>
                    </div>
                    <div class="bottom">
                        <ul>
                            <li><i class="fas fa-phone"></i> رقم التليفون: ${ theCase["phone"]}</li>
                            <li><i class="fas fa-user"></i> فاعل الخير: <a href=${baseURL + "/userProfile/userProfile.html"} id="user-of-case">${ theCase["user"]["firstName"]} ${theCase["user"]["lastName"]}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="comment__container">
                <div>
                    <h2>التعليقات</h2>
                </div>
                <div>
                    <form method="POST" name="comment" id="comment-form">
                        <textarea rows="4" placeholder="أكتب تعليقك...." id="comment-content"></textarea>
                        <button type="submit">أرسل</button>
                    </form>
                </div>
                <div id="other-comments"></div>
            </div>`
            const caseUser = document.getElementById('user-of-case')
            caseUser.addEventListener('click', (e) => {
                saveToLocalStorage("userProfile", theCase.user)
                saveToLocalStorage("userId", theCase.userId)
            })
            if (user && theCase.userId === user.id){
                const topContainer = document.querySelector('.top');
                var ordersDiv = document.createElement("div");
                ordersDiv.className = "user-orders";
                ordersDiv.innerHTML =
                    `<div>
                        <ul>
                            <li><a href="" id="edit"><i class="fas fa-pen"></i></a></li>
                            <li id="delete"><i class="fas fa-trash-alt"></i></li>
                        </ul>
                    </div>`
                topContainer.appendChild(ordersDiv);
                if(caseType === "human"){
                    saveActionType("edit", "#edit", `${baseURL}/forms/human/humanForm.html`)
                } else if (caseType === "animal"){
                    saveActionType("edit", "#edit", `${baseURL}/forms/animal/animalForm.html`)
                }
                const deleteButton = document.getElementById('delete')
                deleteButton.addEventListener('click', (e) => {
                    if(confirm("تأكيد مسح هذه الحالة")){
                        axios
                            .delete(`${backendURL}deleteCase/${theCase.id}/${theCase.userId}?caseType=${caseType}`, {
                                headers: {
                                    Authorization: `bearer ${token}`
                                }
                            })
                            .then(response => {
                                alert(response.data.message);
                                if(caseType === "human"){
                                    window.location.replace(baseURL + "/allCases/allCases.html");
                                }else {
                                    window.location.replace(baseURL + "/allCases/animalAllCases/allCases.html");
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                alert(error.response.data.message)
                            });
                    }
                })
            }
            const commentForm = document.querySelector('#comment-form');
            commentForm.addEventListener("submit", (e) => {
                e.preventDefault();
                if (!token) {
                    alert("please log in first");
                } else {
                    const comment = document.getElementById('comment-content').value
                    let data = new FormData();
                    data.append("comment", comment);
                    data.append("userId", user.id);
                    data.append("caseType", caseType);
                    data.append("caseId", caseId);

                    axios.post(backendURL+"addComment", data, {
                        headers: {
                            accept: "application/json",
                            "Accept-Language": "en-US,en;q=0.8",
                            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                            Authorization: `bearer ${token}`
                        }
                    })
                        .then(function (response) {
                            location.reload();
                        })
                        .catch(function (error) {
                            console.log(error);
                            alert(error.response.data.message)
                        });
                }
                    
            })
            
            if (comments.length > 0) {
                const caseComments = document.querySelector('#other-comments');
                let commentUser
                // let commentImage;
                for (var i = 0; i < comments.length; i++){
                    // commentImage = `${backendURL}${comments[i]['user']['image']}`;
                    var commentDiv = document.createElement("section");
                    commentDiv.className = "single-comment";
                    commentDiv.setAttribute("id", comments[i]["id"])
                    commentDiv.innerHTML =
                        `<div class="comment-left">
                            <a class="comment-user" href=${baseURL + "/userProfile/userProfile.html"}><img src=${comments[i]['user']['image']} alt=${comments[i]['user']['firstName']} /></a>
                        </div>
                        <div class="comment-right">
                            <p><a class="comment-user" href=${baseURL + "/userProfile/userProfile.html"}>${comments[i]['user']['firstName']}:</a>   ${comments[i]['content']}</p>
                            <p><i class="far fa-clock"></i> <time>${comments[i]["createdAt"].split('T')[0]}</time></p>
                        </div>`

                    caseComments.appendChild(commentDiv);
                    commentUser = document.querySelectorAll(".comment-user")
                    commentUser.forEach((userInfo) => {
                        userInfo.addEventListener('click', (e) => {
                            comments.forEach(item => {
                                if(item.id === +userInfo.closest("section").getAttribute('id')){
                                    saveToLocalStorage("userProfile", item["user"])
                                    saveToLocalStorage("userId", item["user"]["id"])
                                }
                            })
                            
                        })
                    })
                }
                
            }
        }
    })
    .catch(error => {
        console.log(error);
        if (error.response) {
            alert(error.response.data.message)
        } else {
            alert("something went wrong")
            window.location.replace(baseURL + "/landingpage/landing");
        }
    });

