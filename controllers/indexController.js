const Window = require('../models/window');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const displayIndex = async (req, res) => {

    const { q } = req.query;
    const keys = ["type", "size", "material", "color"];

    const search = (data) => {
        return data.filter((item) => 
        keys.some((key) => item[key].toLowerCase().includes(q) || 
        item[key].toUpperCase().includes(q) || 
        item[key].includes(q))
        )
    };

    await Window.find().then(result => {
        res.json(search(result))
    }).catch(error => console.log(error))
}

const deleteRecord = async (req, res) => {
    await Window.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).send("Successfully deleted"))
    .catch(error => res.status(400).send(error))
}

const editRecord = async (req, res) => {
    const updatedWindow = req.body
    await Window.findOneAndUpdate({ _id: req.params.id }, updatedWindow)
    .then(() => res.status(200).send("Successfully updated"))
    .catch(error => res.status(400).send(error))
}

const addRecord = async (req, res) => {
    const newWindow = req.body
    const window = new Window(newWindow)
    await window.save()
    .then(() => res.status(200).send("Successfully added"))
    .catch(error => res.status(400).send(error))
       
}

const register = (req, res) => {
    
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            console.log('w ifie', err)
            res.json({ error: err})
        }

        let user = new User({
            username: req.body.username,
            password: hashedPass,
            admin: req.body.admin
        }) 
        user.save()
        .then(() => res.status(200).send("Successfully registered"))
        .catch(error => res.status(400).send(error), console.log('w catchu', error))
    })

}

// let window = new Window({
//         type: 'Awning Window',
//         material: 'wood',
//         size: '865 X 1135',
//         color: 'brown',
//         price: '99.99'
//     })
//     window.save().then(window => {
//         console.log(window, 'saved')
//         }).catch(error => console.log(error))

module.exports = {
    displayIndex,
    deleteRecord,
    editRecord,
    addRecord,
    register,
}