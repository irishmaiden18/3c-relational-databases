// 6a. Import the User model
const User = require("./usersModel")

// import the albums controller
const createAlbum = require("../albums/albumsController")

// 6b. Write functionality to create a user

// write a function that will take in user data and create a new data entry based on that data
// everything that has to do with our database requires async/await
const createUser = async (userData) => {

    try {

        // creating the new user the same way we would do normally except inside our controller file
        const newUser = await User.create(userData)

        //return the new user
        return newUser
        
    } catch (error) {
        
        // propogates the error to the router file
        throw Error("Error creating user")

    }
}

// add an album to a user's favoriteAlbums list 
// everything that has to do with our database requires async/await
// we need a way to find the user and then update the user's album list by adding an album ObjectId to the list
const addFavoriteAlbum = async (userId, albumId) => {

    try {
        
        // find given user and update the favoriteAlbums list
        /* 
            going to push an albumId into the favoriteAlbums array by passing in an object like so:

                {
                    "favoriteAlbums": "69c2e53f0f5ad687d3fb52c0"
                }

        */
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {$push: albumId}, // update by pushing data to an array as opposed to overwriting the original
            {new: true} 
        )

        // return the updated user
        return updatedUser

    } catch (error) {
        
        // propogates the error to the router file
        throw error
    }
}

// add an album to the user's favorite album list except this time, the album is NOT in the database yet
// we're going to pass in a user along with albumData instead of an albumId
// everything that has anything to do with the database requires async/await
const addNewFavoriteAlbum = async (userId, albumData) => {

    try {
        
        // create the new album
        // import the create album function to add new album data to the database
        const newAlbum = await createAlbum(albumData)

        // access id from new album
        // newAlbum._id, which is a string

        // add new album to user's favoriteAlbums array
        // need to make sure to pass id data in as an object
        /*
            {favoriteAlbums: newAlbum._id}
        */
        const updatedUser = await addFavoriteAlbum(userId, {favoriteAlbums: newAlbum._id})

        // return the updatedUser
        return updatedUser

    } catch (error) {
        
        // propogates the error to the router file
        throw error
    }
}

// 6c. Export controller functions
module.exports = {createUser, addFavoriteAlbum, addNewFavoriteAlbum}
