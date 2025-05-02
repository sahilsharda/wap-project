// Simple mock data of known people

saveGuessSession({
  mode,
  answers: [...answers, answerText],
  guesses: result, // or finalGuesses
  timestamp: Date.now(),
});

const characters = [
  {
    name: "CarryMinati",
    tags: ["real", "male", "youtube", "indian", "no_superpowers"],
    description: "A famous Indian YouTuber.",
    image: "/images/carryminati.jpg",
  },
  {
    name: "Iron Man",
    tags: ["fictional", "male", "not_youtube", "not_indian", "superpowers"],
    description: "A genius, billionaire, playboy, philanthropist.",
    image: "/images/ironman.jpg",
  },
  {
    name: "Lilly Singh",
    tags: ["real", "female", "youtube", "indian", "no_superpowers"],
    description: "Canadian YouTuber and comedian.",
    image: "/images/lilly.jpg",
  },
];

const tagMap = [
  "real",         // 0 → "Is your character real?" — yes = real, no = fictional
  "male",         // 1 → "Is your character a man?" — yes = male, no = female
  "youtube",      // 2 → "Is your character known for YouTube?"
  "indian",       // 3 → "Is your character Indian?"
  "superpowers",  // 4 → "Does your character have superpowers?"
];

export function guessFromAnswers(answers) {
  const tags = answers.map((ans, i) => {
    if (ans === "yes") return tagMap[i];
    if (ans === "no") return "not_" + tagMap[i];
    return null; // for "maybe", ignore
  });

  // Score characters by matching tags
  const scored = characters.map((char) => {
    const score = tags.reduce((acc, tag) => {
      if (tag && char.tags.includes(tag)) return acc + 1;
      return acc;
    }, 0);
    return { ...char, score };
  });

  // Sort by best match
  scored.sort((a, b) => b.score - a.score);

  // Return top 1-2 guesses
  return scored.slice(0, 2);
}
