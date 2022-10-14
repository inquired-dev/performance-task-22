import { Application } from 'express';
import { calculate } from './controllers/calculator.controller';

export default (app: Application) => {
    app.get('/', calculate);
};
