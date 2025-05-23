import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING,
    age INTEGE
    )`).run()

export const getAllNotes = () => db.prepare(`SELECT * FROM notes`).all()
export const getNotesById = (id) => db.prepare(`SELECT * FROM notes WHERE id = ?`).get(id)
export const saveNotes = (title, content) => db.prepare(`INSERT INTO notes (title, content) VALUES (?, ?)`).run(title, content)
export const deleteNotes = (id) => db.prepare(`DELETE FROM notes WHERE id = ?`).run(id)

const notes = [
  {title: 'elso', content: "hajózás"}, {title: 'masodik', content: "főzés"}, {title: 'harmadik', content: "focizás"}, {title: 'negyedik', content: "takarítás"}
]