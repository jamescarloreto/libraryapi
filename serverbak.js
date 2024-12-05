import mongoose from 'mongoose';
import { uri } from './atlas_uri.js';
import { Book } from './models/books.js';
import User from './models/users.js';
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const PORT = 5000;
app.use(express.json());
app.use(cors());

async function main() {

    mongoose.connect(uri)
    .then(() => {
        console.log('Database connected');
        fetchUsers();
      })
    .catch(err => console.error('Error connecting to MongoDB:', err));
} 

async function fetchUsers() {
    try {
      const users = await User.find();
      console.log('Users:', users);
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
}

main();

app.post("/api/userlogin", async (req, res) => {
    const { username, password } = req.body;

    console.log('Received username:', username);
    console.log('Received password:', password);

    try {
        const user = await User.findOne({ username: username, password: password });

        if (user) {
            res.status(200).json({ success: true, user });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error(`Error logging in: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`server is up and running in port ${PORT}.`)
});