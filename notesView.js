class NotesView {
  constructor(model, client) {
    this.client = client;
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');

    this.addButtonEl = document.querySelector('#add-note-button');

    this.addButtonEl.addEventListener('click', () => {
      const newNote = document.querySelector('#add-note-input').value;
      this.addNewNote(newNote);
      this.client.createNote(newNote);

      const userInput = document.querySelector('#add-note-input')
      userInput.value = '';
    });
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    // this.client.createNote(note);
    this.displayNotes();
  }

  displayNotes() {
    document.querySelectorAll('.note').forEach(element => {
      element.remove();
    });

    const notes = this.model.getNotes()

    notes.forEach(note => {
      const noteEl = document.createElement('div')
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }

  displayNotesFromApi() {
    this.client.loadNotes((notes) => {
      this.model.setNotes(notes);
      this.displayNotes();
    });
  }
}


module.exports = NotesView;