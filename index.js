const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');

// console.log("The notes app is running")

const model = new NotesModel();
const client = new NotesClient();
console.log(model.getNotes());
// model.addNote('This is an example note');

const view = new NotesView(model, client);

view.displayNotesFromApi();

