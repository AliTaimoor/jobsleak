# SaaS Startup Boilerplate

Welcome to the SaaS Startup Boilerplate, a comprehensive TypeScript-based starter kit for rapidly launching SaaS applications. Built on the Next.js framework, this boilerplate includes a robust set of features designed to cover all the foundational needs of a SaaS project, from authentication to payments, and much more.

## Features

- **Authentication/Authorization:** Email, Magic Link, and OAuth login methods to ensure secure access to your application.
- **User Management Templates:** Ready-to-use Login, Signup, Reset, Forgot, and Verify Email templates for a seamless user experience.
- **Email Provider Integration:** Easy to configure Resend Email functionality with your preferred email service provider.
- **Database Integration:** Utilizes Prisma ORM for straightforward database management.
- **File Storage:** Integrated with Supabase Storage for handling file uploads and storage.
- **Landing Page:** Includes a landing page with newsletter signup and waiting list functionalities to grow your audience.
- **Animations:** Leveraging Framer Motion to create engaging UI animations.
- **State Management:** Utilizes React Query for efficient and easy data state management across your app.
- **Payments:** Integrated payment solutions with Stripe and LemonSqueezy for handling subscriptions and purchases.
- **Content Management:** Choose between Contentlayer or Strapi CMS for blog management, making content creation and management a breeze.
- **Admin Dashboard:** Comes with an Admin Dashboard featuring CRUD functionalities to manage users, content, and more.

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- A supported SQL database (PostgreSQL recommended)
- Supabase account for storage
- Stripe and LemonSqueezy accounts for payment processing

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/saas-startup-boilerplate.git
   ```

2. Install dependencies:

   ```bash
   cd saas-startup-boilerplate
   npm install
   ```

3. Set up your environment variables by copying the `.env.example` file to `.env` and filling out the necessary details.

4. Run the development server:

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the application.

5. Deployment 

```
# unlink the Shipped git repository
git remote remove origin
# add your git repository as a remote
git remote add origin <your git repo link>

```

## Configuration

Details on how to configure authentication methods, database connections, email service, storage, and payment integrations can be found in the this link [Codepilot docs](https://docs.codepilot.dev)


## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub issue tracker.

---

Happy coding! We hope this boilerplate accelerates your SaaS project's development.
