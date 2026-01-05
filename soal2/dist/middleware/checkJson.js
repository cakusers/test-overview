export const checkJson = (req, res, next) => {
    const isJson = req.is("application/json") === "application/json";
    if (!isJson) {
        return res.status(415).json({
            success: false,
            message: "Request must be JSON (Content-Type: application/json)",
        });
    }
    next();
};
//# sourceMappingURL=checkJson.js.map