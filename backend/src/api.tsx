import { serve } from "bun";

const PORT = 8080;

serve({
  port: PORT,
  async fetch(request) {
    console.log("HELLO");
    return new Response("Hello world");
  },
});

console.log("Up and running");
