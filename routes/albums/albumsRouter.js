// 3a. Import express & router
const express = require("express")
const router = express.Router()

// import controller functionality
const createAlbum = require("./albumsController")

// 3b. Deal with a request for a POST to /api/albums
// We deal with the network code here, and leave the database code to the controller.
// anything that has to do with our database must be async/await
router.post("/", async (req, res) => {

    try {
        
        // call the controller function
        const newAlbum = await createAlbum(req.body)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: newAlbum
        })

    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// 3c. Export the router
module.exports = router
