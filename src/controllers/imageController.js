const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

// @desc    Upload an image
// @route   POST /api/v1/images
// @access  Private
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { category, description, tags } = req.body;

        // Read file and convert to Base64
        const fileData = fs.readFileSync(req.file.path);
        const base64Data = fileData.toString('base64');

        const image = new Image({
            user: req.user.id,
            category: category || null,
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            data: base64Data, // Store the Base64 string
            mimetype: req.file.mimetype,
            size: req.file.size,
            description,
            tags
        });

        const createdImage = await image.save();

        // Delete the file from filesystem immediately after saving to DB
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting temporary file:', err);
        });

        res.status(201).json(createdImage);
    } catch (error) {
        // Clean up file if DB save fails
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all images
// @route   GET /api/v1/images
// @access  Private
const getImages = async (req, res) => {
    try {
        const images = await Image.find({ user: req.user.id })
            .populate('category', 'name color')
            .populate('tags', 'name')
            .sort({ updatedAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an image
// @route   DELETE /api/v1/images/:id
// @access  Private
const deleteImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);

        if (image) {
            if (image.user.toString() !== req.user.id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            // Delete from filesystem if path exists
            if (image.path) {
                const filePath = path.resolve(image.path);
                if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, (err) => {
                        if (err) console.error('Error deleting file:', err);
                    });
                }
            }

            await image.deleteOne();
            res.json({ message: 'Image removed' });
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadImage, getImages, deleteImage };
