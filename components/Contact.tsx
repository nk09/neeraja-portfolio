import React from "react";

export default function Contact() {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Contact</h2>
      <div className="glass rounded-2xl p-6">
        <p className="text-slate-300">
          <a className="underline hover:opacity-80" href="https://www.linkedin.com/in/neerajakhanapure" target="_blank" rel="noreferrer">Connect on LinkedIn</a>
        </p>
        <p className="text-slate-300 mt-2 text-sm">
          For resume requests and opportunities, please reach out via LinkedIn.
        </p>
      </div>
    </section>
  );
}
