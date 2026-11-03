import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  Award,
  Brain,
  Building2,
  CalendarCheck,
  Check,
  Clock,
  Coffee,
  Dumbbell,
  Flame,
  Hammer,
  HeartHandshake,
  Home,
  Layers,
  LayoutTemplate,
  Leaf,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Plus,
  Rocket,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  Upload,
  Users,
  UtensilsCrossed,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EASE_OUT } from "@/components/motion/tokens";
import { SectionTitle } from "./SitesSections";
import { WhatsAppIcon, WhatsAppLink } from "./WhatsApp";

/* ================================================================== */
/* Conteúdo                                                            */
/* ================================================================== */

type ModeloId = "landing" | "institucional" | "cardapio" | "profissional";

type Item = { icon: LucideIcon; titulo: string; texto: string };

type Demo = {
  marca: string;
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  cta: string;
  ctaSec: string;
  menu: string[];
  heroIcon: LucideIcon;
  selo: string;
  destaques: Item[];
  sobreTitulo: string;
  sobreTexto: string;
  numeros: { valor: string; rotulo: string }[];
  endereco: string;
  horario: string;
};

type Modelo = {
  id: ModeloId;
  nome: string;
  idealPara: string;
  secoes: string[];
  inclui: string[];
  icon: LucideIcon;
  demo: Demo;
};

const MODELOS: Modelo[] = [
  {
    id: "landing",
    nome: "Landing page",
    idealPara: "Lançamentos, serviços e captação de clientes",
    secoes: ["Hero com oferta", "Benefícios", "Planos", "Depoimentos", "FAQ", "Contato"],
    inclui: ["Página única pensada para converter", "Botões que levam direto ao seu WhatsApp", "Pronta para anúncios no Instagram e Google"],
    icon: LayoutTemplate,
    demo: {
      marca: "Studio Pulso",
      eyebrow: "Treino funcional · Anápolis",
      titulo: "Sua primeira aula é por nossa conta",
      subtitulo: "Treinos em turmas pequenas, com acompanhamento de perto do primeiro ao último dia.",
      cta: "Agendar aula grátis",
      ctaSec: "Ver planos",
      menu: ["Aulas", "Planos", "Equipe", "Contato"],
      heroIcon: Dumbbell,
      selo: "Vagas abertas",
      destaques: [
        { icon: Users, titulo: "Turmas pequenas", texto: "Até 8 alunos por horário" },
        { icon: Award, titulo: "Avaliação física", texto: "Plano montado para você" },
        { icon: Clock, titulo: "Das 6h às 21h", texto: "Horários de segunda a sábado" },
        { icon: Flame, titulo: "Resultados", texto: "Acompanhamento mensal" },
      ],
      sobreTitulo: "Planos para a sua rotina",
      sobreTexto: "Escolha a frequência ideal e comece ainda esta semana.",
      numeros: [
        { valor: "2x", rotulo: "por semana" },
        { valor: "3x", rotulo: "por semana" },
        { valor: "Livre", rotulo: "todos os dias" },
      ],
      endereco: "Av. Brasil, 1200 · Centro",
      horario: "Seg a sáb · 6h às 21h",
    },
  },
  {
    id: "institucional",
    nome: "Site institucional",
    idealPara: "Empresas que precisam passar confiança",
    secoes: ["Início", "Sobre", "Serviços", "Obras", "Números", "Contato"],
    inclui: ["Páginas de início, sobre, serviços e contato", "Mapa, horário e formulário de orçamento", "Estrutura pronta para aparecer no Google"],
    icon: Building2,
    demo: {
      marca: "Vidraçaria Clara",
      eyebrow: "Desde 2009 em Anápolis",
      titulo: "Vidros sob medida para casa e empresa",
      subtitulo: "Box, espelhos, fachadas e esquadrias com instalação própria e garantia.",
      cta: "Pedir orçamento",
      ctaSec: "Nossas obras",
      menu: ["Sobre", "Serviços", "Obras", "Contato"],
      heroIcon: Home,
      selo: "Orçamento sem custo",
      destaques: [
        { icon: Ruler, titulo: "Box e espelhos", texto: "Medição no local" },
        { icon: Building2, titulo: "Fachadas", texto: "Projetos comerciais" },
        { icon: Hammer, titulo: "Esquadrias", texto: "Alumínio e vidro" },
        { icon: ShieldCheck, titulo: "Garantia", texto: "Em todo serviço" },
      ],
      sobreTitulo: "Uma empresa da sua cidade",
      sobreTexto: "Equipe própria, do orçamento à instalação, com atendimento direto pelo WhatsApp.",
      numeros: [
        { valor: "15+", rotulo: "anos de mercado" },
        { valor: "100%", rotulo: "equipe própria" },
        { valor: "7 dias", rotulo: "para instalar" },
      ],
      endereco: "Rua 14, 350 · Jundiaí",
      horario: "Seg a sex · 8h às 18h",
    },
  },
  {
    id: "cardapio",
    nome: "Cardápio / catálogo",
    idealPara: "Restaurantes, marmitarias e lojas pequenas",
    secoes: ["Destaques do dia", "Categorias", "Produtos", "Sacola", "Entrega", "Contato"],
    inclui: ["Produtos com foto, descrição e preço", "Pedido montado e enviado pelo WhatsApp", "Cardápio fácil de atualizar"],
    icon: UtensilsCrossed,
    demo: {
      marca: "Sabor da Casa",
      eyebrow: "Marmitas caseiras",
      titulo: "Comida de verdade, entregue quentinha",
      subtitulo: "Cardápio novo todo dia, feito na hora com ingredientes frescos.",
      cta: "Fazer pedido",
      ctaSec: "Ver cardápio",
      menu: ["Cardápio", "Combos", "Entrega", "Contato"],
      heroIcon: UtensilsCrossed,
      selo: "Entrega grátis no bairro",
      destaques: [
        { icon: Flame, titulo: "Frango grelhado", texto: "Arroz, feijão e salada" },
        { icon: Coffee, titulo: "Carne de panela", texto: "Com purê de mandioca" },
        { icon: Leaf, titulo: "Fit de tilápia", texto: "Legumes no vapor" },
        { icon: UtensilsCrossed, titulo: "Feijoada", texto: "Toda sexta-feira" },
      ],
      sobreTitulo: "Cardápio de hoje",
      sobreTexto: "Escolha, monte a sacola e envie o pedido pelo WhatsApp.",
      numeros: [
        { valor: "11h", rotulo: "início das entregas" },
        { valor: "40 min", rotulo: "tempo médio" },
        { valor: "Pix", rotulo: "ou cartão" },
      ],
      endereco: "Rua das Flores, 88 · Vila Jaiara",
      horario: "Seg a sáb · 10h às 14h",
    },
  },
  {
    id: "profissional",
    nome: "Profissional liberal",
    idealPara: "Psicólogos, personal trainers e consultores",
    secoes: ["Apresentação", "Especialidades", "Como funciona", "Agenda", "FAQ", "Contato"],
    inclui: ["Sua apresentação, formação e especialidades", "Agendamento direto pelo WhatsApp", "Atendimento online e presencial"],
    icon: CalendarCheck,
    demo: {
      marca: "Ana Lima",
      eyebrow: "Psicóloga clínica",
      titulo: "Um espaço seguro para cuidar de você",
      subtitulo: "Atendimento para adultos e adolescentes, online ou no consultório.",
      cta: "Agendar sessão",
      ctaSec: "Como funciona",
      menu: ["Sobre", "Atendimento", "Agenda", "Contato"],
      heroIcon: HeartHandshake,
      selo: "Online e presencial",
      destaques: [
        { icon: Brain, titulo: "Terapia individual", texto: "Adultos e adolescentes" },
        { icon: Video, titulo: "Online", texto: "Para todo o Brasil" },
        { icon: MapPin, titulo: "Presencial", texto: "Consultório no centro" },
        { icon: MessageCircle, titulo: "Primeira conversa", texto: "Para tirar dúvidas" },
      ],
      sobreTitulo: "Escolha o melhor horário",
      sobreTexto: "Veja os horários livres e confirme pelo WhatsApp.",
      numeros: [
        { valor: "50 min", rotulo: "por sessão" },
        { valor: "Semanal", rotulo: "frequência" },
        { valor: "Sigilo", rotulo: "garantido" },
      ],
      endereco: "Rua 3, 410 · Sala 12 · Centro",
      horario: "Seg a sex · 8h às 20h",
    },
  },
];

