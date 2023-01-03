const NotesModel = require('./notesModel');

describe('NotesModel', () => {
  it ('returns empty array if no notes added', () => {
    const model = new NotesModel();

    expect(model.getNotes()).toEqual([]);
  });

  it ('returns any added notes', () => {
    const model = new NotesModel();
    
    model.addNote('Buy milk');
    model.addNote('Go to the gym');

    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  });

  it ('resets notes', () => {
    const model = new NotesModel();
    
    model.addNote('Buy milk');
    model.addNote('Go to the gym');

    model.reset();

    expect(model.getNotes()).toEqual([]);
  });
});