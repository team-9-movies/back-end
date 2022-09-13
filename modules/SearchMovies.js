require('dotenv').config()

const axios = require('axios');

async function SearchMovies(req, res) {
    //store search bar contents into a variable (movieQuery)
    const searchInput = req.query.searchQuery
    console.log(searchInput)
    //create a url variable using template literals
    console.log(process.env.TMDB_API_KEY)
    const url = encodeURI(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${searchInput}&page=1&include_adult=false`)
    //send a fetch request to the server based on that variable
    console.log("URLLLL", url);
    try {
        const response = await axios.get(url)
        // array response
        console.log(response.data.results)
        res.status(200).send(response.data.results)
    } catch (err) {
        console.log(`error: ${err}`)
    }
    //send the data from the response to the front end to be displayed in the search results underneath the search bar

    //catch any errors
}

// export the module
module.exports = SearchMovies