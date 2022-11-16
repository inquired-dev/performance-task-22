import { Response, Request } from 'express';
import { Grade, GradeWeightSettings } from '../models/calculator.model';
import { calculateClassAverage, getWeightSettings, updateGradeWeightValues } from '../services/calculator.service';
import { Messages } from '../utils/constants';

const calculate = (req: Request, res: Response) => {
    const grades: Grade[] = req.body;
    if ( !grades || !Array.isArray(grades)){
        res.status(400).send(Messages.invalidValues);
    }
    const results = calculateClassAverage(grades)
    res.send(results);
};

const getSettings = (req: Request, res: Response) => {
    res.send(getWeightSettings());
};

const updateWeightValues = async (req: Request, res: Response) => {
    const settings: GradeWeightSettings = req.body;
    if ( !settings ){
        res.status(400).send(Messages.invalidValues);
    }
    try {
        const isUpdated = await updateGradeWeightValues(settings);
        res
        .status(isUpdated ? 200 : 400)
        .send(JSON.stringify(isUpdated? Messages.settingsSaveSuccessful : Messages.gradesWeightUnproportional));
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
};

export {
    calculate,
    getSettings,
    updateWeightValues
}