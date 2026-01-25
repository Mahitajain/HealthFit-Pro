import express from "express";
import { buildDietPrompt } from "./dietLogic.js";
import { generateMealPlan } from "./groq.js";
import { createUser } from "./notion.js";
import { mintReward } from "./blockchain.js";

const router = express.Router();

/**
 * FRAME 1 — HOME
 * (replaces Home Page)
 */
router.post("/start", async (req, res) => {
  return res.json({
    image: "https://yourcdn/start.png",
    buttons: [
      {
        label: "🥗 Start AI Nutrition",
        action: "post",
        target: "/frames/profile"
      }
    ]
  });
});

/**
 * FRAME 2 — PROFILE DETAILS
 * (name, age, height, weight, gender)
 */
router.post("/profile", async (req, res) => {
  return res.json({
    image: "https://yourcdn/profile.png",
    text_input:
      "Name, Age, Height(cm), Weight(kg), Gender\nExample: Alex,22,170,70,Male",
    buttons: [
      {
        label: "Next ➡️",
        action: "post",
        target: "/frames/preferences"
      }
    ]
  });
});

/**
 * FRAME 3 — GOALS + DIET + ALLERGIES
 */
router.post("/preferences", async (req, res) => {
  return res.json({
    image: "https://yourcdn/preferences.png",
    text_input:
      "Goal, Diet, Allergies\nExample: Weight Loss, Vegetarian, nuts,dairy",
    buttons: [
      {
        label: "🤖 Generate AI Plan",
        action: "post",
        target: "/frames/plan"
      }
    ]
  });
});

/**
 * FRAME 4 — AI MEAL PLAN (CORE FEATURE)
 */
router.post("/plan", async (req, res) => {
  const input1 = req.body.untrustedData?.inputText || "";

  // ⚠️ In real app, store profile between frames using wallet/fid
  const user = {
    name: "Demo User",
    age: 22,
    height: 170,
    weight: 70,
    gender: "Male",
    goal: "Weight Loss",
    diet: "Vegetarian",
    allergies: ["nuts"]
  };

  const prompt = buildDietPrompt(user);
  const mealPlan = await generateMealPlan(prompt);

  // Save to Notion
  await createUser({
    wallet: "farcaster-user",
    age: user.age,
    height: user.height,
    weight: user.weight,
    diet: user.diet
  });

  // Mint reward token
  const txHash = await mintReward(
    "0xUserWalletAddress",
    "1000000000000000000" // 1 token
  );

  return res.json({
    image: "https://yourcdn/plan.png",
    buttons: [
      {
        label: "🎁 View Rewards",
        action: "post",
        target: "/frames/reward"
      },
      {
        label: "📆 15‑Day Check‑In",
        action: "post",
        target: "/frames/checkin"
      }
    ]
  });
});

/**
 * FRAME 5 — REWARD CONFIRMATION
 */
router.post("/reward", async (req, res) => {
  return res.json({
    image: "https://yourcdn/reward.png",
    buttons: [
      {
        label: "🛒 Redeem in Store (Concept)",
        action: "link",
        target: "https://example.com"
      }
    ]
  });
});

/**
 * FRAME 6 — 15 DAY CHECK‑IN
 */
router.post("/checkin", async (req, res) => {
  return res.json({
    image: "https://yourcdn/checkin.png",
    text_input: "Enter current weight (kg)",
    buttons: [
      {
        label: "Update Progress",
        action: "post",
        target: "/frames/plan"
      }
    ]
  });
});

export default router;
