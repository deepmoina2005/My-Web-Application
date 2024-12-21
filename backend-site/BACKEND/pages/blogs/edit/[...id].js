import Blog from "@/components/Blog";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from 'next/router';

export default function EditBlog() {
    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/blogs?id=${id}`);
                setProductInfo(response.data);
                setError(null);
            } catch (err) {
                setError("Failed to load blog details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <>
            <Head>
                <title>Update Blog</title>
            </Head>

            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Edit <span>{productInfo?.title || "Blog"}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span> <span>Edit Blog</span>
                    </div>
                </div>

                <div className="mt-3">
                    {loading ? (
                        <p>Loading blog details...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        productInfo && <Blog {...productInfo} />
                    )}
                </div>
            </div>
        </>
    );
}
