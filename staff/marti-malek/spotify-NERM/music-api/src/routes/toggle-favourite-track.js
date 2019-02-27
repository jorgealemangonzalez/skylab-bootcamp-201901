const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { trackId }, body: { userId }, headers: { authorization } } = req
    
    const token = authorization.substring(7)
    
    try {
        logic.toggleFavoriteTrack(userId, token, trackId)
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