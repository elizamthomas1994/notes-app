class NotesClient {
  loadNotes(callback, error) {
    return fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => callback(data))
      .catch(() => error());
  }

  createNote(note, error) {
    const data = {content: note}
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
      'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .catch(() => error());
  }

  reset(error) {
    fetch('http://localhost:3000/notes', {
      method: 'DELETE'
    }).catch(() => error);
  }

  emojify(note, callback) {
    const data = {text: note}
    fetch('https://makers-emojify.herokuapp.com', {
      method: 'POST',
      headers: {
      'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => callback(data));
  }
}

module.exports = NotesClient;