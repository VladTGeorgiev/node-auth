const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const users = [];

app.post('/signup', async (req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send(user)
    } catch {
        res.status(500).send()
    }
});

app.post('/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
      return res.status(404).send('User not found')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.status(202).send('Logged in')
      } else {
        res.status(401).send('Unauthorised')
      }
    } catch {
      res.status(500).send()
    }
});

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
});
