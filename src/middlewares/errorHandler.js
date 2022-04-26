const logErros = (err, req, res, next) =>
{
    console.log("Ha ocurrido un error");
    console.error(err);
    next(err); //le pasa el error al siguiente middleware
}


const errorHandler = (err, req, res, next) =>
{
    const { message } = err;

    res.status(500).json({success: false, message});
}

module.exports = {logErros, errorHandler };