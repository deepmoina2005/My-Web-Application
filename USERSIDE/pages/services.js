import Head from "next/head";
import Link from "next/link";
import { HiXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io"

export default function services() {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>

      <div className="servicespage">
        <div className="topservices">
          <div className="container">
            <h2 data-aos="fade-up" data-aos-duration='2500'>My Services</h2>
            <p data-aos="fade-up" data-aos-duration='2500'>
              Home <span>&gt;</span> Services
            </p>
          </div>
        </div>
        <div className="centerservices">
          <div className="container">
            <div className="cservicesbox">
              <div className="csservice" data-aos="fade-right" data-aos-duration='2500'>
                <span>01</span>
                <div>
                  <h2>Web Development</h2>
                  <img src="" alt="" />
                </div>
                <ul>
                  <li>Performance & Load Time</li>
                  <li>Reusable Components</li>
                  <li>Responsiveness</li>
                  <li>Quality assurance and testing</li>
                  <li>Quality maintenance, update, and bug fixes.</li>
                </ul>
                <p>
                  I am very good in web development offering services, i offer
                  reliable web development services to generate the remarkable
                  results which your business need.
                </p>
              </div>
              <div className="csservice" data-aos="fade-right" data-aos-duration='2500'>
                <span>04</span>
                <div>
                  <h2>UI/UX Product Design</h2>
                  <img src="" alt="" />
                </div>
                <ul>
                  <li>Reusable Components</li>
                  <li>Responsiveness</li>
                  <li>Quality assurance and testing</li>
                  <li>UI/UX Design</li>
                </ul>
                <p>
                  I am very good in web development offering services, i offer
                  reliable web development services to generate the remarkable
                  results which your business need.
                </p>
              </div>
              <div className="csservice" data-aos="fade-up" data-aos-duration='2500'>
                <span>02</span>
                <div>
                  <h2>Digital Marketing (SEO)</h2>
                  <img src="" alt="" />
                </div>
                <ul>
                  <li>Marketing Strategy</li>
                  <li>Resuarch On Customer</li>
                  <li></li>
                </ul>
                <p>
                  I am very good in web development offering services, i offer
                  reliable web development services to generate the remarkable
                  results which your business need.
                </p>
              </div>
              <div className="csservice" data-aos="fade-up" data-aos-duration='2500'>
                <span>05</span>
                <div>
                  <h2>Mobile Development</h2>
                  <img src="" alt="" />
                </div>
                <ul>
                  <li>Prototyping and wiredframing</li>
                  <li>UI/UX Design</li>
                  <li>Coding and Programming</li>
                  <li>Quality Assurance (QA) testing</li>
                  <li>Quality maintenance, update, and bug fixes.</li>
                </ul>
                <p>
                  I am very good in web development offering services, i offer
                  reliable web development services to generate the remarkable
                  results which your business need.
                </p>
              </div>
              <div className="csservice" data-aos="fade-left" data-aos-duration='2500'>
                <span>03</span>
                <div>
                  <h2>Content Creator</h2>
                  <img src="" alt="" />
                </div>
                <ul>
                  <li>Crispy Digital Editing</li>
                  <li>Marketing and promotion on Social Platform</li>
                  <li>Client communication skill</li>
                </ul>
                <p>
                  I am very good in web development offering services, i offer
                  reliable web development services to generate the remarkable
                  results which your business need.
                </p>
              </div>
              <div className="csservice" data-aos="fade-left" data-aos-duration='2500'>
                <span>06</span>
                <div>
                  <h2>E-commerce Business Solution</h2>
                  <img src="" alt="" />
                </div>
                <ul>
                  <li>Ecommerce Store</li>
                  <li>Online Purchase</li>
                  <li>Quality assurance and testing</li>
                  <li>Marketing and promotion on Social Platform</li>
                </ul>
                <p>
                  I am very good in web development offering services, i offer
                  reliable web development services to generate the remarkable
                  results which your business need.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pricingplansec">
          <div className="container">
            <div className="pricingtitles text-center">
              <h3><img src="/img/chevron_right.png" /> PRICING PLAN</h3>
              <h2>Pricing My Work</h2>
            </div>

            <div className="pricingcards">
                <div className="pricingcard">
                    <h4>Life Plan</h4>
                    <p>Perfect Choice for individual</p>
                    <h2>$25.00 <span>Monthly</span></h2>
                    <Link href='/contact'><button>Get Start Now</button></Link>
                    <div>
                        <h5>Lite includes:</h5>
                        <ul>
                            <li><IoMdCheckmark/>Powerful admin panel</li>
                            <li><IoMdCheckmark/>1 Native android app</li>
                            <li><HiXMark/>Multi-language support</li>
                            <li><HiXMark/>hello</li>
                        </ul>
                    </div>
                </div>
                <div className="pricingcard" data-aos="fade-up" data-aos-duration='1000'>
                    <h4>Premium Plan</h4>
                    <p>Perfect Choice for individual</p>
                    <h2>$35.00 <span>Monthly</span></h2>
                    <Link href='/contact'><button>Get Start Now</button></Link>
                    <div>
                        <h5>Everything in Lite, plus:</h5>
                        <ul>
                            <li><IoMdCheckmark/>Powerful admin panel</li>
                            <li><IoMdCheckmark/>1 Native android app</li>
                            <li><IoMdCheckmark/>Multi-language support</li>
                            <li><HiXMark/>hello</li>
                        </ul>
                    </div>
                </div>
                <div className="pricingcard">
                    <h4>Pro Plan</h4>
                    <p>Perfect Choice for individual</p>
                    <h2>$45.00 <span>Monthly</span></h2>
                    <Link href='/contact'><button>Get Start Now</button></Link>
                    <div>
                        <h5>Everything in pro, plus:</h5>
                        <ul>
                            <li><IoMdCheckmark/>Powerful admin panel</li>
                            <li><IoMdCheckmark/>1 Native android app</li>
                            <li><IoMdCheckmark/>Multi-language support</li>
                            <li><IoMdCheckmark/>hello</li>
                        </ul>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
