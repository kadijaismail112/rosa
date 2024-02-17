import express, { Request, Response } from 'express';
import { callPythonScript } from '../utils/callPythonScript';

const router = express.Router();

// Route to handle user registration
router.post('/register', (req: Request, res: Response) => {
    // Handle user registration logic here
});

// Route to handle user login
router.post('/login', (req: Request, res: Response) => {
    // Handle user login logic here
});

// Route to handle user profile update
router.put('/profile', (req: Request, res: Response) => {
    // Handle user profile update logic here
});

// Route to handle user deletion
router.delete('/delete', (req: Request, res: Response) => {
    // Handle user deletion logic here
});

// route to handle user data processing
router.post('/process-data', async (req, res) => { // Mark function as async
    try {
      const inputData = req.body.data;
      const result = await callPythonScript(inputData); // Now correct
      res.json({ success: true, output: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
  

export default router;
