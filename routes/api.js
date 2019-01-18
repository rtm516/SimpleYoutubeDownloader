const youtubedl = require('youtube-dl');
const request = require('request');
const ffmpeg = require('fluent-ffmpeg');

const express = require('express');
const router = express.Router();

router.get('/download', function(req, res) {
    if (/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/.test(req.query.url)) {
        try {
            youtubedl.getInfo(req.query.url, function(err, info) {
                if (err) throw err;
    
                if (req.query.mp3 == "true") {
                    res.setHeader("Content-Disposition", "attachment;filename='" + info._filename.replace(".mp4", ".mp3") + "'")
    
                    res.setHeader("Content-Type", "audio/mp3")
                    var stream = new ffmpeg(info.url).audioCodec('libmp3lame').format('mp3');
                    stream.pipe(res, {end: true});
                }else{
                    res.setHeader("Content-Disposition", "attachment;filename='" + info._filename + "'")
    
                    res.setHeader("Content-Type", "video/mp4")
                    request(info.url).pipe(res);
                }
            });
        } catch (error) { } // They closed the file stream 
    }else{
        throw new Error("Invalid URL");
    }    
});

router.get('/getInfo', function(req, res) {
    if (/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/.test(req.query.url)) {
        try {
            youtubedl.getInfo(req.query.url, function(err, info) {
                if (err) throw err;
                var newInfo = {};

                newInfo.id = info.id;
                newInfo.title = info.title;
                newInfo.thumbnail = info.thumbnail;
    
                res.send(newInfo);
            });
        } catch (error) { } // They closed the file stream 
    }else{
        throw new Error("Invalid URL");
    }    
});

module.exports = router;