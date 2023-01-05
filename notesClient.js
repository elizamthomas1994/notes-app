class NotesClient {
  loadNotes(callback, error) {
    return fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        callback(data);
      })
      .catch(() => {
        return error();
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