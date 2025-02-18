import PropTypes from "prop-types";
import Header from "./common/Header";
import { BannerCarousel } from "./BannerCarousel";
import Footer from "./common/Footer";
import { Notifications } from "@mantine/notifications";

const MainLayout = ({ children }) => {

  return (
    <div className="flex flex-col max-w-full">
      <Notifications/>
      
      <div className="w-full py-2 font-bold text-center text-yellow-300 bg-slate-800">
        <span className="animate-pulse">
          CHANGE FREE PRODUCT - FOR ALL SHOPS IN 30 DAYS
        </span>
      </div>

      <Header />

      <BannerCarousel />

      <div className="flex-grow w-4/5 mx-auto">
        <div className="mt-20">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
