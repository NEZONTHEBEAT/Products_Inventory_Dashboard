// =====================================================================
// Interactive Product Inventory & Analytics Dashboard
// Browser-only: uses prompt(), alert(), console.log(), and DOM manipulation
// =====================================================================

// ---------- Global configuration (configurable defaults) ----------
const DEFAULT_TAX_RATE = 18;          // percent
const DEFAULT_DISCOUNT_RATE = 10;     // percent
const AFFORDABLE_LIMIT = 200;         // "affordable" means price below $200

// ---------- Helper: format money (whole numbers stay clean, decimals get 2 places) ----------
const formatMoney = (amount) =>
  Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;

// ---------- Helper: round to 2 decimal places ----------
const roundToTwo = (value) => Math.round(value * 100) / 100;

// ---------- Helper: print a list like ["A", "B"] ----------
const formatList = (items) => '[' + items.map((item) => `"${item}"`).join(', ') + ']';

// =====================================================================
// REQUIREMENT 2: Control flow - validation and categories
// =====================================================================

// Regular function: checks that a product object is complete and valid (if...else)
function isValidProduct(product) {
  if (product === null || typeof product !== 'object') {
    return false;
  } else if (typeof product.name !== 'string' || product.name.trim() === '') {
    return false;
  } else if (typeof product.price !== 'number' || !Number.isFinite(product.price) || product.price <= 0) {
    return false;
  } else {
    return true;
  }
}

// Regular function: assigns a category badge using switch
//   Budget   : price below 50
//   Standard : 50 to 199.99
//   Premium  : 200 or more

function getCategory(price)
{
  let category;
  switch (true) {
    case price < 50:
      category = 'Budget';
      break;
    case price < 200:
      category = 'Standard';
      break;
    default:
      category = 'Premium';
  }
  return category;
}

// =====================================================================
// REQUIREMENT 1: Data and input initialization
// =====================================================================

// Asks the user for a product. Returns { valid, product } or { valid: false, reason }.
// It never throws, so bad input cannot crash the program.
function collectNewProduct()
{
const rawName = prompt('Enter the new product name:', 'Monitor');
const rawPrice = prompt('Enter the new product price ($):', '150');

if (rawName === null || rawPrice === null)
    {
    return { valid: false, reason: 'Prompt was cancelled.' };
    }

const name = rawName.trim();
if (name === '')
    {
    return { valid: false, reason: 'Product name cannot be empty.' };
    }

if (rawPrice.trim() === '')
    {
    return { valid: false, reason: 'Product price cannot be empty.' };
    }

const price = Number(rawPrice);  // convert string -> number
if (!Number.isFinite(price))
    {
    return { valid: false, reason: 'Product price must be a number.' };
    }
    else if (price <= 0)
    {
    return { valid: false, reason: 'Product price must be greater than zero.' };
}

return { valid: true, product: { name: name, price: price } };
}

// =====================================================================
// REQUIREMENT 3: Loops, break and continue
// =====================================================================

// Searches for a product by name. Uses 'continue' to skip bad entries and
// 'break' to stop as soon as a match is found (no need to check the rest).

function findProductIndex(inventory, name)
{
let foundIndex = -1;
for (let i = 0; i < inventory.length; i++)
    {
        if (!isValidProduct(inventory[i]))
        {
            continue;  // skip invalid or missing entries
        }
        if (inventory[i].name.toLowerCase() === name.toLowerCase())
        {
            foundIndex = i;
        break;   // duplicate found, stop searching
        }
    }
return foundIndex;
}

// Builds a clean list, skipping any invalid or missing products (continue)

function getValidProducts(inventory)
{
const cleanList = [];
for (let i = 0; i < inventory.length; i++)
    {
    if (!isValidProduct(inventory[i]))
        {
            console.warn(`Skipping invalid product at position ${i}.`);
            continue;
        }
    cleanList.push(inventory[i]);
    }
return cleanList;
}

// =====================================================================
// REQUIREMENT 4: Functions and scope (regular + arrow, configurable parameters)
// =====================================================================

// Arrow function: total inventory value (sum of all prices) using forEach
const calculateTotalValue = (items) =>
{
let total = 0;  // local variable: exists only in this function
items.forEach((item) =>
    {
    total += item.price;
    });
return total;
};

