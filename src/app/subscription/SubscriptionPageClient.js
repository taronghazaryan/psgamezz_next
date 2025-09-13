"use client";

import { useEffect, useState } from "react";
import Guidance from "../components/Guidance";
import PsPlus from "../components/PsPlus";
import Hero from "../components/SubscriptionHero";
import Api from "../connectors";
import Image from "next/image";

export default function SubscriptionPageClient() {
  const [psPlusSubs, setPsPlusSubs] = useState([]);
  const [eaPlaySubs, setEaPlaySubs] = useState([]);
  const [consoleTypes, setConsoleTypes] = useState([]);

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const { data } = await Api.get("/api/subscription-services/");
        const allSubs = data.results || [];

        setPsPlusSubs(allSubs.filter((sub) => sub.title === "PlayStation Plus"));
        setEaPlaySubs(allSubs.filter((sub) => sub.title === "EA Play"));
      } catch (error) {
        console.error("Ошибка запроса подписок:", error);
      }
    }

    async function fetchConsoles() {
      try {
        const { data } = await Api.get("/api/console-types/");
        setConsoleTypes(data.results || []);
      } catch (err) {
        console.error("Ошибка запроса консолей:", err);
      }
    }

    fetchSubscriptions();
    fetchConsoles();

    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
      }
    }
  }, []);

  return (
    <>
      <Hero />
      <div>
                

        <div className="px-6" >
            <PsPlus subscriptions={psPlusSubs} consoleTypes={consoleTypes} />
        </div>
        <div className="relative w-screen">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12 max-sm:mb-6">

            {/* ROBOT — только ≥1280px */}
            <div className="absolute hidden xl:block -left-80 -top-[60px] z-[50]">
              <Image
                src="/img/robot.png"
                alt="Robot mascot"
                className="w-[800px] h-[800px] object-contain rotate-[30deg]"
                width={435}
                height={435}
              />
            </div>

            {/* CONTROLLER — только ≥1280px */}
            <div className="absolute hidden xl:block -top-[60px] !right-[-470px] rotate-[19deg] z-[50]">
              <Image
                src="/img/controller.png"
                alt="controller"
                className="xl:w-[800px] xl:h-[800px] lg:w-[360px] lg:h-[360px] object-contain"
                width={460}
                height={460}
              />
            </div>

          </div>

        </div>
        <div className="px-6">
            <Guidance subscriptions={eaPlaySubs} consoleTypes={consoleTypes} />
        </div>
      </div>
    </>
  );
}
