import { Response, Request } from 'express';

const calculate = (req: Request, res: Response ) => {
    res.send('Hello worldo!');
};

export {
    calculate,
}