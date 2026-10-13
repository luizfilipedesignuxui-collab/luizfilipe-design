import { useLanguage } from "@/contexts/LanguageContext";

const MarqueeSection = () => {
  const { t } = useLanguage();

  /** Ordered by priority: each breakpoint shows as many as fit on a single line. */
  const items = [
    { label: "UX DESIGN", className: "" },
    { label: "UI DESIGN", className: "" },
    { label: "DESIGN SYSTEM", className: "hidden sm:flex" },
    { label: t("marquee.prototyping"), className: "hidden sm:flex" },
    { label: "USER RESEARCH", className: "hidden md:flex" },
    { label: "PRODUCT THINKING", className: "hidden lg:flex" },
    { label: "WIREFRAMING", className: "hidden xl:flex" },
    { label: "INTERACTION DESIGN", className: "hidden xl:flex" },
  ];

  return (
    <div className="py-5 overflow-hidden" style={{ background: "var(--color-brand)" }} aria-hidden="true">
      <ul className="flex flex-nowrap justify-center list-none m-0 px-4 font-display text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-extrabold">
        {items.map((item, i) => (
          <li key={item.label} className={`${item.className || "flex"} items-center whitespace-nowrap`}>
            {i > 0 && <span className="mx-2 sm:mx-3 text-white" aria-hidden="true">•</span>}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarqueeSection;
