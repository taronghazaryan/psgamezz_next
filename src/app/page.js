import Hero from "./components/Hero";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="px-4">
        <Section2 />
      <div className="px-4">
        <Section3 />
      </div>
      </div>
    </div>
  );
}
