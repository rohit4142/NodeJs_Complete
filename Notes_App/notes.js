const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

const getNotes = ()=> {
    return 'Your notes...'
}

const addNote =  (title, body)=> {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note)=> {
    //     return note.title === title
    // }) we removed line beacuse filter method will go through each and every element and doesn't stop even a match is found
    const duplicateNote=notes.find((note)=> note.title===title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote =(title)=> {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

const saveNotes =(notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const listNotes=()=>{
   console.log("Your Notes")
   const notes=loadNotes();
   notes.forEach(element => {
    console.log(element.title)
   });
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const readNote=(title)=>{
    const notes=loadNotes();
    const duplicateNote=notes.find((note)=> note.title===title)
    if(duplicateNote)
    {
        console.log(chalk.red(duplicateNote.title))
        console.log(chalk.green(duplicateNote.body))
    }
    else
    console.log("Note not present")

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNote:readNote
}