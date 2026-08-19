# Validation

- Each data service is selected from a named access pattern and consistency need.
- Athena workgroup enforces an exact result location and scan cutoff.
- Dataset is synthetic and under 1 MB; no crawler or persistent database was created.
- Query history shows bytes scanned and layout implications.
- Broad bucket location fault is diagnosed before running an unsafe scan.
- Exact table/workgroup/objects/versions/bucket are absent after cleanup.
