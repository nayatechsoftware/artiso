export default function PageHero({ label, title, intro, className = "" }) {
  return (
    <section className={`pt-[112px] md:pt-[150px] ${className}`}>
      <div className="shell">
        {label && <p className="eyebrow">{label}</p>}
        <h1 className="display-xl mt-6 max-w-[24ch]">{title}</h1>
        {intro && (
          <p className="mt-8 max-w-[62ch] text-[17px] leading-relaxed text-black/55 md:text-[19px]">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}