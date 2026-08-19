# Architecture Scenario - Records system

The primary Region must survive AZ faults without interruption. A Regional outage permits RTO 60 minutes and RPO 5 minutes. Data deletion by a compromised administrator must also be recoverable.

- **A:** Multi-AZ database only.
- **B:** Multi-AZ plus cross-Region recovery environment/data copies and logically isolated, access-controlled backups with tested restore.
- **C:** Cross-Region read replica only.

Choose B. It separates zonal HA, Regional continuity, and destructive-event recovery. A lacks Regional recovery; C may replicate destructive changes and is not an isolated immutable recovery point. If RTO relaxes to 24 hours, backup/restore may replace standing recovery capacity.
