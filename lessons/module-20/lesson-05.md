---
id: "20.5"
module: 20
minutes: 15
practice_minutes: 90
prerequisites: ["06.5", "18.1", "17.7", "20.1"]
objectives:
  - "S5.5 — Calculate turnover from volumes and prices before VAT, and the result of a month from its products and charges (raw materials, wages, energy, rent…)."
  - "S5.5 — Set a selling price from the full cost, the margin, the competitors' prices and the right VAT rate (5.5 % or 10 %), and explain what drives it."
  - "S5.5 — Calculate the value added and show how it is shared, and tell how profit is taxed in an individual business and in a company."
  - "S5.4 — Classify production modes (unit, batch, continuous) and check a supplier invoice against the order and the delivery note."
volatility: implementation
sources:
  - title: "Référentiel CAP Boulanger (annexes of the arrêté of 21 February 2014): S5.5.1 coûts, marge, prix de vente, taux de TVA; S5.5.2 chiffre d'affaires et résultat; S5.5.3 imposition des bénéfices, valeur ajoutée et sa répartition; S5.5.5 croissance; S5.4.1 modes de production; S5.4.2 documents d'approvisionnement"
    url: https://www.ecoledesmetiers.fr/sites/default/files/ressources-cadrage-officiel/fichiers/2019-06/R%C3%A9f%C3%A9rentiel_CAP_Boulanger.pdf
  - title: "BOFiP-Impôts, BOI-TVA-LIQ-30-10-10 — TVA, taux réduits, produits destinés à l'alimentation humaine (version in force from 19/11/2025): 5.5 % for food, 10 % for food prepared for immediate consumption sold to take away"
    url: https://bofip.impots.gouv.fr/bofip/2033-PGP.html
  - title: "Entreprendre.Service-Public.gouv.fr F23575 — Impôt sur les sociétés (verified 17 February 2026): SARL, SAS, SASU subject to IS; EI classically subject to income tax; 25 % normal rate, 15 % on the first €42,500 of profit under conditions (turnover ≤ €10 million, capital fully paid, ≥ 75 % held by individuals)"
    url: https://entreprendre.service-public.gouv.fr/vosdroits/F23575
  - title: "INSEE — Méthodologie des comptes trimestriels, chapitre 4: the production account has value added as its balance (production − intermediate consumption), value added measures the wealth created; gross operating surplus = value added − wages − social contributions − other taxes on production + subsidies"
    url: https://www.insee.fr/fr/statistiques/fichier/2571301/imet126_e_chapitre_4_comptes_branches_tee.pdf
  - title: "CNBPF (boulangerie.org) — Guide de sobriété énergétique en boulangerie-pâtisserie (2022): example electricity price 0.20 € per kWh (used in lesson 18.1)"
    url: https://boulangerie.org/wp-content/uploads/Guide-sobriete-Web-PaP.pdf
last_verified: "2026-10-09"
---

# 20.5 · Costs, Prices, VAT and Results

Lesson [06.5](../module-06/lesson-05.md) costed one baguette; this lesson costs the whole bakery. You will turn a month of sales into turnover, subtract the charges to find the result, see how the wealth the bakery creates is shared, and set prices for a product line with the right VAT. You finish by pricing a five-product line and building the simplified monthly results of a small bakery.

## Why it matters

