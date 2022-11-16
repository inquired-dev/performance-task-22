import { Application } from 'express';
import { calculate, getSettings, updateWeightValues } from './controllers/calculator.controller';

export default (app: Application) => {
    app.get('/', (req, res) => res.send('OK'));
    app.get('/settings', getSettings);
    app.put('/settings', updateWeightValues);
    app.post('/calculate', calculate);
};
