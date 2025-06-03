import { serve } from "bun";
import { PrismaClient } from "./generated/prisma";

const PORT = 8080;
const prisma = new PrismaClient();

async function main() {
  serve({
    port: PORT,
    async fetch(request) {
      const user = await prisma.user.findFirst();

      return new Response("Hello user: " + user?.name);
    },
  });

  console.log("Up and running");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
