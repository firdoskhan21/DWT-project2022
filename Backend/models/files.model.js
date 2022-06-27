const mongoose = require('mongoose');

const documentSchema = mongoose.Schema(
    {
        originalfilename: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        file: {
            type: Buffer,
            required: true,
            trim: true
        },
        file_url: {
            type: String,
            required: false
        },
        mimetype: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Document = mongoose.model('File', documentSchema);

module.exports = Document;




