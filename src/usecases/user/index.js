const User = require("../../models/users").model;
const encrypt = require("../../lib/encrypt");


const get = async () => {
    //devuelve todos los usuarios
    return await User.find({}).exec();
    
}

const getById = async (id) => {
    return await User.findById(id).exec();
    //devuelve un usuario
}

//getuserbyemail
const getByEmail = async (email) => {
    return await User.findOne({email}).exec();
    
    
}

const authenticate = async(user, password) => {
    console.log("password", password)
    console.log("user.password", user.password)
    hash = user.password;
    return await encrypt.verifyPassword(password, hash);
}

//compare password
const create = async (userData) => {
    
    const {firstname,lastname,email,password,image,country,birthday,description} = userData;

    const hash = await encrypt.hashPassword(password);
    const newUser = new User({
        firstname,lastname,email,password:hash,image,country,birthday,description });

    const savedUser = await newUser.save();
    // Logica para guardar en la base de datos
    return savedUser;
}

const update = async(id, userData) => {
    // actualizar usuario
    const {firstname,lastname,email,password,image,country,birthday,description} = userData;

    const updatedUser = await User.findByIdAndUpdate(
        id, 
        {firstname,lastname,email,password,image,country,birthday,description} ,
        {new: true}
        ).exec();

    return updatedUser;
}

const patch = async (id, userData) => {
    return await User.findByIdAndUpdate(
      id,
      { ...userData },
      { new: true }
    ).exec();
  };
  
  const del = async (id) => {
    // Eliminar un usuario
    return await User.findByIdAndDelete(id).exec();
  };

module.exports = {
    get,
    getById,
    create,
    update,
    del,
    patch,
    getByEmail,
    authenticate,
};
