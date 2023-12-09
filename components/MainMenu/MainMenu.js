import Link from "next/link";
import { ButtonLink } from "../ButtonLink";
import { SiWeblate } from "react-icons/si";

export const MainMenu = ({
  items,
  callToActionLabel,
  callToActionDestination,
}) => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href={'/'}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <SiWeblate size={30} />
            </div>
            <div>LaoCaiWeb</div>
          </div>
        </Link>
      </div>

      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {(items || [])
          .filter(link => link.destination !== "/")
          .map((item) => (
          <div
            key={item.id}
            className="cursor-pointer relative group"
          >
            <div>
              <Link
                className=" font-medium text-gray-900 dark:text-gray-100 sm:block p-4 hover:underline"
                href={item.destination}
              >
                {item.label}
              </Link>
            </div>
            {!!item.subMenuItems?.length && (
              <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full p-2">
                {item.subMenuItems.map((subMenuItem) => (
                  <Link
                    key={subMenuItem.id}
                    href={subMenuItem.destination}
                    className="block whitespace-nowrap p-2 text-white hover:underline"
                  >
                    {subMenuItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="ml-3 my-auto">
          <ButtonLink
            destination={callToActionDestination}
            label={callToActionLabel}
          />
        </div>
      </div>
    </header>
  );
};
