# Architecture scenario: Contain a compromised deployment role across 80 accounts

## Business context

A deployment system may have issued a compromised temporary session. It can assume application deployment roles in 80 accounts. Customer traffic must continue and evidence must be retained.

## Requirements

- Stop new privileged sessions within 15 minutes.
- Avoid deleting production evidence or encryption keys.
- Preserve unaffected deployment capability where safely possible.
- Attribute actions to pipeline run and source identity.
- Maintain a recovery path during IdP impairment.

## Constraints

- STS credentials cannot be individually revoked like a password.
- Some target roles allow one-hour sessions.
- A global deny could interrupt emergency operations.

## Candidate approaches

### Approach A - delete logs and roles

Delete every target role and its CloudTrail logs immediately.

### Approach B - scoped deny and credential-chain rotation

Block the compromised principal/session path, update trust, rotate upstream secrets, quarantine pipelines, preserve logs, and validate target accounts before staged restoration.

### Approach C - wait for sessions to expire

Make no change until all maximum session durations pass.

## Decision

Choose B. Apply the narrowest effective containment at trusted control points, prevent new assumptions, isolate the issuer, preserve immutable evidence, search for persistence, then restore in canary waves.

## Tradeoff defense

- A broad SCP deny can be fast but may exceed incident scope and block recovery; pre-stage a tested scoped mechanism.
- Shorter sessions reduce exposure but increase dependency on identity availability.
- Central responders improve speed; member-account owners validate workload-specific side effects.

## Distractor analysis

For each rejected option, cite the exact hard requirement it violates or the needless fixed cost, coupling, or operator burden it adds. A familiar service is not automatically the right architecture.

## Architecture review board questions

1. Which control stops new sessions and which affects already issued credentials?
2. How is session attribution preserved end to end?
3. Can the compromised role alter its own trust or pass a more privileged role?
4. Who authorizes production restoration?
5. How does containment proceed if the normal IdP is down?

## Follow-up changes

- If destructive action is confirmed, invoke legal/forensic retention and expand containment by observed indicators.
- If the role reaches only one account, keep the same evidence discipline but narrow the blast radius.
