"""
questions.py - 30 accounting questions that know their own answers.

Six domains, five levels each (level 1 is one step, level 5 is five steps). Every question is built by
code, and the code also works out the right answer, so nothing needs a human or a second model to mark it.
The same seed always gives the same 30 questions.

Python 3.9, standard library only.
"""
import math
import random
from dataclasses import dataclass

SEED = 20261112
GST = 0.15          # New Zealand GST


@dataclass
class Question:
    id: str
    domain: str
    level: int
    prompt: str
    answer: float


def money(x):
    return "${:,.2f}".format(x)


# ---------------------------------------------------------------- the sums (kept apart so they can be tested)

def bank_statement_balance(cash_book, charges=0.0, interest=0.0, unpresented=0.0, uncredited=0.0, dishonoured=0.0):
    """Balance on the bank statement, from the cash book balance and the reconciling items."""
    return round(cash_book - charges + interest + unpresented - uncredited - dishonoured, 2)


def straight_line(cost, residual, life):
    return round((cost - residual) / life, 2)


def reducing_balance_nbv(cost, rate, years):
    return round(cost * (1 - rate) ** years, 2)


def gst_inclusive(net):
    return round(net * (1 + GST), 2)


def gst_in_total(total):
    return round(total * GST / (1 + GST), 2)


def weighted_average(layers):
    """layers is a list of (units, unit_cost)."""
    units = sum(u for u, _ in layers)
    return round(sum(u * c for u, c in layers) / units, 2)


def fifo_cost(layers, units_sold):
    """Cost of the first `units_sold` units, taking the oldest layers first."""
    cost, left = 0.0, units_sold
    for units, unit_cost in layers:
        take = min(units, left)
        cost += take * unit_cost
        left -= take
        if left == 0:
            break
    return round(cost, 2)


# ---------------------------------------------------------------- the six domains

def reconciliation(level, rng):
    cash_book = rng.randrange(3000, 9000, 10)
    charges = rng.randrange(20, 90, 5)
    interest = rng.randrange(10, 60, 5)
    unpresented = rng.randrange(200, 900, 10)
    uncredited = rng.randrange(150, 700, 10)
    dishonoured = rng.randrange(100, 400, 10)
    parts = ["The cash book shows a balance of {}.".format(money(cash_book)),
             "Bank charges of {} are on the bank statement but not yet in the cash book.".format(money(charges))]
    kw = {"charges": charges}
    if level >= 2:
        parts.append("Interest of {} was credited by the bank but is not yet in the cash book.".format(money(interest)))
        kw["interest"] = interest
    if level >= 3:
        parts.append("Cheques totalling {} were issued but have not yet been presented to the bank.".format(money(unpresented)))
        kw["unpresented"] = unpresented
    if level >= 4:
        parts.append("A deposit of {} was made but has not yet been credited by the bank.".format(money(uncredited)))
        kw["uncredited"] = uncredited
    if level >= 5:
        parts.append("A customer's cheque for {} was dishonoured; the bank has deducted it but the cash book still shows it.".format(money(dishonoured)))
        kw["dishonoured"] = dishonoured
    parts.append("What balance appears on the bank statement?")
    return " ".join(parts), bank_statement_balance(cash_book, **kw)


def depreciation(level, rng):
    cost = rng.randrange(12000, 60000, 500)
    life = rng.choice([4, 5, 8, 10])
    residual = rng.randrange(1000, 4000, 500)
    years = rng.randrange(2, life)
    months = rng.choice([3, 5, 7, 9])
    rate = rng.choice([0.20, 0.25, 0.30])
    annual = straight_line(cost, residual, life)
    if level == 1:
        return ("A machine costs {} and is expected to have a residual value of {} after {} years. "
                "Using the straight-line method, what is the annual depreciation expense?".format(money(cost), money(residual), life), annual)
    if level == 2:
        return ("A machine costs {} with a residual value of {} and a useful life of {} years, depreciated straight-line. "
                "What is its net book value at the end of year {}?".format(money(cost), money(residual), life, years), round(cost - years * annual, 2))
    if level == 3:
        return ("A machine costs {} with a residual value of {} and a useful life of {} years, depreciated straight-line. "
                "It is bought {} months before the end of the financial year, and depreciation is time-apportioned by month. "
                "What is the depreciation expense for that first financial year?".format(money(cost), money(residual), life, months), round(annual * months / 12, 2))
    if level == 4:
        return ("A vehicle costs {} and is depreciated by the reducing-balance method at {:.0f}% a year. "
                "What is its net book value at the end of year {}? Round to 2 decimal places.".format(money(cost), rate * 100, years), reducing_balance_nbv(cost, rate, years))
    proceeds = round(cost - years * annual + rng.choice([-1, 1]) * rng.randrange(300, 1500, 50), 2)
    return ("A machine costs {} with a residual value of {} and a useful life of {} years, depreciated straight-line. "
            "After {} full years it is sold for {}. What is the gain or loss on disposal? "
            "Give a gain as a positive number and a loss as a negative number.".format(money(cost), money(residual), life, years, money(proceeds)),
            round(proceeds - (cost - years * annual), 2))


