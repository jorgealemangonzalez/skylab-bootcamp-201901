const logic = require('../../src/logic')

module.exports = (req, res) => {

    const { params: { albumId } } = req
    debugger

    try {
        logic.retrieveAlbums(albumId)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(401).json({
            error:message
        })
    }
}