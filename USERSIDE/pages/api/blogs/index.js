import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {


  // if authenticated, connect to mongodb
  await mongooseConnect();

  const {method} = req;

  if (method === 'GET') {
    if (req.query?.id) {
      // fetch a single projects by id
      const blogs= await Blog.findById(req.query.id);
      res.json(blogs);
    } else if (req.query?.tags) {
      // fetch project by tags
      const blogs = await  Blog.find({tags : req.query.tags})
      res.json(blogs);
    } else if (req.query?.blogcategory) {
      // fetch project by category
      const blogs = await  Blog.find({ blogcategory : req.query.blogcategory})
      res.json(blogs);
    } else if (req.query?.slug) {
      // fetch project by slug
      const blogs = await  Blog.find({slug: req.query.slug});
      res.json(blogs.reverse());
    } else {
      // fetch all projects
      const blogs = await  Blog.find();
      res.json(blogs.reverse());
    }
  } else {
    res.status(405).json({message: 'Method Not Allowed'})
  }

  }