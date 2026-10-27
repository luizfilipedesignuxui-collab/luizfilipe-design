import { useEffect, useState } from "react";
import { BusinessCard } from "./components/BusinessCard.tsx";
import { DeliveryView } from "./components/DeliveryView.tsx";
import { EventModeView } from "./components/EventModeView.tsx";
import { MissingCard } from "./components/MissingCard.tsx";
import { businessCard } from "./config/business-card.ts";
import { parsePathname, type AppView } from "./lib/app-location.ts";
import { fileSlug } from "./lib/contact.ts";
import { listenForInstallPrompt } from "./lib/pwa.ts";

const cardSlug = fileSlug(businessCard.fullName);

function useAppView(): AppView {
  const [view, setView] = useState<AppView>(() => parsePathname(window.location.pathname, cardSlug));

  useEffect(() => {
    const onPop = () => setView(parsePathname(window.location.pathname, cardSlug));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return view;
}

export default function App() {
  const view = useAppView();

  useEffect(() => {
    listenForInstallPrompt();
  }, []);

  let screen = <BusinessCard />;
  if (view === "entrega") screen = <DeliveryView />;
  else if (view === "evento") screen = <EventModeView />;
  else if (view === "missing") screen = <MissingCard />;

  return (
    <div className="card-stage relative h-dvh overflow-hidden bg-bg">
      <div className="relative z-10 h-full">{screen}</div>
    </div>
  );
}
