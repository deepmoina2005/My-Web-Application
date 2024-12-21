import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { FaInstagram, FaPhoneVolume } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from "react-icons/md";

export default function contact() {
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [project, setProject] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [messageOk, setMessageOk] = useState("");

  async function createProduct(ev) {
    ev.preventDefault();

    setMessageOk("Sending...");

    const data = {
      name,
      lname,
      email,
      company,
      phone,
      country,
      project,
      price,
      description,
    };

    try {
      await axios.post("/api/contacts", data);
      setMessageOk("message sent successfully");
      setTimeout(() => {
        setMessageOk(true);
      }, 3000);

      // reset all form fields after successful submission
      setName("");
      setLname("");
      setEmail("");
      setCompany("");
      setPhone("");
      setCountry("");
      setProject("");
      setPrice("");
      setDescription("");
    } catch (error) {
      if (error.response) {
        // the req was mode and the server responds with a status code
        // the fields out of the range of 2xx
        console.error("sever error", error.response.data);
      } else if (error.request) {
        // the req was made but no response was received
        console.error("Network error", error.request);
      } else {
        // something happened in setting up the req that triggered an error
        console.error("error", error.message);
      }
      setMessageOk("failed to send message");
    }
  }

  const handleProjectChange = (projectName) => {
    if (project.includes(projectName)) {
      setProject(project.filter((project) => project !== projectName));
    } else {
      setProject([...project, projectName]);
    }
  };

  const handlePriceChange = (e) => {
    const selectedValue = e.target.value;
    setPrice(selectedValue);
    console.log("Selected price:", selectedValue); // Confirm that value is correctly captured
  };

  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>

      <div className="contactpage">
        <div className="container">
          <div className="contactformp">
            <div className="leftcontp">
              <h2>Get in touch</h2>
              <h2>Let's talk about project</h2>
              <p>
                Thinking about a new project, a problem to solve, or just want
                to connect ? Let's do it!
              </p>
              <p>Use the form on this page or get in touch by other means.</p>
              <p>
                We love questions and feedback - and we're always happy to help!
              </p>
              <div className="leftsociinfo">
                <ul>
                  <li>
                    <FaPhoneVolume />{" "}
                    <span>
                      Phone:{" "}
                      <a href="tel:+7099481569" target="_blank">
                        +91-7099481569
                      </a>
                    </span>
                  </li>
                  <li>
                    <MdAttachEmail />{" "}
                    <span>
                      Email:{" "}
                      <a
                        href="mailto:deepmoinaboruah7@gmail.com"
                        target="_blank"
                      >
                        deepmoina7@gmail.com
                      </a>
                    </span>
                  </li>
                  <li>
                    <GrLinkedin />{" "}
                    <span>
                      Linkedin:{" "}
                      <a href="tel:+7099481569" target="_blank">
                      deepmoina-boruah
                      </a>
                    </span>
                  </li>
                  <li>
                    <FaInstagram />{" "}
                    <span>
                      Instagram:{" "}
                      <a href="tel:+7099481569" target="_blank">
                      instagram.com/deep_17
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rightcontp">
              <form onSubmit={createProduct}>
                <div className="rightconttitle">
                  <h2>Your Contact information</h2>
                </div>
                <div className="rightcontinputs">
                  <input
                    type="text"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    value={lname}
                    onChange={(ev) => setLname(ev.target.value)}
                    placeholder="Last Name"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder="Email Address"
                    required
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(ev) => setCompany(ev.target.value)}
                    placeholder="Company Name"
                    required
                  />
                  <input
                    type="text"
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    placeholder="Phone Number"
                    required
                  />
                  <select
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    id="country"
                  >
                    <option value="atl">Select Country</option>
                    <option value="atl">Atlanta</option>
                    <option value="ber">Berlin</option>
                    <option value="bos">Boston</option>
                    <option value="chi">Chicago</option>
                    <option value="lon">London</option>
                    <option value="india">India</option>
                    <option value="ny">New York</option>
                    <option value="par">Paris</option>
                    <option value="sf">San Francisco</option>
                  </select>
                </div>
                <div className="rightconttitle">
                  <h2>What Services do you need for your projects?</h2>
                </div>
                <div className="rightcontcheckbox">
                  {[
                    "Website Development",
                    "App Development",
                    "Design System",
                    "Website Migration",
                    "E-commerce Site",
                    "Perfomance Evaluation",
                  ].map((projectOption) => (
                    <label
                      key={projectOption}
                      className="cyberpunk-checkbox-label"
                    >
                      <input
                        type="checkbox"
                        className="cyberpunk-checkbox"
                        checked={project.includes(projectOption)}
                        onChange={() => handleProjectChange(projectOption)}
                      />
                      {projectOption}
                    </label>
                  ))}
                </div>
                <div className="rightconttitle">
                  <h2>How much is the anticipated budget for your projects?</h2>
                </div>
                <div className="rightcontredio">
                  {[
                    "Less than $400",
                    "$400 - $800",
                    "$800 - $1000",
                    "More than $1000",
                  ].map((priceRange) => (
                    <div className="radio-button" key={priceRange}>
                      <input
                        type="radio"
                        id={priceRange}
                        name="budget" // Ensures radio buttons are grouped
                        value={priceRange}
                        checked={price === priceRange}
                        onChange={handlePriceChange}
                      />
                      <span className="radio"></span>
                      <label htmlFor={priceRange}>{priceRange}</label>
                    </div>
                  ))}
                </div>
                <div className="rightconttitle">
                    <h2>Tell me about your project</h2>
                </div>
                <div className="rightcontpera">
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)} name="description" rows={4} id="" placeholder="Project description"></textarea>
                </div>
                <hr />
                <div className="righhcontsbtn flex gap-3">
                    <button type="submit">Submit</button>
                    <p>{messageOk}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
