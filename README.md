
## Tech stack / architecture
- `NextJS` with TS, server-actions, REST API
- `Tailwindcss` - CSS utility framework
- `Shadcn UI` - component library
- `Lucid` - Icons
- `MySQL` Database running on `Avien` (free service)
- `Clerk` - Authentication
- `Uploadthing` - (For uploading profile/server pics)
- `Vercel` - (Deployment, CICD)
- `prisma client` - ORM
- Other Packages include:
    -  `Next Router`
    -  `Zod forms / react-hook-form`
    - `Axios`
    - `zustand`

## Getting Started

First, install the dependencies.

```bash
npm i
```

Then configure your .env file.

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Database

The database is MySQL database running on a free service called Avien. Its essentially just a Virtual machine to run any Database you want. 

Avien: https://console.aiven.io/account/a49d396d1137/project/patrik-discord-clone/services

To view your database tables using Prisma:

```bash
npx prisma studio 
```

Use the following command to view all the available commands using Prisma.
```bash 
npx prisma help
```




## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
