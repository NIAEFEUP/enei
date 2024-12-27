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

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Copy the `.env.example` file to a new file called `.env` and update the values as needed.

5. Create an app key to sign the session cookies:

   ```bash
   node ace generate:key
   ```

6. Run the database migrations to create the database:

   ```bash
   node ace migration:run
   ```

7. Start the development server:

   ```bash
   pnpm run dev
   ```

   This will start the development server on `http://localhost:3333`.
   The development server has hot-reloading enabled, so you can make changes to the code and see them reflected in the browser immediately.

## Defining Routes with Tuyau

To use Tuyau in your routes, you need to update the API file each time you do certain actions, mainly:

1. Adding a new route/controller to your project
2. Adding a `request.validateUsing` call in your controller method

This is done with the command:

```bash
node ace tuyau:generate
```

> [!INFO]
> This was added to the package.json command prepare, that has everything needed to setup the project. Run it using:
>
> ```bash
> pnpm prepare
> ```

More info here: [Tuyau - Installation](https://adonisjs.com/blog/introducing-tuyau#installation)
