import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

let cachedContent: Record<string, string> | null = null;
let fetchPromise: Promise<Record<string, string>> | null = null;

async function fetchContent(): Promise<Record<string, string>> {
  const { data } = await supabase
    .from("site_content")
    .select("key, value")
    .eq("is_published", true);

  const map: Record<string, string> = {};
  if (data) {
    data.forEach((item) => {
      map[item.key] = item.value;
    });
  }
  return map;
}

export function useSiteContent() {
  const [content, setContent] = useState<Record<string, string>>(cachedContent ?? {});
  const [loading, setLoading] = useState(!cachedContent);

  useEffect(() => {
    if (cachedContent) {
      setContent(cachedContent);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetchContent();
    }

    fetchPromise.then((map) => {
      cachedContent = map;
      setContent(map);
      setLoading(false);
    });
  }, []);

  return { content, loading };
}

export function invalidateSiteContent() {
  cachedContent = null;
  fetchPromise = null;
}
