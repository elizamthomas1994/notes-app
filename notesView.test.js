/**
 * @jest-environment jsdom
 */

jest.mock('./notesClient')

const fs = require('fs');
const NotesClient = require('./notesClient');

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

    const mockedClient = new NotesClient();
    const model = new NotesModel();
    const view = new NotesView(model, mockedClient);

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

  it('displays information from the API', (done) => {
    const model = new NotesModel();
    const mockedClient = new NotesClient();
    const view = new NotesView(model, mockedClient);

    mockedClient.loadNotes.mockImplementation((callback) => {
      const data = [{content : "This is a note" },{content : "This is another note" }]
      return callback(data)
    })

    view.displayNotesFromApi()
    console.log(document.querySelector('div.note'));
  
    done()
  });

  xit('displays an error when fetch fails', () => {
    const model = new NotesModel();
    const mockedClient = new NotesClient();
    const view = new NotesView(model, mockedClient)

    mockedClient.loadNotes.mockImplementation((callback) => {
      const data = displayError()
      return callback(data)
    })

    view.displayNotesFromApi()
    console.log(document.querySelector('p'));

    expect(document.querySelectorAll('p')[0].textConent).toEqual(
      "Oops, something went wrong!"
    )

    done()
  })
})