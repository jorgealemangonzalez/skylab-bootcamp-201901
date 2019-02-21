'use strict'

const { ObjectId } = require('mongodb')

const user = {
    collection: null,

    add(user) {
        
        if (user === undefined || user === null) throw Error('user should be defined')
        if (user.constructor !== Object) throw TypeError(`${user} should be an object`)

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },

    findByEmail(email) {
        return this.collection.findOne({ email: email })
    },

    findByUserId(userId) {
        debugger
        return this.collection.findOne({ _id: ObjectId(userId) })
    }
}

module.exports = user