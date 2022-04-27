const express = require("express");
const post = require("../usecases/post");
const { authHandler } = require("../middlewares/authHandlers");
const {
  adminHandler,
  staffHandler,
} = require("../middlewares/permissionHandlers");

const router = express.Router();

router.get("/:id", async (req, res,next)=>{
    try{

    const{id}= req.params;
    const posts = await post.getById(id);    
    res.json({success: true,
        payload: posts});
    }catch(error)
    {
        next(error);

    }
})

router.get("/",  async (req,res,next)=>{
    try{

        const posts = await post.get();

    
        res.json({success: true,
                  payload: posts});
    
    }catch(error)
    {
        next(error);

    }
   
});

router.post("/search",  async (req,res,next)=>{
    try{

       const { title } = req.body;
  
        const retrievedTitle = await post.getByTitle(title);
    

    
        res.json({success: true,
                  payload: retrievedTitle});
                  console.log("entre busqueda by title")
    
    }catch(error)
    {
        next(error);

    }
   
});

router.post("/",   async (req,res,next)=>
{
    try{

              const {postID, title, tags, counterReactions, counterComents, datetime,
                image, contentText,day, month, year, user} = req.body;
        const postCreated = await post.create(
            {postID, title, tags, counterReactions, counterComents, datetime,
                image, contentText,day, month, year, user
        });
    
        res.json({
            success: true,
            message: "Post creado", 
            payload: postCreated,
        });

    }catch(error)
    {
        next(error);

    }
    
});

router.put("/:id",  async (req,res,next)=>{
    try{

        const{id}= req.params;
        const {postID, title, tags, counterReactions, counterComents, datetime,
            image, contentText,day, month, year, user} = req.body;
        const postUpdated = await post.update(
            id,
            {postID, title, tags, counterReactions, counterComents, datetime,
                image, contentText,day, month, year, user
        });
    
        res.json({
            success: true,
            message: "Post actualizado", 
            payload: postUpdated,
        });

    }catch(error)
    {
        next(error);

    }
})

router.patch("/:id",   async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const postUpdated = await post.patch(id, { ...req.body });
  
      res.json({
        success: true,
        message: `Post ${id} actualizado`,
        payload: postUpdated,
      });
    } catch (error) {
      next(error);
    }
  });
  
  router.delete("/:id",    async (req, res, next) => {
    try {
      const { id } = req.params;
      const { sub } = req.params.tokenPayload;
      
      let postDeleted;
      if(await post.verifyUserId(id, sub))
      {
          console.log("borrar")
        postDeleted = await post.del(id);
      }
      else
      {
          throw new Error("No tienes permisos para borrar este post");
      }
      
  
      res.json({
        success: true,
        message: `Post ${id} eliminado`,
        payload: postDeleted,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;