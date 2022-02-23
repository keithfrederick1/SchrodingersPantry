const { Router } = require('express');
const UserRouter = Router();
const { Recipe, Favorite, User_Bookmark, Bookmark } = require('../db/index');
// const cloudinary = require('cloudinary').v2;
// //require User Model, sequelize

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

//on User post of image
UserRouter.post('/upload/pic', async (req, res) => {
  // console.log(req.body, 'userRoute 10');
  try {
    const pic = req.body;
    console.log(pic, 'user 18');
    // const uploadedRes = await cloudinary.uploader.upload(pic, { upload_preset: 'sPantry'})

    // console.log(public.id, 'user 14');
    // res.status(201).send(uploadedRes.public_id);
  } catch (error) {
    console.error(error, 'user route 13');
  }

});

//on User submission of recipe
UserRouter.post('/upload/recipe', (req, res) => {
  console.log(req.body, 'userRoute 23')
  const { title, ingredients, instructions, userId} = req.body;

  Recipe.create({ userId, title, ingredients, instructions})
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => console.error(err, 'userRoute 38'))

});

UserRouter.get('/recipes', (req, res) => {
  Recipe.findAll({
    where: {
      userId: req.cookies.googleId
    }
  })
  .then(recipes => {
      // console.log(recipes, 43);
      res.status(200).send(recipes)
    })
    .catch(err => console.error(err, 'userRoute 52'));
});

UserRouter.get('/favorites', (req, res) => {
  // find all recipes included in the favorites table where the user id is our signed in user
  Recipe.findAll({
   include: {
     model: Favorite,
     where: {
       userId: req.cookies.googleId
     }
   }
  })
  .then(faves => {
    //console.log(faves, 'userRoute 67');
    //Uncomment This ^^ and check that data structure,
    //You should be sending back an array of Recipe objects 
    res.status(200). send(faves);
  })
  .catch(err => console.error(err, 'userRoute 67'));
});

UserRouter.get('/bookmarks', (req, res) => {
  //find all bookmarks included in user_bookmarks where the userId in out signed in user
  Bookmark.findAll({
   include: {
     model: User_Bookmark,
     where: {
       userId: req.cookies.googleId
     }
   }
  })
  .then(urls => {
    // console.log(urls, 'userRoute 77');
    //Uncomment this ^^ and check the data structure
    //You should send and array of urls to the front
    //Maybe an array of objects with urls and titles?
    //If so, be sure to change the expectation on ProfilePage line 75
    res.status(200).send(urls);
  })
  .catch(err => console.error(err, 'userRoute 82'))
})

module.exports = { UserRouter };