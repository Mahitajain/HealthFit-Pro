import express from "express";

const router = express.Router();

/**
 * FRAME 1 — Welcome
 */
router.post("/start", async (req, res) => {
  return res.json({
    image: "https://your-image-url/welcome.png",
    buttons: [
      {
        label: "Start Nutrition Plan",
        action: "post",
        target: "/frames/profile"
      }
    ]
  });
});

/**
 * FRAME 2 — Profile Input
 */
router.post("/profile", async (req, res) => {
  return res.json({
    image: "https://your-image-url/profile.png",
    text_input: "Age, Height, Weight, Diet, Allergies",
    buttons: [
      {
        label: "Next",
        action: "post",
        target: "/frames/goals"
      }
    ]
  });
});

/**
 * FRAME 3 — Goals
 */
router.post("/goals", async (req, res) => {
  return res.json({
    image: "https://your-image-url/goals.png",
    text_input: "Annual goal and 7 month goal",
    buttons: [
      {
        label: "Generate Diet",
        action: "post",
        target: "/frames/result"
      }
    ]
  });
});

/**
 * FRAME 4 — Result (AI + Tokens later)
 */
router.post("/result", async (req, res) => {
  return res.json({
    image: "https://your-image-url/result.png",
    buttons: [
      {
        label: "Check-in after 15 days",
        action: "post",
        target: "/frames/checkin"
      }
    ]
  });
});

export default router;
