# Issue Log - Bank Of The North

Scribe: Nathaniel

Ok so this is the list of all the bugs we found just by reading the code with our eyeballs but VSC did show a handful of issues ahead of time. 

---

## Issue 1

- **Location:** Line 8 (`const BALANCE = [15, 983];`)
- **Issue:** The balance is an array with two numbers in it, but the whole program treats it like it's just one number.
- **Explanation:** You can't really do math on an array like it's a number. If you try to add a number to an array in JavaScript/TypeScript it turns everything into text (like a string) instead of actually adding. So the money math is gonna be super wrong.
- **Suggested Fix:** Make it a single number instead, like `let BALANCE = 998;` (and it should be `let` not `const` because the balance changes when you deposit or withdraw).
- **Status:** Fixed

## Issue 2

- **Location:** Line 13 (`balance = BALANCE + balance;` inside `deposit`)
- **Issue:** The deposit function adds stuff to the wrong variable and returns the wrong thing.
- **Explanation:** It changes the local `balance` variable but then returns `BALANCE` which never actually got changed. So depositing money does literally nothing to the real balance. Also it's adding an array to a number which is broken (see Issue 1).
- **Suggested Fix:** Actually update the real balance, like `BALANCE = BALANCE + amount;` and then return `BALANCE`.
- **Status:** Fixed

## Issue 3

- **Location:** Line 23 (the whole `withdrawl` function)
- **Issue:** The withdraw function is a mess. It uses a variable called `balance` that was never even passed in (the parameter is called `amount`). It also ADDS money instead of subtracting it.
- **Explanation:** Withdrawing is supposed to take money OUT, but the code does `BALANCE + balance` which is adding. Also `balance` doesn't exist as a parameter so it would just error out or be undefined.
- **Suggested Fix:** Subtract the amount instead: `BALANCE = BALANCE - amount;` and use the real `amount` parameter.
- **Status:** Fixed

## Issue 4

- **Location:** The whole file (deposit, withdrawl, transfer)
- **Issue:** Nothing stops the balance from going negative.
- **Explanation:** One of the rules literally says the balance should never be negative. But nothing checks if you're trying to take out more money than you have. So you could withdraw a million dollars and go way negative.
- **Suggested Fix:** Before withdrawing, check `if (amount > BALANCE)` and don't let it happen. Print something like "Not enough money".
- **Status:** Fixed

## Issue 5

- **Location:** Lines 36-37 (`balanceCheck` function)
- **Issue:** There's a `console.log` AFTER the `return`, so it never runs.
- **Explanation:** Once a function hits `return`, it stops. So the line that prints "Your balance is..." is dead code and never happens. Kind of pointless.
- **Suggested Fix:** Move the `console.log` BEFORE the `return`, or just delete it if you don't need it.
- **Status:** Fixed

## Issue 6

- **Location:** Line 41 (`const transferAmount = withdrawl(amount);`)
- **Issue:** The transfer function calls withdraw wrong.
- **Explanation:** The `withdrawl` function needs two things (a pin and an amount) but transfer only gives it one (`amount`), and it's putting `amount` where the `pin` is supposed to go. So the pin check would totally break.
- **Suggested Fix:** Call it like `withdrawl(pin, amount)` so the pin and amount go in the right spots.
- **Status:** Fixed


AI was used to organize and make all issues and resolutions in this page easily digestable