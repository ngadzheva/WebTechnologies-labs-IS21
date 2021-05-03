import { Request, Response } from 'express';

const errorCatch = (middlewareFn: (req: Request, res: Response, next?) => void) => {
  const handleError = async (req: Request, res: Response, next) => {
    try {
      await middlewareFn(req, res, next);
    } catch (error) {
      res.status(400).json(error);
    }
  };
  return handleError;
};

export default errorCatch;