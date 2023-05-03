/* eslint-disable array-callback-return */
import { Readable } from "stream";

import { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";

import axios from "@/axios.config";
import { PetCardPreviewI } from "@/constant/interface";

const getAllslug = async () => {
  const response: PetCardPreviewI[] = (await axios.post(`/dev/cards`)).data.message;
  const paths = response.map((animal) => ({
    params: {
      dogId: animal.animalId,
    },
  }));
  return paths;
};

const nextSiteMap = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // An array with your links
    const links: any[] = [];
    const paths = await getAllslug();
    paths.forEach((blog) => {
      links.push({
        url: `/${blog.params.dogId}`,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    // Add other pages
    const pages = ["/", "/found-dog", "/profile"];
    pages.forEach((url) => {
      links.push({
        url,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: `https://www.${req.headers.host}`,
    });

    res.writeHead(200, {
      "Content-Type": "application/xml",
    });
    const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
      data.toString()
    );

    res.end(xmlString);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
};

export default nextSiteMap;
