import siteMetadata from "../data/siteMetadata";
import Link from "next/link";
import { FaGithub, FaYoutube, FaFacebook } from "react-icons/fa6";
import { IoMailOpen } from "react-icons/io5";
export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <Link href={`mailto:${siteMetadata.email}`}>
            <IoMailOpen kind="mail"  size={30} />
          </Link>
          <Link href={siteMetadata.github}>
            <FaGithub kind="github"  size={30} />
          </Link>
          <Link href={siteMetadata.facebook}>
            <FaFacebook kind="facebook" size={30} />
          </Link>
          <Link href={siteMetadata.youtube}>
            <FaYoutube kind="youtube" size={30} />
          </Link>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://vinhweb.com/">
            VinhWeb.com
          </Link>
        </div>
      </div>
    </footer>
  )
}
