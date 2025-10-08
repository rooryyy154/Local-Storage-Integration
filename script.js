const form = document.getElementById('noteForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const notesContainer = document.getElementById('notesContainer');

window.addEventListener('DOMContentLoaded', loadNotes);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    const note = { id: Date.now(), title, content };
    saveNote(note);
    addNoteToDOM(note);
    form.reset();
  }
});

function saveNote(note) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(addNoteToDOM);
}

function addNoteToDOM(note) {
  const div = document.createElement('div');
  div.classList.add('note');
  div.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.content}</p>
    <button class="delete-btn" onclick="deleteNote(${note.id})">×</button>
  `;
  notesContainer.appendChild(div);
}

function deleteNote(id) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));
  notesContainer.innerHTML = '';
  loadNotes();
}
