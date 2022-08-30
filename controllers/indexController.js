const Window = require('../models/window');

const displayIndex = async (req, res) => {
    await Window.find().then(result => {
        res.json(result)
    }).catch(error => console.log(error))
}

const deleteRecord = async (req, res) => {
    await Window.deleteOne({ _id: req.params.id })
    .then(response => res.send({deleted: response.deletedCount}))
    .catch(error => console.log(error))
}

const editRecord = async (req, res) => {
    //const {newWindow} = req.body
    // await Window.findOneAndUpdate({ _id: req.params.id }, newWindow)
    // .then(response => console.log(response))
    // .catch(error => console.log(error))
    console.log(req.body, req.params)
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
    editRecord
}