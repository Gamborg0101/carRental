import { serve } from "bun";
import { PrismaClient } from "@prisma/client";

const PORT = 6543;
const prisma = new PrismaClient();

interface User {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  rentals: [];
}

async function handleGetAllUsers() {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
}

serve({
  port: PORT,
  async fetch(request) {
    const { method } = request;
    const { pathname } = new URL(request.url);
    const pathRefexForID = /^\api\/posts\/(\d+)$/;
    console.log(method, pathname);

    /* GET - route to get all users  */
    if (method == "GET" && pathname == "/api/getusers") {
      return handleGetAllUsers();
    }

    // /* GET - route to get all cars  */
    // if (method == "GET" && pathname == "/api/getcars") {
    // }

    // /* GET - route to get all rentals  */
    // if (method == "GET" && pathname == "/api/getrentals") {
    // }

    // /* POST - route to create a user */
    // if (method == "POST" && pathname == "api/createuser") {
    //   /**/
    // }

    // /* POST - route to create a user */
    // if (method == "POST" && pathname == "api/createcar") {
    //   /**/
    // }

    // /* POST - route to create a user */
    // if (method == "POST" && pathname == "api/createrental") {
    //   /**/
    // }

    // /* DELETE - Delete a rental */
    // if (method == "DELETE" && pathname == "/api/posts") {
    //   /**/
    // }

    // /* DELETE - Delete a user */
    // if (method == "DELETE" && pathname == "/api/posts") {
    //   /**/
    // }

    // /* DELETE - Delete a car */
    // if (method == "DELETE" && pathname == "/api/posts") {
    //   /**/
    // }

    return new Response("Not Found", { status: 404 });
  },
});
