const express = require("express");
const user = require("../usecases/user");
const jwt = require("../lib/jwt");
const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const retrievedUser = await user.getByEmail(email);
  
      if(retrievedUser!=null){
      const isMatch = await user.authenticate(retrievedUser, password);
  
      if (isMatch) {
        const token = await jwt.sign({
          sub: retrievedUser._id,
          role: retrievedUser.role,
        });
  
        res.json({
          success: true,
          payload: token,
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Contraseña incorrecta" });
      }}
      else{
        throw new Error("No existe el usuario");
      }
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;
  