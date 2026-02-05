const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Private
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private
const createCategory = async (req, res) => {
    try {
        const { name, description, color } = req.body;

        const category = new Category({
            user: req.user.id,
            name,
            description,
            color
        });

        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            if (category.user.toString() !== req.user.id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await category.deleteOne();
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategories, createCategory, deleteCategory };
