import { useLayoutEffect, useRef, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export type CardRowItem = { icon: LucideIcon; title: string; description: string; tag?: string };

type CardRowProps = {
  items: CardRowItem[];
  label: string;
  ordered?: boolean;
  /** Continuous sideways loop. Off when the row sits next to other motion. */
  moving?: boolean;
};

const SECONDS_PER_CARD = 4;

const Card = ({ item }: { item: CardRowItem }) => (
  <div className="lift-card group flex h-full flex-col gap-4 rounded-[8px] border border-border bg-white p-6">
    <span
      className="w-11 h-11 rounded-[8px] bg-primary flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
      aria-hidden="true"
    >
      <item.icon className="w-5 h-5 text-white" />
    </span>
    {item.tag && <p className="font-label text-foreground">{item.tag}</p>}
    <h3 className="font-display text-2xl text-primary">{item.title}</h3>
    <p className="text-sm text-foreground leading-relaxed">{item.description}</p>
  </div>
);

/** Cards glide by on a loop, bleeding to both screen edges so the row never looks boxed in. */
const CardMarquee = ({ items, label, ordered }: CardRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const List = ordered ? "ol" : "ul";
  const style = { "--marquee-duration": `${items.length * SECONDS_PER_CARD * 2}s` } as CSSProperties;
  // Four copies so each half of the loop is wider than any screen.
  const loop = [...items, ...items, ...items, ...items];

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    // Container widths and side gutters vary per breakpoint, so the bleed is measured instead of guessed.
    const fit = () => {
      el.style.marginLeft = `${-parent.getBoundingClientRect().left}px`;
      el.style.width = `${document.documentElement.clientWidth}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <Reveal>
      <div ref={ref} className="card-marquee overflow-hidden py-2" role="region" aria-label={label}>
        <List className="card-marquee-track flex w-max list-none m-0 p-0" style={style}>
          {loop.map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              className="w-60 md:w-64 shrink-0 mr-4"
              aria-hidden={i >= items.length || undefined}
            >
              <Card item={item} />
            </li>
          ))}
        </List>
      </div>
    </Reveal>
  );
};
/** Single horizontal row of icon cards; scrolls sideways when it doesn't fit. */
const CardRow = (props: CardRowProps) => {
  const reduceMotion = useReducedMotion();
  const { items, label, ordered = false, moving = true } = props;

  if (moving && !reduceMotion) return <CardMarquee {...props} />;

  return (
    <div role="region" aria-label={label}>
      <RevealGroup as={ordered ? "ol" : "ul"} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none m-0 p-0">
        {items.map((item) => (
          <RevealItem key={item.title}>
            <Card item={item} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
};

export default CardRow;
