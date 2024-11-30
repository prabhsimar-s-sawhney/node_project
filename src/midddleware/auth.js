//admin APIs authenticator
function adminAuth(req, res, next) {
    const token = 'xyz';
    if(token==='xyz'){
        next();
    }
    else {
        res.status(401).send("User Not Authorized");
    }
}

//user APIs authenticator
function userAuth(req, res, next) {
    const token = 'xyz';
    if(token==='xyzdd'){
        next();
    }
    else {
        res.status(401).send("User Not Authorized");
    }
}

module.exports = {adminAuth, userAuth};