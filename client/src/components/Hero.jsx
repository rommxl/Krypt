import React from "react";
import illustration from "../assets/illustration-intro.png";
import curv from "../assets/bg-curvy-desktop.svg";
import curvmb from "../assets/bg-curvy-mobile.svg";
import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <section className="p-8 relative gradient-bg-services flex">
      <div className="flex-1 pt-28 ">
        <article className="text-center max-w-3xl mx-auto ">
          <h1 className="text-white font-bold text-3xl md:text-4xl xl:text-5xl mb-8 xl:leading-tight">
          <Typewriter
                        options={{
                            strings: ["Effortless KYC Verification for Enhanced Security",
                            "Streamlined KYC: Your Gateway to Secure Identity Verification",
                            "Unlock Confidence with Krypt's Robust KYC Solutions",
                            "Seamless KYC Process for Trusted Identity Verification",
                            "Your Identity, Our Priority: KYC Verification Made Simple",
                        ],
                            delay: 50,
                            autoStart: true,
                            loop: true,
                        }}

                    />
          </h1>
          <p className="mb-10 text-white">
            Krypt ensures the security of your identity with state-of-the-art
            KYC verification. Your most important documents are stored in one
            secure location, accessible anytime, anywhere. Enjoy making
            verification hassle-free.
          </p>
        </article>
      </div>

      <div className="flex-1">
        <img
          src={illustration}
          alt=""
          className="block mx-auto mb-10 lg:mb-20"
        />
      </div>

      <picture
        className="absolute w-full bottom-0 left-0"
        style={{ zIndex: "-10" }}
      >
        <source media="(min-width: 768px)" srcSet={curv} />
        <img src={curvmb} alt="" className="w-full" />
      </picture>
    </section>
  );
};

export default Hero;
