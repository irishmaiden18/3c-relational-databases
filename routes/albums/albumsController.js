// 2a. Import the Album model
const Album = require("./albumsModel")

// Controller File -- separates the logic for interacting with the database into its own file
// this makes it so the Router can handle routing and the Controller can handle logic

// 2b. Write functionality to create an album

// write a function that will take in album data and create a new data entry based on that data
// everything that has to do with our database requires async/await
const createAlbum = async (albumData) => {

    // album data will be the request body
    try {

        // creating the new album the same way we would do normall except inside our controller file
        const newAlbum = await Album.create(albumData)

        // return the new album
        return newAlbum

    } catch (error) {
        
        // propogates the error to the router file
        throw Error("Error creating new album")
    }
}

// 2c. Export controller functions

