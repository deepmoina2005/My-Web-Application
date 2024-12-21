import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { SiBloglovin } from "react-icons/si";
import {  FaRegEye } from "react-icons/fa";
import {RiDeleteBin6Fill} from "react-icons/ri";

export default function contacts() {

    // pagination
    const [currentPage, setCurrentPage] = useState(1); // for page
    const [perPage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState('');

    // fetch blog data
    const { alldata, loading } = useFetchData('/api/contacts');

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // total number of blogs
    const allblog = alldata.length;

    // filter all data based on search query
    const filteredBlogs = searchQuery.trim() === '' 
        ? alldata 
        : alldata.filter(contacts => 
            contacts.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // calculate index of the first and last blog displayed on the current page
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    // Get current page's blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const PublishedBlogs = currentBlogs;

    // pagination numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBlogs.length / perPage); i++) {
        pageNumbers.push(i);
    }

    return <>
   <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All  <span>Contacts</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin /><span>/</span> <span>Contacts</span>
                </div>
            </div>
            <div className="blogstable">
                <div className="flex gap-2 mb-2">
                    <h2>Search Contacts by  name</h2>
                    <input 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        type="text" 
                        placeholder="Search by title..." 
                    />
                </div>
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Project</th>
                            <th>Open Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4}>
                                    <Dataloading />
                                </td>
                            </tr>
                        ) : (
                            PublishedBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center">No Contacts Found</td>
                                </tr>
                            ) : (
                                PublishedBlogs.map((blog, index) => (
                                    <tr key={blog._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td><h3>{blog.name}</h3></td>
                                        <td><p>{blog.email}</p></td>
                                        <td><h3>{blog.phone}</h3></td>
                                        <td><h3>{blog.project[0]}</h3></td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={`/contacts/view/${blog._id}`}>
                                                    <button><FaRegEye /></button>
                                                </Link>
                                                <Link href={`/contacts/delete/${blog._id}`}>
                                                    <button><RiDeleteBin6Fill /></button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
                {/* pagination */}
                {PublishedBlogs.length > 0 && (
                    <div className="blogpagination">
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
    </>
}
