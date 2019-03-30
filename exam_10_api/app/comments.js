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
        connection.query('SELECT * FROM `comments`', (error, results) => {
            if(error) {
                res.status(500).send({error: 'Database error'})
            }
            res.send(results);
        });
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `comments` WHERE `news_id` = ?', req.params.id, (error, results) => {
            if(error) {
                res.status(500).send({error: 'Database error'})
            }
            if(results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: 'Comments not found'})
            }

        });
    });

    router.post('/', upload.single('image'), (req, res) => {
        const comments = req.body;

        if(req.file){
            news.image = req.file.filename;
        }

        connection.query('INSERT INTO `comments` (`id`, `news_id`, `author`, `comment`) VALUES (?, ?, ?, ?)',
            [comments.id, comments.news_id, comments.author, comments.comment],
            (error, results) => {
                if(error) {

                    res.status(500).send({error: 'Database error'})
                }
                res.send({message: "Ok"});
            }
        );
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `comments` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: error.sqlMessage});
            }
            res.send({message: "Success"});
        });
    });

    return router;
};


module.exports = createRouter;