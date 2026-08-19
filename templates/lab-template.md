# Lab title

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `FREE-PLAN SAFE`, `USES CREDITS`, `OPTIONAL PAID/SANDBOX`, or `DESIGN-ONLY` |
| Target Region | Course home Region unless stated otherwise |
| Expected resources | |
| Required permissions | |
| Cleanup required | Yes |

## Objective

State the observable outcome, not just the services to click.

## Architecture

Describe the request path, trust boundaries, failure boundaries, and data flow.

## Preflight

1. Confirm the active account and Region.
2. Confirm budget alerts are active.
3. Review the resource list and cost label.
4. Prepare required tags: `Course`, `Module`, `Owner`, and `ExpiresAt`.
5. Read the cleanup section before deploying anything.

## Build

Use the smallest set of steps that teaches the architecture. Explain only choices that are not self-evident.

## Validate

Provide commands and expected observations for:

- Functional result
- Security boundary
- Failure behavior
- Logs and metrics
- Resource tags

## Break and fix

Introduce one controlled fault. Record the symptom, evidence, root cause, and fix.

## Cleanup

List resources in dependency-safe deletion order. End with a zero-resource verification query or console check.

## Evidence

Complete `templates/lab-evidence-template.md`.
