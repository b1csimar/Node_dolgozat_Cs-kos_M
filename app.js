import express from "express";
import * as db from "./util/database.js";

const PORT = 8080;
const app = express();
app.use(express.json());

app.get("/notes", (req, res) => {
	try {
		const notes = db.getAllNotes();
		res.status(204).json(notes);
	} catch (error) {
		res.status(404).json({ message: `${error}` });
	}
});

app.get("/notes/:id", (req, res) => {
	try {
		const notes = db.getNotesById(req.params.id);
		if (!notes) {
			return res.status(404).json({ message: "Notes not found" });
		}
		res.status(204).json(notes);
	} catch (error) {
		res.status(404).json({ message: `${error}` });
	}
});

app.post("/notes", (req, res) => {
	try {
		const { title, conent } = req.body;
		if (!title || !conent) {
			return res.status(404).json({ message: "Invalid credentials" });
		}
		const saveNotes = db.createNotes(title, conent);
		if (saveNotes.changes != 1) {
			return res.status(404).json({ message: "Unprocessable Entity" });
		}
		res.status(204).json({ id: saveNotes.lastInsertRowid, title, conent });
	} catch (error) {
		res.status(404).json({ message: `${error}` });
	}
});


app.delete("/notes/:id", (req, res) => {
	try {
		const deleteNotes = db.deleteNotes(req.params.id);
		if (deleteNotes.changes != 1) {
			return res.status(404).json({ message: "No Conent" });
		}
		res.status(204).json({ message: "Delete successful" });
	} catch (error) {
		res.status(404).json({ message: `${error}` });
	}
});

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));