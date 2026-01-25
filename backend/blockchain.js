import { ethers } from "ethers";

let provider = null;
let wallet = null;
let contract = null;

const abi = [
  "function mint(address to, uint256 amount) public"
];

// Initialize blockchain ONLY if all env vars are valid
if (
  process.env.MONAD_RPC_URL &&
  process.env.PRIVATE_KEY &&
  process.env.PRIVATE_KEY.startsWith("0x") &&
  process.env.TOKEN_CONTRACT
) {
  try {
    provider = new ethers.JsonRpcProvider(process.env.MONAD_RPC_URL);
    wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    contract = new ethers.Contract(
      process.env.TOKEN_CONTRACT,
      abi,
      wallet
    );
    console.log("✅ Blockchain module initialized");
  } catch (err) {
    console.log("⚠️ Blockchain init failed, running in demo mode");
    contract = null;
  }
} else {
  console.log("ℹ️ Blockchain disabled (missing env variables)");
}

export async function mintReward(userAddress, amount) {
  // Demo-safe fallback
  if (!contract) {
    console.log("🟡 Mint skipped (demo mode)");
    return "DEMO_TX_HASH";
  }

  const tx = await contract.mint(userAddress, amount);
  await tx.wait();
  return tx.hash;
}
