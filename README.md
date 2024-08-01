**Perform CRUD Operations using next.js**

Project Setup and Environment Configuration
Goals:
- Set up a Next.js project with TypeScript.
- Configure Tailwind CSS and daisyUI.
- Initialize PostgreSQL and Prisma.

Steps:
1. Initialize Next.js Project:
   npx create-next-app@latest my-project --typescript
   cd my-project
2. Install Dependencies:
npm install tailwindcss@latest postcss@latest autoprefixer@latest daisyui@latest prisma @prisma/client pg
3. Configure Tailwind CSS:
   - Create `tailwind.config.js`:
   
 module.exports = {
       content: ['./pages//*.{js,ts,jsx,tsx}', './components//*.{js,ts,jsx,tsx}'],
       theme: {
         extend: {},
       },
       plugins: [require('daisyui')],
     }

   - Create `postcss.config.js`:

     module.exports = {
       plugins: {
         tailwindcss: {},
         autoprefixer: {},
       },
     }

   - Add Tailwind directives to `styles/globals.css`:

     @tailwind base;
     @tailwind components;
     @tailwind utilities;
4. Initialize Prisma:

   npx prisma init
5. Configure PostgreSQL:
   - Set up your PostgreSQL database and update the `DATABASE_URL` in the `.env` file:

DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
6. Set Up Prisma Schema:
   - Update `prisma/schema.prisma`:

     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }

     generator client {
       provider = "prisma-client-js"
     }

     model User {
       id    Int     @id @default(autoincrement())
       name  String
       email String  @unique
     }


   - Migrate the database:

     npx prisma migrate dev --name init

------------------------------------------------------------------------------------

Build the Backend API with Prisma and PostgreSQL
Goals:
- Create API routes using Next.js API.
- Implement CRUD operations with Prisma.

Steps:
1. Create API Route for Users:
   - Create a new file `api/get-users/route.ts`:

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
 try {
   const users = await prisma.user.findMany();
   console.log(users); // Log the results
   return NextResponse.json(users, { status: 200 });
 } catch (error) {
   console.error(error); // Log any errors
   return NextResponse.json(
     { error: "Internal Server Error" },
     { status: 500 }
   );
 }
}

Create a new file `api/add-users/route.ts`:

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
 try {
   const data = await req.json(); // Parse the request body
   const newUser = await prisma.user.create({
     data,
   });
   console.log(newUser); // Log the new user
   return NextResponse.json(newUser, { status: 201 });
 } catch (error) {
   console.error(error); // Log any errors
   return NextResponse.json(
     { error: "Internal Server Error" },
     { status: 500 }
   );
 }
}


Note : Code is for reference only. Perform all CRUD operations.
2. Test the API Routes:
   - Use a tool like Postman to test `GET` and `POST` requests.

-------------------------------------------------------------------------------

Build Frontend Components with Tailwind CSS and daisyUI
Goals:
- Create user interface components.
- Fetch data from the backend API.

Steps:
1.Create a Navbar
Create a new file `components/Navbar.tsx`:
Implement it in layout.tsx

Note: If daisyUI is not already installed, please install

npm i -D daisyui@latest
2. Create a User List Component:
   - Create a new file `components/UserList.tsx`:
Note - Install axios

     import React, { useEffect, useState } from 'react'
     import axios from 'axios'

     interface User {
       id: number
       name: string
       email: string
     }

     const UserList: React.FC = () => {
       const [users, setUsers] = useState<User[]>([])

       useEffect(() => {
         axios.get('/api/get-users').then(response => {
           setUsers(response.data)
         })
       }, [])

       return (
         <div className="p-4">
           <h1 className="text-2xl font-bold mb-4">User List</h1>
           <ul className="space-y-2">
             {users.map(user => (
               <li key={user.id} className="p-4 border rounded shadow">
                 <p>Name: {user.name}</p>
                 <p>Email: {user.email}</p>
               </li>
             ))}
           </ul>
         </div>
       )
     }

     export default UserList

3. Use the Component in a Page:
   - Update `app/index.tsx`: or whichever is your root file

     import UserList from '../components/UserList'

     const Home: React.FC = () => {
       return (
         <div className="container mx-auto p-4">
           <UserList />
         </div>
       )
     }

     export default Home
     
 -----------------------------------------------------------------------------------
