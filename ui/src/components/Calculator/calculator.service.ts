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
        case (grade > 70 && grade <= 72):
            return 'C-';
        case (grade > 72 && grade <= 76):
            return 'C';
        case (grade > 76 && grade <= 79):
            return 'C+';
        case (grade > 79 && grade <= 82):
            return 'B-';
        case (grade > 82 && grade <= 86):
            return 'B';
        case (grade > 86 && grade <= 89):
            return 'B+';
        case (grade > 89 && grade <= 92):
            return 'A-';
        case (grade > 92 && grade <= 96):
            return 'A';
        case (grade > 96 && grade <= 100):
            return 'A+';
        default:
            return '';
    }
};