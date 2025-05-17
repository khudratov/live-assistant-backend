import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protectMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const auth = req.headers.authorization;
	if (!auth?.startsWith('Bearer ')) {
		res.status(401).json({message: 'Unauthorized'});
		return
	}

	try {
		const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET!);
		(req as any).user = decoded;
		next();
	} catch {
		res.status(401).json({ message: 'Invalid token' });
	}
};
