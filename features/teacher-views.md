# Teacher Views

Teachers have a focused interface for managing their classes, viewing rosters, and marking attendance. All teacher views are under the `/teacher` namespace with a dedicated layout.

Teachers also have full access to all student-facing features — they can browse classes, book as students, purchase packages, etc.

## Dashboard (`/teacher`)

The teacher dashboard shows:

- **Today's classes** — Times, class names, student count
- **This week's schedule** — Upcoming teaching assignments
- **Quick access** — Direct links to each class roster

## My Classes (`/teacher/classes`)

A calendar or list view of the teacher's teaching schedule:

- Shows only classes assigned to this teacher
- Click into a class to see its roster
- Filter by date range

## Class Roster (`/teacher/classes/:id`)

The roster for a specific class shows:

### Confirmed Students

- Student name and photo
- Reservation status
- Attendance actions:

| Action | Effect |
|--------|--------|
| Confirm attendance | Reservation status → `completed` |
| Mark no-show | Reservation status → `no_show`, credit is not restored |

### Waitlist

- Students on the waitlist with their position
- Waitlist entries are read-only for teachers (promotion is automatic)

### Wellhub Check-ins

For classes with Wellhub bookings, teachers can validate check-ins directly from the roster via `POST /teacher/classes/:class_id/wellhub_checkin/:id`.

## Teacher Profile (`/teacher/profile`)

Teachers can view and edit their own profile:

- Name, email, photo
- Bio/description (if used by the studio)

## Roles & Permissions

Teachers are authorized via Pundit policies:

- **Can see:** Their own classes, their own rosters, their own profile
- **Can do:** Mark attendance (confirm/no-show), validate Wellhub check-ins, edit their profile
- **Cannot:** See other teachers' rosters, manage users, edit studio settings, manage packages

## Routes Reference

| Route | Controller | Purpose |
|-------|-----------|---------|
| `GET /teacher` | `teacher/dashboard#show` | Dashboard |
| `GET /teacher/classes` | `teacher/classes#index` | Teaching schedule |
| `GET /teacher/classes/:id` | `teacher/classes#show` | Class roster |
| `POST /teacher/classes/:class_id/wellhub_checkin/:id` | `teacher/classes#wellhub_checkin` | Validate Wellhub check-in |
| `GET /teacher/profile` | `teacher/profile#show` | View profile |
| `GET /teacher/profile/edit` | `teacher/profile#edit` | Edit profile |
| `PATCH /teacher/profile` | `teacher/profile#update` | Update profile |
