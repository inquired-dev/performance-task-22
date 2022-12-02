export const getLetterGrade = (grade: number): string => {
    switch (true) {
        case (grade <= 59):
            return 'F';
        case (grade > 59 && grade <= 62):
            return 'D-';
        case (grade > 62 && grade <= 66):
            return 'D';
        case (grade > 66 && grade <= 69):
            return 'D+';
        case (grade > 69 && grade <= 69):
            return 'D+';
        case (grade > 66 && grade <= 69):
            return 'D+';
        case (grade > 70 && grade <= 72):
            return 'C-';
        case (grade > 72 && grade <= 76):
            return 'C';
        case (grade > 66 && grade <= 79):
            return 'C+';
        case (grade > 66 && grade <= 82):
            return 'B-';
        case (grade > 66 && grade <= 86):
            return 'B';
        case (grade > 66 && grade <= 89):
            return 'B+';
        case (grade > 66 && grade <= 92):
            return 'A-';
        case (grade > 66 && grade <= 96):
            return 'A';
        case (grade > 66 && grade <= 100):
            return 'A+';
        default:
            return '';
    }
};