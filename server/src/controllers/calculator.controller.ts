import { Response, Request } from 'express';
import { Grade, GradeWeightSettings } from '../models/calculator.model';
import { calculateClassAverage, getWeightSettings, updateGradeWeightValues } from '../services/calculator.service';

const calculate = (req: Request, res: Response) => {
    const grades: Grade[] = req.body;
    if (!Array.isArray(grades)) {
        return res.status(400).send('Invalid values');
    }
    const results = calculateClassAverage(grades)
    res.send(results);
};

const getSettings = (req: Request, res: Response) => {
    res.send(getWeightSettings());
};

const updateWeightValues = (req: Request, res: Response) => {
    const settings: GradeWeightSettings = req.body;
    if (!settings) {
        return res.status(400).send('Invalid values');
    }
    try {
        updateGradeWeightValues(settings)
        res.status(200).send(JSON.stringify('Successfully updated grade weights'))
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
};

export {
    calculate,
    getSettings,
    updateWeightValues
}