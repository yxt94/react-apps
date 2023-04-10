import { useLoaderData } from "react-router-dom";

import classes from "./RewardsList.module.css";

function RewardsList() {
  const calculatedRewards = useLoaderData();

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", { month: "long" });
  }

  return (
    <>
      <div className={classes.rewardDetails}>
        <div>
          <h2>Monthly Rewards</h2>
          {Object.keys(calculatedRewards?.monthly).map((customer) => (
            <div key={customer}>
              <h3>{customer}</h3>
              <ul>
                {Object.keys(calculatedRewards?.monthly[customer]).map(
                  (month) => (
                    <li key={month}>
                      {`Month ${getMonthName(month)}: ${
                        calculatedRewards?.monthly[customer][month]
                      } points`}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <h2>Total Rewards</h2>
          {Object.keys(calculatedRewards?.total).map((customer) => (
            <div key={customer}>
              <h3>{customer}</h3>
              {`Total: ${calculatedRewards?.total[customer]} points`}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RewardsList;
