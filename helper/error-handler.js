function errorHandler(err,req,res,next) {
    console.error(err);
    if(err.name === 'UnauthorizedError'){
        //jwt authentication error
        return res.status(401).json({message : 'The user is not authorized'})
    }
    if(err.name === 'ValidationError'){
        //Validation error
        return res.status(401).json({message : err})
    }
    //default to 500 server error
   //return res.status(500).json({message : err})
   return res.status(500).json({ message: 'Internal Server Error', error: err.message });
}

module.exports = errorHandler;