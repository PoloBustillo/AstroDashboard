import type { APIRoute } from "astro";
import { db, NOW, Users, eq } from "astro:db";
import { res } from "src/utils/methods";
import bcrypt from "bcrypt";
import { boolean, object, safeParse, string } from "valibot";

const UserSchema = object({
  name: string(),
  email: string(),
  password: string(),
  isActive: boolean(),
  role: string(),
});

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { ...body } = await request.json();

    const { success, output } = safeParse(UserSchema, body);
    if (!success) {
      return res("Bad request, body is not correct", { status: 400 });
    }

    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, output.email))
      .limit(1);

    if (existingUser.length > 0) {
      return res("User already exists", { status: 400 });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(output.password, salt);
    let userToBeSaved = {
      ...output,
      email: output.email.toLowerCase(),
      loggedAt: NOW,
      password: hashedPassword,
    };

    const { lastInsertRowid } = await db
      .insert(Users)
      .values({ ...userToBeSaved, loggedAt: NOW });

    return new Response(
      JSON.stringify({
        email: userToBeSaved.email,
        name: userToBeSaved.name,
        role: userToBeSaved.role,
        isActive: userToBeSaved.isActive,
        id: +(lastInsertRowid?.toString() ?? "0"),
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.log(error);
    return res("Bad request", { status: 400 });
  }
};
