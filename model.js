const mongoose = require('mongoose')
const Schema=mongoose.Schema
const schemaName = new Schema({
        name: {type: String},
        occupation: {type: String},
        catchPhrase: {type: String},
        celebrity_id: {type: String}
    },
    {collection: 'celebrity'}
    )

    
module.exports = mongoose.model('sampleModel',schemaName)