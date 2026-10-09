import { useLanguage } from "@/contexts/LanguageContext";

interface SectionBridgeProps {
  bridgeKey: string;
  className?: string;
}

/** Short connective line so each section follows the previous in the page story. */
const SectionBridge = ({ bridgeKey, className = "" }: SectionBridgeProps) => {
  const { t } = useLanguage();
  return (
    <p
      className={`font-label text-foreground mb-3 ${className}`}
    >
      {t(bridgeKey)}
    </p>
  );
};

export default SectionBridge;
