const img = "https://media.base44.com/images/public/6b0044b979df404f044d4352/";

export const images = {
  hero: img + "977efe6b7_generated_a98e79b4.png",
  brandDna: img + "949a7f186_generated_2eccff68.png",
  archive: img + "97ea7c93d_generated_ec8ee144.png",
  smartGallery: img + "49a5ba025_generated_d5804ce3.png",
  moodboard: img + "45b587b8d_generated_2fa181fd.png",
  designDevelopment: img + "fb84b049a_generated_f446e5e6.png",
  prints: img + "86a98a4d2_generated_19f4272b.png",
  technicalDrawing: img + "635e898dc_generated_25143bac.png",
  techPack: img + "68a0fb332_generated_684a2d1c.png",
  plm: img + "b950274e7_generated_4a8dfcba.png",
  aiAvatar: img + "0276409c3_generated_b0dda914.png",
  campaigns: img + "1891ec18f_generated_62213050.png",
  styling: img + "ad8d8fe8c_generated_c0ea756f.png",
  trends: img + "c5fc3ae38_generated_361597b4.png",
  sketchToRender: img + "10c77ddbe_generated_b450f309.png",
  collectionPlanning: img + "59eed7995_generated_f41352e6.png",
  bestsellers: img + "44226fb89_generated_6414b6eb.png",
  vibeDesign: img + "c8538aaa9_generated_3b844b17.png",
  aiPattern: img + "298354641_generated_46b95a8c.png",
  smartDecision: img + "8c71498dc_generated_c943207a.png",
  storeLayout: img + "1eaac2bb4_generated_b8b3b618.png",
  windows: img + "dbb244a19_generated_e8c2a06d.png",
  b2bCatalog: img + "976314f8f_generated_b1a5ccbf.png",
};

export const teams = [
  {
    name: "Creative Direction",
    text: "Set the season's point of view, then carry it into every silhouette and look.",
  },
  {
    name: "Visual Content",
    text: "Campaigns, lookbooks and e-commerce imagery, generated true to the product.",
  },
  {
    name: "Design",
    text: "From first sketch to full collection, explored in endless variation.",
  },
  {
    name: "Pre Production",
    text: "Technical drawings, tech packs and patterns, ready for the factory floor.",
  },
  {
    name: "Merchandising",
    text: "Looks, store layouts and catalogues, built from the same source of truth.",
  },
];

export const journey = [
  { title: "Brand DNA", image: images.brandDna },
  { title: "Archive", image: images.archive },
  { title: "Smart Gallery", image: images.smartGallery },
  { title: "Moodboard", image: images.moodboard },
  { title: "Design Development", image: images.designDevelopment },
  { title: "Positional & All-Over Prints", image: images.prints },
  { title: "Technical Drawing", image: images.technicalDrawing },
  { title: "Tech Pack", image: images.techPack },
  { title: "PLM & Supplier Integration", image: images.plm },
  { title: "AI Avatar", image: images.aiAvatar },
  { title: "Campaigns & Content", image: images.campaigns },
  { title: "Merchandising & Styling", image: images.styling },
];