def gst(level, rng):
    net = rng.randrange(200, 4000, 10)
    total = round(gst_inclusive(rng.randrange(300, 3000, 10)), 2)
    discount = rng.choice([5, 10, 15, 20])
    use = rng.choice([40, 60, 75])
    sales = rng.randrange(8000, 20000, 100)
    purchases = round(gst_inclusive(rng.randrange(2000, 7000, 100)), 2)
    if level == 1:
        return ("Goods are priced at {} before GST. GST is 15%. What is the GST-inclusive price?".format(money(net)), gst_inclusive(net))
    if level == 2:
        return ("A receipt shows a GST-inclusive total of {}. GST is 15%. How much of the total is GST?".format(money(total)), gst_in_total(total))
    if level == 3:
        return ("A supplier's list price is {} before GST. A {}% trade discount is given on the list price, then 15% GST is added. "
                "What is the final amount payable?".format(money(net), discount), round(net * (1 - discount / 100) * (1 + GST), 2))
    if level == 4:
        return ("A business buys equipment for {} including 15% GST. It will use the equipment {}% for business purposes. "
                "How much GST can it claim back?".format(money(total), use), round(gst_in_total(total) * use / 100, 2))
    return ("In one period a business made sales of {} before GST and purchases of {} including GST. GST is 15%. "
            "What is the net GST payable to the tax authority? Give a refund as a negative number.".format(money(sales), money(purchases)),
            round(sales * GST - gst_in_total(purchases), 2))


def margins(level, rng):
    cost = rng.randrange(20, 400, 5)
    markup = rng.choice([20, 25, 30, 40, 50, 60])
    price = round(cost * (1 + rng.choice([0.3, 0.45, 0.6, 0.8])), 2)
    contribution = rng.choice([8, 10, 12, 15, 20])
    units = rng.randrange(150, 900, 25)
    variable = rng.randrange(10, 60, 2)
    unit_price = variable + contribution
    target = rng.choice([20, 25, 30, 40])
    if level == 1:
        return ("An item costs {} to buy. The shop adds a {}% markup on cost. What is the selling price?".format(money(cost), markup), round(cost * (1 + markup / 100), 2))
    if level == 2:
        return ("An item that costs {} is sold for {}. What is the gross profit margin as a percentage of the selling price? "
                "Round to 2 decimal places.".format(money(cost), money(price)), round((price - cost) / price * 100, 2))
    if level == 3:
        return ("A product sells for {} per unit with variable costs of {} per unit. Fixed costs are {}. "
                "How many units must be sold to break even?".format(money(unit_price), money(variable), money(contribution * units)), float(units))
    if level == 4:
        return ("A product sells for {} per unit with variable costs of {} per unit. "
                "What is the contribution margin ratio as a percentage? Round to 2 decimal places.".format(money(unit_price), money(variable)),
                round(contribution / unit_price * 100, 2))
    return ("An item costs {} to buy. The shop wants a gross profit margin of {}% of the selling price. "
            "What selling price achieves that? Round to 2 decimal places.".format(money(cost), target), round(cost / (1 - target / 100), 2))


def statements(level, rng):
    assets = rng.randrange(80000, 300000, 1000)
    liabilities = rng.randrange(20000, 70000, 1000)
    revenue = rng.randrange(120000, 400000, 1000)
    cogs = round(revenue * rng.choice([0.45, 0.5, 0.55]), 0)
    wages = rng.randrange(20000, 60000, 1000)
    rent = rng.randrange(8000, 24000, 500)
    opening = rng.randrange(30000, 90000, 1000)
    dividends = rng.randrange(5000, 20000, 500)
    cash = rng.randrange(8000, 30000, 500)
    receivables = rng.randrange(10000, 40000, 500)
    inventory = rng.randrange(12000, 45000, 500)
    prepaid = rng.randrange(1000, 5000, 100)
    payables = rng.randrange(9000, 30000, 500)
    loan = rng.randrange(5000, 20000, 500)
    profit = revenue - cogs - wages - rent
    if level == 1:
        return ("A business has total assets of {} and total liabilities of {}. What is the owner's equity?".format(money(assets), money(liabilities)), float(assets - liabilities))
    if level == 2:
        return ("For the year a business had revenue of {}, cost of goods sold of {}, wages of {} and rent of {}. "
                "What was its net profit?".format(money(revenue), money(cogs), money(wages), money(rent)), float(profit))
    if level == 3:
        return ("Retained earnings at the start of the year were {}. Net profit for the year was {} and dividends of {} were paid. "
                "What are the retained earnings at the end of the year?".format(money(opening), money(profit), money(dividends)), float(opening + profit - dividends))
    if level == 4:
        return ("A business has cash of {}, receivables of {} and inventory of {}. Its current liabilities are payables of {} and a short-term loan of {}. "
                "What is its working capital?".format(money(cash), money(receivables), money(inventory), money(payables), money(loan)),
                float(cash + receivables + inventory - payables - loan))
    return ("A business has cash of {}, receivables of {}, inventory of {} and prepaid expenses of {}. Its current liabilities are payables of {} and a short-term loan of {}. "
            "What is its quick ratio (cash plus receivables, divided by current liabilities)? Round to 2 decimal places.".format(
                money(cash), money(receivables), money(inventory), money(prepaid), money(payables), money(loan)),
            round((cash + receivables) / (payables + loan), 2))


