const Post = require("../../models/posts").model;



const get = async () => {
    //devuelve todos los usuarios
    return await Post.find({}).exec();

}

const getById = async (id) => {
    return await Post.findById(id).exec();
    //devuelve un usuario
}





//compare password
const create = async (PostData) => {

    const { title,
        tags,
        reactions,
        comments,
        publishDate,
        imageUrl,
        description,
        user } = PostData;


    const newPost = new Post({
        title,
        tags,
        reactions,
        comments,
        publishDate,
        imageUrl,
        description,
        user
    });

    const savedPost = await newPost.save();
    // Logica para guardar en la base de datos
    return savedPost;
}

const update = async (id, PostData) => {
    // actualizar usuario
    const { 
        title,
        tags,
        reactions,
        comments,
        publishDate,
        imageUrl,
        description,
        user } = PostData;

    const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
            title,
            tags,
            reactions,
            comments,
            publishDate,
            imageUrl,
            description,
            user
        },
        { new: true }
    ).exec();

    return updatedPost;
}

const patch = async (id, PostData) => {
    return await Post.findByIdAndUpdate(
        id,
        { ...PostData },
        { new: true }
    ).exec();
};

const del = async (id) => {
    // Eliminar un usuario
    return await Post.findByIdAndDelete(id).exec();
};

module.exports = {
    get,
    getById,
    create,
    update,
    del,
    patch,
};
