import { Grade, GradeWeightSettings, Settings } from "../models/calculator.model";
import calcSettings from '../db/calcSettings.json';
import fs from 'fs';

const getAverage = (grades: number[], weight: number) => {
    if (grades.length > 0){
        return (((grades.reduce((b, a) => a + b, 0)) / (grades.length * 100)) * 100) * weight
    } 
    return 0
}

export const calculateClassAverage = (grades: Grade[]) => {
    let groupedGrades: { [key: string]: number[] } = { homework: [], assessment: [], quiz: [] }
    let weights: { [key: string]: number } = calcSettings;
    let total = 0

    grades.forEach(grade => {
        if(grade.weight && grade.points){
            groupedGrades[grade.weight].push(grade.points)
        }
    });

    Object.keys(groupedGrades).forEach((gradeType: string) => {
        total += getAverage(groupedGrades[gradeType], weights[gradeType])
    })


    // const homework: number[] = [];
    // const assessments: number[] = [];
    // grades.map(grade => grade.weight === 'homework'
    //     ? homework.push(grade.points)
    //     : assessments.push(grade.points)
    // );
    // const homeworkAvg = getAverage(homework, calcSettings.homework);
    // const assessmentAvg = getAverage(assessments, calcSettings.assessments);
    // const total = homeworkAvg + assessmentAvg;

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
