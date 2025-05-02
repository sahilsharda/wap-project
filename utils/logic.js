// utils/logic.js

const people = [
  {
    name: 'John',
    image: '/images/people/john.jpg',
    description: 'A tall man from Newton',
    traits: [true, false, true], // e.g. [isMale, under30, fromNewton]
  },
  {
    name: 'Alice',
    image: '/images/people/alice.jpg',
    description: 'A young woman living in Newton',
    traits: [false, true, true],
  },
];

export function guessPersonFromAnswers(answers) {
  for (const person of people) {
    const match = person.traits.every((val, idx) => val === answers[idx]);
    if (match) return person;
  }

  return {
    name: 'Unknown',
    image: '/images/people/unknown.png',
    description: 'We couldn’t figure it out!',
  };
}
