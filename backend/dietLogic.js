export function buildDietPrompt(user) {
  return `
User Details:
Age: ${user.age}
Height: ${user.height}
Weight: ${user.weight}
Diet: ${user.diet}
Allergies: ${user.allergies}

Goals:
Annual Goal: ${user.annualGoal}
7 Month Goal: ${user.sevenMonthGoal}

Create a personalized 7-day meal plan.
Adjust calories based on fat loss or muscle gain.
Avoid allergens.
`;
}
