import {Request, Response, NextFunction} from 'express'

import { CustomError } from '../models/customerror'

// app.use((error: any, req: Request, res: Response,  next: any) => {
//     console.log(error)
//     const status = error.statusCode || 500
//     const message = error.message;
//     const data = error.data
//     res.status(status).send({message: message, data: data})
  
//   }) //the speaciall error handling middleware
export const handleError = (err: TypeError | CustomError, req: Request, res: Response, next: NextFunction) => {
    let customError = err;
    if(!(err instanceof CustomError)) {
        customError = new CustomError('something went wrong')
    }
    

    res.status((customError as CustomError).status).send(customError)
}