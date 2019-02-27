const logic = require('../../src/logic')

module.exports = (req, res) => {

    const { params: { trackId } } = req

    try {
        logic.retrieveTrack(trackId)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                resx.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(401).json({
            error:message
        })
    }
}