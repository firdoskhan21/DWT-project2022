var mongo = require('mongodb').MongoClient;
var Binary = require('mongodb').Binary;
const path = require('path');
const express = require('express');
const multer = require('multer');
var fs = require('fs');
const File = require('../models/files.model');
const Router = express.Router();


// generateDownloadUrl=(id)=>{

// }

const upload = multer({
    limits: {
        fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|txt|json|doc|docx|xlsx|xls)$/)) {
            return cb(
                new Error(
                    'only upload files with jpg, jpeg, png, pdf, txt, json, doc, docx, xslx, xls format.'
                )
            );
        }
        cb(undefined, true); // continue with upload
    }
});

Router.post(
    '/upload',
    upload.single('file'),
    async (req, res) => {
        try {
            var response = {}
            const { title, description } = req.body;
            const queryParam = {
                title,
                description,
                mimetype: req.file.mimetype,
                file: req.file.buffer,
                originalfilename: req.file.originalname,
            }
            const file = await File(queryParam);
            await file.save();
            response = { data: req.body, message: "File uploaded succefully", status: 'success' }
            response.data.mimetype = queryParam.mimetype
            res.status(200).send(response)

        } catch (error) {
            res.status(400).send('Error while getting list of files. Try again later.');
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
);

Router.get('/getAll', async (req, res) => {
    try {
        const files = await File.find({});
        const sortedByCreationDate = files.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send('Error while getting list of files. Try again later.');
    }
});

Router.get('/download/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        console.log(file)
        var decode = Buffer.from(file.file)
        // var str = decode.toString('base64')
        res.set({
            'Content-Type': file.mimetype,
            'Content-Dispostion': "attachment; filename=" + file.originalfilename
        });
        console.log(decode)
        const download = Buffer.from(decode.toString('utf-8'), 'base64');
        res.end(download);
        // res.sendFile(
        //     fs.writeFileSync(file.originalfilename + '.' + file.mimetype.split('/')[1], decode)
        // );
    } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
    }
});

module.exports = Router;


