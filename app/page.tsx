import React from "react";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("../components/ChatWidget"), { ssr: false });

export default function Page() {
  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-slate-300">Neeraja Khanapure | DevOps & AI Engineer</h1>
      </div>
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <ChatWidget />
    </main>
  );
}
