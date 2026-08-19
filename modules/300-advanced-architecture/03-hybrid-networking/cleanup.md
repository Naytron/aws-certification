# Cleanup: Hybrid Networking, Routing, DNS, and Segmentation

## Cleanup profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| AWS resources expected | None |
| AWS account changes expected | None |
| Cloud deletion commands | Not applicable |

## No-cloud cleanup statement

This module contains design, policy, route, template, log, cost, and failure simulations only. It does not authorize deployment. There are no module-created cloud resources to delete.

Do not deploy Direct Connect, Transit Gateway, NAT Gateway, VPN, PrivateLink endpoints, or Resolver endpoints; these can incur hourly, processing, transfer, or provider charges.

## Verification

1. Confirm you did not execute AWS create, update, purchase, enable, enrollment, replication, migration, or deployment actions while completing this module.
2. Confirm no stack, service, identity, network, data, logging, quota, commitment, or billing configuration was created or changed for the exercise.
3. If you used read-only account data, remove account IDs, ARNs, endpoints, email addresses, customer data, and other sensitive values from saved evidence.
4. Delete local scratch exports that contain sensitive or billing-level detail. Keep only sanitized diagrams, matrices, queries, calculations, and ADRs.
5. Record `No cloud resources created - DESIGN-ONLY` in the cleanup proof section of the evidence template.

## Unexpected-change procedure

If you created or changed anything despite the design-only instruction, stop the module:

1. Record the service, Region, resource/configuration identifier, time, and action without copying secrets.
2. Revert the exact change using the owning service's current official deletion or rollback procedure.
3. Check dependent resources, retained data, logs, snapshots, endpoints, network interfaces, and cross-Region copies.
4. Verify deletion or rollback reached its terminal successful state.
5. Review Billing, Free Tier usage, budgets, and every Region used after billing data updates.
6. Record the cause and prevention in the course error log.

Do not provide generic deletion commands because no deployment is part of this lab; deletion order depends on the unauthorized change. Follow [the account cleanup procedure](../../../account/cleanup-and-account-closure.md) and official service documentation.

## Completion gate

- [ ] No cloud resource or account change was expected.
- [ ] No cloud resource or account change remains from the exercise.
- [ ] Saved evidence is sanitized.
- [ ] Cleanup proof states that the work was design-only.
