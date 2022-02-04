import { Request, Response } from 'express';
import multer from 'multer';
import { CustomError } from '../errors/custom_error';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    if (err instanceof multer.MulterError) {
        return res.status(+err.code).send({ errors: err.name, field: err.message });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }],
    });
};
