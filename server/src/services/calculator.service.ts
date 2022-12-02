import { Grade, GradeWeightSettings } from "../models/calculator.model";
import calcSettings from '../db/calcSettings.json';
import fs from 'fs';
import { CalculationTypes } from "../utils/enum";

const getAverage = (grades: number[], weight: number) => (
    (((grades.reduce((b, a) => a + b)) / (grades.length * 100)) * 100) * weight
);

export const calculateClassAverage = (grades: Grade[]) => {
    const homework: number[] = [];
    const assessments: number[] = [];
    const quizzes: number[] = [];
    let homeworkAvg = 0;
    let assessmentAvg =0;
    let quizAvg = 0; 
        for(let grade of grades){
            if(grade.weight===CalculationTypes.HOMEWORK){
                homework.push(grade.points)
                assessmentAvg = getAverage(homework, calcSettings.assessments);

            }
            else if(grade.weight===CalculationTypes.QUIZ){
                quizzes.push(grade.points);
                quizAvg = getAverage(quizzes, calcSettings.quiz);
                
            }
            else if(grade.weight===CalculationTypes.ASSESSMENT){
                assessments.push(grade.points)
                homeworkAvg = getAverage(assessments, calcSettings.homework);
            }
        }
    const total = homeworkAvg + assessmentAvg + quizAvg;

    return { total: total.toString() };
};

export const getWeightSettings = () => {
        return calcSettings;
};

export const updateGradeWeightValues = (settings: GradeWeightSettings) => 
{
   return fs.writeFile(
    './src/db/calcSettings.json', 
    JSON.stringify(settings), 
    function (err) {
        if (err) {
            console.log(err);
        }
        console.log('writing to calcSettings.json');
    } 

    );
}
