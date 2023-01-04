/**
 * @jest-environment jsdom
 */

const fs = require('fs');

const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

describe('Notes view', () => {
  it('displays two notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('First note');
    model.addNote('Second note');

    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('adds a new note', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new NotesModel();
    const view = new NotesView(model);

    const input = document.querySelector('#add-note-input');
    input.value = 'Test note';

    const button = document.querySelector('#add-note-button');
    button.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('Test note');
  })

  it('does not duplicate notes if called twice', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('First note');
    model.addNote('Second note');

    view.displayNotes();
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  })

  it('displays information from the API', () => {
    const mockedModel = new NotesModel();
    const mockedView = new NotesView();
    const mockedClient = {
      LoadNotes: (notes) => {
        callback({
          name: "sinatra/sinatra",
          description: "Some fake description",
        });
      },
    };

    displayNotesFromApi() {
      mockedClient.loadNotes((notes) => {
        mockedModel.setNotes(notes);
        mockedView.displayNotes();
      });
    }
  });
})
    
    // displayNotesFromApi() {
    //   this.client.loadNotes((notes) => {
    //     this.model.setNotes(notes);
    //     this.displayNotes();
    //   });
    // }


//   })
// })