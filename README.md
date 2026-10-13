# Products_Inventory_Dashboard

A console-based JavaScript application that combines all core JavaScript concepts into a single comprehensive program. This project simulates a real-world inventory management system with data input, validation, analytics, and secure calculations.

## 🏗️ Project Overview

This dashboard prompts the user to add a new product, validates the input, categorizes items based on price thresholds, and generates financial analytics reports. It also demonstrates advanced JavaScript concepts like closures, scope, array methods, and DOM manipulation for a clean UI.

## 📋 Core Requirements & Implementation Flow

| Requirement | Implementation Details |
| :--- | :--- |
| **1. Data & Input Initialization** | Uses `prompt()` to capture product name and price. Performs explicit type conversion using `Number()`. Stores the new item in an array of objects alongside pre-existing items. |
| **2. Control Flow & Conditional Evaluation** | Uses `if...else` for input validation (empty, invalid number, cancellation). Uses `switch(true)` to assign category badges (Budget < $50, Standard < $200, Premium >= $200). |
| **3. Loops & Flow Control** | Uses `while`/`do...while` loops with `break` and `continue` to handle bad or missing user inputs cleanly and search through the inventory array. |
| **4. Functions & Scope** | Implements regular functions (`calculateTotalValue`) and arrow functions (`applyTax`, `applyDiscount`). Demonstrates secure local scoping using block-scoped variables and error handling. |
| **5. Array Methods & Iteration** | Leverages `forEach()` to log the final inventory sheet, `filter()` to isolate affordable items (under $200), and `map()` to produce a transformed uppercase report summary. |

## ✨ Extra Features Added (Professional Touch)

- **LocalStorage Persistence:** Inventory data is saved in `localStorage`, so it persists across browser reloads.
- **Advanced Analytics:** Uses `reduce()` to calculate total value, average price, most expensive, and cheapest items.
- **Sorting:** Uses `sort()` to display items by price (ascending) and alphabetically.
- **Duplicate Check:** Prevents adding the same product name multiple times.
- **HTML Dashboard:** Renders a beautiful, styled HTML table and analytics cards directly on the page using template literals.
- **Tax & Discount Demo:** Calculates final payable amount with 10% discount and 18% tax, plus a scope demonstration.

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, custom properties, cards, badges)
- JavaScript (ES6+ features: arrow functions, template literals, destructuring, spread operator)

## 🎮 How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge).
3. You will be prompted to enter a product name and price. (Defaults are provided for testing).
4. Press `F12` to open the Developer Tools Console and view the full log.
5. The dashboard results will also render directly on the webpage.

## 📊 Expected Console Output Simulation

```text
--- Initializing Inventory System ---
[Prompt executed: User adds "Monitor" at "$150"]

--- Processing Inventory Roster (forEach) ---
* Item: Laptop ($800) -> Category: Premium
* Item: Mouse ($25) -> Category: Budget
* Item: Monitor ($150) -> Category: Standard

--- Financial Analytics ---
Total Inventory Value: $975
Filtered Affordable Items (Under $200): ["Mouse", "Monitor"]
Formatted Report List: ["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]

--- Tax & Discount Calculations ---
Inventory Value (unchanged): $975
Discount (10%): -$97.50
Value After Discount: $877.50
Tax (18%): $157.95
Final Payable Amount: $1035.45

--- Scope Demonstration ---
ReferenceError: discountAmount is not defined (local variables stay inside their function)
