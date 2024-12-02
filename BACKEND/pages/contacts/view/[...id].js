import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // To access the 'id' from the URL query
import { SiBloglovin } from "react-icons/si";

export default function Contactview() {
  const [contact, setContact] = useState(null); // Set the state for a single contact
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const { id } = router.query; // Extract the 'id' from the URL

  useEffect(() => {
    // Ensure that 'id' is present before making the API request
    if (id) {
      const fetchContact = async () => {
        try {
          const response = await fetch(`/api/contacts?id=${id}`); // Fetch specific contact based on 'id'
          if (!response.ok) {
            throw new Error("Failed to fetch contact");
          }
          const data = await response.json();
          setContact(data); // Set the single contact data
        } catch (err) {
          setError(err.message); // Handle error
        } finally {
          setLoading(false);
        }
      };
      
      fetchContact();
    }
  }, [id]); // Run effect when 'id' changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Render details for the single contact
  return (
    <div className="addblogspage">
      <div className="titledashboard flex flex-sb">
        <div>
          <h2>
            Contact <span>{contact?.email}</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="breadcrumb">
          <SiBloglovin /> <span>/</span> <span>Contact</span>
        </div>
      </div>

      <div className="contactinfo">
        {contact ? (
          <div className="contact-card">
            <h2>
              Name: <span>{contact.name || "N/A"}</span>
            </h2>
            <h2>
              Last Name: <span>{contact.lname || "N/A"}</span>
            </h2>
            <h2>
              Email: <span>{contact.email}</span>
            </h2>
            <h2>
              Company: <span>{contact.company || "N/A"}</span>
            </h2>
            <h2>
              Phone: <span>{contact.phone}</span>
            </h2>
            <h2>
              Country: <span>{contact.country || "N/A"}</span>
            </h2>
            <h2>
              Project: <span>{contact.project?.join(", ") || "N/A"}</span>
            </h2>
            <h2>
              Budget: <span>{contact.price || "N/A"}</span>
            </h2>
            <h2>
              Description: <span>{contact.description}</span>
            </h2>
            <h2>
              Contact time: <span>{new Date(contact.createdAt).toLocaleString()}</span>
            </h2>
          </div>
        ) : (
          <p>Contact not found.</p>
        )}
      </div>
    </div>
  );
}
