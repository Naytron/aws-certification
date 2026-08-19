# Answer key: Federation, Cross-Account Trust, and Central Security

## 1. C

An external ID distinguishes the customer context presented to a trusted third party. It is not a replacement for exact principals or a secret.

## 2. C

Cross-account assumption normally requires caller authorization and target trust, with no applicable deny.

## 3. D

ABAC is only trustworthy if subjects cannot forge the attributes used to authorize themselves.

## 4. A

Temporary, scoped, attributable sessions reduce persistence and improve evidence.

## 5. C

Emergency access must survive common-mode identity failure without becoming an invisible backdoor.

## 6. C

Containment must distinguish issuance from active credentials and preserve operational and forensic requirements.

## 7. D

Both the key-side trust and caller authorization must support the action, absent denies.

## 8. A

When enforced and propagated, source identity provides durable attribution in session activity.

## 9. B

Delegation reduces management-account exposure and supports central normalization with local action.

## 10. D

This sequence contains both credential issuance and downstream persistence while preserving evidence and availability.

## Review method

For each miss, write the governing requirement, the decision rule, why your option failed, and one changed fact that would make it correct.
