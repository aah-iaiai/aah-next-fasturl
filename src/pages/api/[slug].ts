// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../db/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
    const slug = req.query["slug"];

    if(!slug || typeof slug !== "string") {
      res.status(404).json({ message: "please use with a slug" });
      return
    }

    console.log({slug});

    const data = await prisma.shortLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    })

    if(!data) {
       res.status(404).json({ message: "slug not found" });
       return;
    }

    return res.redirect(data.url);
}
