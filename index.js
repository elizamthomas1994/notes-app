const NotesModel = require('./notesModel');

console.log("The notes app is running")

const model = new NotesModel();
console.log(model.getNotes());
