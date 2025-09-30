# Postss Website

This is the official website of the Postss Social App. Postss is a social media app, similar to Threads.com, that enables users to socialize and engage in discussions with people worldwide.

## Pages

- **Homepage:**
  - User login/signup/logout UI
  - Latest posts from all users
  - Profile page navigation
  - New post UI
- **Signup:** Registration page for users to create a new account
  - Username (unique)
  - Email (unique)
  - Password (required)
  - Admin confirmation (optional)
- **Login:**
  - Email
  - Password
- **Profile Management:**
  - User's bio
  - Edit profile UI
  - New post UI
  - List of user's posts
  - List of accounts the user is following
  - List of posts the user likes
  - List of profiles following the user
- **Edit profile:** Allow users to update their profile
  - First name (optional)
  - Last name (optional)
  - Username (unique)
  - Bio (required)
  - Avatar (optional)
  - Email (unique)
  - Website (optional)
  - Admin passcode (optional)
  - Delete account UI
- **GitHub page:** Auto-login GitHub users
- **Explore:** Allow users to find and follow one another.
  - List all users' bios
- **Post page:**
  - Like UI
  - Comment UI
  - Delete UI (admin-only)
  - List the post's comments

## Users and privileges

- **Subscriber:** Follower of an account
- **Owner:** Creator of an account
- **Admin:** An administrator

| Privilege                   | Subscriber | Owner | Admin |
| --------------------------- | ---------- | ----- | ----- |
| Create an account           | Yes        | Yes   | Yes   |
| Create post                 | Yes        | Yes   | Yes   |
| Manage post                 | No         | Yes   | No    |
| Delete post                 | No         | No    | Yes   |
| Send follow requests        | Yes        | Yes   | Yes   |
| Comment                     | Yes        | Yes   | Yes   |
| Manage profile              | No         | Yes   | No    |
| Delete personal account     | Yes        | Yes   | No    |
| Delete non-personal account | No         | No    | Yes   |

## Technologies used

- Date-fns
- ESLint
- Next.js
- React
- Tailwind CSS
- TypeScript
- Socket IO
- SWR

## Usage

> **Note:** [The backend](https://github.com/oluwatobiss/postss-backend) must be running for this website to function appropriately.

1. Clone the project

```bash
git clone https://github.com/oluwatobiss/postss-frontend.git
```

2. Navigate into the project repo

```bash
cd postss-frontend
```

3. Install dependencies

```bash
npm install
```

4. Create an environment variable file

```bash
touch .env
```

5. Define the project's environment variables

```
NEXT_PUBLIC_DEMO_EMAIL=example@mail.com
NEXT_PUBLIC_DEMO_PASSWORD=example-password
NEXT_PUBLIC_BACKEND_URI=http://localhost:3001
```

6. Start the server

```bash
npm run dev
```

## Live Demo

- https://postss-social.netlify.app

## Related Repos

- [Postss Rest API](https://github.com/oluwatobiss/postss-backend)
