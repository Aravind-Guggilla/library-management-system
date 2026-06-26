const authorizeRole = (role) => {
    return (request, response, next) => {

        if (request.user.role !== role) {
            return response.status(403).json({
                error: "Access Denied"
            });
        }

        next();
    };
};

module.exports = authorizeRole;