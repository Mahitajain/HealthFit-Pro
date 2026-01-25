import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(process.env.MONAD_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const abi = [
  "function mint(address to, uint256 amount) public"
];

const contract = new ethers.Contract(
  process.env.TOKEN_CONTRACT,
  abi,
  wallet
);

export async function mintReward(userAddress, amount) {
  const tx = await contract.mint(userAddress, amount);
  await tx.wait();
  return tx.hash;
}
