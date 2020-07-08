{
    let articlesBlock = document.querySelector('.articles');
    let updateForm = document.querySelector('.update-post-form');
    let questionInp = document.querySelector('#update-question');
    let option1Inp = document.querySelector('#update-option1');
    let option2Inp = document.querySelector('#update-option2');
    let option3Inp = document.querySelector('#update-option3');
    let option4Inp = document.querySelector('#update-option4');
    let correctOptionInp = document.querySelector('#update-correct-option');
    let id;
    
    articlesBlock.addEventListener('click', async function(e) {
        if(e.target.classList.contains('btn-update')) {
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/questions/' + id)
                        .then( (resp) =>  resp.json())
                        .then((data) => data)
                        
                        
            
            questionInp.value = postInfo.question;
            option1Inp.value = postInfo.option1;
            option2Inp.value = postInfo.option2;
            option3Inp.value = postInfo.option3;
            option4Inp.value = postInfo.option4;
            correctOptionInp.value = postInfo.correctOption;



            let articlesTab = document.getElementById('v-pills-articles');
            articlesTab.classList.remove('show');
            articlesTab.classList.remove('active');
            let updateTab = document.getElementById('v-pills-update-post');
            updateTab.classList.add('show');
            updateTab.classList.add('active');
        }
    })

    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch('http://localhost:3000/questions/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question : questionInp.value,
                option1 : option1Inp.value,
                option2 : option2Inp.value,
                option3 : option3Inp.value,
                option4 : option4Inp.value,
                correctOption : correctOptionInp.value
                
            })
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    })
}