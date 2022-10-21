import { Response, Request } from 'express';
import { Grade } from '../models/calculator.model';
import { calculateClassAverage } from '../services/calculator.service';

const calculate = (req: Request, res: Response ) => {
    const grades: Grade[] = req.body;
    if ( !grades ){
        res.send('Invalid values');
    }
    const results = calculateClassAverage(grades)
    res.send(results);
};

export {
    calculate,
}