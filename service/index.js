const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const path = require('node:path');

const app = express();
const apiRouter = express.Router();
const authCookieName = 'token';
const users = [];
let scores = [];

app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRouter);
app.use(express.static('public'));

apiRouter.post('/auth/create', async (req, res) => {
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
        return res.status(400).send({ msg: 'Email and password are required' });
    }

    const normalizedEmail = email.trim();
    if (findUser('email', normalizedEmail)) {
        return res.status(409).send({ msg: 'Existing user' });
    }

    const user = await createUser(normalizedEmail, password);
    setAuthCookie(res, user);
    return res.send({ email: user.email });
});

apiRouter.post('/auth/login', async (req, res) => {
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).send({ msg: 'Email and password are required' });
    }

    const user = findUser('email', email.trim());
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ msg: 'Unauthorized' });
    }

    setAuthCookie(res, user);
    return res.send({ email: user.email });
});

apiRouter.get('/auth/me', verifyAuth, (req, res) => {
    const user = findUser('token', req.cookies[authCookieName]);
    return res.send({ email: user.email });
});

apiRouter.delete('/auth/logout', (req, res) => {
    const user = findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }

    res.clearCookie(authCookieName);
    return res.status(204).end();
});

apiRouter.get('/scores', verifyAuth, (_req, res) => {
    res.send(scores);
});

apiRouter.get('/quote', async (_req, res) => {
    const response = await fetch('https://api.animechan.io/v1/quotes/random');

    if (!response.ok) {
        return res.status(502).send({ msg: 'Quote service is unavailable' });
    }

    const result = await response.json();
    const data = result.data;

    if (!data?.content || !data?.character?.name) {
        return res.status(502).send({ msg: 'Quote service returned invalid data' });
    }

    return res.send({
        quote: data.content,
        character: data.character.name,
        anime: data.anime?.name ?? '',
    });
});

apiRouter.post('/score', verifyAuth, (req, res) => {
    if (!req.body || !Number.isFinite(req.body.score)) {
        return res.status(400).send({ msg: 'A numeric score is required' });
    }

    scores = updateScores(req.body);
    return res.send(scores);
});

apiRouter.use((_req, res) => {
    res.status(404).send({ msg: 'Not found' });
});

const frontendPath = path.resolve(__dirname, '../dist');
app.use(express.static(frontendPath));
app.get(/.*/, (_req, res, next) => {
    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
        if (err) {
            next(err);
        }
    });
});

app.use((err, _req, res, _next) => {
    console.error(err);
    const status = Number.isInteger(err.status) ? err.status : 500;
    res.status(status).send({
        msg: status === 404 ? 'Not found' : 'Internal server error',
    });
});

function verifyAuth(req, res, next) {
    if (!findUser('token', req.cookies[authCookieName])) {
        return res.status(401).send({ msg: 'Unauthorized' });
    }
    return next();
}

function updateScores(newScore) {
    const insertionIndex = scores.findIndex((score) => newScore.score > score.score);
    if (insertionIndex === -1) {
        scores.push(newScore);
    } else {
        scores.splice(insertionIndex, 0, newScore);
    }

    return scores.slice(0, 10);
}

async function createUser(email, password) {
    const user = {
        email,
        password: await bcrypt.hash(password, 10),
        token: null,
    };
    users.push(user);
    return user;
}

function findUser(field, value) {
    if (!value) {
        return null;
    }
    return users.find((user) => user[field] === value) ?? null;
}

function setAuthCookie(res, user) {
    user.token = uuid.v4();
    res.cookie(authCookieName, user.token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
    });
}

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
