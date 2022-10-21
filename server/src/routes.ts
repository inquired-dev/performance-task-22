import { Application } from 'express';
import { calculate } from './controllers/calculator.controller';

export default (app: Application) => {
    app.get('/', (req, res) => res.send('OK'));
    app.post('/calculate', calculate);
};
