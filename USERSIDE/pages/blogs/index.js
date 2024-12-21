import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Link from "next/link";


export default function blogs() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1); // for page
  const [perPage] = useState(7);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  // fetch blog data
  const { alldata, loading } = useFetchData("/api/blogs");

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // total number of blogs
  const allblog = alldata.length;

  // filter all data based on search query
  const filteredBlogs =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // calculate index of the first and last blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  // Get current page's blogs
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const PublishedData = currentBlogs.filter(
    (blog) => blog.status === "publish"
  );

  const sliderpubdata = alldata.filter((ab) => ab.status === "publish");

  // pagination numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBlogs.length / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <div className="blogpage">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1 data-aos="fade-right" data-aos-duration='2400'>
                  Welcome to <span>DMB Blogs!</span>
                </h1>
                <p data-aos="fade-right" data-aos-duration='2400'>
                  I Write about web, mobile development and modern JavaScripts
                  framworks. The best aeticles, links and news related to web
                  and mobile development.
                </p>
                <div className="subemail">
                  <form className="flex" data-aos="fade-up" data-aos-duration='2400'>
                    <input placeholder="Search blogs here..." type="text" />
                    <button>Search</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="featured">
              <div className="container">
                <div className="border">
                  <div className="featuredposts" data-aos="fade-up" data-aos-duration='2400'>
                    <div className="fetitle flex">
                      <h3>Featured Posts :</h3>
                    </div>
                    <div className="feposts flex">
                      <Swiper
                        slidesPerView={"auto"}
                        freeMode={true}
                        spaceBetween={30}
                        className="mySwiper"
                        modules={FreeMode}
                      >
                        {loading ? (
                          <Spinner />
                        ) : (
                          <>
                            {sliderpubdata.slice(0, 6).map((blog) => {
                              return (
                                <SwiperSlide key={blog._id}>
                                  <div className="fpost" key={blog._id}>
                                    <Link href={`/blogs/${blog.slug}`}>
                                      <img
                                        src={blog.images[0]}
                                        alt={blog.title}
                                      />
                                    </Link>
                                    <div className="fpostinfo">
                                      <div className="tegs flex">
                                        {blog.blogcategory.map((cat) => {
                                          return (
                                            <Link
                                              href={`/blogs/category/${cat}`}
                                              className="ai"
                                            >
                                              <span></span>
                                              {cat}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                      <h2>
                                        <Link href={`/blogs/${blog.slug}`}>
                                          {blog.title}
                                        </Link>
                                      </h2>
                                      <div className="fpostby flex">
                                        <img src="/img/coder.jpg" alt="" />
                                        <p>By Deepmoina coder</p>
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              );
                            })}
                          </>
                        )}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Popular Tags */}
        <section className="populartegssec">
          <div className="container">
            <div className="border"></div>
            <div className="populartegsdata">
              <div className="fetitle">
                <h3>Popular Tags</h3>
              </div>
              <div className="poputegs">
                <Link href="/blog/category/Next Js" className="pteg">
                  <img src="/img/python.png" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Next Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Node Js" className="pteg">
                  <img src="/img/nodejs.png" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Node Js
                    </div>
                  </div>
                </Link>

                <Link href="/blog/category/React Js" className="pteg">
                  <img src="/img/" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>React Js
                    </div>
                  </div>
                </Link>

                <Link href="/blog/category/Digital Marketing" className="pteg">
                  <img src="" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Digital
                    </div>
                  </div>
                </Link>

                <Link href="/blog/category/Flutter Dev" className="pteg">
                  <img src="" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Flutter Dev
                    </div>
                  </div>
                </Link>

                <Link href="/blog/category/Tailwind CSS" className="pteg">
                  <img src="" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Tailwind CSS
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="latestpostsec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostdata">
              <div className="fetitle">
                <h3>Latest Article :</h3>
              </div>
              <div className="latestposts">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {PublishedData.map((blog) => {
                      return (
                        <div className="lpost" key={blog._id}>
                          <div className="lpostimg">
                            <Link href={`/blogs/${blog.slug}`}>
                              <img src={blog.images[0]} alt={blog.title} />
                            </Link>
                            <div className="tags">
                              {blog.blogcategory.map((cat) => {
                                return (
                                  <Link
                                    href={`/blogs/category${cat}`}
                                    className="ai"
                                  >
                                    <span></span>
                                    {cat}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                          <div className="lpostinfo">
                            <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                            <p>My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers.</p>
                            <h4 className="flex"><img src="/img/coder.jpg" alt=""/><span>by Deepmoina coder</span></h4>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            {PublishedData.length === 0 ? (
                ""
            ) : (
                    <div className="blogspaginationbtn flex flex-center mt-3">
                        <button 
                            onClick={() => paginate(currentPage - 1)} 
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {pageNumbers
                            .slice(Math.max(currentPage - 2, 0), Math.min(currentPage + 2, pageNumbers.length))
                            .map(number => (
                                <button 
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))
                        }
                        <button
                            onClick={() => paginate(currentPage + 1)} 
                            disabled={currentBlogs.length < perPage}
                        >
                            Next
                        </button>
                    </div>
                )}
          </div>
        </section>
      </div>
    </>
  );
}
