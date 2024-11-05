import type { APIRoute } from "astro";
import { db, NOW, Users, eq } from "astro:db";
import { res } from "src/utils/methods";
import bcrypt, { compare } from "bcrypt";
import { boolean, object, safeParse, string, optional } from "valibot";

const UserSingInSchema = object({
  name: optional(string()),
  email: string(),
  password: string(),
});

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { ...body } = await request.json();

    const { success, output } = safeParse(UserSingInSchema, body);
    if (!success) {
      return res("Bad request, body is not correct", { status: 400 });
    }

    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, output.email))
      .limit(1);

    if (existingUser.length == 0) {
      return res("User not found", { status: 404 });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(output.password, salt);
    const isValid = await compare(existingUser[0].password, hashedPassword);

    if (!isValid) {
      return res("Password is incorrect", { status: 401 });
    }

    return new Response(
      JSON.stringify({
        email: output.email,
        name: output.name,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.log(error);
    return res("No autorizado", { status: 401 });
  }
};
