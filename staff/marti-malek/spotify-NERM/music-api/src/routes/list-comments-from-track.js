const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { trackId } } = req

    try {
        logic.listCommentsFromTrack(trackId)
            .then(comments => res.json(comments))
            .catch(({ message }) => {
                res.status(404).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(404).json({
            error: message
        })
    }
}