let signinForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');
let ssigninForm = document.querySelector('.s-sign-in-form');
ssigninForm.addEventListener('submit', function(e){

    e.preventDefault();
    let email = document.querySelector('#s-sign-in-email').value;
    let name = document.querySelector('#s-sign-in-name').value;
    let college = document.querySelector('#s-sign-in-college').value;
    let rollno = document.querySelector('#s-sign-in-rollno').value;
    let invitationKey = document.querySelector('#s-sign-in-key').value;
    let contact = document.querySelector('#s-sign-in-contact').value;

    fetch('http://localhost:3000/candidates/candidatelogin',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({name,email,college,rollno,invitationKey,contact })
    }).then((resp)=>
    {
        if(resp.status === 400)
        throw new Error();
        
        return resp.json(); 
    })
    .then((data)=>
     { window.location.href = data.redirectURL })
     .catch(()=>alert('Wrong Email or Password !'));    // to be checked here for faults 



})

signinForm.addEventListener('submit', function(e){

    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    let password = document.querySelector('#sign-in-password').value;

    fetch('http://localhost:3000/users/login',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({email , password})
    }).then((resp)=>
    {
        if(resp.status === 400)
        throw new Error();
        
        return resp.json(); 
    })
    .then((data)=>
     { window.location.href = data.redirectURL })
     .catch(()=>alert('Wrong Email or Password !'));



})
registerForm.addEventListener('submit', function(e){

    e.preventDefault();
    let email = document.querySelector('#register-email').value;
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-re-enter-password').value;
    if(password!==rePassword)
    {
        return;
    }
    fetch('http://localhost:3000/users/register',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({email , password})
    }).then((resp)=>resp.text()).then((data)=>alert(data));


    
})