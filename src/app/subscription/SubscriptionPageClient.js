"use client";

import { useEffect, useState } from "react";
import Guidance from "../components/Guidance";
import PsPlus from "../components/PsPlus";
import Hero from "../components/SubscriptionHero";
import Api from "../connectors";

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
  }, []);

  return (
    <>
      <Hero />
      <div>
        <div className="px-6">
            <PsPlus subscriptions={psPlusSubs} consoleTypes={consoleTypes} />
        </div>
        <div className="px-6">
            <Guidance subscriptions={eaPlaySubs} consoleTypes={consoleTypes} />
        </div>
      </div>
    </>
  );
}
