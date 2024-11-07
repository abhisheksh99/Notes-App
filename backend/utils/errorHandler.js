export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    // If the error is from MongoDB duplicate key error
    if (err.code === 11000) {
      statusCode = 400;
      message = "Duplicate field value entered";
    }
  
    // If the error is from Mongoose validation
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(err.errors).map(val => val.message).join(', ');
    }
  
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      stack:err.stack,
    });
  };