The référentiel asks you to find turnover and its components, the main charges and the result, to characterise the determinants of a price, to cite the VAT rates, to define value added and its distribution and to distinguish how profits are taxed (S5.5); EP1 gives these as calculations on bakery documents (see [The CAP Boulanger Exam](../../references/cap-exam.md#ep1-written-test-on-technology-applied-science-and-management)). In the fournil, these numbers explain why the owner watches waste (lesson [18.2](../module-18/lesson-02.md)), energy (lesson [18.1](../module-18/lesson-01.md)) and the weight of pâtons: in the example of this lesson, a month's result is under 10 % of turnover, so a few points of waste decide whether the month makes money.

## Key terms

| French | Say it | English meaning |
|---|---|---|
| chiffre d'affaires (CA) HT | *SHEE-fruh da-FAIR ash-TAY* | turnover: quantity sold × price before VAT |
| charges / produits | *SHARZH / pro-DÜEE* | expenses / income of the business |
| résultat (bénéfice ou perte) | *ray-zül-TAH (bay-nay-FEES, PAIRT)* | result: income − expenses (profit or loss) |
| compte de résultat | *KOHNT duh ray-zül-TAH* | income statement: all income and expenses of a period |
| consommations intermédiaires | *kohn-so-ma-SYOHN an-tair-may-DYAIR* | intermediate consumption: goods and services bought and used up (flour, energy, rent…) |
| valeur ajoutée (VA) | *va-LUHR a-zhoo-TAY* | value added: production − intermediate consumption; the wealth the business creates |
| amortissement | *a-mor-tees-MAHN* | depreciation: the yearly share of an oven's or mixer's cost charged to the accounts |
| impôt sur les sociétés (IS) | *an-POH sür lay so-syay-TAY* | corporate tax on a company's profit |
| part de marché | *PAR duh mar-SHAY* | market share: the business's sales ÷ the sales of all competitors |
| fabrication en série / à l'unité / en continu | *fa-bree-ka-SYOHN ahn say-REE* | batch / one-off / continuous production |

## How it works

### From one product to the whole bakery

Lesson [06.5](../module-06/lesson-05.md) built the price of a baguette: materials → production cost → full cost (coût de revient) → margin → price HT → VAT → price TTC. Use it unchanged. This lesson adds up all products and all charges for a period.

**Turnover** = Σ (quantity sold × price HT). It has two components, **volume** and **price**: 9,000 baguettes at €1.30 TTC (HT 1.30 ÷ 1.055 = €1.2322) make 9,000 × 1.2322 = **€11,090 HT**. Turnover grows by selling more, selling dearer, or selling new products. VAT is never turnover: the bakery collects it for the State.

### VAT rates for a bakery (as in 06.5)

| What is sold | Rate | Why |
|---|---|---|
| Bread, viennoiserie, pastries to take away | **5.5 %** | food for human consumption |
| Sandwiches, hot snacks, food prepared for immediate consumption, to take away | **10 %** | food prepared for immediate consumption |
| Food eaten in the tea room | **10 %** | as in a restaurant |
| Confectionery (sweets, caramels, nougats) and most chocolate products (milk or white chocolate, filled chocolates) | **20 %** | exceptions to the reduced rate; plain chocolate (category « chocolat ») stays at 5.5 % |

Source: BOFiP BOI-TVA-LIQ-30-10-10, in force from 19 November 2025, checked 2026-10-09. TTC → HT: divide by 1.055 (or 1.10, 1.20); never subtract the percentage.

### The result: income minus charges

The **simplified income statement** (compte de résultat) of a month lists:

| Charges (expenses) | Products (income) |
|---|---|
| purchases of raw materials and packaging, corrected for the change in stock | sales of goods made (turnover HT) |
| energy (electricity, gas), water | other income (e.g. a subsidy) |
| rent, insurance, accountant, maintenance, phone | |
| gross wages and employer contributions | |
| taxes on production | |
| depreciation of equipment | |
| bank interest | |
| **Result = products − charges**: a profit if positive, a loss if negative | |

Raw materials, wages and energy are the three big lines of a bakery. The energy line is kWh × price: at the 0.20 € per kWh of lesson [18.1](../module-18/lesson-01.md), 12,000 kWh in a month is €2,400.

### Value added and who gets it

**Value added = production − intermediate consumption** (INSEE). It measures the wealth the bakery creates by turning €18,400 of flour, butter, energy and premises into €40,208 of bread and viennoiserie. It is then shared:

![Waterfall of one bakery month in euros HT: turnover 40,208 minus intermediate consumption 18,400 gives value added 21,808; minus staff costs 16,500 and taxes 200 gives gross operating surplus 5,108; minus depreciation 1,500 and interest 300 gives the result before tax 3,308; the value added goes 76 percent to staff and social bodies, 1 percent to the State, 1 percent to lenders and 22 percent to the business](../../assets/m20-turnover-to-result.svg)

| Who | Share of value added |
|---|---|
| Staff | wages |
| Social bodies | employee and employer contributions (health, retirement, unemployment…) |
| The State and local authorities | taxes on production; later, tax on profit |
| Lenders (the bank) | interest |
| The business and its owners | depreciation (to replace equipment) and the result (reinvested or paid to the owners) |

The gross operating surplus (excédent brut d'exploitation, EBE) is what remains after wages, contributions and taxes on production: INSEE calls it a measure of the profit from operations.

### Taxing the profit

| Business | How profit is taxed (checked 2026-10-09) |
|---|---|
| **EI** (individual business) | classically at **income tax (IR)**: the profit is added to the owner's income |
| **SARL, SAS, SASU** (companies) | **corporate tax (IS)** on the company's profit: **25 %**, with **15 % on the first €42,500** for small companies (turnover up to €10 million, capital fully paid up and at least 75 % held by individuals) |

So an SARL bakery with a yearly profit of €60,000 pays 42,500 × 15 % + 17,500 × 25 % = 6,375 + 4,375 = **€10,750** of IS. The legal forms are in lesson [20.1](lesson-01.md).

### What sets a selling price

1. **The full cost** ([06.5](../module-06/lesson-05.md)): the price HT must cover it, or each sale loses money.
2. **The margin** the owner needs to pay tax, repay loans, invest.
3. **Competitors' prices**: the bakery two streets away, the supermarket.
4. **What customers will pay**: quality, the name (tradition, au levain), location, service.
5. **The VAT rate**: the customer sees TTC; the bakery keeps HT.

A common house method: price HT = full cost ÷ (1 − margin rate on HT), then × (1 + VAT), then rounded to a price customers read easily, then checked against competitors.

### Producing and buying (S5.4)

| Mode | What it is | Bakery example | Strength / limit |
|---|---|---|---|
| **À l'unité** (one-off) | one product to a customer's order | a pièce montée or a 2 kg decorated loaf for a wedding | fits the customer exactly / slow, costly |
| **En série** (batch) | the same product in batches | fournées of 60 baguettes, 120 croissants | efficient, consistent / needs planning ([Module 14](../module-14/lesson-01.md)) |
| **En continu** (continuous) | a line that never stops | industrial bread plants (10.71A) | very low cost per piece / heavy investment, little flexibility |

A craft bakery works mostly in batches with some one-off orders; its staff are polyvalent (one baker, several products), while industry divides the work into specialised posts.

Supply documents (lesson [17.7](../module-17/lesson-07.md)): the **bon de commande** (what you ordered), the **bon de livraison** (what came), the **facture** (what you pay). At reception you check reference and quantity; on the invoice you check **reference, quantity and price** against the order and the delivery note before it is paid.

## Worked example

Boulangerie Au Pain de la Halle (SARL), October. The gérante asks the apprentice to help prepare the monthly figures.

**1. Turnover HT.**

| Line | Turnover HT |
|---|---|
| Bread | 21,000 |
| Viennoiserie | 9,000 |
| Pastries | 6,000 |
| Sandwiches (VAT 10 %) | 4,000 |
| Rolls for Le Relais: 20 a day × 26 days × €0.40 | 208 |
| **Total** | **€40,208** |

**2. Charges.** Raw materials and packaging (after stock change) €12,000; energy 12,000 kWh × €0.20 = €2,400; rent €2,200; other external charges €1,800; gross wages €13,000; employer contributions €3,500; taxes €200; depreciation of the oven and mixers €1,500; bank interest €300. **Total €36,900.**

**3. Result.** 40,208 − 36,900 = **€3,308** before corporate tax: 8.2 % of turnover.

**4. Value added.** Intermediate consumption = 12,000 + 2,400 + 2,200 + 1,800 = €18,400. VA = 40,208 − 18,400 = **€21,808**. Staff and social bodies receive 16,500 (76 %), the State 200, the bank 300, the business 1,500 + 3,308 = 4,808 (22 %).

**5. Waste in perspective.** Unsold baguettes cost at least their €0.60 production cost ([06.5](../module-06/lesson-05.md)). 30 a day for 26 days: 780 × 0.60 = **€468**, 14 % of the month's result. Cutting the late batch (lesson [18.2](../module-18/lesson-02.md)) is worth more than any price rise on bread.

**6. Invoice check.** The mill's invoice: "Farine T55 — 42 sacs × 22,50 € HT". The order said 40 sacks at €21.50; the signed delivery note says 40 received. Two errors: **quantity** (2 sacks not delivered) and **price** (€1.00 more than agreed). Correct total HT: 40 × 21.50 = €860, not 42 × 22.50 = €945: €85 HT overcharged. The apprentice flags it to the gérante before payment (C4.1).

**7. A new price.** A pain aux noix has a full cost of €2.10; the house wants a 25 % margin on the HT price: HT = 2.10 ÷ 0.75 = €2.80; TTC = 2.80 × 1.055 = €2.954, shown at **€2.95**. The competitor sells a similar loaf at €3.20: €2.95 is credible and still covers the cost and margin.

## Practice

You price a five-product line, then build a monthly result and solve five exercises.

### You need

- Calculator or spreadsheet, this lesson and lesson [06.5](../module-06/lesson-05.md), 90 minutes.
- Professional equivalent: the bakery's cost sheets, competitors' price boards, the accountant's monthly figures.

### Steps

1. **Price the line.** For each product: full cost → price HT with a 25 % margin on HT → TTC with the right VAT → rounded up to the next €0.05 → compared with the competitor.

| Product | Materials | Labour | Energy | Overheads | Full cost | Competitor TTC |
|---|---|---|---|---|---|---|
| Baguette PC-02 | 0.20 | 0.34 | 0.06 | 0.31 | 0.91 | 1.30 |
| Tradition TR-01 | 0.24 | 0.42 | 0.07 | 0.33 | 1.06 | 1.50 |
| Croissant CR-01 | 0.22 | 0.30 | 0.05 | 0.28 | 0.85 | 1.25 |
| Pain au lait PL-01 | 0.12 | 0.15 | 0.03 | 0.14 | 0.44 | 0.70 |
| Jambon-beurre sandwich | 0.95 | 0.60 | 0.05 | 0.70 | 2.30 | 4.90 |

2. **Decide.** Where the formula price is far below the competitor's, choose a price and justify it in one line.
3. **Monthly result.** A small bakery (EI) sells €28,000 HT in a month. Charges: materials €8,400, energy 8,000 kWh at €0.20, rent €1,500, other external €1,100, gross wages €9,000, employer contributions €2,400, taxes €150, depreciation €900, interest €200. Find the result and the value added.
4. Solve exercises 1-5.

**1.** 250 croissants a day for 30 days at €1.20 TTC. Turnover HT?

**2.** The croissant goes to €1.30 TTC and sales fall by 5 %. New turnover HT, and the difference?

**3.** An SARL bakery makes a yearly profit of €38,000. Corporate tax, if it meets the small-company conditions?

**4.** Same profit in an EI. Who pays tax on it, and which tax?

**5.** Classify: (a) 3 kg birthday loaf ordered for Saturday; (b) 4 batches of 60 baguettes; (c) a factory line making 6,000 frozen croissants an hour.

<details><summary>Answers</summary>

**Step 1.**

| Product | HT = full cost ÷ 0.75 | VAT | TTC | Rounded | Competitor |
|---|---|---|---|---|---|
| Baguette | 1.2133 | 5.5 % | 1.2801 | **1.30** | 1.30 |
| Tradition | 1.4133 | 5.5 % | 1.4911 | **1.50** | 1.50 |
| Croissant | 1.1333 | 5.5 % | 1.1957 | **1.20** | 1.25 |
| Pain au lait | 0.5867 | 5.5 % | 0.6189 | **0.65** | 0.70 |
| Jambon-beurre | 3.0667 | **10 %** | 3.3733 | **3.40** | 4.90 |

**Step 2.** The sandwich formula price (€3.40) is far below the competitor (€4.90): customers pay for convenience at lunch, so a price around €4.20-4.50 is defensible and raises the margin; the bread prices match the market.

**Step 3.** Energy 8,000 × 0.20 = €1,600. Charges = 8,400 + 1,600 + 1,500 + 1,100 + 9,000 + 2,400 + 150 + 900 + 200 = **€25,250**. Result = 28,000 − 25,250 = **€2,750**. Intermediate consumption = 8,400 + 1,600 + 1,500 + 1,100 = €12,600; VA = 28,000 − 12,600 = **€15,400**.

**1.** 7,500 croissants × (1.20 ÷ 1.055 = €1.1374) = **€8,530.81 HT**.

**2.** 7,125 × (1.30 ÷ 1.055 = €1.2322) = **€8,779.62 HT**; **+€248.81** despite the lower volume.

**3.** €38,000 is under €42,500, all at 15 %: **€5,700**.

**4.** The owner: the profit is added to his income and taxed at **income tax** (unless the EI opted for corporate tax).

**5.** (a) one-off (à l'unité); (b) batch (en série); (c) continuous (en continu).

</details>

### Targets

- Five prices with the right VAT rate (four at 5.5 %, the sandwich at 10 %).
- Result and value added of step 3 exact.
- Exercises 1-5 right to the cent.

### How you know it worked

From a month's sales and charges you can give the turnover HT, the result and the value added, say who receives the value added, and set a price that covers cost and margin with the right VAT, then defend it against the competitor's board.

### In Israel

The exam is in euros and French VAT. At home you can practise the same reasoning on a home product line priced in shekels, as if you were planning to sell to a café; this is a costing exercise, not advice to sell food (selling food from home is regulated in Israel and is not covered here, and Israeli VAT is not part of the CAP). The figures are **example figures** (illustrative, rounded, written 2026-10-09, not quoted from any shop): replace them with your receipts and electricity bill, as in 06.5.

| Home product | Materials (₪) | Energy (₪) | Your time valued (₪) | Full cost (₪) | Price at 25 % margin (₪) |
|---|---|---|---|---|---|
| Home baguette 270 g | 1.27 | 0.26 | 2.00 | 3.53 | 4.71 |
| Croissant 60 g (butter 82 %) | 2.40 | 0.20 | 2.50 | 5.10 | 6.80 |
| Pain au lait 50 g | 0.80 | 0.10 | 1.00 | 1.90 | 2.53 |

The home baguette's materials and energy come from [06.5](../module-06/lesson-05.md)'s Israel table. Compare your prices with a local bakery's board: a home croissant priced for a 25 % margin often comes out near or above a bakery's price, because a home oven and one baker's time cost more per piece than a full deck oven and a team (the batch effect of lesson [06.5](../module-06/lesson-05.md)).

### Self-check

- [ ] Turnover = volume × price HT; VAT is never turnover.
- [ ] I can list the main charges of a bakery and find the result.
- [ ] I can calculate value added and say who receives it.
- [ ] I can price a product from full cost, margin and VAT, and check it against competitors.
- [ ] I know IR for an EI and IS (15 % up to €42,500, then 25 %) for a company.
- [ ] I check an invoice's reference, quantity and price against the order and delivery note.

## What goes wrong

| Symptom | Likely cause | Fix now | Prevent next time |
|---|---|---|---|
| Turnover looks 5-10 % too high | TTC prices used | Divide by 1.055 or 1.10 before multiplying by volume | Work in HT; VAT belongs to the State |
| Sandwich margin lower than planned | 5.5 % used instead of 10 % | Recalculate HT with ÷ 1.10; correct the till | Note the VAT rate on each product card |
| "Profitable" month, empty bank account | Depreciation, loan repayments or stock changes ignored; waste not counted | Rebuild the result line by line | Monthly result with every charge; weekly waste log |
| Invoice paid for goods never received | Invoice not checked against the delivery note | Ask the supplier for a credit note (avoir) | Reference, quantity, price checked before payment |
| Price raised, turnover falls | Volume effect stronger than price effect | Compare volume × price before and after | Test a price change on one product and watch sales for two weeks |
| Value added confused with profit | Wages and contributions left inside "profit" | VA = production − intermediate consumption; result is what remains after all charges | Draw the waterfall: VA first, then who gets it |

## Review

- Turnover = volume × price HT; result = products − charges; raw materials, wages and energy are a bakery's big charges.
- Value added = production − intermediate consumption; it pays staff and social bodies, the State, lenders and the business.
- A price covers the full cost and a margin, faces competitors and customers, and carries 5.5 % VAT for bread and viennoiserie, 10 % for sandwiches and food for immediate consumption.
- EI profit is taxed at income tax; companies pay IS (15 % on the first €42,500 under conditions, 25 % above).
- These calculations are part of EP1's applied management; see [The CAP Boulanger Exam](../../references/cap-exam.md).
