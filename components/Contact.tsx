import React from "react";

export default function Contact() {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Contact</h2>
      <div className="glass rounded-2xl p-6">
        <p className="text-slate-300">Email: <a className="underline hover:opacity-80" href="mailto:Nirja.khanapure@gmail.com">Nirja.khanapure@gmail.com</a></p>
        <p className="text-slate-300 mt-2">LinkedIn: <a className="underline hover:opacity-80" href="https://www.linkedin.com/in/neerajakhanapure" target="_blank" rel="noreferrer">linkedin.com/in/neerajakhanapure</a></p>
      </div>
    </section>
  );
}
