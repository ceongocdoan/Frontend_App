const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());
const SECRET_KEY = '1234567890';
app.get('/api/userinfo', (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json(decoded);
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});


app.post('/api/login', (req, res) => {
    const { name, email} = req.body;

    if (name && email) {
        const payload = { name, email };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } else {
        res.status(400).json({ error: 'Invalid input' });
    }
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});
