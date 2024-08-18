import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbComponent = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x !== "");
  let breadcrumbPath = "";
  return (
    <div className="py-1 px-3 mb-1 md:p-2 md:mt-1 md:mb-2 lg:p-3 lg:mt-2 lg:mb-4 flex gap-1">
      {pathnames.length > 0 && (
        <Link
          to={"/"}
          className="font-bold text-base flex justify-center content-center text-purple-600"
        >
          <FaHome size={18} className="mr-1" /> <span>Home </span>
        </Link>
      )}
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={breadcrumbPath}> / {name}</span>
        ) : (
          <span key={breadcrumbPath} className="text-purple-600">
            {" "}
            / <Link to={breadcrumbPath}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default BreadcrumbComponent;
