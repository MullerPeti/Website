# ManHedger MT5

**ManHedger MT5** is a semi-automated trade management and hedging tool for MetaTrader 5, designed for traders who want **full control with powerful execution support**. It combines manual hedging, grid, and zone-recovery workflows into a single, lightweight assistant.

> ⚠️ This is **not a fully automated EA**. User interaction is required.

---

## What ManHedger Does

ManHedger helps you **build, manage, and visualize complex trade structures** (hedge, grid, zone recovery) directly from the chart—clearly, safely, and efficiently.

It can act as:
- a **manual hedge assistant**
- a **trade manager**
- or a **semi-auto strategy executor**

---

## Core Capabilities

- Manual **hedging & zone recovery** strategy support  
- **Grid strategy** creation for ranging markets  
- One-click **order placement, reverse, and close**
- Partial **Take Profit / Stop Loss**
- **Automatic breakeven**
- **Trailing StopLoss**
- Risk-Reward based position management
- TP / SL displayed as **percentages**
- Position size shown in **monetary value**
- Drawdown & profit **limitation tools**
- Visual **on-chart trade and strategy display**
- Manage **open trades & pending orders**
- Supports **manual + semi-auto workflows**

---

## Designed For

- Discretionary traders using **hedging or grid logic**
- Traders preparing **zone recovery strategies before news**
- Traders who want **visual clarity and execution speed**
- Prop-firm or challenge traders needing **risk control**

---

## Practical Notes & Recommendations

- Zone recovery and grid strategies require **high RR**  
  → Recommended **Risk-Reward ≥ 15:1**
- Do **not** run grid and zone recovery simultaneously on the same symbol
- Avoid very small order steps or high density in grids
- Use **unique magic numbers** per symbol
- Do not remove the EA or close MetaTrader while strategies are active
- EA will not operate if account balance is **0**
- Re-enter volume when calculating in monetary terms if price changes

---

## Installation

1. Copy `ManHedger.ex5` to `MQL5/Experts`
2. Restart MetaTrader 5 or refresh Navigator
3. Attach **ManHedger MT5** to the desired chart
4. Configure lot sizing and risk parameters

---

## Trial & Support

- **Test version available at the bottom of the manual** – please test before purchasing  
- Watch the **video guide** before use  
- For support, bug reports, or MT4 version requests, contact via **MQL5 messages**

---

## Disclaimer

No profits or financial success are guaranteed.  
Past performance does not indicate future results.  
Use only risk capital you can afford to lose.

---

**ManHedger MT5** is continuously improved—new versions and refinements are expected.
