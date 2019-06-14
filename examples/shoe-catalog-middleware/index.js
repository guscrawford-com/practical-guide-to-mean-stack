function logHeaders (req, res, next) {
    //console.log("Version 2..."); // Added for illustration
    console.log(req.headers);
    next();
}
module.exports = logHeaders;