const BENEFICIOS: Item[] = [
  { icon: Layers, titulo: "Estrutura testada", texto: "Seções organizadas para levar o cliente até o contato." },
  { icon: Palette, titulo: "Sua identidade", texto: "Logo, cores, fontes, textos e fotos da sua marca." },
  { icon: Smartphone, titulo: "Feito para o celular", texto: "Funciona bem em qualquer tela, do celular ao computador." },
  { icon: Zap, titulo: "Mais rápido e econômico", texto: "Sai do papel antes e custa menos que um sob medida." },
];

const PASSOS: Item[] = [
  { icon: LayoutTemplate, titulo: "Escolha a estrutura", texto: "Veja os modelos e me diga qual combina com o seu negócio." },
  { icon: Upload, titulo: "Envie sua marca", texto: "Logo, cores, textos e fotos. Se faltar algo, eu te ajudo." },
  { icon: Rocket, titulo: "Revise e publique", texto: "Você aprova a prévia e o site vai para o ar com o seu domínio." },
];

const COMPARATIVO = {
  pronto: ["Estrutura já validada", "Sua marca aplicada no layout", "Entrega mais rápida", "Investimento menor"],
  medida: ["Layout criado do zero", "Seções e fluxos exclusivos", "Pesquisa e estratégia de UX", "Ideal para projetos maiores"],
};

const mensagemModelo = (nome: string) =>
  `Oi Luiz! Gostei da estrutura pronta de ${nome}. Quanto fica com a identidade da minha marca?`;

/* ================================================================== */
/* Mini site (o que aparece dentro do celular)                          */
/* ================================================================== */

