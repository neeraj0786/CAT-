let logoutbtn = document.querySelector('.log-out-btn');
let i=0;
let score = new Array();
function sessionout()
{
    let total = 0;
    for(let j in score)
    {
        if(score[j]==1)
            total++;
    }
    total =5;
    

    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';

}

logoutbtn.addEventListener('click',sessionout);
setTimeout(sessionout, 10000, 'funky');
document.addEventListener('DOMContentLoaded', async function() {

    addPosts();
    

})

async function getPosts() {
    return await fetch('http://localhost:3000/questions')
                    .then((response) => response.json())
                    .then((data) => data);
  }
async function addPosts()
{
    let posts =  await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML='';
    
    
    
            let postHTML =`<div class="question">
            Q${i+1}. ${posts[i].question} ?
            </div>
        <div class="options">
            <div class="opt">
            <input type="radio" name="option" value="1"> ${posts[i].option1}<br>
            <input type="radio" name="option" value="2"> ${posts[i].option2}<br>
            <input type="radio" name="option" value="3"> ${posts[i].option3}<br>
            <input type="radio" name="option" value="4"> ${posts[i].option4}<br>
            </div>

            <div class="photo" id="img"><img src="${posts[i].imageURL}" alt="not available" ></div>
        </div>
        
        
        `;
        articles.insertAdjacentHTML("beforeend",postHTML);
        let selectedOption = $("input:radio[name=option]:checked").val()
        if(selectedOption==posts[i].correctOption)
        {
            if(score[i]==null)
            {
                score[i]=1;
            }
        }
        else
        {
            score[i]=0;
        }
        

        

}
let previousbtn = document.querySelector('.previous');
let nextbtn = document.querySelector('.next');
previousbtn.addEventListener('click',function()
{
    if(i>0)
    {
        i--;
    }
    addPosts();
})
nextbtn.addEventListener('click',function()
{
    i++;
    
    addPosts();
})