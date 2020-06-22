const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage: storage}).array('file');

app.use(express.static(path.join(__dirname, "/client/build")));

app.post('/upload', function (req, res) {

    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
            // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
            // An unknown error occurred when uploading.
        }

        return res.status(200).send(req.file)
        // Everything went fine.
    })
});

const port = process.env.PORT || 8080;

app.listen(8080, function () {
    console.log('App running on port 8080');
});