import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function Category() {

    const router = useRouter();
    const {category} = router.query;

    const [currentPage, setCurrentPage] = useState(1); // for page
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState("");

    // fetch blog category data
    const {alldata, loading} = useFetchData(`/api/blogs?blogcategory=${category}`);

    // const filteredBlogs = alldata.filter((item) => item.category === item.category).sort((a, b) => new Date(b.createdAt) = new Date(a.createdAt)).slice(0, 20);
    const filteredBlogs =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const blogcategoryData = [...filteredBlogs].reverse();

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const allblog = alldata.length; // total number of blogs

    // calculate index of the first blog displayed on the current page
    const indexOfFirstBlog = (currentPage -1)* perPage;
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

    return <>
        <Head>
            <title>Blog category page</title>
        </Head>
        <div className="blogcategory">
            <section className='tophero'>
                <div className='container'>
                    <div className='toptitle'>
                        <div className='toptitlecont flex'>
                            <h1>category <span>{category}</span></h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className='latestpostsses'>
                <div className='container'>
                    <div className='border'>
                        <div className='latestpostsdata'>
                            <div className='fetitle'>
                                <h3></h3>
                            </div>
                            <div className='latestposts'>
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
                            <div className="tegs">
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
                            .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
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
                </div>
            </section>
        </div>
    </>
}