export interface  Itiles{
    letter: string,
    state: LetterState
}
export const enum LetterState {
    INITIAL = 0,
    CORRECT = 'correct',
    PRESENT = 'present',
    ABSENT = 'absent'
  }
  