def inventory(level, rng):
    layers = [(rng.randrange(40, 120, 10), rng.randrange(8, 20)) for _ in range(3)]
    layers = [(u, float(c)) for u, c in layers]
    # make the prices rise, as in a period of inflation, so FIFO and average cost differ
    layers = [(layers[0][0], layers[0][1]), (layers[1][0], layers[0][1] + 2.0), (layers[2][0], layers[0][1] + 5.0)]
    text = "; ".join("{} units at {} each".format(u, money(c)) for u, c in layers)
    total_units = sum(u for u, _ in layers)
    sold_two = layers[0][0] + rng.randrange(10, layers[1][0], 5)
    sold_three = layers[0][0] + layers[1][0] + rng.randrange(10, layers[2][0], 5)
    returned = rng.randrange(5, 20, 5)
    if level == 1:
        return ("A business bought inventory in three batches: {}. What was the total cost of the purchases?".format(text), round(sum(u * c for u, c in layers), 2))
    if level == 2:
        return ("A business bought inventory in three batches: {}. Using the weighted-average method, what is the average cost per unit? "
                "Round to 2 decimal places.".format(text), weighted_average(layers))
    if level == 3:
        return ("A business bought inventory in three batches, oldest first: {}. It then sold {} units. "
                "Using FIFO, what is the cost of goods sold?".format(text, sold_two), fifo_cost(layers, sold_two))
    if level == 4:
        return ("A business bought inventory in three batches, oldest first: {}. It then sold {} units. "
                "Using FIFO, what is the value of the closing inventory?".format(text, sold_three),
                round(sum(u * c for u, c in layers) - fifo_cost(layers, sold_three), 2))
    remaining = total_units - returned
    sold_five = rng.randrange(layers[0][0] + 10, remaining - 5, 5)          # always fewer than the units left
    avg = round((sum(u * c for u, c in layers) - returned * layers[2][1]) / remaining, 2)
    return ("A business bought inventory in three batches: {}. It then returned {} units from the last batch to the supplier at the batch price, "
            "and sold {} units. Using the weighted-average method on the units and cost remaining after the return, what is the cost of goods sold? "
            "Round the average cost per unit to 2 decimal places first.".format(text, returned, sold_five), round(sold_five * avg, 2))


DOMAINS = [("reconciliation", reconciliation), ("depreciation", depreciation), ("gst", gst),
           ("margins", margins), ("statements", statements), ("inventory", inventory)]


def build(seed=SEED):
    """The 30 questions: six domains, levels 1 to 5, in a fixed order."""
    rng = random.Random(seed)
    out = []
    for name, make in DOMAINS:
        for level in range(1, 6):
            prompt, answer = make(level, rng)
            out.append(Question("{}-{}".format(name, level), name, level, prompt, float(answer)))
    return out


# ---------------------------------------------------------------- asking and checking

STYLES = {
    "working": ("You are helping with an accounting exam. Work out the answer step by step, keeping it short, then finish with one "
                "final line in exactly this form:\nANSWER: <number>\nUse digits only: no currency symbol, no commas and no units. "
                "Use a minus sign for a loss or a refund. Round to 2 decimal places if needed.\n\nQuestion:\n{q}"),
    "direct": ("You are helping with an accounting exam. Do not show any working. Reply with one line only, in exactly this form:\n"
               "ANSWER: <number>\nUse digits only: no currency symbol, no commas and no units. Use a minus sign for a loss or a refund. "
               "Round to 2 decimal places if needed.\n\nQuestion:\n{q}"),
}


def make_prompt(question, style="working"):
    return STYLES[style].format(q=question.prompt)


def parse_answer(text):
    """The number on the last 'ANSWER:' line, or None when the model did not follow the format."""
    import re
    found = re.findall(r"ANSWER:\s*\**\s*(-?\s*[\d,]*\.?\d+)", text or "", flags=re.IGNORECASE)
    if not found:
        return None
    try:
        return float(found[-1].replace(",", "").replace(" ", ""))
    except ValueError:
        return None


def is_correct(parsed, expected, tolerance_cents=1):
    """Right when the two numbers are within a cent of each other, compared as whole cents.

    Comparing as whole cents matters: 1578.13 - 1578.12 is a hair more than 0.01 in floating point, so a
    "within 0.01" test marks a model that rounded half a cent up as wrong.
    """
    if parsed is None:
        return False
    return abs(round(parsed * 100) - round(expected * 100)) <= tolerance_cents


if __name__ == "__main__":
    for q in build():
        print("{:<18} {:>12.2f}  {}".format(q.id, q.answer, q.prompt[:90]))
