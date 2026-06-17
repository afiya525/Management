import user from "../models/user.js";

export const create = async(req, res) => {
    try {
        const newUser = new user(req.body);
        const { username, email, pan, adhaar } = req.body;

        const existingUser = await user.findOne({
            $or: [
                { username: username },
                { email: email },
                { pan: pan },
                { adhaar: adhaar }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User with the same username or email already exists' });
        }

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}