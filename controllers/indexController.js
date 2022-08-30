const Window = require('../models/window');

const displayIndex = (req, res) => {
    Window.find().then(result => {
        res.json(result)
    }).catch(error => console.log(error))
}

const deleteRecord = async (req, res) => {
    console.log('wchodzi')
    await Window.deleteOne({ _id: req.params.id }).then(response => console.log('usunięto'))
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
}