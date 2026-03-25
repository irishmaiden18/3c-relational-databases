/*
    7. Set up the users router
*/

// 7a. Import express & router
const express = require("express")
const router = express.Router()

// import controller functionality
const {createUser, addFavoriteAlbum, addNewFavoriteAlbum} = require("./usersController")

// 7b. Route the ability to create a user at localhost:3000/api/users
// We deal with the network code here, and leave the database code to the controller.
// anything that has to do with our database must be async/await
router.post("/", async (req, res) => {

    try {
        
        // call the controller createUser function
        const newUser = await createUser(req.body)

        // send success response to the user
        res.json ({
            message: "success",
            payload: newUser
        })

    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// anything that has to do with our database must be async/await
// handle update or PUT requests
router.put("/:id", async (req, res) => {

    try {

        // call the controller addFavoriteAlbum function
        const updatedUser = await addFavoriteAlbum(req.params.id, req.body)

        // send success response to the user
        res.json ({
            message: "success",
            payload: updatedUser
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// anything that has to do with our database must be async/await
// handle newAlbum update or PUT requests
router.put("/newAlbum/:id", async (req, res) => {

    try {
        
        // call the controller addNewFavoriteAlbum function
        const updatedUser = await addNewFavoriteAlbum(req.params.id, req.body)

        // send success response to the user
        res.json ({
            message: "success",
            payload: updatedUser
        })

    } catch (error) {

        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }

})
// 7c. Export the router
module.exports = router