/** Proporção da tela fechada da referência (~0,69 largura/altura). Aberto = o dobro da largura. */
const PANEL_W = 292;
const PANEL_H = 420;

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="block text-[6.5px] font-medium uppercase tracking-[0.3em] text-[#26211E]/70">{children}</span>
);

const Titulo = ({ children, largo }: { children: ReactNode; largo: boolean }) => (
  <span className={`block font-display text-brand leading-[0.9] ${largo ? "text-[15px]" : "text-[14px]"}`}>{children}</span>
);

const Botao = ({ children, claro = false }: { children: ReactNode; claro?: boolean }) => (
  <span
    className={`inline-flex w-max items-center gap-1 rounded-full px-2.5 py-1.5 text-[7px] font-extrabold ${
      claro ? "bg-white text-brand" : "bg-brand text-white"
    }`}
  >
    {children}
  </span>
);

const Linhas = ({ n = 2 }: { n?: number }) => (
  <span className="flex flex-col gap-1">
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} className="block h-[3px] rounded-full bg-[#26211E]/15" style={{ width: `${90 - i * 22}%` }} />
    ))}
  </span>
);

/** "Foto" ilustrativa no lugar de imagem real. */
const Foto = ({ icon: Icon, className = "", tom = "brand" }: { icon: LucideIcon; className?: string; tom?: "brand" | "sand" }) => (
  <span
    className={`relative block overflow-hidden rounded-[6px] ${className}`}
    style={{
      background:
        tom === "brand"
          ? "linear-gradient(135deg, #F07A45 0%, #E85A24 55%, #C44A1C 100%)"
          : "linear-gradient(135deg, #FFFFFF 0%, #FAF5F0 50%, #F1E4D8 100%)",
    }}
  >
    <span className={`absolute -right-5 -bottom-6 w-20 h-20 rounded-full ${tom === "brand" ? "bg-white/15" : "bg-brand/10"}`} />
    <span className={`absolute -left-4 -top-4 w-12 h-12 rounded-full ${tom === "brand" ? "bg-white/10" : "bg-brand/5"}`} />
    <Icon className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 ${tom === "brand" ? "text-white/90" : "text-brand/70"}`} />
  </span>
);

/* Blocos específicos de cada estrutura ------------------------------ */

const BlocoPlanos = ({ d, largo }: { d: Demo; largo: boolean }) => (
  <div className={`grid gap-2 ${largo ? "grid-cols-3" : "grid-cols-1"}`}>
    {d.numeros.map((n, i) => {
      const destaque = i === 1;
      return (
        <div
          key={n.valor}
          className={`relative rounded-[6px] border p-2.5 flex flex-col gap-1.5 ${
            destaque ? "border-brand bg-brand text-white" : "border-[var(--color-line)] bg-white"
          }`}
        >
          {destaque && (
            <span className="absolute -top-1.5 right-2 rounded-full bg-[#26211E] px-1.5 py-[2px] text-[5.5px] font-extrabold text-white">
              MAIS ESCOLHIDO
            </span>
          )}
          <span className="text-[6px] font-medium uppercase tracking-[0.2em] opacity-80">Plano</span>
          <span className="font-display text-[14px] leading-none">{n.valor}</span>
          <span className="text-[6.5px] opacity-80">{n.rotulo}</span>
          {[0, 1, 2].map((k) => (
            <span key={k} className="flex items-center gap-1">
              <Check className={`w-2 h-2 ${destaque ? "text-white" : "text-brand"}`} />
              <span className={`block h-[3px] rounded-full ${destaque ? "bg-white/60" : "bg-[#26211E]/15"}`} style={{ width: 50 - k * 8 }} />
            </span>
          ))}
          <span
            className={`mt-1 rounded-full py-1 text-center text-[6.5px] font-extrabold ${
              destaque ? "bg-white text-brand" : "border border-brand text-brand"
            }`}
          >
            Quero esse
          </span>
        </div>
      );
    })}
  </div>
);

const BlocoObras = ({ d, largo }: { d: Demo; largo: boolean }) => (
  <div className="flex flex-col gap-3">
    <div className="grid grid-cols-3 gap-2 rounded-[6px] bg-[#26211E] p-3 text-white">
      {d.numeros.map((n) => (
        <div key={n.rotulo} className="flex flex-col gap-0.5">
          <span className="font-display text-[13px] leading-none text-[#F07A45]">{n.valor}</span>
          <span className="text-[6px] opacity-70">{n.rotulo}</span>
        </div>
      ))}
    </div>
    <Tag>Obras recentes</Tag>
    <div className={`grid gap-2 ${largo ? "grid-cols-4" : "grid-cols-2"}`}>
      {[Home, Building2, Ruler, Hammer].map((ic, i) => (
        <div key={i} className="flex flex-col gap-1">
          <Foto icon={ic} tom={i % 2 ? "brand" : "sand"} className={largo ? "h-[54px]" : "h-[50px]"} />
          <span className="block h-[3px] w-3/4 rounded-full bg-[#26211E]/20" />
        </div>
      ))}
    </div>
  </div>
);

const PRATOS = [
  { nome: "Frango grelhado", preco: "22,90", icon: Flame },
  { nome: "Carne de panela", preco: "24,90", icon: Coffee },
  { nome: "Fit de tilápia", preco: "26,90", icon: Leaf },
  { nome: "Feijoada completa", preco: "27,90", icon: UtensilsCrossed },
];

const BlocoCardapio = ({ largo }: { largo: boolean }) => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-1.5">
      {["Marmitas", "Fit", "Bebidas", "Sobremesas"].map((c, i) => (
        <span
          key={c}
          className={`rounded-full px-2 py-1 text-[6.5px] font-extrabold ${
            i === 0 ? "bg-brand text-white" : "border border-[var(--color-line)] text-[#26211E]"
          }`}
        >
          {c}
        </span>
      ))}
    </div>
    <div className={`grid gap-2 ${largo ? "grid-cols-2" : "grid-cols-1"}`}>
      {PRATOS.map((p, i) => (
        <div key={p.nome} className="flex items-center gap-2 rounded-[6px] border border-[var(--color-line)] bg-white p-1.5">
          <Foto icon={p.icon} tom={i % 2 ? "sand" : "brand"} className="h-9 w-9 shrink-0" />
          <span className="flex-1 min-w-0">
            <span className="block text-[7.5px] font-extrabold uppercase leading-tight">{p.nome}</span>
            <span className="block text-[6.5px] text-[#26211E]/60">Acompanha salada</span>
            <span className="block text-[8px] font-extrabold text-brand">R$ {p.preco}</span>
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand">
            <Plus className="w-3 h-3 text-white" />
          </span>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between rounded-full bg-[#26211E] px-3 py-1.5 text-white">
      <span className="flex items-center gap-1.5 text-[7px] font-extrabold">
        <ShoppingBag className="w-3 h-3" /> 2 itens na sacola
      </span>
      <span className="rounded-full bg-brand px-2 py-1 text-[6.5px] font-extrabold">Enviar pedido</span>
    </div>
  </div>
);

const BlocoAgenda = ({ largo }: { largo: boolean }) => {
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const horas = ["08:00", "10:00", "14:00", "16:00", "18:00", "19:00"];
  return (
    <div className={`grid gap-2 ${largo ? "grid-cols-[1.1fr_1fr]" : "grid-cols-1"}`}>
      <div className="rounded-[6px] border border-[var(--color-line)] bg-white p-2.5 flex flex-col gap-2">
        <span className="text-[7px] font-extrabold uppercase">Novembro</span>
        <div className="grid grid-cols-5 gap-1">
          {dias.map((d, i) => (
            <span
              key={d}
              className={`flex flex-col items-center rounded-[4px] py-1 text-[6px] font-bold ${
                i === 2 ? "bg-brand text-white" : "bg-sand text-[#26211E]"
              }`}
            >
              {d}
              <span className="text-[8px] font-extrabold">{10 + i}</span>
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {horas.map((h, i) => (
            <span
              key={h}
              className={`rounded-[4px] border py-1 text-center text-[6.5px] font-bold ${
                i === 3
                  ? "border-brand bg-brand/10 text-brand"
                  : i === 1
                    ? "border-transparent bg-[#26211E]/5 text-[#26211E]/30 line-through"
                    : "border-[var(--color-line)]"
              }`}
            >
              {h}
            </span>
          ))}
        </div>
        <span className="rounded-full bg-brand py-1.5 text-center text-[7px] font-extrabold text-white">Confirmar no WhatsApp</span>
      </div>
      <div className="flex flex-col gap-2">
        {["Primeira conversa", "Sessões semanais", "Acompanhamento"].map((t, i) => (
          <div key={t} className="flex items-start gap-2 rounded-[6px] bg-sand p-2">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand text-[7px] font-extrabold text-white">
              {i + 1}
            </span>
            <span className="flex-1 flex flex-col gap-1">
              <span className="text-[7px] font-extrabold uppercase leading-tight">{t}</span>
              <Linhas n={2} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Site completo ----------------------------------------------------- */

type MiniSiteProps = { modelo: Modelo; largo: boolean };

/** Site fictício com a identidade da LP. `largo` = tela aberta (versão desktop). */
const MiniSite = ({ modelo, largo }: MiniSiteProps) => {
  const d = modelo.demo;
  const Logo = modelo.icon;
  const px = largo ? "px-4" : "px-3";

  return (
    <div className="flex flex-col bg-white text-[#26211E] font-body" style={{ width: largo ? PANEL_W * 2 : PANEL_W }}>
      {/* Navegação */}
      <div className={`flex items-center justify-between ${px} ${largo ? "pt-4" : "pt-9"} pb-2.5 border-b border-[var(--color-line)]`}>
        <span className="flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-brand">
            <Logo className="w-2.5 h-2.5 text-white" />
          </span>
          <span className="font-display text-[10px] text-[#26211E] leading-none">{d.marca}</span>
        </span>
        {largo ? (
          <span className="flex items-center gap-3 text-[7px] font-bold uppercase tracking-wide">
            {d.menu.map((m) => (
              <span key={m}>{m}</span>
            ))}
            <Botao>{d.cta}</Botao>
          </span>
        ) : (
          <span className="flex flex-col gap-[2.5px]" aria-hidden="true">
            <span className="block w-3.5 h-[1.5px] bg-[#26211E]" />
            <span className="block w-3.5 h-[1.5px] bg-[#26211E]" />
            <span className="block w-2.5 h-[1.5px] bg-[#26211E] self-end" />
          </span>
        )}
      </div>

      {/* Hero */}
      <div className={`${px} py-5 bg-sand ${largo ? "grid grid-cols-[1.15fr_1fr] gap-4 items-center" : "flex flex-col gap-3"}`}>
        <div className="flex flex-col gap-2">
          <span className="inline-flex w-max items-center gap-1 rounded-full bg-white px-2 py-[3px] text-[6px] font-extrabold uppercase tracking-wider text-brand">
            <Sparkles className="w-2 h-2" /> {d.selo}
          </span>
          <Tag>{d.eyebrow}</Tag>
          <span className={`font-display text-brand leading-[0.88] ${largo ? "text-[22px]" : "text-[19px]"}`}>{d.titulo}</span>
          <span className="text-[7.5px] leading-snug text-[#26211E]/75">{d.subtitulo}</span>
          <span className="flex flex-wrap gap-1.5 pt-1">
            <Botao>{d.cta} →</Botao>
            <span className="inline-flex items-center rounded-full border border-brand px-2.5 py-1.5 text-[7px] font-extrabold text-brand">
              {d.ctaSec}
            </span>
          </span>
        </div>
        <div className="relative">
          <Foto icon={d.heroIcon} className={largo ? "h-[132px]" : "h-[104px]"} />
          <span className="absolute -bottom-2 left-2 flex items-center gap-1.5 rounded-[6px] bg-white px-2 py-1.5 shadow-[0_6px_14px_-6px_rgba(38,33,30,0.35)]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-whatsapp)]">
              <Phone className="w-2.5 h-2.5 text-white" />
            </span>
            <span className="flex flex-col">
              <span className="text-[6.5px] font-extrabold leading-tight">Atendimento</span>
              <span className="text-[5.5px] text-[#26211E]/60 leading-tight">pelo WhatsApp</span>
            </span>
          </span>
        </div>
      </div>

      {/* Destaques */}
      <div className={`${px} pt-5 pb-4 flex flex-col gap-2.5`}>
        <Tag>Por que escolher</Tag>
        <div className={`grid gap-2 ${largo ? "grid-cols-4" : "grid-cols-2"}`}>
          {d.destaques.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.titulo} className="rounded-[6px] border border-[var(--color-line)] p-2 flex flex-col gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-brand">
                  <Icon className="w-2.5 h-2.5 text-white" />
                </span>
                <span className="text-[7px] font-extrabold uppercase leading-tight">{b.titulo}</span>
                <span className="text-[6.5px] leading-snug text-[#26211E]/65">{b.texto}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bloco da estrutura */}
      <div className={`${px} py-4 flex flex-col gap-2.5 bg-sand/60`}>
        <Titulo largo={largo}>{d.sobreTitulo}</Titulo>
        <span className="text-[7px] text-[#26211E]/70 -mt-1">{d.sobreTexto}</span>
        {modelo.id === "landing" && <BlocoPlanos d={d} largo={largo} />}
        {modelo.id === "institucional" && <BlocoObras d={d} largo={largo} />}
        {modelo.id === "cardapio" && <BlocoCardapio largo={largo} />}
        {modelo.id === "profissional" && <BlocoAgenda largo={largo} />}
      </div>

      {/* Avaliações (ilustrativas, sem texto inventado) */}
      <div className={`${px} py-4 flex flex-col gap-2.5`}>
        <Tag>Quem já conhece</Tag>
        <div className={`grid gap-2 ${largo ? "grid-cols-3" : "grid-cols-1"}`}>
          {[0, 1, 2].slice(0, largo ? 3 : 2).map((i) => (
            <div key={i} className="rounded-[6px] border border-[var(--color-line)] p-2 flex flex-col gap-1.5">
              <span className="flex gap-[1px]">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-2 h-2 fill-[#F5A623] text-[#F5A623]" />
                ))}
              </span>
              <Linhas n={3} />
              <span className="flex items-center gap-1.5 pt-0.5">
                <span className="h-3.5 w-3.5 rounded-full bg-sand border border-[var(--color-line)]" />
                <span className="block h-[3px] w-10 rounded-full bg-[#26211E]/30" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className={`${px} pb-4 flex flex-col gap-1.5`}>
        <Tag>Perguntas frequentes</Tag>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between rounded-[5px] border border-[var(--color-line)] px-2 py-1.5">
            <span className="block h-[3px] rounded-full bg-[#26211E]/30" style={{ width: largo ? 160 - i * 30 : 120 - i * 20 }} />
            <Plus className="w-2.5 h-2.5 text-brand" />
          </div>
        ))}
      </div>

      {/* CTA + contato */}
      <div className={`mx-3 mb-4 rounded-[8px] bg-brand p-3 ${largo ? "flex items-center justify-between gap-3" : "flex flex-col gap-2"}`}>
        <span className="flex flex-col gap-1">
          <span className="font-display text-[12px] text-white leading-none">Fale com a gente</span>
          <span className="text-[6.5px] text-white/80">Resposta rápida pelo WhatsApp</span>
        </span>
        <Botao claro>
          <MessageCircle className="w-2.5 h-2.5" /> Chamar no WhatsApp
        </Botao>
      </div>
      <div className={`${px} pb-4 grid gap-2 ${largo ? "grid-cols-[1fr_1.3fr]" : "grid-cols-1"}`}>
        <div className="flex flex-col gap-1.5 text-[6.5px]">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-2.5 h-2.5 text-brand" /> {d.endereco}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-2.5 h-2.5 text-brand" /> {d.horario}
          </span>
          {modelo.id === "cardapio" && (
            <span className="flex items-center gap-1.5">
              <Truck className="w-2.5 h-2.5 text-brand" /> Entregamos na região
            </span>
          )}
        </div>
        {/* Mapa ilustrativo */}
        <span className="relative block h-[58px] overflow-hidden rounded-[6px] bg-[#EEF0EA]">
          <span className="absolute left-0 right-0 top-1/2 h-[5px] -translate-y-1/2 bg-white" />
          <span className="absolute top-0 bottom-0 left-1/3 w-[5px] bg-white" />
          <span className="absolute top-0 bottom-0 right-6 w-[3px] bg-white rotate-12" />
          <span className="absolute left-[30%] top-[26%] flex h-4 w-4 items-center justify-center rounded-full bg-brand ring-2 ring-white">
            <MapPin className="w-2.5 h-2.5 text-white" />
          </span>
        </span>
      </div>

      {/* Rodapé */}
      <div className={`bg-[#26211E] ${px} py-3 flex items-center justify-between text-[6px] text-white/70`}>
        <span className="font-display text-[9px] text-white">{d.marca}</span>
        <span>Site feito por Luiz Filipe</span>
      </div>
    </div>
  );
};

