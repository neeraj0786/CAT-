let createForm = document.querySelector('.create-post-form');
let createQuestion = document.querySelector('#create-question');
let createOption1 = document.querySelector('#create-option1');
let createOption2 = document.querySelector('#create-option2');
let createOption3 = document.querySelector('#create-option3');
let createOption4 = document.querySelector('#create-option4');
let createCorrectOption = document.querySelector('#create-correct-option');
let createImageUrl = document.querySelector('#create-image-url');
let createImageFile = document.querySelector('#create-image-file');

createForm.addEventListener('submit',function(e) {
    e.preventDefault();

        let data = new  FormData();
        data.append('question',createQuestion.value);
        data.append('option1',createOption1.value);
        data.append('option2',createOption2.value);
        data.append('option3',createOption3.value);
        data.append('option4',createOption4.value);
        data.append('correctOption',createCorrectOption.value);
        data.append('imageURL',createImageUrl.value);
        data.append('imageFile',createImageFile.files[0]);




    fetch('http://localhost:3000/questions',{
        method : 'POST',
       /* headers : { 'Content-Type' : 'application/json'},*/
        body :  data /*JSON.stringify({
            title : createTitle.value,
            country : createCountry.value,
            description : createText.value,
            imageURL : createImageUrl.value
        })*/
    }).then((response) => response.text()).then((data)=>window.history.go());
})


function disableInput(input1,input2)
{
    if(input1)
    {
        input2.disabled=true;
    }
    else
    {
        input2.disabled=false;
    }
}
createImageUrl.addEventListener('change',function() {disableInput(this,createImageFile)});
createImageFile.addEventListener('change',function() {disableInput(this,createImageUrl)});
