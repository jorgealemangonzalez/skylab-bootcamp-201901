const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { trackId }, body: { userId, text }, headers: { authorization } } = req
    
    const token = authorization.substring(7)

    try {
        logic.addCommentToTrack(userId, token, trackId, text)
            .then(id => res.json({ id }))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}