/** Rola o site devagar dentro da tela; a distância vem da altura real do conteúdo. */
const Scroller = ({ children, ativo }: { children: ReactNode; ativo: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => setDist(Math.max(0, el.offsetHeight - PANEL_H));
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dur = Math.max(5, 2.5 + dist / 90);
  return (
    <motion.div
      ref={ref}
      animate={ativo && dist > 0 ? { y: [0, 0, -dist, -dist, 0] } : { y: 0 }}
      transition={
        ativo && dist > 0
          ? { duration: dur, times: [0, 0.08, 0.78, 0.9, 1], ease: "easeInOut", repeat: Infinity }
          : { duration: 0.3 }
      }
    >
      {children}
    </motion.div>
  );
};

/* ================================================================== */
/* Celular dobrável                                                     */
/* ================================================================== */

const ABERTO_MS = 9000;
const FECHADO_MS = 8000;

/** Acabamento champanhe claro (inspirado na referência, sem marca). */
const FRAME_BG = "linear-gradient(145deg, #f4efe7 0%, #cfc6b6 30%, #a99f8f 55%, #e8e1d5 80%, #bdb3a3 100%)";
const RAIO = 46;
const ANGULO = 8;
/** Fechado: só sobra a metade direita, então desloca para continuar centralizado. */
const FECHADO_X = -(PANEL_W + 8) / 2;

/** Moldura metálica + borda preta da tela. `dobra` = lado da dobradiça, sem borda (tela contínua). */
const Moldura = ({ raio, dobra, children }: { raio: string; dobra?: "esq" | "dir"; children: ReactNode }) => {
  const semEsq = dobra === "esq";
  const semDir = dobra === "dir";
  return (
    <div
      className="h-full w-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
      style={{ background: FRAME_BG, borderRadius: raio, padding: 3, paddingLeft: semEsq ? 0 : 3, paddingRight: semDir ? 0 : 3 }}
    >
      <div
        className="h-full w-full bg-black"
        style={{ borderRadius: raio, padding: 5, paddingLeft: semEsq ? 0 : 5, paddingRight: semDir ? 0 : 5 }}
      >
        <div className="relative h-full w-full overflow-hidden bg-white" style={{ borderRadius: raio }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Dobravel = ({ modelo, aberto }: { modelo: Modelo; aberto: boolean }) => {
  const fold = { duration: 0.9, ease: EASE_OUT };
  return (
    <div className="relative" style={{ perspective: 1400, width: PANEL_W * 2 + 16, height: PANEL_H + 16 }}>
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ x: aberto ? 0 : FECHADO_X }}
        transition={fold}
      >
        {/* Metade direita — some ao fim da dobra para não aparecer atrás da tela externa */}
        <motion.div
          className="absolute top-0 shadow-[0_30px_60px_-20px_rgba(38,33,30,0.45)]"
          style={{
            left: PANEL_W + 8,
            width: PANEL_W + 8,
            height: PANEL_H + 16,
            transformOrigin: "0% 50%",
            borderRadius: `0 ${RAIO}px ${RAIO}px 0`,
          }}
          animate={{ rotateY: aberto ? -ANGULO : 0, opacity: aberto ? 1 : 0 }}
          transition={aberto ? { ...fold, opacity: { duration: 0 } } : { ...fold, opacity: { duration: 0.15, delay: 0.75 } }}
        >
          <Moldura raio={`0 ${RAIO}px ${RAIO}px 0`} dobra="esq">
            <div style={{ marginLeft: -PANEL_W }}>
              <Scroller ativo={aberto}>
                <MiniSite modelo={modelo} largo />
              </Scroller>
            </div>
          </Moldura>
        </motion.div>

        {/* Metade esquerda (dobra sobre a direita) */}
        <motion.div
          className="absolute top-0 left-0"
          style={{ width: PANEL_W + 8, height: PANEL_H + 16, transformOrigin: "100% 50%", transformStyle: "preserve-3d", zIndex: 2 }}
          animate={{ rotateY: aberto ? ANGULO : 180 }}
          transition={fold}
        >
          {/* Frente: metade esquerda da tela aberta */}
          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
            <Moldura raio={`${RAIO}px 0 0 ${RAIO}px`} dobra="dir">
              <Scroller ativo={aberto}>
                <MiniSite modelo={modelo} largo />
              </Scroller>
            </Moldura>
          </div>

          {/* Verso: tela externa (aparelho fechado) */}
          <div
            className="absolute inset-0"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {/* Lado da dobradiça reto (esquerda), cantos direitos bem arredondados */}
            <Moldura raio={`6px ${RAIO}px ${RAIO}px 6px`}>
              <Scroller ativo={!aberto}>
                <MiniSite modelo={modelo} largo={false} />
              </Scroller>
              {/* Câmera (furo no canto superior direito) */}
              <span className="absolute right-4 top-4 w-5 h-5 rounded-full bg-black ring-1 ring-white/10" />
            </Moldura>
            {/* Lombada da dobradiça */}
            <span
              className="absolute -left-[6px] top-[6px] bottom-[6px] w-[7px] rounded-l-[4px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]"
              style={{ background: "linear-gradient(90deg, #9c9282, #efe9df 45%, #b9af9f)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ================================================================== */
/* Seção                                                               */
/* ================================================================== */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const IconeQuadrado = ({ icon: Icon, ativo = true }: { icon: LucideIcon; ativo?: boolean }) => (
  <span
    className={`w-11 h-11 shrink-0 rounded-[8px] flex items-center justify-center transition-colors ${ativo ? "bg-brand" : "bg-sand"}`}
    aria-hidden="true"
  >
    <Icon className={`w-5 h-5 ${ativo ? "text-white" : "text-brand"}`} />
  </span>
);

export const SitesProntosSection = () => {
  const [ativoId, setAtivoId] = useState<ModeloId>("landing");
  const [aberto, setAberto] = useState(true);
  const reduzir = useReducedMotion();
  const modelo = MODELOS.find((m) => m.id === ativoId)!;

  // Ciclo automático: aberto → fecha → abre… (parado só se o usuário prefere menos movimento)
  useEffect(() => {
    if (reduzir) return;
    const t = window.setTimeout(() => setAberto((a) => !a), aberto ? ABERTO_MS : FECHADO_MS);
    return () => window.clearTimeout(t);
  }, [aberto, reduzir, ativoId]);

  const escolher = (id: ModeloId) => {
    setAtivoId(id);
    setAberto(true);
  };

  return (
    <section
      id="sites-prontos"
      className="section-paper scroll-mt-24 py-16 md:py-24 overflow-hidden border-b border-border"
      aria-labelledby="prontos-title"
    >
      <div className="container mx-auto px-6">
        {/* Cabeçalho */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-end mb-10 md:mb-14">
          <Reveal className="max-w-3xl mx-auto md:mx-0 text-center md:text-left">
            <SectionTitle id="prontos-title" eyebrow="Site pronto" text={"Escolha a estrutura,\neu coloco a sua marca"} className="mb-4" />
            <p className="text-base md:text-lg text-foreground m-0">
              Modelos de site já planejados e testados. Você escolhe a estrutura que combina com o seu negócio e eu aplico a
              sua identidade visual e o seu conteúdo. O site fica no ar mais rápido e por um valor menor que um projeto sob
              medida.
            </p>
          </Reveal>
          <RevealGroup as="ul" className="grid grid-cols-2 gap-3 list-none m-0 p-0">
            {BENEFICIOS.map((b) => {
              const Icon = b.icon;
              return (
                <RevealItem key={b.titulo} className="rounded-[8px] border border-border bg-white p-4 flex flex-col gap-2">
                  <Icon className="w-5 h-5 text-brand" aria-hidden="true" />
                  <p className="m-0 text-sm font-extrabold text-foreground leading-tight">{b.titulo}</p>
                  <p className="m-0 text-xs sm:text-sm text-muted-foreground leading-snug">{b.texto}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* Modelos + celular */}
        <div className="rounded-[12px] border border-border bg-sand p-4 sm:p-6 md:p-10">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] gap-8 xl:gap-12 items-center">
            <div className="order-2 xl:order-1 flex flex-col gap-3">
              <p className="font-label text-foreground m-0 mb-1 text-center md:text-left">4 estruturas disponíveis</p>
              <div role="radiogroup" aria-label="Estruturas de site prontas" className="flex flex-col gap-3">
                {MODELOS.map((m, i) => {
                  const ativo = m.id === ativoId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={ativo}
                      onClick={() => escolher(m.id)}
                      className={`group text-left rounded-[8px] border p-4 md:p-5 transition-all ${focusRing} ${
                        ativo
                          ? "border-brand bg-white shadow-[0_12px_30px_-18px_rgba(232,90,36,0.55)]"
                          : "border-border bg-white/70 hover:border-brand hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <IconeQuadrado icon={m.icon} ativo={ativo} />
                        <span className="flex-1 min-w-0">
                          <span className="block font-display text-xl md:text-2xl leading-tight text-brand">{m.nome}</span>
                          <span className="block text-sm text-muted-foreground mt-1">{m.idealPara}</span>
                        </span>
                        <span className="font-display text-2xl text-border hidden sm:block" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {ativo && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            <p className="font-label text-foreground m-0 mt-5 mb-2">Seções da estrutura</p>
                            <ul className="flex flex-wrap gap-1.5 list-none m-0 p-0">
                              {m.secoes.map((s) => (
                                <li
                                  key={s}
                                  className="rounded-full border border-border bg-sand px-2.5 py-1 text-xs font-bold text-foreground"
                                >
                                  {s}
                                </li>
                              ))}
                            </ul>
                            <ul className="list-none m-0 p-0 mt-3 text-sm sm:text-base text-foreground">
                              {m.inclui.map((item) => (
                                <li key={item} className="flex items-center gap-3 border-b border-border py-2.5 last:border-b-0">
                                  <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>

              <WhatsAppLink
                mensagem={mensagemModelo(modelo.nome)}
                origem="pronto"
                className="btn-on-paper gap-3 mt-2 w-full sm:w-max"
              >
                <WhatsAppIcon />
                Quero esse modelo
              </WhatsAppLink>
            </div>

            {/* Celular — abre e fecha sozinho */}
            <div className="order-1 xl:order-2 flex flex-col items-center gap-3">
              <div className="h-[250px] sm:h-[400px] xl:h-[470px] flex items-center justify-center">
                <div className="scale-[0.48] sm:scale-[0.8] xl:scale-[0.95] origin-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={modelo.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      role="img"
                      aria-label={`Exemplo do modelo ${modelo.nome} em um celular dobrável que abre e fecha mostrando o site`}
                    >
                      <Dobravel modelo={modelo} aberto={aberto} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <p className="m-0 text-xs text-muted-foreground text-center">
                Exemplo com marca fictícia. A sua versão sai com a sua identidade.
              </p>
            </div>
          </div>
        </div>

        {/* Como funciona + comparativo */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal className="rounded-[8px] border border-border bg-white p-6 md:p-8">
            <p className="font-label text-foreground m-0">Como funciona</p>
            <p className="font-display text-2xl md:text-[1.75rem] leading-tight text-brand m-0 mt-2">Do modelo ao ar em 3 passos</p>
            <ol className="list-none m-0 p-0 mt-6 flex flex-col gap-5">
              {PASSOS.map((p, i) => (
                <li key={p.titulo} className="flex gap-4">
                  <span className="relative">
                    <IconeQuadrado icon={p.icon} />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#26211E] text-[10px] font-extrabold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-extrabold text-foreground">{p.titulo}</span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{p.texto}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="rounded-[8px] border border-border bg-white p-6 md:p-8">
            <p className="font-label text-foreground m-0">Qual escolher?</p>
            <p className="font-display text-2xl md:text-[1.75rem] leading-tight text-brand m-0 mt-2">Site pronto ou sob medida</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-[8px] border-2 border-brand bg-sand p-4">
                <span className="inline-flex rounded-full bg-brand px-2.5 py-1 text-xs font-extrabold text-white">Site pronto</span>
                <ul className="list-none m-0 p-0 mt-3 flex flex-col gap-2.5 text-sm text-foreground">
                  {COMPARATIVO.pronto.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[8px] border border-border p-4">
                <span className="inline-flex rounded-full border border-border px-2.5 py-1 text-xs font-extrabold text-foreground">
                  Sob medida
                </span>
                <ul className="list-none m-0 p-0 mt-3 flex flex-col gap-2.5 text-sm text-foreground">
                  {COMPARATIVO.medida.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-foreground/50 mt-0.5" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="m-0 mt-4 text-sm text-muted-foreground">
              Na dúvida, me conta sobre o seu negócio que eu te indico o melhor caminho.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
