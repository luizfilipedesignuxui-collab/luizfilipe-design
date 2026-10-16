import { useRef, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_OUT } from "@/components/motion/tokens";
import { MESSAGES, PRAZOS, QUIZ, SERVICOS, recomendarServico } from "./content";
import { WhatsAppIcon, WhatsAppLink } from "./WhatsApp";
import { SectionTitle } from "./SitesSections";

type Resposta = { label: string; msg: string };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const SitesQuiz = () => {
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const stepRef = useRef<HTMLDivElement>(null);
  const etapa = respostas.length;
  const terminou = etapa === QUIZ.length;

  const focarEtapa = () => requestAnimationFrame(() => stepRef.current?.focus());

  const responder = (r: Resposta) => {
    window.gtag?.("event", "quiz_step", { etapa: etapa + 1 });
    setRespostas((prev) => [...prev, r]);
    focarEtapa();
  };

  const voltar = () => {
    setRespostas((prev) => prev.slice(0, -1));
    focarEtapa();
  };

  const reiniciar = () => {
    setRespostas([]);
    focarEtapa();
  };

  const servico = terminou ? SERVICOS.find((s) => s.id === recomendarServico(respostas[1].label))! : null;

  return (
    <section id="quiz" className="section-paper scroll-mt-24 py-16 md:py-24" aria-labelledby="quiz-title">
      <div className="container mx-auto px-6">
        <Reveal className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <SectionTitle id="quiz-title" eyebrow="Descubra em 3 toques" text={"Qual site seu\nnegócio precisa?"} />
          </div>

          <div className="rounded-[8px] border border-border bg-white p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div
                className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--color-line)]"
                role="progressbar"
                aria-label="Progresso do quiz"
                aria-valuemin={0}
                aria-valuemax={QUIZ.length}
                aria-valuenow={etapa}
              >
                <motion.div
                  className="h-full origin-left bg-brand"
                  animate={{ scaleX: etapa / QUIZ.length }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                />
              </div>
              <span className="text-sm font-extrabold text-foreground tabular-nums">
                {Math.min(etapa + 1, QUIZ.length)}/{QUIZ.length}
              </span>
            </div>

            <div ref={stepRef} tabIndex={-1} className="outline-none" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={etapa}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  {!terminou ? (
                    <fieldset className="m-0 border-0 p-0">
                      <legend className="mb-5 font-display text-2xl text-brand">{QUIZ[etapa].pergunta}</legend>
                      <div className="grid gap-3">
                        {QUIZ[etapa].opcoes.map((op) => (
                          <button
                            key={op.label}
                            type="button"
                            onClick={() => responder(op)}
                            className={`min-h-14 rounded-[8px] border border-border bg-white px-5 text-left text-lg font-extrabold text-foreground transition-colors hover:border-brand hover:bg-sand ${focusRing}`}
                          >
                            {op.label}
                          </button>
                        ))}
                      </div>
                      {etapa > 0 && (
                        <button
                          type="button"
                          onClick={voltar}
                          className={`mt-5 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-extrabold text-foreground hover:text-brand-hover ${focusRing}`}
                        >
                          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                          Voltar
                        </button>
                      )}
                    </fieldset>
                  ) : (
                    servico && (
                      <div className="flex flex-col gap-4">
                        <p className="font-label text-foreground m-0">Pra você</p>
                        <h3 className="font-display text-3xl md:text-4xl text-brand m-0">{servico.nome}</h3>
                        <p className="m-0 text-base text-foreground">
                          Prazo médio: <strong className="font-extrabold">{PRAZOS[servico.id]}</strong>
                        </p>
                        <p className="m-0 text-lg text-foreground">Falta só o valor. Me chama no WhatsApp que eu te passo.</p>
                        <WhatsAppLink
                          mensagem={MESSAGES.quiz(respostas[0].msg, respostas[1].msg, respostas[2].msg)}
                          origem="quiz"
                          className="btn-on-paper gap-3 w-full"
                        >
                          <WhatsAppIcon />
                          Pedir meu valor
                        </WhatsAppLink>
                        <button
                          type="button"
                          onClick={reiniciar}
                          className={`inline-flex min-h-11 items-center justify-center gap-2 self-center rounded-full text-sm font-extrabold text-foreground hover:text-brand-hover ${focusRing}`}
                        >
                          <RotateCcw className="h-4 w-4" aria-hidden="true" />
                          Refazer quiz
                        </button>
                      </div>
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SitesQuiz;
