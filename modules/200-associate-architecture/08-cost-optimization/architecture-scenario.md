# Architecture Scenario - Seasonal storefront

Traffic is quiet most of the year, rises unpredictably for promotions, and checkout must remain available across an AZ failure. The company has little baseline history.

- **A:** Large three-year All Upfront commitment for forecast peak EC2 capacity.
- **B:** Elastic multi-AZ architecture, on-demand capacity initially, measured baseline, then conservative Savings Plan; Spot only for retryable background work.
- **C:** One cheapest Spot instance for the entire storefront.

Choose B. It preserves resilience and flexibility while evidence accumulates. A commits guessed peak demand; C lets interruption remove checkout. After a year of stable measurements, increase only the defensible baseline commitment.
