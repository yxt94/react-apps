import { Outlet } from "react-router-dom";
import RewardsList from "../components/RewardsList";

function Rewards() {
  return (
    <>
      <Outlet />
      <main>
        <RewardsList />
      </main>
    </>
  );
}

export default Rewards;

export async function loader() {
  const response = await fetch("http://localhost:8080/transactions");
  const resData = await response.json();
  const transactions = resData.transactions;
  let calculatedRewards = {};

  const calculateRewards = () => {
    // Calculate the reward points earned by each customer per month and total
    const monthlyRewards = {};
    const totalRewards = {};
    transactions.forEach((transaction) => {
      const { customer, amount, date } = transaction;

      // Calculate the reward points for the transaction
      const pointsEarned = calculateRewardPoints(amount);

      // Update the monthly rewards dictionary
      const month = new Date(date).getMonth() + 1; // January is month 0
      if (!monthlyRewards[customer]) {
        monthlyRewards[customer] = {};
      }
      if (!monthlyRewards[customer][month]) {
        monthlyRewards[customer][month] = 0;
      }
      monthlyRewards[customer][month] += pointsEarned;

      // Update the total rewards dictionary
      if (!totalRewards[customer]) {
        totalRewards[customer] = 0;
      }
      totalRewards[customer] += pointsEarned;
    });

    return { monthly: monthlyRewards, total: totalRewards };
  };

  // Function to calculate reward points for a given transaction
  const calculateRewardPoints = (amount = 10) => {
    let rewardPoints = 0;
    if (amount > 100) {
      rewardPoints += (amount - 100) * 2;
    }
    if (amount >= 50 && amount <= 100) {
      rewardPoints += amount - 50;
    }
    return rewardPoints;
  };

  calculatedRewards = calculateRewards();

  return calculatedRewards;
}
