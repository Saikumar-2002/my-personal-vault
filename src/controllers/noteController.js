const Note = require('../models/Note');

// @desc    Get all notes
// @route   GET /api/v1/notes
// @access  Private
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
            .populate('category', 'name color')
            .populate('tags', 'name')
            .sort({ updatedAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single note
// @route   GET /api/v1/notes/:id
// @access  Private
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
            .populate('category', 'name color')
            .populate('tags', 'name');

        if (note) {
            if (note.user.toString() !== req.user.id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            res.json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a note
// @route   POST /api/v1/notes
// @access  Private
const createNote = async (req, res) => {
    console.log(req.body);

    try {
        const { title, content, category, tags } = req.body;

        const note = new Note({
            user: req.user.id,
            title,
            content,
            category,
            tags
        });

console.log("I reached createNote");

        const createdNote = await note.save();
        res.status(201).json(createdNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a note
// @route   PUT /api/v1/notes/:id
// @access  Private
const updateNote = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const note = await Note.findById(req.params.id);

        if (note) {
            if (note.user.toString() !== req.user.id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            note.title = title || note.title;
            note.content = content || note.content;
            note.category = category || note.category;
            note.tags = tags || note.tags;

            const updatedNote = await note.save();
            res.json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/v1/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note) {
            if (note.user.toString() !== req.user.id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await note.deleteOne();
            res.json({ message: 'Note removed' });
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote };
