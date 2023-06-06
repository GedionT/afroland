import styles from "./style";
import {
  Business,
  CTA,
  Footer,
  Navbar,
  Stats,
  Personas,
  Hero,
} from "./components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const notify = () =>
    toast.success(
      "🦄 Form Submitted!! You've successfully joined the waitlist",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );

  return (
    <div className="bg-primary w-full overflow-hidden lg:p-14 px-12">
      <div className={`${styles.paddingX} ${styles.flexCenter} `}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className={`bg-primary ${styles.flexStart} ${styles.fullScreen}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero showToast={notify} />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Personas />
          <Business />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default App;
