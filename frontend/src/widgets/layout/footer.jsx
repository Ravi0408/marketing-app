import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";

export function Footer({  brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made with{" "}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" /> by{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {"Ravi"}
          </a>
        </Typography>
        
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Link to={path}>
              <Typography
                // href={path}
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Dash-RT",
  brandLink: "https://www.Dashrt.in",
  routes: [
    
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
