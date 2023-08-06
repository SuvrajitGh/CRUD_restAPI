const express = require('express')
const app = express()
let users = [
    {
        'id': 1,
        'name': 'Spiderman',
        'age': 19
    },
    {
        'id': 2,
        'name': 'Saktiman',
        'age': 50
    },
    {
        'id': 3,
        'name': 'Superman',
        'age': 42
    },
    {
        'id': 4,
        'name': 'Batman',
        'age': 36
    },
]

app.use(express.json());

app.get('/users', (req, res) => {
    res.json(users)
});



// ? CRUD OPERATIONS



//to create a new user
app.post('/users', (req, res) => {
    let newuser = req.body;
    if (!newuser.name || !newuser.age) {
        res.json({ error: 'Name & age required' })
    } else {
        newuser.id = users.length + 1;
        users.push(newuser);
        res.json({message:'user created',newuser});
    }
})
//to update user by id
app.put('/users/:id', (req, res) => {
    let user_id = parseInt(req.params.id);
    let user_idx = users.findIndex(user => user.id === user_id);
    if (user_idx !== -1) {
        let updateuser = { ...users[user_idx], ...req.body };
        users[user_idx] = updateuser;
        res.json(updateuser);
    }
    else {
        res.json({ error: 'User not found Sorry try again' });
    }
})

// to get the user id
app.get('/users/:id', (req, res) => {
    let user_id = parseInt(req.params.id);
    let user = users.find(user => user.id === user_id);
    if (user) {
        res.json(user);
    }
    else {
        res.json({ error: "User not found" });
    }
});

//To Delete user by Id
app.delete('/users/:id', (req, res) => {
    let user_id = parseInt(req.params.id);
    let user_idx = users.findIndex(user => user.id === user_id);
    if (user_idx !== -1) {
        users.splice(user_idx, 1);
        res.json({ message: 'user deleted' });
    } else {
        res.json({ error: 'user not found' });
    }
})


app.listen(8888, () => {
    console.log("server is running ");
})
