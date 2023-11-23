const express=require('express');
const router = express.Router();
const Post = require('../models/Post')

// Routes
// GET METHOD HOME/ABOUT/CONTACT

const locals = {
    titile: "Janky Blog",
    description: "Simple Blog created with Node JS, Express, MongoDB"
}

router.get('', async (req, res) => {  
    try {
    let perPage= 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });
    } catch (error) {
    console.log(error) 
    }
})


router.get('/about', (req, res) => {
    res.render("about")
})

router.get('/contact', (req, res) => {
    res.render("contact")
})


// Routes
// GET METHOD POST:id
router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
      }
  
      res.render('post', { 
        locals,
        data,
        currentRoute: `/post/${slug}`
      });
    } catch (error) {
      console.log(error);
    }
  
  });
  
  



module.exports= router; 


// Use to insert data

// function insertPostData() {
//     Post.insertMany([
//         {
//         title:  'First post', 
//         body: "Lorem ip}sum dolor sit amet consectetur adipisicing elit"
//         },
//     ])
// }
// insertPostData()