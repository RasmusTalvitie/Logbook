import { Hono } from "https://deno.land/x/hono/mod.ts";
import client from "./db/db.js";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"; // For password hashing
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

const app = new Hono();

// Serve the registration form
app.get('/register', async (c) => {
  var response = new Response(await Deno.readTextFile('./views/register.html'), {
      status: 200,
      headers: {
        "content-type": "text/html",
          },
      });
response = await addSecurityHeaders(response);
return response;
});

async function addSecurityHeaders(response) {
  

    response.headers.set("Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self'; " +
        "img-src 'self'; " +
        "frame-ancestors 'none'; " +
        "form-action 'self';"); 
    response.headers.set("X-Frame-Options", "DENY"); 
    response.headers.set("X-Content-Type-Options", "nosniff"); 

    return response;
}


const registerSchema = z.object({
    username: z.string().email({ message: "Invalid email"}),
    password: z.string().min(8, "Password too short"),
    birthdate: z.string().min(1, "ignore this"),
    role: z.enum(["reserver", "administrator"], {message: "Invalid role"}),
});


// Handle user registration (form submission)
app.post('/register', async (c) => {
  const body = await c.req.parseBody();

  const username = body.username;
  const password = body.password;
  const birthdate = body.birthdate;
  const role = body.role;

  try {
     registerSchema.parse(body);
    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const result = await client.queryArray(
      `INSERT INTO zephyr_users (username, password_hash, role, birthdate)
       VALUES ($1, $2, $3, $4)`,
      [username,
      hashedPassword,
      role,
      birthdate]
    );

    // Success response
    return c.text('User registered successfully!');
  } catch (error) {
    console.error(error);
    return c.text('Error during registration', 500);
  }
});

Deno.serve(app.fetch);

// The Web app starts with the command:
// deno run --allow-net --allow-env --allow-read --watch app.js