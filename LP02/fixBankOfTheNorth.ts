// Program requirements:
// - A user can withdraw funds.
// - A user can deposit funds.
// - A user's balance should never become negative.
// - A PIN must be provided during every action.

// This is the fixed version. The author went through the issue log
// and fixed all the bugs the group agreed on. Comments explain what changed.

// FIX (extra): "USER" was never used anywhere so ESLint complained. We log it
// in balanceCheck now so it actually gets used.
const USER = "Rose Thecat";
// FIX (Issue 1): BALANCE used to be an array [15, 983] which broke all the math.
// Now it's one number, and it's "let" because it changes when you add/remove money.
let BALANCE = 998;
const USER_PIN = 1234;

// Deposits money into a user's account.
export function deposit(pin: number, amount: number) {
  if (pin === USER_PIN) {
    // FIX (Issue 2): actually update the real BALANCE and return it.
    BALANCE = BALANCE + amount;
    console.log(BALANCE);
    return BALANCE;
  } else {
    console.log("Incorrect PIN");
  }
}

// Withdraws money from a user's account.
// FIX (Issue 8): renamed from "withdrawl" to "withdraw" (spelling).
export function withdraw(pin: number, amount: number) {
  if (pin === USER_PIN) {
    // FIX (Issue 4): don't let the balance go negative.
    if (amount > BALANCE) {
      console.log("Not enough money");
      return BALANCE;
    }
    // FIX (Issue 3): subtract instead of add, and use the real amount.
    BALANCE = BALANCE - amount;
    console.log(BALANCE);
    return BALANCE;
  } else {
    console.log("Incorrect PIN");
  }
}

// Returns the account balance.
export function balanceCheck() {
  // FIX (Issue 5): moved the console.log BEFORE the return so it actually runs.
  console.log(`${USER}'s balance is ${BALANCE}`);
  return BALANCE;
}

// Transfers money to another user's account and withdraws it from the account.
// FIX (Issue 9): renamed "reciver" to "receiver".
export function transfer(pin: number, amount: number, receiver: string) {
  // FIX (Issue 6): call withdraw with BOTH pin and amount in the right order.
  // (removed the unused transferAmount variable that ESLint complained about.)
  withdraw(pin, amount);
  console.log(`Success! ${amount} was transferred to ${receiver}`);
  // FIX (Issue 7): actually CALL balanceCheck with () instead of returning the function.
  return balanceCheck();
}

