# Case Study 2: Regulated Multi-Account Landing Zone

This is an original scenario, not a proprietary exam question.

## Business context

A financial group acquired three companies with 86 AWS accounts. Each company
uses separate identity providers, inconsistent CloudTrail settings, overlapping
VPC CIDRs, and local administrator roles. Regulators require demonstrable
separation of duties and evidence that production cannot disable mandatory
logging. Product teams need a new environment within four business hours.

## Requirements

- Central governance without making the management account a workload account.
- Separate production, non-production, security, infrastructure, sandbox, and
  suspended workloads by policy intent.
- Central workforce access from the corporate IdP with MFA and group lifecycle.
- Product teams administer their applications but cannot weaken mandatory
  logging, public-access restrictions, approved Regions, or encryption controls.
- Security investigators can read findings and logs but workload administrators
  cannot alter retained evidence.
- Provide transitive connectivity only where approved. Production and sandbox
  must not communicate.
- Resolve on-premises and AWS private names without creating open DNS forwarding.
- Allocate direct and shared cost to products, with monthly anomaly ownership.
- Onboard existing accounts without an enterprise-wide outage.
- Produce a design in the Free-plan learning account without enabling
  Organizations or Control Tower.

## Constraints

- Two legacy applications require six months in an otherwise restricted Region.
- Three acquired VPCs use overlapping `10.0.0.0/16` ranges.
- The security team has 24x7 response; the platform team owns account vending.
- The enterprise will use a governed paid organization, but this course exercise
  remains design-only.

## Decision 1: Governance structure

Choose one.

### A. One production OU

Place every account in one OU. Attach an administrator policy to the OU and use
tags to express all exceptions.

### B. Policy-oriented OUs with staged enrollment

Design foundational security and infrastructure OUs, workload production and
non-production OUs, sandbox, exceptions/quarantine, and suspended OUs. Apply
SCP guardrails by policy intent, use delegated administrators, and stage
existing accounts through discovery, remediation, enrollment, and verification.

### C. Workloads in the management account

Move shared production services to the management account so organization-wide
permissions are easy to use.

### D. Independent accounts

Keep all accounts independent and email security standards to owners.

## Decision 2: Identity and security evidence

Choose one.

### A. Shared IAM users

Create the same named IAM user in every account and rotate passwords quarterly.

### B. Federation, permission sets, and separated evidence

Federate the corporate IdP through an organization instance of IAM Identity
Center. Map groups to least-privilege permission sets, use time-bound elevation,
retain break-glass access, aggregate security services through delegated
administrators, and deliver organization trails and configuration evidence to a
separately controlled log archive account.

### C. Security administrator in every workload

Let each product administrator configure and retain its own audit evidence.

### D. SCP-only access

Put every required application action in an SCP and do not create identity
policies.

## Decision 3: Network and DNS

Choose one.

### A. Full mesh peering

Peer every VPC and rely on transitive routing through an inspection VPC.

### B. Segmented transit with explicit DNS rules

Use Transit Gateway route tables to create approved routing domains, explicit
inspection paths, and no production-sandbox propagation. Use Route 53 Resolver
inbound/outbound endpoints with domain-specific rules and controlled on-premises
forwarders. Isolate or renumber overlaps; use PrivateLink for suitable shared
services that should not require broad routing.

### C. One flat VPC

Move all workloads into one large VPC to eliminate transit decisions.

### D. Public DNS for private names

Publish private service addresses in a public hosted zone and restrict access
with security groups.

## Required submission

- OU/account map, SCP inheritance trace, exception lifecycle, and RACI.
- Identity flow and effective-permission example.
- Network route-domain and hybrid DNS matrices.
- Account enrollment waves and rollback criteria.
- Cost allocation model, ADR, and risk register.
- Defense answers:
  1. Why can an SCP prevent but not grant an action?
  2. How does a legacy Region exception expire without breaking its workload?
