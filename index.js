const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()
const PORT = 8080
app.use(bodyParser.json())

async function getQuote(route){
     const quote = await axios.get(`https://api.quotable.io/${route}`)
     return quote.data;
}

app.get("/quote/random", async(req, res) => {
    try {
    const quote = await getQuote("random")
    res.json({quote: quote.content, author: quote.author})
    } catch(exception){
       res.status(500).json({error: exception.message, status: 500, message: "Something went wrong."})
    }
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
 
