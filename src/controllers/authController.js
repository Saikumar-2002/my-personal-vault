const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email);

        const user = await User.findOne({ email });

        if (user) {
            console.log('User found, checking password...');
            const isMatch = await user.matchPassword(password);
            console.log('Password match result:', isMatch);

            if (isMatch) {
                res.json({
                    _id: user._id,
                    email: user.email,
                    token: generateToken(user._id)
                });
                return;
            }
        } else {
            console.log('User not found');
        }

        res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Registering user:', email);

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            email,
            password
        });

        if (user) {
            console.log('User created successfully:', user._id);
            res.status(201).json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { authUser, registerUser };
