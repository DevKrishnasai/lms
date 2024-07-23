import { prisma } from "@/lib/db";
import { Webhook } from "svix";

const webhookSecret: string = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  const body = await req.text();

  const sivx = new Webhook(webhookSecret);

  let msg: any;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }

  // Rest
  if (msg && msg?.type) {
    if (msg.type == "user.created") {
      await prisma.user.create({
        data: {
          authId: msg.data.id,
          email: msg.data.email,
          name: msg.data.firstName,
          role: "STUDENT",
        },
      });
    } else if (msg.type == "user.updated") {
      await prisma.user.update({
        where: {
          authId: msg.data.id,
        },
        data: {
          email: msg.data.email,
          name: msg.data.firstName,
        },
      });
    } else if (msg.type == "user.deleted") {
      await prisma.user.delete({
        where: {
          authId: msg.data.id,
        },
      });
    }
  }

  return new Response("OK", { status: 200 });
}
