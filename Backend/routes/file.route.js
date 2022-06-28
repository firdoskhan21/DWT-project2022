const constants = require('../config');
const mongoose = require("mongoose");
const express = require('express');
const multer = require('multer');
var fs = require('fs');
const File = require('../models/files.model');
const Router = express.Router();
const { GridFsStorage } = require("multer-gridfs-storage");

let bucket;
mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: constants.bucket
    });
});

const storage = new GridFsStorage({
    url: constants.mongoDBUri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: constants.bucket
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.([^.]+)$/)) {
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
                _id: req.file.id,
                title,
                description,
                mimetype: req.file.mimetype,
                originalfilename: req.file.originalname,
            }
            const file = await File(queryParam);
            await file.save();
            response = { file_data: req.body, message: "File uploaded succefully", status: 'success' }
            response.file_meta = req.file
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
        const fileObj = await File.findOne({ _id: req.params.id });
        console.log(fileObj)
        const file = bucket
            .find({
                filename: fileObj.originalfilename
            })
            .toArray((err, files) => {
                console.log(files)
                if (!files || files.length === 0) {
                    return res.status(404)
                        .json({
                            err: "no files exist"
                        });
                }
                bucket.openDownloadStreamByName(fileObj.originalfilename)
                    .pipe(res);
            });

    } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
    }
});

module.exports = Router;


