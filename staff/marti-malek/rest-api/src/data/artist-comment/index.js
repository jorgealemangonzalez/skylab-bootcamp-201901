const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises
const file = path.join(__dirname, 'artist-comments.json')


const artistComment = {
    add: comment => {
        comment.id = uuid()
        
        return fsPromises.readFile(file, 'utf8')
            .then(comments => JSON.parse(comments))
            .then(content => {
                content.push(comment)
                return content
            })
            .then(content => fsPromises.writeFile(file, JSON.stringify(content))
        )
    },
    retrieve: id => {
        debugger
        return fsPromises.readFile(file, 'utf8')
            .then(content => JSON.parse(content))
            .then(content => {
                let result = content.find(comment => comment.id === id)
                return result? result : null
            })
    },
    update: comment => {
        return fsPromises.readFile(file, 'utf8')
            .then(comments => JSON.parse(comments))
            .then(content => {
                const index = content.findIndex(elem => elem.id === comment.id)
                content.splice(index, 1)
                content.push(comment)
                return content
            })
            .then(content => fsPromises.writeFile(file, JSON.stringify(content)))
    },
    delete: id => {
        return fsPromises.readFile(file, 'utf8')
            .then(comments => JSON.parse(comments))
            .then(content => {
                const index = content.findIndex(elem => elem.id === id)
                content.splice(index, 1)
                return content
            })
            .then(content => fsPromises.writeFile(file, JSON.stringify(content)))
    },
    find: criteria => {
        const prop = criteria[Object.keys(criteria)[0]] // property value
        const prop = Object.keys(criteria)[0] // property name (string)


    }
}

module.exports = artistComment