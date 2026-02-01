# ManHedger MT4

**ManHedger MT4** is a semi-automated trade management and hedging utility for MetaTrader 4, built for traders who want **manual control with advanced execution tools**. It supports hedging, grid, and zone-recovery workflows in a clear, visual, and efficient way.

> ⚠️ This is **not a fully automated EA**. User interaction is required.

---

## What ManHedger MT4 Does

ManHedger MT4 allows you to **construct, manage, and monitor complex trade structures** directly from the chart—without hiding logic behind full automation.

It can be used as:
- a **manual hedge assistant**
- a **trade & order manager**
- a **semi-automated strategy executor**

---

## Core Capabilities

- Manual **hedging** and **zone recovery** strategy support  
- **Grid strategy** creation for ranging markets  
- One-click **order placement, reverse, and close-all**
- **Partial Take Profit / Stop Loss**
- **Automatic breakeven**
- **Trailing StopLoss**
- Risk-Reward–based trade management
- TP / SL shown as **percentages**
- Position size displayed in **monetary value**
- **Drawdown & profit limitation** tools
- Visual **on-chart trade and strategy display**
- Manage **open trades & pending orders**
- Suitable for **manual + semi-auto workflows**

---

## Designed For

- Traders using **manual hedging or grid logic**
- Zone recovery setups, including **pre-news volatility**
- Traders who value **visual clarity and fast execution**
- Prop-firm or challenge traders needing **strict risk control**

---

## Practical Notes & Recommendations

- Zone recovery and grid strategies require **high RR**  
  → Recommended **Risk-Reward ≥ 15:1**
- Do **not** run grid and zone recovery simultaneously on the same symbol
- Avoid excessive grid density or very small initial order sizes
- Use **unique magic numbers** per symbol
- Do not remove the EA or close MetaTrader while strategies are active
- EA will not function if account balance is **0**
- If calculating volume in monetary terms, re-enter values after price changes

---
## Trial & Support

- **Test version available at the bottom of the manual** – please test before purchasing  
- Watch the **video guide** before use  
- For support, bug reports, or MT5 version requests, contact via **MQL5 messages**

---

## Installation

1. Copy `ManHedger.ex4` to `MQL4/Experts`
2. Restart MetaTrader 4 or refresh the Navigator
3. Attach **ManHedger MT4** to the desired chart
4. Configure lot sizing
