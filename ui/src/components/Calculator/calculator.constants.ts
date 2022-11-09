import { Grade } from './calculator.types';
import { v4 as uuidv4 } from 'uuid';
export const initialData: Grade[] = [{
    id:uuidv4(),
    points: 0,
    weight: 'homework'
},{
    id:uuidv4(),
    points: 0,
    weight: 'assessment'
}];

export const serverUrl = 'http://localhost:8081'
