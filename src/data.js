// Study reviewer data: Industry Elective and Digestion subjects
import { industryElectiveLessons } from './industry-elective-data.js';
import { digestionLessons } from './digestion-data.js';

for (const lesson of industryElectiveLessons) {
  lesson.subject = 'industry-elective';
  lesson.questions.forEach((q, i) => q.id = `ie${lesson.id}-q${i + 1}`);
  lesson.cards = lesson.questions.filter(q => q.type !== 'essay').map(q => ({ id: q.id, front: q.prompt, back: q.answer, detail: q.explanation, page: q.page }));
}

export const subjects = {
  'industry-elective': {
    id: 'industry-elective',
    name: 'Industry Elective',
    icon: 'code',
    lessons: industryElectiveLessons
  },
  digestion: {
    id: 'digestion',
    name: 'Digestion',
    icon: 'book',
    lessons: digestionLessons
  }
};
subjects.industryElective = subjects['industry-elective'];

export { industryElectiveLessons, digestionLessons };
