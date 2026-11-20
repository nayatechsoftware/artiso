const cdn = (id) =>
  `https://cdn.sanity.io/images/mvgv7zsh/production/${id}?w=1600&fit=max&auto=format`;

export const careersImages = {
  studio: cdn("3df2797c074f6634cb1713bb62cb952533b48294-2000x1333.webp"),
  team: cdn("ccf844b3053cd83c23b43870c24f78616f3a4708-3200x2133.webp"),
};

export const careersIntro = [
  "ARTISO is the AI Operating System that connects the way fashion teams think, create and bring ideas to life.",
  "Some of the world’s leading fashion brands rely on ARTISO to streamline their creative workflows. We are VC-backed and looking for exceptional people to help shape what comes next.",
];

export const roleGroups = [
  {
    label: "Engineering",
    roles: [
      {
        title: "Senior Backend Engineer",
        summary: "Own the platform our customers rely on, from pilots to enterprise rollouts.",
        meta: "Barcelona · Hybrid",
      },
    ],
  },
  {
    label: "AI",
    roles: [
      {
        title: "Staff AI Engineer, Generative Imaging & Agents",
        summary: "Define what AI-native fashion design looks like, technically.",
        meta: "Barcelona · Hybrid",
      },
      {
        title: "AI Engineer, Generative Imaging & Agents",
        summary:
          "Ship the AI features fashion designers use every day, from the agent’s prompt to the image on the canvas.",
        meta: "Barcelona · Hybrid",
      },
    ],
  },
  {
    label: "Go-to-market",
    roles: [
      {
        title: "Sales Development Representative, Fashion & Retail",
        summary:
          "Open first conversations with fashion brands and retailers, and qualify each opportunity.",
        meta: "Barcelona · Hybrid",
      },
      {
        title: "Account Executive, Fashion & Retail",
        summary:
          "As our first Account Executive, conclude enterprise agreements with leading fashion brands and retailers.",
        meta: "Barcelona · Hybrid",
      },
    ],
  },
  {
    label: "Freelance",
    roles: [
      {
        title: "Freelance AI Designer & Creative, Fashion",
        summary:
          "Freelance briefs to shape how ARTISO looks and how designers use it, with AI-made fashion work.",
        meta: "Spain · Remote · Freelance",
      },
    ],
  },
];

export const values = [
  {
    title: "Shaping the future of fashion",
    text: "Technology is changing how collections get made. We want a say in what that looks like.",
  },
  {
    title: "Customer obsession",
    text: "We build for fashion teams and the brands they work for. If something we ship doesn’t solve a real problem for them, it’s on us to make it right.",
  },
  {
    title: "Quiet simplicity",
    text: "We work from first principles. When an inherited way of working no longer holds up, we rebuild it until it feels effortless.",
  },
  {
    title: "Builder mentality",
    text: "Everyone builds and tests the product, founders included. What you begin, you see through to its users.",
  },
  {
    title: "Direct feedback",
    text: "We say what we think, and we listen when someone disagrees. When we are wrong, we change our minds.",
  },
  {
    title: "Raise the standard together",
    text: "We expect a great deal of one another. Your work carries your name.",
  },
  {
    title: "Solutions first",
    text: "Whoever notices a problem takes it on, without waiting to be asked.",
  },
];

export const hiringProcess = [
  {
    title: "First conversation",
    text: "A 30-minute call with the person you would work for.",
  },
  {
    title: "Deep dive",
    text: "An hour on something you have built, and on a real use case we are working on now.",
  },
  {
    title: "Meet the founders",
    text: "A conversation with the founders about our values. If there is a mutual fit, we will extend an offer.",
  },
];

export const careersClosing = [
  "Send your CV, or your portfolio for a freelance brief, and the few lines each role asks for.",
  "We try to reply to everyone who applies, as soon as we can.",
  "We hire on merit. Every applicant is assessed on the same criteria, whatever their age, disability, ethnicity, gender identity, nationality, religion or belief, sex, sexual orientation or family situation. If you need an adjustment to take part, tell us. No decision is made automatically, and we delete your details six months after the process closes, unless you ask us to keep them for up to two years for future roles.",
];