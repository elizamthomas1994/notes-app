class NotesClient {
  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        callback(data);
      });
  }

  createNote(note) {
    const data = {content: note}
    fetch('http://localhost:3000/notes', {
    method: 'POST',
    headers: {
    'content-type': 'application/json'
    },
    body: JSON.stringify(data)
    }).then(response => response.json())
    .then(response => console.log(response));
  }
}

module.exports = NotesClient;

// const data = { username: 'example' };

// fetch('https://example.com/profile', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });