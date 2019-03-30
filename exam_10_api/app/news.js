const multer  = require('multer');
const path = require('path');
const config = require('../config');
const express = require('express');
const nanoid = require('nanoid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = connection => {
    const router = express.Router();
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `news`', (error, results) => {
            if(error) {
                res.status(500).send({error: 'Database error'})
            }
            res.send(results);
        });
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `news` WHERE `id` = ?', req.params.id, (error, results) => {
            if(error) {
                res.status(500).send({error: 'Database error'})
            }
            if(results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: 'News not found'})
            }

        });
    });

    router.post('/', upload.single('image'), (req, res) => {
        const news = req.body;

        if(req.file){
            news.image = req.file.filename;
        }

        connection.query('INSERT INTO `news` (`title`, `content`, `image`, `data`) VALUES (?, ?, ?, ?)',
            [news.title, news.content, news.image, news.data],
            (error, results) => {
                if(error) {

                    res.status(500).send({error: 'Database error'})
                }
                res.send({message: "Ok"});
            }
        );
    });
    return router;
};


module.exports = createRouter;