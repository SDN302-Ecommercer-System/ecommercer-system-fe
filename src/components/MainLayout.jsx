import PropTypes from "prop-types";
import Header from "./common/Header";
import { BannerCarousel } from "./BannerCarousel";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className="w-full py-2 font-bold text-center text-yellow-300 bg-slate-800">
        <span className="animate-pulse">CHANGE FREE PRODUCT - FOR ALL SHOPS IN 30 DAYS</span>
      </div>
      <Header />

      <BannerCarousel />

      <div className="w-4/5 mx-auto">
        <div className="mt-20">{children}</div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
