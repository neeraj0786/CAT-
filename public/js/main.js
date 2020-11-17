let callMeForm = document.querySelector('.call-me-form');
let emailRequestForm= document.querySelector('.email-form');

    

    callMeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let phoneInp = callMeForm.querySelector('input');
        fetch('http://localhost:3000/callback-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phoneNumber: phoneInp.value
            })
        }).then((resp) => resp.text()).then(() => alert('We will call '+ phoneInp.value +' ASAP !'), callMeForm.reset());
    })
   

emailRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('http://localhost:3000/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            email:document.querySelector('#email').value,
            message:document.querySelector('#message').value
        })
    }).then((resp) => resp.text()).then((data) => console.log(data), emailRequestForm.reset());
})