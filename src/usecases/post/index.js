const Post = require("../../models/posts").model;



const get = async () => {
    //devuelve todos los pots
    return await Post.find({}).exec();

}

const getById = async (id) => {
    const post =  await Post.findById(id).populate("user").exec();
    return post;
    //devuelve un post
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
    // actualizar post
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
    // Eliminar un post
    return await Post.findByIdAndDelete(id).exec();
};

const getByTitle = async(title)=>{
    return await Post.findOne({title}).exec();
}
module.exports = {
    get,
    getById,
    create,
    update,
    del,
    patch,
    getByTitle,
};
