const express = require('express');
const router = express.Router();
const Stories = require('./helpersmodels');


const middleware = require('./helpers/helpers');

//Testing endpoint

router.get("/test", (req, res) => {
    res.status(200).json({ message: `Welcome to my Expat Journal Test` });
  });


  // Get request endpoint
  router.get("/", (req, res) => {
    Stories.getStories()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: `Unable to retrieve Journal because ${error.message}` });
      });
  });

  //Get by ID endpoint

  router.get("/:id", middleware.validityCheck, (req, res) => {
    res.status(200).json(req.data);
  });

  //POST enpoint to post new story!

  router.post("/", (req, res) => {
    Stories.addStory(req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: `Unable to post story due to ${error.message}` });
      });
  });
 

  //DEL endpoint to delete existed story

  router.delete("/:id", middleware.validityCheck, (req, res) => {
    const { id } = req.params;
    Stories.deleteStory(id)
      .then(story =>
        res.status(200).json({ message: `Story ${id} has successfully been deleted` })
      )
      .catch(error =>
        res
          .status(500)
          .json({ message: `unable to delete story ${id} due to ${error.message}` })
      );
  });

  
  
  router.put('/:id', middleware.validityCheck, (req, res) => {
    const { id } = req.params;
    const story = req.body;

    Stories.editStory(id, story)
    .then(editPost => {
        res.status(201).json({message: `Story ${id} has been updated `, editPost})
    })
    .catch(error => {
        res.status(500).json({ message: `Story ${id} update unsuccessful because ${error}`})
    })
})






  
  module.exports = router;