import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";

export default function Photo(
    {
        _id,
          title: existingTitle,
          slug: existingSlug,
          images: existingImages,
    }
) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();
  
    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [images, setImages] = useState(existingImages || []);
  
    // for images uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue = [];
  
    async function createBlog(ev) {
      ev.preventDefault();
  
      if (isUploading) {
        await Promise.all(uploadImagesQueue);
      }
  
      const data = {
        title,
        slug,
        images,
      };
  
      if (_id) {
        await axios.put("/api/photos", { ...data, _id });
        toast.success("Data updated");
      } else {
        await axios.post("/api/photos", data);
        toast.success("Projects Created");
      }
  
      setRedirect(true);
    }
  
    async function uploadImages(ev) {
      const files = ev.target?.files;
      if (files?.length > 0) {
        setIsUploading(true);
  
        for (const file of files) {
          const data = new FormData();
          data.append("file", file);
  
          // use the axios.post method and push the promise to the queue
          uploadImagesQueue.push(
            axios.post("/api/upload", data).then((res) => {
              setImages((oldImages) => [...oldImages, ...res.data.links]);
            })
          );
        }
  
        // wait for all images to finish uploading
  
        await Promise.all(uploadImagesQueue);
  
        setIsUploading(false)
        toast.success('Images Uploaded');
      } else {
        toast.error('An error occurred!')
      }
    }
  
    if (redirect) {
      router.push("/gallery");
      return null;
    }
  
    function updateImagesOrder(images){
      setImages(images)
    }
  
    function handleDeleteImage(index) {
      const updateImages = [...images];
      updateImages.splice(index, 1);
      setImages(updateImages);
      toast.success('Image Deleted Successfully')
    }
  
    // for slug url
    const handleSlugChange = (ev) => {
      const inputValue = ev.target.value;
      const newSlug = inputValue.replace(/\s+g/g, "-"); // replace spaces with hyphens
  
      setSlug(newSlug);
    };

    return <>
     <form className="addWebsiteform" onSubmit={createBlog}>
            {/* blog title */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label className="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter small title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </div>
            {/* blog slug url */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="slug">Slug (seo friendly url)</label>
              <input
                type="text"
                id="slug"
                placeholder="Enter Slug url"
                value={slug}
                onChange={handleSlugChange}
              />
            </div>

    
            {/* blog image */}
            <div className="w-100 flex flex-col flex-left -mb-2">
              <div className="w-100">
                <label htmlFor="image">
                  Images (first image will be show as thumbnail, you can drag)
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="mt-1"
                  accept="image/*"
                  multiple
                  onChange={uploadImages}
                />
              </div>
              <div className="w-100 flex flex-left mb-1">
                {isUploading && (<Spinner/>)}
              </div>
            </div>
            {/* image preview and image sortable with deleted*/}
            {!isUploading && (
              <div className="flex">
                <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200}
                className="flex gap-1">
                  {images?.map((link, index) => (
                    <div key={link} className="uploadedimg">
                      <img src={link} alt="images" className="object-cover" />
                      <div className="deleteimg">
                        <button onClick={()=> handleDeleteImage(index)}><MdDeleteForever/></button>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            )}
    
            <div className="w-100 mb-1">
              <button type="submit" className="w-100 addwebbtn flex-center">
                SAVE DATA
              </button>
            </div>
          </form>
    </>
}

