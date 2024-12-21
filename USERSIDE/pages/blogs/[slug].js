import Head from "next/head";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { RiFacebookFill, RiWhatsappFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import {FiSearch} from "react-icons/fi";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import Blogsearch from "@/components/Blogsearch";
import Link from "next/link";

const BlogPage = () => {
  const router = useRouter();

    const {slug} = router.query; // fetch the slug parameter from the router

  // hook for all data fetching
  const { alldata } = useFetchData('/api/blogs/');

  const [searchInput, setSearchInput] = useState(false);

  const handleSearchOpen = () => {
    setSearchInput(!searchInput);
  }
  const handleSearchClose = () => {
    setSearchInput(false);
  }

  const [blogData, setBlogData] = useState({ blog: {}, comments: [] }); // initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch blog data. Please try again later. ");
          setLoading(false);
        }
      }
    };

    fetchBlogData();
  }, [slug]); // fetch data whenever slug changes

  // for scroll down to comment form


  if (loading) {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: (error)</p>;
  }

  const createdAtDate = blogData && blogData.blog.createdAt ? new Date(blogData && blogData.blog.createdAt) : null;

  // function to format the date
  const formatDate = (date) => {
    // check if date if valid
    if (!date || isNaN(date)) {
      return ""; //or handle the error as needed
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true, // use 12-hour format
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const blogUrl = `http://localhost:3000/blogs/${slug}`;

  

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); // reset copied state after 3 seconds
  }

  const Code = ({ node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '');

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // 3000 millisconds = 3 deconds
    }

    if (inline) {
      return <code>{children}</code>
    } else if (match){
      return (
        <div style={{position: 'relative'}}>
          <SyntaxHighlighter
            style={allyDark}
            language={match[1]}
            PreTag='pre'
            {...props}
            codeTagProps={{style: {padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap'}}}
          >
            {String(children).replace(/\n$/,'')}
          </SyntaxHighlighter>
          <button onClick={handleCopy} style={{position: 'absolute', top: '0', right: '0', zIndex: '1', background: 'e3d3d3d', color: '#fff', padding: '10px'}}>
            {copied ? 'Copied!' : 'Copy code'}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      )
    }
  }

  // const renderComments = (comments) => {
  //   if (!comments) {
  //     return null; // handle case when comments are not yet loaded
    // }

    // create a map to efficiently find children of each comment
    

    // populate children comments into their respective parents
    

    // render the comments
  // }

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>

      <div>
      {blogData && (
        <div className="blogslugpage">
          <div className="container">
            <div className="blogslugpagecont">
              <div className="leftsitedetails">
                <div className="leftbloginfoimg">
                  <img src={blogData.blog.images[0] || '/img/noimage.png'} alt={blogData && blogData.title} />
                </div>
                <div className="slugbloginfopub">
                  <div className="flex gap-2">
                    <div className="adminslug">
                      <img src={blogData.blog.images[0] || '/img/noimage.png'} alt="" />
                      <span>By Deepmoina</span>
                    </div>
                    <div className="adminslug">
                      <SlCalender />
                      <span>{formatDate(createdAtDate)}</span>
                    </div>
                  </div>

                  <div className="shareblogslug">
                    {/* copy url button */}
                    <div title="Copy URL" onClick={() => handleCopyUrl(blogUrl)} style={{ cursor: 'pointer'}}>
                      <BsCopy/> <span>{copied ? 'Copied!' : ''}</span>
                    </div>

                    {/* facebook share button */}
                    <a title="_blank" href={`https://www.facebook.com/share/share.php?u=${encodeURIComponent(blogUrl)}`} rel="noopener noreferrer">
                      <RiFacebookFill/>
                    </a>
                    {/* twitter share button */}
                    <a title="_blank" href={`https://www.twitter.com/inent/tweet?text=${encodeURIComponent('check put this post:' + blogUrl)}`} rel="noopener noreferrer">
                      <FaTwitter/>
                    </a>
                    {/* whatsapp share button */}
                    <a title="_blank" href={`whatsapp://send?text=Check out this blog post: ${encodeURIComponent(blogUrl)}`} rel="noopener noreferrer">
                      <RiWhatsappFill/>
                    </a>
                    {/* linkdin share button */}
                    <a title="_blank" href={`https://www.facebook.com/share/share.php?u=${encodeURIComponent(blogUrl)}`} rel="noopener noreferrer">
                      <BiLogoLinkedin/>
                    </a>
                  </div>
                </div>
                <h1>{blogData.blog.title}</h1>
                {loading ? <Spinner/> : <div className="blogcontent">
                  <ReactMarkdown
                    rehypePlugins={[remarkGfm]}
                    components={{
                      code: Code
                    }}
                  >
                    {blogData.blog.description}
                  </ReactMarkdown>
                  </div>}

                  <div className="blogslugtags">
                    <div className="blogstegs">
                      <h2>Tags:</h2>
                      <div className="flex flex-wrap gap-1">
                        {blogData && blogData.blog.tags.map((cat) => {
                          return <span key={cat}>{cat}</span>
                        })}
                      </div>
                    </div>
                  </div>

              </div>
              <div className="rightsitedetails">
                <div className="rightslugsearchbar">
                  <input onClick={handleSearchOpen} type="text" placeholder="Search..." />
                  <button><FiSearch/></button>
                </div>
                <div className="rightslugcategory">
                    <h2>CATEGORIES</h2>
                    <ul>
                      <Link href='/blogs/category/Next Js'><li>Next Js <span>({alldata.filter(ab => ab.blogcategory[0] ==='Next js').length})</span></li></Link>
                      <Link href='/blogs/category/Digital Marketing'><li>Digital Marketing <span>({alldata.filter(ab => ab.blogcategory[0] ==='Digital Marketing').length})</span></li></Link>
                      <Link href='/blogs/category/React'><li>React<span>({alldata.filter(ab => ab.blogcategory[0] ==='React js').length})</span></li></Link>
                      <Link href='/blogs/category/Node Js'><li>Node Js <span>({alldata.filter(ab => ab.blogcategory[0] ==='Node js').length})</span></li></Link>
                      <Link href='/blogs/category/Tailwind Css'><li>Css <span>({alldata.filter(ab => ab.blogcategory[0] ==='Css').length})</span></li></Link>
                      <Link href='/blogs/category/Database'><li>Database<span>({alldata.filter(ab => ab.blogcategory[0] ==='Database').length})</span></li></Link>
                      <Link href='/blogs/category/Deployment'><li>Deployment<span>({alldata.filter(ab => ab.blogcategory[0] ==='Deployment').length})</span></li></Link>
                    </ul>
                </div>
                <div className="rightrecentpost">
                    <h2>RECENT POST</h2>
                    {alldata.slice(0, 3).map((blog) => {
                      return <Link key={blog._id} href={`/blogs/${blog.slug}`} className="rightrecentp">
                        <img src={blog.images[0]} />
                        <div>
                          <h3>{blog.title}</h3>
                          <h4 className="mt-4">
                            {blog.tags.map((cat) => {
                              return <span key={cat}>{cat}</span>
                            })}
                          </h4>
                        </div>
                      </Link>
                    })}
                </div>
              </div>
            </div>
          </div>
          {searchInput ? <Blogsearch cls={handleSearchClose}/> : null}
        </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
