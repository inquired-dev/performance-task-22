import { Grade, GradeWeightSettings } from "../models/calculator.model";
import calcSettings from "../db/calcSettings.json";
import fs from "fs";

const getAverage = (grades: number[], weight: number) => {
    return (
        (grades.reduce((b, a) => a + b) / (grades.length * 100)) * 100 * weight);
    
};

export const calculateClassAverage = (grades: Grade[]) => {
  const homework: number[] = [];
  const assessments: number[] = [];
  const quizzes: number[] = [];
  grades.map((grade) => {
    if (grade.weight === "homework") {
      homework.push(grade.points);
    } else if (grade.weight === "assessment") {
      assessments.push(grade.points);
    } else {
      quizzes.push(grade.points);
    }
    // grade.weight === 'homework'
    // ? homework.push(grade.points)
    // : grade.weight === 'quiz'
    //     ? quizzes.push(grade.points)
    //     : assessments.push(grade.points)

    //This is much more cleanly done with an if conditional or even a switch case.
    //IMO I think the ternary in a ternary is a little hard to read...
    //Don't get me wrong, I love a good ternary just as much as the next guy but they have their place...
  });
  const calculateTotal = (homeworkAvg: number|undefined, assessmentAvg: number|undefined, quizAvg: number|undefined) => {
    const total = 0
  }
  const homeworkAvg = getAverage(homework, calcSettings.homework);
  const assessmentAvg = getAverage(assessments, calcSettings.assessments);
  const quizAvg = getAverage(quizzes, calcSettings.quiz); // needed to add in quiz to getAverage functionality, otherwise we get to here and do nothing with quiz scores
  const total = homeworkAvg + assessmentAvg + quizAvg //also needs to add quizAvg here to get an accurate total, on second thought, 
  //i think this is a bug in this entire system, what if someone puts in ONLY their quiz scores... This whole thing come crashing down

  return { total: total.toString() };
};

export const getWeightSettings = () => {
  return calcSettings;
};

export const updateGradeWeightValues = (settings: GradeWeightSettings) =>
  fs.writeFile(
    "./src/db/calcSettings.json",
    JSON.stringify(settings),
    function (err) {
      if (err) {
        console.log(err);
      }
      console.log("writing to calcSettings.json");
    }
  );
