import { Grade, GradeWeightSettings } from "../models/calculator.model";
import calcSettings from '../db/calcSettings.json';
import fs from 'fs';
import { FileAddresses, GradeTypes, Messages } from "../utils/constants";

const getAverage = (grades: number[], weight: number) => (
    (((grades.reduce((b, a) => a + b)) / (grades.length * 100)) * 100) * weight
);

export const calculateClassAverage = (grades: Grade[]) => {
    const homework: number[] = [];
    const assessments: number[] = [];
    const quizzes: number[] = [];
    grades.forEach(grade => grade.weight === GradeTypes.HOMEWORK
        ? homework.push(grade.points)
        : grade.weight === GradeTypes.QUIZ
            ? quizzes.push(grade.points)
            : assessments.push(grade.points)
    );
    const homeworkAvg: number = getAverage(homework, calcSettings.homework);
    const assessmentAvg: number = getAverage(assessments, calcSettings.assessments);
    const quizAvg: number = getAverage(assessments, calcSettings.quiz);
    const total = homeworkAvg + assessmentAvg + quizAvg;

    return { total: total.toString() };
};

export const getWeightSettings = () => {
    return calcSettings;
};

export const updateGradeWeightValues = async (settings: GradeWeightSettings) => {
    const isProportional = checkGradesProportions(settings);
    return !isProportional ? false : (
        new Promise((resolve, reject) => {
            fs.writeFile(
                FileAddresses.calcSettings, 
                JSON.stringify(settings), 
                function (err) {
                    if (err) {
                        reject(Messages.settingsSaveUnsuccessful);
                    }
                    resolve(true);
                } 
            );
        })
    )
}

const checkGradesProportions = (settings: GradeWeightSettings) => {
    try {
        const sumOfWeights = Object.values(settings).reduce((value, accumulated) => accumulated+= value, 0);
        return sumOfWeights === 1;
    } catch (error) {
        // invalid input
        return false;
    }
}