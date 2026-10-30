---
title: Reports
description: Attendance, leave and complaint reports with PDF and Excel export.
---

Admins and Wardens can pull four reports. They only read data, and they include students who have since left or been deactivated.

The attendance report lists individual movements and can be narrowed to one student or one direction. The daily attendance report gives a count of scans per day. The leave report covers the old leave-request records, filtered by student and status. The complaints report can be filtered by student, category and status, and shows totals for each.

Every report needs a `from` and a `to` date, in `YYYY-MM-DD` form and the hostel's timezone, covering at most 366 days. Results come in pages, with totals for the whole period at the top.

| Report | Endpoint |
| --- | --- |
| Movements | `GET /api/v1/reports/attendance` |
| Daily totals | `GET /api/v1/reports/attendance/daily` |
| Leave (historical) | `GET /api/v1/reports/leaves` |
| Complaints | `GET /api/v1/reports/complaints` |

## Downloading

Add `/export` to any report path for an Excel file with a summary sheet and a data sheet, or `/export/pdf` for an A4 PDF. They take the same filters, without paging:

```text
GET /api/v1/reports/complaints/export/pdf?from=2026-10-01&to=2026-10-31
```

Excel exports stop at 5000 rows and PDFs at 1000. If more rows match, you'll get an error rather than a cut-off file, so shorten the date range. Anything a person typed, like a complaint description, goes into Excel as plain text and can't be run as a formula.

:::note
The PDF fonts handle Latin text. Sinhala and Tamil don't render properly in PDFs yet, so use the Excel export for those.
:::
