const express=require('express');
const router = express.Router();


// Routes

const locals = {
    titile: "Janky Blog",
    description: "Simple Blog created with Node JS, Express, MongoDB"
}

router.get('', (req, res) => {  
    res.render("index", { locals } )
})


router.get('/about', (req, res) => {
    res.render("about")
})


router.get('/contact', (req, res) => {
    res.render("contact")
})

module.exports= router; 