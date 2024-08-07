import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  //   const date = currentDate.toLocaleDateString();
  //   const time = currentDate.toLocaleTimeString();

  console.log(`Endpoint called: ${req.method} ${req.url} on ${formattedDate}`);

  next();
}
