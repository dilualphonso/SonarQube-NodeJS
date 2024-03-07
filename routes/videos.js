const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const crypto = require('crypto');
const path = require('path')




const JSON_FILE_PATH = "./data/videos.json"

function getVideos (){
    const videosJson = fs.readFileSync(JSON_FILE_PATH);
    return JSON.parse(videosJson);
}

function setVideos(videos){
    const videoJson = JSON.stringify(videos);
    fs.writeFileSync(JSON_FILE_PATH,videoJson);
}



    router
    .route('/') // handle GET request to /videos
    .get((_req, res) => {

        // create a filtered version of dataset to render list of videos
        const videos = getVideos().map(video => {
            return {
                id: video.id,
                title: video.title,
                channel: video.channel,
                image:video.image

            }
        })

       return res.status(200).json(videos); // 200 HTTP OK
    })


router.post ('/',(req,res)=>{
   const {id,
     title,
     description
} = req.body;

        const imagePath = `/images/flowers.jpg`;


    const videos= getVideos();
    const newVideo={
        id:crypto.randomUUID(),
        description,
        channel:'Adam William',
        title,
        like:"0",
        view:"0",
        duration:4.02,
        video:"https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
        timestamp:Date.now(),
        comments:[],
        image: imagePath}

        videos.push(newVideo);
        setVideos(videos);
        res.status(201).json(newVideo);
    })


router.get('/:videoId', function(req,res){
    const videoId = req.params.videoId;
    const videos = getVideos();


    const foundVideo = videos.find((video)=>{
        return video.id===videoId;
    });
    if (!foundVideo) {
        return res.status(404).json({ message: "Video not found" });
    }
    return res.status(200).json(foundVideo);
})



module.exports = router;