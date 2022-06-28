// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../db/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
       res.statusCode = 404;

       res.send(JSON.stringify({ message: "slug not found" }));

       return;
    }

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Cache-Control",
      "s-maxage=1000000000, stale-while-revalidate"
    );

    return res.json(data);
}
