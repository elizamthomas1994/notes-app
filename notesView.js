class NotesView {
  constructor(model, client) {
    this.client = client;
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');

    document.querySelector('#add-note-btn').addEventListener('click', () => {
      const newNote = document.querySelector('#add-note-input').value;
      this.addNewNote(newNote);

      const userInput = document.querySelector('#add-note-input')
      userInput.value = '';
    });

    document.querySelector('#reset-btn').addEventListener('click', () => {
      this.client.reset();
    });
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.client.createNote(newNote);
    this.displayNotes();
  }

  displayNotes() {
    document.querySelectorAll('.note').forEach(element => {
      element.remove();
    });

    const notes = this.model.getNotes()

    notes.forEach(note => {
      const noteEl = document.createElement('div')
      this.client.emojify(note, (response) => {
        noteEl.textContent = response.emojified_text;
      })
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }

  displayNotesFromApi() {
    this.client.loadNotes((notes) => {;
      this.model.setNotes(notes);
      this.displayNotes();
    },
    () => this.displayError());
  }

  resetNotes() {
    this.client
    .reset(() => this.displayError())
    .then(() => this.displayNotesFromApi);
  }

  displayError() {
    const errorMessage = document.createElement('p')
    errorMessage.textContent = "Oops, something went wrong!";
    errorMessage.className = 'error';
    this.mainContainerEl.append(errorMessage);
  };

  
}


module.exports = NotesView;