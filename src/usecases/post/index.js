const Post = require("../../models/posts").model;



const get = async () => {
    //devuelve todos los pots
    return await Post.find().populate("user").exec();

}

const getById = async (id) => {
    const post =  await Post.findById(id).populate("user").exec();
    return post;
    //devuelve un post
}





//compare password
const create = async (PostData) => {

    const { postID, title, tags, counterReactions, counterComents, datetime,
        image, contentText,day, month, year, user } = PostData;


    const newPost = new Post({
        postID, title, tags, counterReactions, counterComents, datetime,
  image, contentText,day, month, year, user
    });

    const savedPost = await newPost.save();
    // Logica para guardar en la base de datos
    return savedPost;
}

const update = async (id, PostData) => {
    // actualizar post
    const { 
        postID, title, tags, counterReactions, counterComents, datetime,
  image, contentText,day, month, year, user } = PostData;

    const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
            postID, title, tags, counterReactions, counterComents, datetime,
  image, contentText,day, month, year, user
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
    const post =  await Post.findById(id).populate("user").exec();
    
    

    return await Post.findByIdAndDelete(id).exec();
};

const getByTitle = async(title)=>{
    return await Post.findOne({title}).exec();
}


const verifyUserId = async(id, sub)=>{

    const post =  await Post.findById(id).populate("user").exec();
    console.log("verifyUserId post", post, sub == post.user._id)
    return (sub == post.user._id);  

    
}
module.exports = {
    get,
    getById,
    create,
    update,
    del,
    patch,
    getByTitle,
    verifyUserId,
};
