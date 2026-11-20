const cdn = (id) =>
  `https://cdn.sanity.io/images/mvgv7zsh/production/${id}?w=1600&fit=max&auto=format`;

export const aboutImages = {
  studio: cdn("9255a0aca6efc06901b7b9f0a060035be44cf2d8-2000x3000.webp"),
  team: cdn("ccf844b3053cd83c23b43870c24f78616f3a4708-3200x2133.webp"),
};

export const aboutIntro =
  "We’re fashion experts with a strong foundation in technology. Our team blends deep industry experience with practical AI know-how. We’ve created scalable workflows, driven innovation at major brands, and solved real-world challenges in today’s fashion industry.";

export const aboutClosing =
  "Fashion is both an art and a business, and the best AI respects both. At ARTISO, every decision, from the features you see to the architecture you don’t, is informed by real-world fashion experience and a deep commitment to empowering human creativity. Our tools are built to unleash creativity, not replace it.";

export const founders = [
  {
    name: "Sarah Iglesias Hiller",
    role: "Co-Founder & CEO",
    image: cdn("5002c5af1b0ea19e37ddb2a16e323449090bd285-1196x1796.jpg"),
    bio: "Sarah is redefining how fashion brands bring AI into their creative DNA. As Creative Director at Mango, she led some of the industry’s first AI-generated fashion campaigns and drove the adoption of AI workflows across the company, from first design concepts to final campaigns. At Artiso, she is building the operating system fashion teams have been missing: one that protects a brand’s taste and creative identity while helping it innovate faster and get to market sooner.",
    linkedin: "https://www.linkedin.com/in/sarahiglesiashiller/",
  },
  {
    name: "Lucas Pastur Romay",
    role: "Co-Founder, Chief Product & AI Officer (CPO)",
    image: cdn("dc791d3dc3959c0103cc7d7a144ea6c01a1c42c7-2000x3000.jpg"),
    bio: "Lucas bridges the gap between human creativity and artificial intelligence. With a PhD in AI and hands-on experience leading Generative AI implementation at Mango, he specializes in translating complex creative processes into intuitive AI workflows. His approach ensures AI enhances creative thinking rather than replacing it, delivering solutions that feel natural to designers and creatives.",
    linkedin: "https://www.linkedin.com/in/lucas-pastur-romay/",
  },
  {
    name: "Matthias Brenninkmeijer",
    role: "Co-Founder & CTO",
    image: cdn("35cc7f9cb15a72a61d9a9402db1bac07b9d6ad4c-2000x3000.jpg"),
    bio: "Matthias ensures AI technology serves fashion creativity, not the other way around. As Data Science Manager at Mango, he led the development of scalable machine learning solutions that transformed how fashion teams work with data and algorithms. His approach focuses on building robust, user-friendly platforms that integrate seamlessly into existing creative workflows while delivering real business impact.",
    linkedin: "https://www.linkedin.com/in/matthias-brenninkmeijer/",
  },
];