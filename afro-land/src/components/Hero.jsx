import React, { useState } from "react";
// import { useSpring, animated } from 'react-spring';
import styles from "../style";
import { discount, robot } from "../assets";
import { GetStarted } from "./index";
import Modal from "./Modal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleGetStartedClick = () => {
    setShowModal(true);
  };

  // const handleMouseEnter = () => {
  //   setIsBouncing(true)
  // }

  // const handleMouseLeave = () => {
  //   setIsBouncing(false)
  // }

  // const bounceAnimation = useSpring({
  //   transform: isBouncing ? 'translateY(-10px)' : 'translateY(0px)',
  // });

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.fullWidth}`}
    >
      <div
        className={`flex-1 flex justify-start items-start flex-col ${styles.noPadding}`}
      >
        <div className="flex flex-row items-center py-[16px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discont" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2 uppercase`}>
            <span className="text-white">0 ETB</span> Free Tier for Individual
            Users <span className="text-white">Signup</span> now
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
            AfroChat <br className="sm:block hidden" />{" "}
            <span className="text-gradient">AI-based Consultants</span>{" "}
          </h1>

          <div
            className="ss:flex hidden md:mr-4 mr-0"
            onClick={handleGetStartedClick}
          >
            <GetStarted />
          </div>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full">
          & Personas
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          AfroChat connects you with the best AI-based consultants and personas
          to help you with your business, education, career, and personal life.
        </p>
      </div>

      {/* flex the robot logo to the far right as an alt - note*/}
      <div
        className={`flex-1 flex ${styles.flexCenter} md:mr-0  my-10 relative`}
      >
        {/* let's animate this assets to be bouncing */}
        <img
          src={robot}
          className="w-[100%] h-[100%] relative z-[5]"
          alt="Human-AI"
          srcset=""
        />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      </div>

      <div
        className={`ss:hidden ${styles.flexCenter}`}
        onClick={handleGetStartedClick}
      >
        <GetStarted />
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default Hero;
