import { getPageByUri } from "../../utils/getPageByUri";
import { BlockRenderer } from "../../components/BlockRenderer";
import { getPageSeo } from "../../utils/getPageSeo";
import { notFound } from "next/navigation";
import { getFontSizeForHeading } from "../../utils/fonts";
import PostSearch from "../../components/PostSearch/PostSearch";
import { FormspreeForm } from "../../components/FormspreeForm";

export default async function Page({ params }) {
  const data = await getPageByUri('lien-he');
  return (
    <>
      <div className="space-y-2 pt-6 md:space-y-5">
        <h1 className={`font-bold font-heading max-w-5xl mx-auto my-5 leading-tight ${getFontSizeForHeading(1)} text-left`}>
          {data.title}
        </h1>
        <div>
          <p className="mb-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
            Cần liên hệ với chúng tôi? Trang Liên Hệ của Lào Cai Web sẽ giúp bạn! <br/>📧🌐 Hãy để chúng tôi chăm sóc bạn một cách tốt nhất!
          </p>
          <p>Hotline: 0979.788.685 | Email: vinhnguyenhubt@gmail.com</p>
          <p>Mua source code, theme: <a className={'text-indigo-500'} target={'_blank'} href="https://vinhweb.com/">vinhweb.com</a></p>
        </div>
      </div>

      <FormspreeForm formId={'mzblnape'}/>
    </>
  )
}
export async function generateMetadata({ params }) {
  const seo = await getPageSeo('lien-he');
  if(!seo){
    return {
      title: '404 | Không tìm thấy nội dung'
    }
  }
  return {
    metadataBase: new URL(`https://laocaiweb.com/${'lien-he'}`),
    title: seo.title || "",
    description: seo.metaDesc || "",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seo.title || "",
      description: seo.metaDesc || "",
      type: seo.opengraphType || "",
      publishedTime: seo.opengraphPublishedTime || "",
      lastModified: seo.opengraphModifiedTime || "",
      images: [
        {
          url: seo.opengraphImage?.mediaItemUrl || "",
        },
      ],
    },
  };
}
