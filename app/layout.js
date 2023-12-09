import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Poppins, Space_Grotesk, Roboto, Montserrat } from "next/font/google";
import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getMenu } from "../utils/getMenu";
import { MainMenu } from "../components/MainMenu";
import SectionContainer from "../components/SectionContainer";
import Footer from "../components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"]
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["100", "300", "400", "500", "700", "800", "900"]
});


const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export default async function RootLayout({ children }) {
  const data = await getMenu();
  return (
    <html className={`${space_grotesk.variable} ${roboto.variable} ${montserrat.variable}`}>
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <SpeedInsights/>
      <body className="font-body bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <SectionContainer>
          <MainMenu
            items={data.mainMenuItems}
            callToActionDestination={data.callToActionDestination}
            callToActionLabel={data.callToActionLabel}
          />
          <main className={'mb-auto'}>
            {children}
          </main>
          <Footer/>
        </SectionContainer>
      </body>
    </html>
  );
}
