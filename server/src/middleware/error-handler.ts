import { Request, Response } from 'express';

const catchError = (middlewareFn: (requset: Request, response: Response, next?: () => void) => void) => {
    const handleError = async (request: Request, response: Response, next?: () => void) => {
        try {
            middlewareFn(request, response, next);
        } catch(error: any) {
            response.status(404).json(error);
        }
    }

    return handleError;
}

export default catchError;