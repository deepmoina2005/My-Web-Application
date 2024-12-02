import { mongooseConnect } from "@/lib/mongoose";
import { Photo } from "@/models/Photo";


export default async function handle(req, res) {
  // Connect to MongoDB
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === 'POST') {
      const { title, slug, images} = req.body;

      // Create a new Project document
      const proDoc = await Photo.create({
        title, slug, images
      });

      return res.status(201).json(proDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        // Fetch a single blog by ID
        const project = await Photo.findById(req.query.id);
        return res.status(200).json(project);
      } else {
        // Fetch all blogs
        const projects = await Photo.find().sort({ _id: -1 }); // reverse order
        return res.status(200).json(projects);
      }
    }

    if (method === 'PUT') {
      const { _id, title, slug, images } = req.body;

      // Update an existing Project by ID
      const updatedProject = await Photo.findByIdAndUpdate(
        _id,
        { title, slug, images },
        { new: true } // Return the updated document
      );

      return res.status(200).json(updatedProject);
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        // Delete a blog by ID
        await Photo.deleteOne({ _id: req.query.id });
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