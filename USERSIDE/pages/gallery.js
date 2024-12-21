import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";

export default function gallery() {
  const { alldata, loading } = useFetchData("/api/photos");

  return (
    <>
      <Head>
        <title>Vbm coder: Gallery Photos</title>
      </Head>

      <div className="gallerypage">
        <div className="container">
          <div className="gallerytopsec">
            <div className="topphonesec">
              <div className="lefttitlesec">
                <h4 data-aos='fade-right' data-aos-easing = 'ease-out-cubic' data-aos-duration='2500'>DMB GALLERY PHOTOS</h4>
                <h1 data-aos='fade-right' data-aos-easing = 'ease-out-cubic' data-aos-duration='2500'>
                  AI <br /> Photography
                </h1>
                <Link href={"/gallery#galleryimages"}>
                  <button>VIEW MORE</button>
                </Link>
              </div>
              <div className="rightimgsec">
                <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/3/1.jpg" data-aos='flip-left' data-aos-easing = 'ease-out-cubic' data-aos-duration='2500'/>
                <div className="r_img_top">
                  <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/6.jpg" data-aos='flip-left' data-aos-easing = 'ease-out-cubic' data-aos-duration='2500'/>
                  <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/5.jpg" data-aos='flip-left' data-aos-easing = 'ease-out-cubic' data-aos-duration='2500'/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gallerybtmphotos" id="galleryimages">
          <div className="container">
            <div className="gbtmtitles text-center">
              <h3>
                <span>01//</span> OUR PORTFOLIO
              </h3>
              <h2>
                Deepmoina Capture <span>All of your</span> <br /> beautiful
                memories
              </h2>
            </div>
            <div className="gallery_image_grid">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {alldata.map((photo) => {
                    return (
                      <div className="image-item" data-aos='flip-right' data-aos-easing = 'ease-out-cubic' data-aos-duration='2900'>
                        <img src={photo.images[0]} alt="" />
                        <div className="galeryimgiteminfo">
                          <h2>{photo.title}</h2>
                          <p>by Deepmoina coder</p>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
