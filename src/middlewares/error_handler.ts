import { Request, Response } from 'express';
import { CustomError } from '../errors/custom_error';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }],
    });
};