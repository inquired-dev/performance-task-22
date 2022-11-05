export const getLetterGrade = (grade: number): string => {
    switch (true) {
        case (grade <= 59):
            return 'F';
        case (grade <= 62):
            return 'D-';
        case (grade <= 66):
            return 'D';
        case (grade <= 69):
            return 'D+';
        case (grade <= 72):
            return 'C-';
        case (grade <= 76):
            return 'C';
        case (grade <= 79):
            return 'C+';
        case (grade <= 82):
            return 'B-';
        case (grade <= 86):
            return 'B';
        case (grade <= 89):
            return 'B+';
        case (grade <= 92):
            return 'A-';
        case (grade <= 96):
            return 'A';
        case (grade <= 100):
            return 'A+';
        default:
            return '';
    }
};