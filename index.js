const { response} = require('express');
const usersData = require('./users.json');
const express = require('express');
const app = express();
const port = 3001
const bodyParser = require('body-parser')

app.use(bodyParser())

app.get('/', (request, response) =>{
    console.log('This is the request body', request.body)
    response.send('This is the main mest backend');  
})

app.get('/users',(request, response) =>{
    console.log(request)
    response.json(usersData);
})

app.get('/users/:id', (request, response)=>{
    usersData.findbyId(request.params.id)
    .then(res=> {
        response.status(201).send(res);
    })
    .catch(err=> {
        console.log(err)
        response.sendStatus(501);
    })
})

app.post('/users', (request,response) => {
        const requestBody = request.body
        console.log(requestBody)
        response.send(requestBody)
})

app.delete('/users', (req, res) => {
    const users = require('./users.json');
    const deleteUsers = users.pop()
    response.send(deleteUsers)
})

app.listen(port,()=>{
    console.log('My app is running on this server')
});
