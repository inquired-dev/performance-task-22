import { Grade, GradeWeightSettings } from "../models/calculator.model";
import calcSettings from '../db/calcSettings.json';
import fs from 'fs';

const getAverage = (grades: number[], weight: number) => (
    (((grades.reduce((b, a) => a + b, 0)) / (grades.length * 100)) * 100) * weight
);

export const calculateClassAverage = (grades: Grade[]) => {
    const groupedGrades: { [key: string]: number[] } = { homework: [], assessment: [], quiz: [] };
    const weights: { [key: string]: number } = calcSettings;
    let total = 0;

    grades.forEach(grade => {
        if (grade.weight && grade.points) {
            groupedGrades[grade.weight].push(grade.points);
        }
    });

    Object.entries(groupedGrades).forEach(([key, value]) => {
        total += getAverage(value, weights[key]);
    });

    return { total: total.toString() };
};

export const getWeightSettings = () => {
    return calcSettings;
};

export const updateGradeWeightValues = (settings: GradeWeightSettings) => fs.writeFile(
    './src/db/calcSettings.json',
    JSON.stringify(settings),
    function (err) {
        if (err) {
            console.log(err);
        }
        console.log('writing to calcSettings.json');
    }
);
