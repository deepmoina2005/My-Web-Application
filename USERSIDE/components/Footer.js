import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
    return <>
        <footer className="footer">
         <div className="footersec flex flex-center flex-col gap-2">
            <div className="logo">
                <img src="/img/logo.png" alt="" />
            </div>
            <div className="ul flex gap-2">
                <li><Link href= '/services'>Services</Link></li>
                <li><Link href= '/works'>Works</Link></li>
                <li><Link href= ''>Resume</Link></li>
                <li><Link href= '/contact'>Contact</Link></li>
            </div>
            <div className="hero_social">
                <li><a href="/" target="_blank"><FaTwitter/></a></li>
                <li><a href="/" target="_blank"><LiaBasketballBallSolid/></a></li>
                <li><a href="/" target="_blank"><GrLinkedinOption/></a></li>
                <li><a href="/" target="_blank"><FaGithub/></a></li>
            </div>
            <div className="copyrights">&copy; 2024 All Rights Reserved By <span>Deepmoina.in</span></div>
         </div>
        </footer>
    </>
}