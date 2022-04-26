const express = require("express");
const user = require("../usecases/user");
const { authHandler } = require("../middlewares/authHandlers");
const {
  adminHandler,
  staffHandler,
} = require("../middlewares/permissionHandlers");

const router = express.Router();

router.get("/:id", async (req, res,next)=>{
    try{

    const{id}= req.params;
    const users = await user.getById(id);    
    res.json({success: true,
        payload: users});
    }catch(error)
    {
        next(error);

    }
})

router.get("/",  async (req,res,next)=>{
    try{

        const users = await user.get();

    
        res.json({success: true,
                  payload: users});
    
    }catch(error)
    {
        next(error);

    }
   
});

router.post("/",  async (req,res,next)=>
{
    try{

             const {firstname,lastname,email,password,image,country,birthday,description} = req.body;
        const userCreated = await user.create(
            {firstname,lastname,email,password,image,country,birthday,description
        });
    
        res.json({
            success: true,
            message: "User creado", 
            payload: userCreated,
        });

    }catch(error)
    {
        next(error);

    }
    
});

router.put("/:id", authHandler,  async (req,res,next)=>{
    try{

        const{id}= req.params;
        const {firstname,lastname,email,password,image,country,birthday,description} = req.body;
        const userUpdated = await user.update(
            id,
            {firstname,lastname,email,password,image,country,birthday,description
        });
    
        res.json({
            success: true,
            message: "User actualizado", 
            payload: userUpdated,
        });

    }catch(error)
    {
        next(error);

    }
})

router.patch("/:id",  authHandler, async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const userUpdated = await user.patch(id, { ...req.body });
  
      res.json({
        success: true,
        message: `User ${id} actualizado`,
        payload: userUpdated,
      });
    } catch (error) {
      next(error);
    }
  });
  
  router.delete("/:id",  authHandler, async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const userDeleted = await user.del(id);
  
      res.json({
        success: true,
        message: `User ${id} eliminado`,
        payload: userDeleted,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;