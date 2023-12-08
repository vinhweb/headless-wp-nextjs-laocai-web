import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Poppins, Space_Grotesk } from "next/font/google";
import "../styles/globals.css";

import { getMenu } from "../utils/getMenu";
import { MainMenu } from "../components/MainMenu";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"],
});

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export default async function RootLayout({ children }) {
  const data = await getMenu();
  return (
    <html className={`${poppins.variable} ${space_grotesk.variable}`}>
      <body className="font-body bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <MainMenu
          items={data.mainMenuItems}
          callToActionDestination={data.callToActionDestination}
          callToActionLabel={data.callToActionLabel}
        />
        {children}
      </body>
    </html>
  );
}
