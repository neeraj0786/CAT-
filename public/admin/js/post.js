async function getPosts() {
    return await fetch('http://localhost:3000/questions')
                    .then((response) => response.json())
                    .then((data) => data);
  }