// Regular function: discount amount with a configurable percentage
function calculateDiscount(amount, discountPercent = DEFAULT_DISCOUNT_RATE)
{
const discountAmount = (amount * discountPercent) / 100;   // local scope
return roundToTwo(discountAmount);
}

// Arrow function: tax amount with a configurable rate
const calculateTax = (amount, taxRate = DEFAULT_TAX_RATE) =>
  roundToTwo((amount * taxRate) / 100);

// Regular function: combines discount (first) and tax (on the discounted amount)
function calculateFinalAmount(total, taxRate = DEFAULT_TAX_RATE, discountPercent = DEFAULT_DISCOUNT_RATE) 
{
const discount = calculateDiscount(total, discountPercent);
const afterDiscount = roundToTwo(total - discount);
const tax = calculateTax(afterDiscount, taxRate);
const finalAmount = roundToTwo(afterDiscount + tax);
return { discount, afterDiscount, tax, finalAmount };
}

// =====================================================================
// MAIN PROGRAM
// =====================================================================
function runInventoryApp() {
console.log('--- Initializing Inventory System ---');

  // Pre-existing products
const inventory = [
    { name: 'Laptop', price: 800 },
    { name: 'Mouse', price: 25 }
];

// Collect and validate the new product
const result = collectNewProduct();

if (result.valid)
    {
    if (findProductIndex(inventory, result.product.name) !== -1)
        {
            console.log(`[Input rejected: "${result.product.name}" already exists. Continuing with existing products.]`);
        }
        else
        {
            inventory.push(result.product);
            console.log(`[Prompt executed: User adds "${result.product.name}" at "$${result.product.price}"]`);
        }
    }
    else
        {
            console.log(`[Input rejected: ${result.reason} Continuing with existing products.]`);
        }

// Work only with valid products from here on
const cleanInventory = getValidProducts(inventory);

// ---------- Roster (forEach) ----------
console.log('\n--- Processing Inventory Roster (forEach) ---');
cleanInventory.forEach((product) =>
    {
        console.log(`* Item: ${product.name} (${formatMoney(product.price)}) -> Category: ${getCategory(product.price)}`);
    });

// ---------- Financial Analytics (filter, map, total) ----------
console.log('\n--- Financial Analytics ---');

const totalValue = calculateTotalValue(cleanInventory);

const affordableItems = cleanInventory.filter((product) => product.price < AFFORDABLE_LIMIT);
const affordableNames = affordableItems.map((product) => product.name);

const reportList = cleanInventory.map(
    (product) => `${product.name.toUpperCase()}: ${formatMoney(product.price)}`
);

console.log(`Total Inventory Value: ${formatMoney(totalValue)}`);
console.log(`Filtered Affordable Items (Under $${AFFORDABLE_LIMIT}): ${formatList(affordableNames)}`);
console.log(`Formatted Report List: ${formatList(reportList)}`);

// ---------- Tax and Discount (separate section; total above is unchanged) ----------
console.log('\n--- Tax & Discount Calculations ---');
const summary = calculateFinalAmount(totalValue, DEFAULT_TAX_RATE, DEFAULT_DISCOUNT_RATE);

console.log(`Inventory Value (unchanged): ${formatMoney(totalValue)}`);
console.log(`Discount (${DEFAULT_DISCOUNT_RATE}%): -${formatMoney(summary.discount)}`);
console.log(`Value After Discount: ${formatMoney(summary.afterDiscount)}`);
console.log(`Tax (${DEFAULT_TAX_RATE}%): ${formatMoney(summary.tax)}`);
console.log(`Final Payable Amount: ${formatMoney(summary.finalAmount)}`);

// ---------- Local scope demonstration ----------
console.log('\n--- Scope Demonstration ---');
try {
        console.log(discountAmount);   // discountAmount exists only inside calculateDiscount()
    }
catch (error)
    {
        console.log(`${error.name}: ${error.message} (local variables stay inside their function)`);
    }
}

// Start the app after the page has loaded (so the page is visible before prompts appear)
window.addEventListener('load', () => setTimeout(runInventoryApp, 100));

// "Run Again" button
document.getElementById('runBtn').addEventListener('click', runInventoryApp);