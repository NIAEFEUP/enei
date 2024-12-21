# ENEI Website

Welcome to the home of the ENEI website.

Here you can find the source code of the website, which is built using the [AdonisJS](https://adonisjs.com) framework.

## Getting Started

To get started with the website, follow these steps:

> [!CAUTION]
>
> You will need to have [Node.js 22.x](https://nodejs.org/) or later installed on your machine.
>
> Furthermore, you will also need to have [pnpm](https://pnpm.io/) installed.
> If you don't have `pnpm` installed, you can run `corepack enable` to install it.

1. Clone the repository:

   ```bash
   git clone https://github.com/niaefeup/enei.git
   ```

2. Navigate to the project directory:

   ```bash
   cd enei/website
   ```

3. Install `pnpm`:

   ```bash
   corepack enable
   ```

4. Install the dependencies:

   ```bash
   pnpm install
   ```

5. Copy the `.env.example` file to a new file called `.env` and update the values as needed.

6. Create an app key to sign the session cookies:

   ```bash
   node ace generate:key
   ```

7. Run the database migrations to create the database:

   ```bash
   node ace migration:run
   ```

8. Start the development server:

   ```bash
   pnpm run dev
   ```

   This will start the development server on `http://localhost:3333`.
   The development server has hot-reloading enabled, so you can make changes to the code and see them reflected in the browser immediately.
