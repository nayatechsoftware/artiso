const cookieSections = [
  {
    id: "your-choice",
    title: "Your choice",
    blocks: [
      {
        p: "On your first visit we ask for your consent. Nothing beyond what is strictly necessary runs until you choose. Rejecting is as easy as accepting, and you can change your choice at any time from Cookie Settings in the footer. We ask again after twelve months, or sooner if the categories below change.",
      },
    ],
  },
  {
    id: "what-we-use",
    title: "What we use",
    blocks: [
      { h4: "Necessary" },
      {
        p: "cookieConsent (local storage, first party): remembers your choice, its date and the version of these categories. Kept for twelve months.",
      },
      { h4: "Analytics (only with your consent)" },
      {
        p: "_ga (Google Analytics, first party): distinguishes visitors. Expires after two years.",
      },
      {
        p: "_ga_<container-id> (Google Analytics, first party): keeps the state of a visit. Expires after two years.",
      },
      {
        p: "Google Analytics runs in consent mode: until you accept analytics, no Google Analytics script is loaded and nothing is stored.",
      },
      { h4: "Marketing" },
      {
        p: "We use no marketing or advertising cookies today. The category exists so that you can decide before we ever do.",
      },
    ],
  },
  {
    id: "how-to-change-or-withdraw-your-consent",
    title: "How to change or withdraw your consent",
    blocks: [
      {
        p: "Open Cookie Settings in the footer of any page and switch a category off. You can also delete cookies and site data in your browser’s settings.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    blocks: [
      {
        p: "Questions about this policy: hello@artiso.ai.",
      },
    ],
  },
];

function Block({ block }) {
  if (block.h4) {
    return <h3 className="mt-8 text-[15px] font-medium text-black">{block.h4}</h3>;
  }
  return <p className="mt-4 text-[15px] leading-relaxed text-black/60">{block.p}</p>;
}

export default function CookiePolicyContent() {
  return (
    <div className="shell pb-24 pt-[112px] md:pb-32 md:pt-[150px]">
      <h1 className="display-xl max-w-[20ch]">Cookie Policy</h1>
      <p className="mt-6 text-[13px] uppercase tracking-[0.16em] text-black/40">
        Last updated 14 October 2026
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <nav className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Contents</p>
            <ul className="mt-4 space-y-2">
              {cookieSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-[14px] leading-relaxed text-black/50 transition-colors hover:text-black"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-8">
          <p className="max-w-[68ch] text-[15px] leading-relaxed text-black/60">
            This policy explains which cookies and similar technologies www.artiso.ai uses, why, and
            how you can choose. It complements our{" "}
            <a
              href="/privacy-policy"
              className="underline decoration-black/25 underline-offset-2 transition-colors hover:text-black"
            >
              Privacy Policy
            </a>
            .
          </p>

          {cookieSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-t border-black/12 pb-10 pt-8 first:mt-10 first:border-t-0 first:pt-0"
            >
              <h2 className="text-xl font-light tracking-tight text-black md:text-2xl">
                {section.title}
              </h2>
              {section.blocks.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}