import Head from "next/head";
import { Bar } from "react-chartjs-2";
import { IoHome } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  Chart as chartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// import { plugin } from "mongoose";

export default function Home() {
  chartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  // use this on top for render error
  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  // define option within the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs Created Monthly by year",
      },
    },
  };

  useEffect(() => {
    // fetch data from api
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blogs");
        const responseProject = await fetch("/api/projects");
        const responseShop = await fetch("/api/shops");
        const responseGallery = await fetch("/api/photos");
        const data = await response.json();
        const dataProject = await responseProject.json();
        const dataShop = await responseShop.json();
        const dataPhotos = await responseGallery.json();

        setBlogsData(data); // assuming data is an array of blog objects
        setProjectData(dataProject);
        setShopData(dataShop);
        setPhotosData(dataPhotos);
        setLoading(false); // after fetching data make loading false
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData(); // call fetchdata function
  }, []);

  // Aggeregate data by year and month
  const monthlyData = blogsData
    .filter((dat) => dat.status === "publish")
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear(); // Get the year
      const month = new Date(blog.createdAt).getMonth(); // Get the month
      acc[year] = acc[year] || Array(12).fill(0); // initilize array for year if not
      acc[year][month]++; // Increment count for the month
      return acc;
    }, {});

  const currentYear = new Date().getFullYear(); // get the current year
  const years = Object.keys(monthlyData);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0), // if no data for a month, default to 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
  }));

  const data = {
    labels,
    datasets,
  };

  return (
    // <LoginLayout>
      <>
        <Head>
          <title>Portfolio Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="blogpage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Admin <span>Dashboard</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <IoHome /> <span>/</span>
              <span>Dashboard</span>
            </div>
          </div>

          {/* dashboard four cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card">
              <h2>Total Blogs</h2>
              <span>
                {blogsData.filter((dat) => dat.status === "publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total Projects</h2>
              <span>
                {projectData.filter((dat) => dat.status === "publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total Products</h2>
              <span>
                {shopData.filter((dat) => dat.status === "publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total Photos</h2>
              <span>{photosData.length}</span>
            </div>
          </div>

          {/* year overview */}
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">
                  {blogsData.filter((dat) => dat.status === "publish").length} /
                  365 <br />
                  <span>Total Published</span>
                </h3>
              </div>
              <Bar data={data} options={options} />
            </div>

            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Node Js</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Node js"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>React</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "React js"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Next js</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Next js"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Css</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Css"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Digital Marketing</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Digital Marketing"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Database</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Database"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Deployment</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Deployment"
                          ).length
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    //  </LoginLayout>
  );
}
