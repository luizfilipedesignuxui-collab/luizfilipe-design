import { motion } from "framer-motion";
import { useEffect, useId, useState, type FormEvent } from "react";
import { businessCard } from "../config/business-card.ts";
import { navigateTo } from "../lib/app-location.ts";
import { cardLand, usePrefersReducedMotion } from "../lib/motion.ts";
import {
  compressOwnerPhoto,
  loginOwner,
  readOwnerSettings,
  readOwnerToken,
  saveOwnerSettings,
  writeOwnerToken,
} from "../lib/event-mode-client.ts";
import { surpriseContextLabel, type SurpriseContextId, type SurpriseDurationId } from "../lib/surprise.ts";

const CONTEXTS: SurpriseContextId[] = ["networking", "rh", "negocios", "geral"];

const DURATIONS: { id: SurpriseDurationId; label: string }[] = [
  { id: "event", label: "Somente durante o evento" },
  { id: "end-of-day", label: "Até o final do dia" },
  { id: "until-change", label: "Até que eu altere novamente" },
];

type EventModeViewProps = {
  onClose?: () => void;
  onSaved?: () => void;
};

export function EventModeView({ onClose, onSaved }: EventModeViewProps) {
  const reduced = usePrefersReducedMotion();
  const formId = useId();
  const [token, setToken] = useState(() => readOwnerToken());
  const [password, setPassword] = useState("");
  const [context, setContext] = useState<SurpriseContextId>("geral");
  const [duration, setDuration] = useState<SurpriseDurationId>("until-change");
  const [endsAtLocal, setEndsAtLocal] = useState("");
  const [role, setRole] = useState<string>(businessCard.role);
  const [linkedinUrl, setLinkedinUrl] = useState<string>(businessCard.linkedinUrl);
  const [phoneDisplay, setPhoneDisplay] = useState<string>(businessCard.phoneDisplay);
  const [photoSrc, setPhotoSrc] = useState<string>(businessCard.photoSrc);
  const [photoData, setPhotoData] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(!readOwnerToken());

  useEffect(() => {
    if (!token) return;
    let cancel = false;
    void readOwnerSettings(token).then((result) => {
      if (cancel) return;
      if (result === "denied") {
        writeOwnerToken("");
        setToken("");
        setReady(true);
        return;
      }
      if (result === "failed") {
        setError("Não foi possível ler a configuração.");
        setReady(true);
        return;
      }
      setContext(result.context);
      setDuration(result.duration);
      setEndsAtLocal(result.endsAtLocal);
      setRole(result.role || businessCard.role);
      setLinkedinUrl(result.linkedinUrl || businessCard.linkedinUrl);
      setPhoneDisplay(result.phoneDisplay || businessCard.phoneDisplay);
      setPhotoSrc(result.photoSrc || businessCard.photoSrc);
      if (result.active === "geral" && result.context !== "geral") {
        setMessage("O prazo encerrou. Visitantes veem o modo geral.");
      }
      setReady(true);
    });
    return () => {
      cancel = true;
    };
  }, [token]);

  function close() {
    if (onClose) onClose();
    else navigateTo("/");
  }

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const result = await loginOwner(password);
    setBusy(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    writeOwnerToken(result.token);
    setPassword("");
    setToken(result.token);
    setReady(false);
  }

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const data = await compressOwnerPhoto(file);
      setPhotoData(data);
      setPhotoSrc(data);
    } catch {
      setError("Não foi possível ler a foto.");
    } finally {
      setBusy(false);
    }
  }

  async function onSave(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const result = await saveOwnerSettings(token, {
      context,
      duration,
      endsAtLocal,
      role,
      linkedinUrl,
      phoneDisplay,
      photoData: photoData || undefined,
    });
    setBusy(false);
    if (!result.ok) {
      if (result.denied) {
        writeOwnerToken("");
        setToken("");
      }
      setError(result.message);
      return;
    }
    setMessage("O cartão foi atualizado.");
    onSaved?.();
  }

  return (
    <div className="h-full overflow-y-auto text-cream">
      <div className="shell mx-auto flex w-full max-w-md flex-col px-5 py-8">
        <h1 id="titulo-pagina" tabIndex={-1} className="text-[clamp(1.85rem,6vw,2.5rem)] leading-tight font-semibold outline-none">
          Área do proprietário
        </h1>
        <p className="mt-3 text-xl leading-snug font-medium">
          {token ? "Altere os dados do cartão e o contexto da conexão." : "Entre com a senha para continuar."}
        </p>

        {!token ? (
          <motion.form
            className="card mt-6 rounded-[22px] p-4 text-ink"
            onSubmit={(event) => void onLogin(event)}
            {...cardLand(reduced)}
          >
            <label className="block text-lg font-medium" htmlFor={`${formId}-senha`}>
              Senha
            </label>
            <input
              id={`${formId}-senha`}
              className="focus-ring mt-2 min-h-12 w-full rounded-[14px] border border-line bg-white px-3 text-lg text-ink"
              type="password"
              name="senha"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {error ? (
              <p className="mt-3 text-lg font-medium text-accent" role="alert">
                {error}
              </p>
            ) : null}
            <button
              className="cta-on-cream focus-ring-cream mt-4 flex min-h-[52px] w-full items-center justify-center rounded-full px-5 text-[1.1875rem] font-semibold"
              type="submit"
              disabled={busy}
            >
              Entrar
            </button>
          </motion.form>
        ) : (
          <motion.form
            className="card mt-6 rounded-[22px] p-4 text-ink"
            onSubmit={(event) => void onSave(event)}
            {...cardLand(reduced)}
          >
            <fieldset disabled={!ready || busy} className="grid gap-4">
              <div>
                <p className="text-lg font-semibold">Foto</p>
                <div className="mt-2 flex items-center gap-4">
                  {photoSrc ? (
                    <img src={photoSrc} alt="Foto atual do cartão" className="size-20 rounded-full object-cover object-center ring-1 ring-line" />
                  ) : null}
                  <label className="focus-ring flex min-h-12 flex-1 items-center justify-center rounded-[14px] border border-line px-3 text-lg font-medium">
                    Trocar foto
                    <input
                      className="sr-only"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) => void onPhoto(event.target.files?.[0])}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium" htmlFor={`${formId}-cargo`}>
                  Cargo
                </label>
                <input
                  id={`${formId}-cargo`}
                  className="focus-ring mt-2 min-h-12 w-full rounded-[14px] border border-line bg-white px-3 text-lg text-ink"
                  type="text"
                  name="cargo"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium" htmlFor={`${formId}-linkedin`}>
                  LinkedIn
                </label>
                <input
                  id={`${formId}-linkedin`}
                  className="focus-ring mt-2 min-h-12 w-full rounded-[14px] border border-line bg-white px-3 text-lg text-ink"
                  type="url"
                  name="linkedin"
                  value={linkedinUrl}
                  onChange={(event) => setLinkedinUrl(event.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium" htmlFor={`${formId}-whatsapp`}>
                  WhatsApp
                </label>
                <input
                  id={`${formId}-whatsapp`}
                  className="focus-ring mt-2 min-h-12 w-full rounded-[14px] border border-line bg-white px-3 text-lg text-ink"
                  type="tel"
                  name="whatsapp"
                  value={phoneDisplay}
                  onChange={(event) => setPhoneDisplay(event.target.value)}
                />
              </div>
            </fieldset>

            <fieldset className="mt-5" disabled={!ready || busy}>
              <legend className="text-lg font-semibold">Contexto da conexão</legend>
              <div className="mt-2 grid gap-2">
                {CONTEXTS.map((id) => (
                  <label key={id} className="flex min-h-11 items-center gap-3 text-lg font-medium">
                    <input
                      className="focus-ring size-5 accent-accent"
                      type="radio"
                      name="contexto"
                      value={id}
                      checked={context === id}
                      onChange={() => setContext(id)}
                    />
                    {surpriseContextLabel(id)}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5" disabled={!ready || busy || context === "geral"}>
              <legend className="text-lg font-semibold">Duração</legend>
              <div className="mt-2 grid gap-2">
                {DURATIONS.map((item) => (
                  <label key={item.id} className="flex min-h-11 items-center gap-3 text-lg font-medium">
                    <input
                      className="focus-ring size-5 accent-accent"
                      type="radio"
                      name="duracao"
                      value={item.id}
                      checked={duration === item.id}
                      onChange={() => setDuration(item.id)}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {context !== "geral" && duration === "event" ? (
              <div className="mt-5">
                <label className="block text-lg font-medium" htmlFor={`${formId}-fim`}>
                  Encerramento, horário de Brasília
                </label>
                <input
                  id={`${formId}-fim`}
                  className="focus-ring mt-2 min-h-12 w-full rounded-[14px] border border-line bg-white px-3 text-lg text-ink"
                  type="datetime-local"
                  name="encerramento"
                  value={endsAtLocal}
                  onChange={(event) => setEndsAtLocal(event.target.value)}
                  required
                />
              </div>
            ) : null}

            {error ? (
              <p className="mt-4 text-lg font-medium text-accent" role="alert">
                {error}
              </p>
            ) : null}
            {message ? (
              <p className="mt-4 text-lg font-medium" role="status">
                {message}
              </p>
            ) : null}

            <button
              className="cta-on-cream focus-ring-cream mt-5 flex min-h-[52px] w-full items-center justify-center rounded-full px-5 text-[1.1875rem] font-semibold"
              type="submit"
              disabled={!ready || busy}
            >
              Salvar
            </button>
          </motion.form>
        )}

        <button
          type="button"
          className="focus-ring-cream mt-4 min-h-11 text-[1.1875rem] font-medium underline decoration-white/70 underline-offset-4"
          onClick={close}
        >
          Voltar ao cartão
        </button>
      </div>
    </div>
  );
}
