import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.token || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
        if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
        const secret = process.env.JWT_SECRET || 'devsecret';
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error('authMiddleware error', err.message);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}

export default authMiddleware;
