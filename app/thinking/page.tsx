import React from "react";
import NavBar from "../../components/NavBar";
import Markdown from "../../components/Markdown";

export const metadata = {
  title: "How I Think | Neeraja Khanapure",
  description: "Short engineering judgment pieces and tradeoffs.",
};

const markdown = `### Short engineering judgment pieces
These are intentionally short. They’re not tutorials — they’re how I think.

#### 1) Dashboards lie unless you define the question
Dashboards are great for exploration, but production decisions need **SLIs/SLOs** and clear ownership.

#### 2) Variable-izing everything is not “best practice”
Generalization has a cost. Some dashboards should be hardcoded when the use case is scoped. Forced variables create noise and performance issues.

#### 3) “Alerts are bad” is lazy — bad alerts are bad
A good paging policy is simple: **page on user-impact**, ticket on symptoms, and route by owner.

Want more? I publish weekly commentary in Engagement Picks: [/engagement](/engagement)`;

export default function Page() {
  return (
    <main>
      <NavBar />
      <section className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold mb-4">How I Think</h1>
        <Markdown markdown={markdown} />
      </section>
    </main>
  );
}
