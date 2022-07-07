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

async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user) {
    res.json({
      ok: false,
      error: "User does not exist in the session."
    });
    return;
  }

  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id
    }
  });

  res.json({
    ok: true,
    ...profile
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

export default withIronSessionApiRoute(profileHandler, ironOptions);
