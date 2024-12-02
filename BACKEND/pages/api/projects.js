import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handle(req, res) {
  // Connect to MongoDB
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === 'POST') {
      const { title, slug, images, description,  client, projectcategory, tags, livepreview, status } = req.body;

      // Create a new Project document
      const proDoc = await Project.create({
        title, slug, images, description,  client, projectcategory, tags, livepreview, status
      });

      return res.status(201).json(proDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        // Fetch a single blog by ID
        const project = await Project.findById(req.query.id);
        return res.status(200).json(project);
      } else {
        // Fetch all blogs
        const projects = await Project.find().sort({ _id: -1 }); // reverse order
        return res.status(200).json(projects);
      }
    }

    if (method === 'PUT') {
      const { _id, title, slug, images, description,  client, projectcategory, tags, livepreview, status } = req.body;

      // Update an existing Project by ID
      const updatedProject = await Project.findByIdAndUpdate(
        _id,
        { title, slug, images, description,  client, projectcategory, tags, livepreview, status },
        { new: true } // Return the updated document
      );

      return res.status(200).json(updatedProject);
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        // Delete a blog by ID
        await Project.deleteOne({ _id: req.query.id });
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
