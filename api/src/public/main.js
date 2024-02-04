import { loadNotes, onNewNote, onSelected } from './sockets.js'
import { onHandleSubmit, rederNotes, appendNote, fillForm } from './ui.js'

onNewNote(appendNote)
loadNotes(rederNotes)
onSelected(fillForm)

const noteForm = document.querySelector('#noteForm')

noteForm.addEventListener('submit', onHandleSubmit)
