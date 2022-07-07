import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../lib/prisma";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;
  const email = req.body;

  if (!email) {
    res.json({
      ok: false,
      error: "Problem duing email login."
    });
    return;
  }

  const fetchedUser = await client.user.findUnique({ where: { email } });

  if (!fetchedUser) {
    res.json({
      ok: false,
      error: "Problem duing fetching user from prisma."
    });
    return;
  }

  req.session.user = {
    id: +fetchedUser.id
  };

  await req.session.save();

  console.log("backend", req.session);

  res.json({
    ok: true,
    user: fetchedUser
  });
}

const ironOptions = {
  cookieName: "nomad-carrot-8th",
  password:
    "complex_password_at_least_32_characters_longcomplex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  }
};

export default withIronSessionApiRoute(loginHandler, ironOptions);
