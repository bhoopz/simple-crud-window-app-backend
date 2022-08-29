const displayIndex = (req, res) => {
    res.send({strona: 'glowna'})
}


const getWindows = (req, res) => {
    res.send({okna: "wysle"})
}

module.exports = {
    getWindows,
    displayIndex,
}