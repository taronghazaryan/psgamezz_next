"use client";

import Products from "./Products";
import Questions from "./Questions";
import Hero from "./Hero";

export default function Main() {
  return (
    <div>
      <div className="px-6">
        <Hero />
      </div>
      <Products />
      <div className="px-6">
        <Questions />
      </div>
    </div>
  );
}
