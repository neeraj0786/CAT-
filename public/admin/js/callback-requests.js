async function getCallbackRequests() {
    return await fetch('http://localhost:3000/callback-requests')
                    .then((response) => response.json())
                    .then((data) => data);
  }


  let callbackRequestBlock = document.querySelector('#v-pills-Callbacks');

  callbackRequestBlock.addEventListener('click', function(e) {
    if(e.target.classList.contains('btn-remove')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/callback-requests/' + id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    }
})