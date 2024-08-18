import { FaOpencart } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="w-full h-auto py-2 px-4 md:py-4 md:px-8 bg-white text-gray-800 flex flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-1/3">
          <div className="flex flex-shrink-0  m-4 items-center justify-center gap-3 md:gap-4">
            <FaOpencart className="text-purple-600 text-4xl md:text-5xl" />
            <span className="text-purple-600 font-semibold text-xl md:text-2xl">
              Shop 24/7
            </span>
          </div>
          <div className="p-4 text-gray-600" style={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            delectus. Facere laudantium similique debitis beatae sapiente a!
          </div>
        </div>
        <div className="grow flex flex-col md:flex-row w-full md:w-2/3">
          <div className="footer-item">
            <h4 className="footer-item-title">Shop</h4>
            <ul className="footer-item-ul">
              <li>
                <a href="#" className="footer-item-li">
                  Offers
                </a>
              </li>
              <li>
                <a href="#" className="footer-item-li">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="footer-item-li">
                  Top Rated
                </a>
              </li>
              <li>
                <a href="#" className="footer-item-li">
                  Offers
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h4 className="footer-item-title">Need Help?</h4>
            <ul className="footer-item-ul">
              <li>
                <a href="#" className="footer-item-li">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="footer-item-li">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#" className="footer-item-li">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-item-li">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h4 className="footer-item-title">Contact</h4>
            <p className="text-lg font-medium">Shop 24/7</p>
            <p className="text-base">Full Address, Lane, Street,</p>
            <p className="text-base">Hyderabad - 500062, T.S, India.</p>
          </div>
        </div>
      </div>
      <div className="w-full h-12 bg-gray-800 text-white p-2 flex justify-between content-center items-center">
        <div className="ml-2 hidden md:block md:ml-5 flex-1 text-base">
          Made with ❤ ...
        </div>
        <div className="ml-2  flex-1 text-base text-center md:mr-5 md:text-right">
          © 2024 Shop 24/7. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