export const solutionTabs = [
  {
    id: "brand-core",
    label: "Brand Core",
    items: [
      {
        title: "Archive",
        image: images.archive,
        text: "Digitize past collections into a living source of inspiration for new designs.",
      },
      {
        title: "Brand DNA",
        image: images.brandDna,
        text: "Your house codes, palette and signatures, learned once and applied to everything ARTISO makes.",
      },
      {
        title: "Trends",
        image: images.trends,
        text: "Seasonal direction, runway research and market signals, mapped against what your brand already stands for.",
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    items: [
      {
        title: "Smart Gallery",
        image: images.smartGallery,
        text: "Your archive, new designs and saved references, searchable in one place.",
      },
      {
        title: "Moodboard",
        image: images.moodboard,
        text: "Moodboards of trends, fabrics, key shapes and colour codes, assembled in minutes.",
      },
      {
        title: "Sketch to Render",
        image: images.sketchToRender,
        text: "Turn a hand sketch into a rendered, photoreal design in your own fabrics and palette.",
      },
      {
        title: "Prints & Graphics",
        image: images.prints,
        text: "Generate new prints from any design, in your brand palette and ready for repeat.",
      },
      {
        title: "Design Collection Planning",
        image: images.collectionPlanning,
        text: "Plan a whole collection by category, silhouette and colour, with every look accounted for.",
      },
      {
        title: "Variations of Bestsellers",
        image: images.bestsellers,
        text: "Rework your best-selling styles in new colourways, fabrics and details, without losing the original.",
      },
      {
        title: "Vibe Design",
        image: images.vibeDesign,
        text: "Describe a mood and explore the silhouettes, textures and styling that belong to it.",
      },
    ],
  },
  {
    id: "pre-production",
    label: "Pre-Production",
    items: [
      {
        title: "Technical Drawing",
        image: images.technicalDrawing,
        text: "Generate precise technical drawings of every garment, exportable as vectors.",
      },
      {
        title: "Tech Pack",
        image: images.techPack,
        text: "Automated tech packs, from first sketch to factory floor.",
      },
      {
        title: "AI Pattern",
        image: images.aiPattern,
        text: "Pattern blocks and grading generated from the design, ready for the first sample.",
      },
      {
        title: "Smart Decision",
        image: images.smartDecision,
        text: "Fabric, trim and construction recommendations, costed against the brief you actually wrote.",
      },
      {
        title: "PLM & Systems Integration",
        image: images.plm,
        text: "Connect ARTISO to the PLM, ERP and supplier systems your teams already run.",
      },
      {
        title: "Connect with Suppliers",
        image: images.campaigns,
        text: "Share tech packs, comments and approvals with suppliers in a single thread.",
      },
    ],
  },
  {
    id: "visual-content",
    label: "Visual Content",
    items: [
      {
        title: "Campaigns & Content",
        image: images.campaigns,
        text: "Campaign and e-commerce imagery generated from the actual product, in your brand's visual language.",
      },
      {
        title: "AI Avatar",
        image: images.aiAvatar,
        text: "Cast, dress and shoot a look on an AI model before a single sample exists.",
      },
      {
        title: "Product on Model",
        image: images.styling,
        text: "Place finished pieces on a model, styled and lit to match the rest of the season.",
      },
    ],
  },
  {
    id: "merchandising",
    label: "Merchandising",
    items: [
      {
        title: "Styling",
        image: images.styling,
        text: "Combine real and AI-generated garments into complete looks and styling books.",
      },
      {
        title: "Store Layout and Design",
        image: images.storeLayout,
        text: "Plan floor layouts and fixtures around the collection you are actually selling.",
      },
      {
        title: "Displays and Windows",
        image: images.windows,
        text: "Visualise windows and in-store displays before a single fixture is built.",
      },
      {
        title: "B2B Product Catalog",
        image: images.b2bCatalog,
        text: "Build a wholesale catalogue from the same designs, with your line sheet and imagery.",
      },
    ],
  },
];

export const workflow = [
  { title: "Brand DNA", text: "Your house codes, in every silhouette and look, evolving with you." },
  { title: "Archive", text: "Digitize past collections to inspire your next designs." },
  { title: "Smart Gallery", text: "Every image, design and reference, ready for next season." },
  { title: "Moodboard", text: "Moodboards of trends, fabrics, key shapes and color codes." },
  { title: "Design Development", text: "Turn a sketch or prompt into designs, in endless variations." },
  { title: "Prints & Graphics", text: "Generate new prints from any design, in your brand palette." },
  { title: "Tech Pack", text: "Automated tech packs, from first sketch to factory floor." },
  { title: "Campaigns & Content", text: "Campaign and e-commerce images, true to every product." },
];

export const layers = [
  {
    title: "Project / Capsule",
    text: "Every capsule gets its own workspace, holding the brief, the references and the decisions that shaped it.",
  },
  {
    title: "User Layer",
    text: "Your saved searches, prompts and preferences, so the system learns how you work rather than replacing it.",
  },
  {
    title: "Brand DNA",
    text: "House codes, palette, silhouettes and signatures, applied to every image, print and drawing it produces.",
  },
  {
    title: "ARTISO AI Knowledge",
    text: "Fashion-specific models for garment construction, textiles and merchandising, sitting underneath it all.",
  },
];

export const stats = [
  {
    value: 70,
    suffix: "%",
    label: "reduction in product development time",
    text: "Fewer handoffs between design, technical and sourcing, with one record moving through the whole process.",
  },
  {
    value: 5,
    suffix: "x",
    label: "faster concept-to-campaign cycles",
    text: "A look sketched in the morning can be photographed, styled and ready to publish in the same week.",
  },
  {
    value: 90,
    suffix: "%",
    label: "savings on campaign production costs",
    text: "Campaign imagery generated from the actual product, in your brand's own visual language.",
  },
];

export const brands = ["GANNI", "MANGO", "ASOS", "TRENT", "DEICHMANN", "TATA"];

export const testimonials = [
  {
    quote:
      "Taste is what makes a brand distinctive. AI can't replace it, but it can give talented creative teams extraordinary leverage. ARTISO is building the infrastructure for that, from inside fashion.",
    name: "Nicolaj Reffstrup",
    role: "Founder and former CEO of GANNI",
  },
];