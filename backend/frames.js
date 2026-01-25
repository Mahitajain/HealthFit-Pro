import express from "express";
import { buildDietPrompt } from "./dietLogic.js";
import { generateMealPlan } from "./groq.js";
import { createUser } from "./notion.js";
import { mintReward } from "./blockchain.js";

const router = express.Router();

router.post("/start", async (req, res) => {
  return res.json({
    message: "HealthFit-Pro AI Nutrition Started"
  });
});

router.post("/plan", async (req, res) => {
  try {
    const user = {
      age: 22,
      height: 170,
      weight: 70,
      goal: "Weight Loss",
      diet: "Vegetarian",
      allergies: ["nuts"]
    };

    const prompt = buildDietPrompt(user);

    let mealPlan = "Demo meal plan";
    try {
      mealPlan = await generateMealPlan(prompt);
    } catch {
      console.log("AI skipped (demo)");
    }

    try {
      await createUser(user);
    } catch {
      console.log("Notion skipped");
    }

    const txHash = await mintReward(
      "0xUserWallet",
      "1000000000000000000"
    );

    return res.json({
      mealPlan,
      rewardTx: txHash
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed" });
  }
});

export default router;
