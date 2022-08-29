const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const windowSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    createdAt: {
        type: Date, 
        default: new Date()
    }
})

const Window = mongoose.model('Window', windowSchema);
module.exports = Window;