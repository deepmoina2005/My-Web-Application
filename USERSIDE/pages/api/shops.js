import { mongooseConnect } from "@/lib/mongoose";
import { Shop } from "@/models/Shop";
import shop from "../shop";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      // fetch a single projects by id
      const shop = await Shop.findById(req.query.id);
      res.json(shop);
    } else if (req.query?.slug) {
      // fetch shop by slug
      const shopslug = await Shop.find({ slug: req.query.slug });
      res.json(shopslug.reverse());
    } else {
      // fetch all projects
      const projects = await Shop.find();
      res.json(projects.reverse());
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
