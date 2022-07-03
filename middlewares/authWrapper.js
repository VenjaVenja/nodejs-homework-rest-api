const authWrapper = (auth)=>{
    return async (req, res, next)=>{
        try {
            await auth(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = authWrapper