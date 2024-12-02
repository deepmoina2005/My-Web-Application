import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {
  // Connect to MongoDB
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === 'POST') {
      const { name, lname, email, company, phone, country, price, description, project } = req.body;

      // Create a new blog document
      const blogDoc = await Contact.create({
        name, lname, email, company, phone, country, price, description, project
      });

      return res.status(201).json(blogDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        // Fetch a single blog by ID
        const blog = await Contact.findById(req.query.id);
        return res.status(200).json(blog);
      } else {
        // Fetch all blogs
        const blogs = await Contact.find().sort({ _id: -1 }); // reverse order
        return res.status(200).json(blogs);
      }
    }

    if (method === 'PUT') {
      const { _id, name, lname, email, company, phone, country, price, description, project } = req.body;

      // Update an existing blog by ID
      const updatedBlog = await Contact.findByIdAndUpdate(
        _id,
        { title, name, lname, email, company, phone, country, price, description, project },
        { new: true } // Return the updated document
      );

      return res.status(200).json(updatedBlog);
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        // Delete a blog by ID
        await Contact.deleteOne({ _id: req.query.id });
        return res.status(200).json({ success: true });
      }
    }

    // If method is unsupported
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    // Send error response in case of failure
    console.error(error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
}
