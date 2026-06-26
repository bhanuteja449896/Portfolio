import React from "react";
import Section1Hero       from "./Section1Hero";
import Section2About      from "./Section2About";
import Section3Skills     from "./Section3Skills";
import Section4Experience from "./Section4Experience";
import Section5Projects   from "./Section5Projects";
import Section6ProblemSolving from "./Section6ProblemSolving";

// ─────────────────────────────────────────────────────────────
// NewSite — entry point for the new portfolio build.
// Add each new section as you finish it.
// ─────────────────────────────────────────────────────────────

export default function NewSite() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black">
      {/* ── Section 1: Hero ── */}
      <Section1Hero
        onPrimary={() => scrollTo("projects")}
        onSecondary={() => scrollTo("contact")}
      />

      {/* ── Section 2: Know Me More ── */}
      <Section2About />

      {/* ── Section 3: Skills ── */}
      <Section3Skills />

      {/* ── Section 4: Experience ── */}
      <Section4Experience />

      {/* ── Section 5: Projects ── */}
      <Section5Projects />

      {/* ── Section 6: Problem Solving ── */}
      <Section6ProblemSolving />
    </div>
  );
}
