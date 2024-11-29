# Fullstack Svelte Portfolio

A modern, fullstack portfolio application built with **Svelte** for dynamic and interactive frontends. The portfolio allows the owner to log in, manage their information, and update portfolio content without directly editing the codebase.

## Features

- **Dynamic Content Management:** Add, edit, or delete portfolio entries from the admin dashboard.

- **Authentication:** Secure login functionality for the portfolio owner.

- **Tech Stack:**
  - **Frontend:** Svelte
  - **Backend:** Node.js with Express (or SvelteKit for fullstack Svelte)
  - **Database:** PostgreSQL (or your preferred database)
  - **Authentication:** JWT-based login system

## Why This Portfolio?

This portfolio was designed for developers who want to showcase their work while maintaining full control over their data. No need to edit source files—log in and manage your projects with ease!

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:** Create a `.env` file with the following variables:

   ```env
   DATABASE_URL=your-database-connection-string
   JWT_SECRET=your-secret-key
   ```

4. **Run Database Migrations:** If using an ORM like Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Application:**

   ```bash
   npm run dev
   ```

6. **Access the Admin Dashboard:** Navigate to `/admin` after logging in to manage your portfolio.

## Future Enhancements

- **Multi-User Support:** Enable multiple roles for collaborators.

- **Analytics:** Add analytics to track portfolio views.

- **Media Uploads:** Use a service like Cloudinary for storing portfolio images.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Would you like me to draft any code samples for the suggested authentication flow or database schema?
