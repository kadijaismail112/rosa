import { Request, Response } from 'express';
import { callPythonScript } from '../utils/callPythonScript';
import db from '../db'; // This would be your database connection module

// Function to create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        
        // Assume db.query is a function that runs your SQL query against the database
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );

        const newUser = result.rows[0]; // Depending on your SQL client, this may vary

        res.status(201).send({ message: 'User created', user: newUser });
    } catch (error) {
        if (error.code === '23505') { // Example of handling a unique constraint violation
            return res.status(409).send({ message: 'Email already exists' });
        }
        res.status(500).send({ message: 'Server error', error: error });
    }
};

// Function to get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);

        const user = result.rows[0];
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error });
    }
};

export const processData = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const result = await callPythonScript(data);
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error });
    }
}

// Add more functions for other CRUD operations

export default {
    createUser,
    getUserById,
    // ... other exported functions
};
