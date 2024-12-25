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

## How to use SSO authentication

1. `docker compose up` will open keycloak at port 8080 (`localhost:8080`)

2. Go to `localhost:8080`

3. Login with username `admin` and password `admin`

4. Top left corner click on the dropdown with the "master" realm and click on "Create realm"

5. On the pop up that appears, put the json file in `keycloak/realm-exports.json` and write the name "enei" on the input asking for the name.

6. Go to "Clients" and create a new client named `enei-website`. Then, after creation, go to "Credentials" tab and copy the secret and put into your `.env` file.