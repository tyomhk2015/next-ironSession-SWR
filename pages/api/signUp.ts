import { NextApiRequest, NextApiResponse } from "next";
import client from "../lib/prisma";

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(401).end();
  }
  const { name, email } = req.body;
  await client.user.create({
    data: {
      name,
      email
    }
  });

  res.json({
    ok: true
  });
}
