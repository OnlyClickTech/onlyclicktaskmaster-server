# Taskmaster Job Management API

## Project Structure

```
├── config/
│   ├── db.js
├── controllers/
│   ├── job.controller.js
│   ├── review.controller.js
│   └── taskmaster.controller.js
│
├── routes/
│   ├── job.routes.js
│   ├── review.routes.js
│   └── taskmaster.routes.js
│
├── models/
│   ├── job.model.js
│   ├── review.model.js
│   └── taskmaster.model.js
│
├── utils/
│   └── constants.js
│
├── .env
├── .gitignore
├── app.js
└── server.js
```

---

## Routes

# Taskmasters

- POST `/taskmaster/` — Create a new taskmaster (with coordinates & category validation).
- GET `/taskmaster/` — Retrieve all taskmasters (with optional category and status filters).
- GET `/taskmaster/:id` — Get details of a specific taskmaster.
- PUT `/taskmaster/:id` — Update a taskmaster.
- DELETE `/taskmaster/:id` — Remove a taskmaster.
- GET `/taskmaster/nearby?lat=&lng=&category=` — Find nearby taskmasters within 10km using geospatial querying.

# Jobs

- POST `/job/` — Create a job associated with a taskmaster.
- GET `/job/taskmaster/:taskmasterId` — Get all jobs for a specific taskmaster.
- GET `/job/taskmaster/:taskmasterId/stats` — Get job stats (count & earnings) for last week, month, and year.
- GET `/job/earnings/:taskmasterId` — Get total earnings for a taskmaster (only completed jobs).

# Reviews

- POST `/review/` — Submit a review for a taskmaster.
- GET `/review/:taskmasterId` — Get all reviews for a taskmaster.
- GET `/review/:taskmasterId/average` — Get average rating of a taskmaster.

---

# Environment Variables

| Key         | Description                          |
| ----------- | ------------------------------------ |
| `PORT`      | 3000                                 |
| `MONGO_URI` | mongodb://localhost:27017/mydatabase |

---

## Example Payloads

# Taskmaster Creation

```
{
  "name": "John Doe",
  "phoneNumber": "9876543210",
  "homeAddress": "123 Street Name",
  "masterId": "64df...abcd",
  "category": "plumber",
  "coordinates": {
    "type": "Point",
    "coordinates": [78.4867, 17.3850]
  }
}
```

# Job Creation

```
{
  "taskmasterId": "64df...abcd",
  "bookingId": "B123",
  "bookingDate": "2024-06-21T18:00:00Z",
  "category": "plumber",
  "subcategory": "pipe-repair",
  "status": "completed",
  "price": 200
}
```

# Review Submission

```
{
  "taskmasterId": "64df...abcd",
  "reviewerName": "Alice",
  "rating": 4.5,
  "comment": "Great work!"
}
```

---

## Notes

- Coordinates are required to be in GeoJSON format (type: 'Point' with [longitude, latitude]).
- Categories must match predefined constants (utils/constants.js).
- Ensure MongoDB is running and accessible via the connection string in .env.
