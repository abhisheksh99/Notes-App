import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.access_token;

        if (!token) {
            return res.status(401).json({ message: "Not Authorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
