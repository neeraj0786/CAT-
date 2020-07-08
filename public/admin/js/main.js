
   let addPostBtn= document.querySelector('.create-post-btn');
   let logoutbtn = document.querySelector('.log-out-btn');
   document.addEventListener('DOMContentLoaded', async function() {

            addPosts();
            addCallbackRequests();
            addEmails();

    })

   
addPostBtn.addEventListener('click',function() {
    let articlesTab = document.getElementById('v-pills-articles');
    articlesTab.classList.remove('show');
    articlesTab.classList.remove('active');

    let createTab = document.getElementById('v-pills-create-post');
    createTab.classList.add('show');
    createTab.classList.add('active');
})

async function addPosts()
{
    let posts =  await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML='';
    let i=1;
    posts.forEach((post) => {
        let postHTML =`<article class="d-flex justify-content-between align-items-center articles-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type ="hidden" value ="${post.id}">
        <div class="name w30">${post.question.substr(0,7)}</div>
        <div class="date w30">${post.date}</div>
        <div class="country w20">${post.correctOption}</div>
        <div class="Edit w10"><button class="btn btn-link btn-update">Edit</button></div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
        articles.insertAdjacentHTML("beforeend",postHTML);
})
}

async function addCallbackRequests() {
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-Callbacks');
    requestsBlock.innerHTML = '';
    let i = 1;
    requests.forEach((request) => {
        let requestHTML = ` 
        <article class="d-flex justify-content-between align-items-center articles-inline">
       
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${request.id}">
            <div class="name w60">${request.phoneNumber}</div>
            <div class="date w30">${request.date}</div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
        </article>`;
        requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
}
async function addEmails() {
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mails');
   emailsBlock.innerHTML = '';
    let i = 1;
    emails.forEach((email) => {
        let emailHTML = `
        <article class="d-flex justify-content-between align-items-center articles-inline">
        
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${email.id}">
            <div class="name w20">${email.name}</div>
            <div class="date w30">${email.email}</div>
            <div class="date w40">${email.message}</div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
        </article>`;
        emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
    })
}

logoutbtn.addEventListener('click',function()
{
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})