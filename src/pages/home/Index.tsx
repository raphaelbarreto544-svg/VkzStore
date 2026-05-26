import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  CheckCircle, Star, Shield, Clock, TrendingUp, Smartphone,
  DollarSign, Zap, Users, Award, X, ChevronDown,
  ArrowRight, Lock, CreditCard, Wifi, BarChart3, Bot, Video,
  Link2, Megaphone, Gift, AlertCircle, Timer
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";

/* ─── FORCE DARK THEME ─────────────────────────────────────── */
if (typeof document !== "undefined") {
  document.documentElement.classList.add("dark");
}

/* ─── DATA ──────────────────────────────────────────────────── */
const earningsData = [
  { mes: "Jan", ganhos: 320 }, { mes: "Fev", ganhos: 680 },
  { mes: "Mar", ganhos: 1200 }, { mes: "Abr", ganhos: 1850 },
  { mes: "Mai", ganhos: 2700 }, { mes: "Jun", ganhos: 3900 },
  { mes: "Jul", ganhos: 5200 }, { mes: "Ago", ganhos: 6800 },
];

const weeklyData = [
  { dia: "Seg", valor: 420 }, { dia: "Ter", valor: 680 },
  { dia: "Qua", valor: 390 }, { dia: "Qui", valor: 820 },
  { dia: "Sex", valor: 1100 }, { dia: "Sab", valor: 950 },
  { dia: "Dom", valor: 740 },
];

const benefits = [
  { icon: Smartphone, title: "Tudo pelo Celular", desc: "Trabalhe de onde quiser, sem precisar de computador ou escritório." },
  { icon: DollarSign, title: "Renda Todos os Dias", desc: "Receba pagamentos via Pix automático, 24h por dia, 7 dias por semana." },
  { icon: Users, title: "Sem Aparecer nas Câmeras", desc: "Construa seu negócio digital 100% anônimo, sem mostrar rosto." },
  { icon: Zap, title: "Método Comprovado", desc: "Estratégias testadas por mais de 15.000 alunos com resultados reais." },
  { icon: TrendingUp, title: "Escalável", desc: "Comece pequeno e escale seus ganhos para 5 ou 6 dígitos mensais." },
  { icon: Award, title: "Suporte Premium", desc: "Comunidade exclusiva e suporte direto com especialistas em renda digital." },
];

const testimonials = [
  { name: "Ana Paula R.", city: "São Paulo, SP", amount: "R$ 4.780", period: "no 1º mês", stars: 5, text: "Eu não acreditava que conseguiria ganhar dinheiro pelo celular sem aparecer. Hoje faço mais de 4 mil reais por mês e posso cuidar dos meus filhos em casa!" },
  { name: "Carlos M.", city: "Belo Horizonte, MG", amount: "R$ 12.300", period: "em 3 meses", stars: 5, text: "Saí do emprego CLT depois de 2 meses aplicando o método. Hoje ganho mais em um fim de semana do que ganhava em um mês inteiro." },
  { name: "Fernanda S.", city: "Curitiba, PR", amount: "R$ 7.920", period: "no 2º mês", stars: 5, text: "O melhor investimento que já fiz na vida. O passo a passo é muito claro e fácil de seguir mesmo para quem nunca trabalhou com internet." },
  { name: "Rafael T.", city: "Fortaleza, CE", amount: "R$ 23.500", period: "em 6 meses", stars: 5, text: "Apliquei o método de afiliados com IA e em 6 meses já tinha faturado mais de 23 mil. Hoje estou construindo meu segundo imóvel." },
  { name: "Juliana K.", city: "Porto Alegre, RS", amount: "R$ 3.200", period: "em 21 dias", stars: 5, text: "Em 3 semanas já tinha recuperado o investimento e muito mais. O suporte da comunidade é incrível, me ajudaram em tudo." },
  { name: "Marcos V.", city: "Recife, PE", amount: "R$ 9.100", period: "no 3º mês", stars: 5, text: "Comecei com zero experiência. O método com TikTok e IA mudou completamente minha vida financeira. Recomendo demais!" },
];

const steps = [
  { num: "01", title: "Acesse a Plataforma", desc: "Após a compra, você terá acesso imediato a todos os módulos e materiais na nossa área de membros exclusiva." },
  { num: "02", title: "Escolha seu Método", desc: "Selecione entre TikTok, Afiliados, IA ou Marketing Digital — o que mais combina com seu perfil e disponibilidade." },
  { num: "03", title: "Aplique o Passo a Passo", desc: "Siga as aulas práticas e implementações guiadas. Cada estratégia foi criada para gerar resultados em poucos dias." },
  { num: "04", title: "Receba Pelo Pix", desc: "Veja as notificações de pagamento chegando no seu celular. Retire quando quiser, sem burocracia." },
];

const products = [
  { icon: Bot, name: "IA que Vende por Você", tag: "MAIS VENDIDO", price: "R$ 197", oldPrice: "R$ 497", color: "#00ff88", desc: "Automação com inteligência artificial para criar conteúdo, anúncios e vendas no piloto automático.", features: ["ChatGPT para vendas", "Automação 24/7", "Scripts prontos", "Suporte vitalício"] },
  { icon: Video, name: "TikTok Milionário", tag: "NOVO", price: "R$ 147", oldPrice: "R$ 397", color: "#00d4ff", desc: "Estratégia completa para monetizar no TikTok sem aparecer, usando vídeos gerados por IA.", features: ["Conta sem rosto", "Vídeos com IA", "Monetização direta", "Tráfego orgânico"] },
  { icon: Link2, name: "Afiliados Expert", tag: "POPULAR", price: "R$ 167", oldPrice: "R$ 447", color: "#ffd700", desc: "Método completo de marketing de afiliados para ganhar comissões altas promovendo produtos digitais.", features: ["Hotmart + Kiwify", "Funil de vendas", "Tráfego pago", "Copy persuasiva"] },
  { icon: Megaphone, name: "Marketing Digital 360°", tag: "COMPLETO", price: "R$ 247", oldPrice: "R$ 597", color: "#ff6b35", desc: "Pacote completo com todas as estratégias de marketing digital para escalar sua renda rapidamente.", features: ["4 cursos completos", "Comunidade VIP", "Mentorias ao vivo", "Atualizações eternas"] },
];

const faqs = [
  { q: "Preciso de experiência para começar?", a: "Não! O método foi desenvolvido especialmente para iniciantes. Você vai aprender tudo do zero, passo a passo, mesmo que nunca tenha trabalhado com internet antes." },
  { q: "Quanto tempo leva para começar a ganhar?", a: "A maioria dos alunos começa a gerar os primeiros resultados em 7 a 21 dias. Tudo depende da dedicação. Alguns alunos relataram ganhos já na primeira semana." },
  { q: "Preciso investir muito dinheiro além do curso?", a: "Não necessariamente. Temos estratégias 100% gratuitas para começar. O investimento adicional é opcional e indicado apenas quando você já está gerando receita." },
  { q: "E se eu não gostar do conteúdo?", a: "Você tem 7 dias de garantia total. Se por qualquer motivo não ficar satisfeito, devolvemos 100% do seu dinheiro sem perguntas e sem burocracia." },
  { q: "Como vou receber meus ganhos?", a: "Você recebe diretamente via Pix no seu celular. Os pagamentos são automáticos e caem na sua conta em segundos, todos os dias." },
  { q: "O método funciona para qualquer estado do Brasil?", a: "Sim! O método funciona para qualquer pessoa no Brasil com acesso à internet e um celular. Já temos alunos em todos os estados do país." },
];

/* ─── ANIMATION VARIANTS ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as number[] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── ANIMATED COUNTER ──────────────────────────────────────── */
function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString("pt-BR")}{suffix}</span>;
}

/* ─── COUNTDOWN TIMER ───────────────────────────────────────── */
function CountdownTimer() {
  const [time, setTime] = useState({ h: 2, m: 47, s: 33 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 2; m = 47; s = 33; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-1 font-mono text-2xl font-bold justify-center">
      {[pad(time.h), pad(time.m), pad(time.s)].map((val, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="bg-destructive/20 border border-destructive/40 text-destructive px-2 py-1 rounded-lg">{val}</span>
          {i < 2 && <span className="text-destructive">:</span>}
        </span>
      ))}
    </div>
  );
}

/* ─── PHONE MOCKUP ──────────────────────────────────────────── */
function PhoneMockup() {
  const notifs = [
    { msg: "💰 Pix recebido: R$ 247,00", from: "Hotmart", time: "agora" },
    { msg: "💰 Pix recebido: R$ 97,00", from: "Kiwify", time: "3 min" },
    { msg: "💰 Pix recebido: R$ 497,00", from: "Hotmart", time: "7 min" },
    { msg: "💰 Pix recebido: R$ 197,00", from: "Eduzz", time: "12 min" },
  ];
  return (
    <div className="relative mx-auto" style={{ width: 240 }}>
      <div className="bg-card border-2 border-border rounded-[2.5rem] p-3"
        style={{ boxShadow: "0 0 60px 0 rgba(0,255,136,0.25), 0 0 120px 0 rgba(0,255,136,0.08)" }}>
        <div className="rounded-[2rem] overflow-hidden bg-muted" style={{ minHeight: 480 }}>
          <div className="bg-background/80 px-4 py-2 flex justify-between text-xs text-muted-foreground font-mono">
            <span>9:41</span>
            <div className="flex gap-1 items-center"><Wifi size={10} /><span>●●●●</span></div>
          </div>
          <div className="border-b border-primary/20 px-3 py-3" style={{ background: "rgba(0,255,136,0.07)" }}>
            <p className="text-xs text-muted-foreground">Saldo disponível</p>
            <p className="text-2xl font-black text-primary font-mono">R$ 6.847,00</p>
            <p className="text-xs" style={{ color: "rgba(0,255,136,0.7)" }}>+R$ 1.038 hoje ▲</p>
          </div>
          <div className="p-2 space-y-2">
            <p className="text-xs text-muted-foreground px-1 pt-1">Últimos recebimentos</p>
            {notifs.map((n, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 + 0.5 }}
                className="bg-card border border-border rounded-xl p-2 flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <DollarSign size={10} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{n.msg}</p>
                  <p className="text-[10px] text-muted-foreground">{n.from} · {n.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="w-16 h-1 bg-border rounded-full" />
        </div>
      </div>
      <motion.div className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
        style={{ boxShadow: "0 0 80px 20px rgba(0,255,136,0.12)" }} />
    </div>
  );
}

/* ─── DASHBOARD MOCKUP ──────────────────────────────────────── */
function DashboardMockup() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4"
      style={{ boxShadow: "0 0 40px 0 rgba(0,212,255,0.12)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground">Faturamento Total</p>
          <p className="text-xl font-black text-foreground font-mono">R$ <AnimatedCounter target={38450} /></p>
        </div>
        <span className="text-xs bg-primary/20 text-primary border border-primary/30 px-2 py-1 rounded-full font-bold">+127% ↑</span>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={earningsData}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff88" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="mes" tick={{ fill: "#666", fontSize: 9 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "rgba(12,20,20,0.97)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 8, fontSize: 11 }}
            formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Ganhos"]}
          />
          <Area type="monotone" dataKey="ganhos" stroke="#00ff88" strokeWidth={2} fill="url(#areaGrad)" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[{ label: "Vendas Hoje", val: "47" }, { label: "Conversão", val: "8.3%" }, { label: "Ticket Médio", val: "R$247" }].map((item, i) => (
          <div key={i} className="bg-muted/50 rounded-lg p-2 text-center">
            <p className="text-xs font-black text-primary font-mono">{item.val}</p>
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── URGENCY POPUP ─────────────────────────────────────────── */
function UrgencyPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)" }} onClick={onClose}>
      <motion.div initial={{ scale: 0.8, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-card border-2 border-primary/50 rounded-2xl p-6 max-w-sm w-full relative"
        style={{ boxShadow: "0 0 60px rgba(0,255,136,0.28)" }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
          <X size={18} />
        </button>
        <div className="text-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-flex items-center justify-center w-14 h-14 bg-destructive/20 rounded-full mb-3">
            <AlertCircle size={28} className="text-destructive" />
          </motion.div>
          <p className="text-xs font-black text-destructive uppercase tracking-widest mb-1">⚠️ ATENÇÃO — OFERTA LIMITADA</p>
          <h3 className="text-xl font-black text-foreground mb-2">Esta oferta expira em breve!</h3>
          <p className="text-muted-foreground text-sm mb-4">Restam apenas <strong className="text-destructive">7 vagas</strong> neste preço especial. Depois, o valor volta ao normal.</p>
          <CountdownTimer />
          <p className="text-xs text-muted-foreground mt-3 mb-4">Tempo restante para o desconto de <strong className="text-primary">R$ 300</strong></p>
          <button onClick={onClose} className="w-full bg-primary text-primary-foreground font-black text-sm py-3 rounded-xl hover:opacity-90 transition-all"
            style={{ boxShadow: "0 0 20px rgba(0,255,136,0.38)" }}>
            GARANTIR MINHA VAGA AGORA →
          </button>
          <p className="text-[10px] text-muted-foreground mt-2">🔒 Compra 100% segura · Garantia de 7 dias</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── FLOATING SALE NOTIFICATION ────────────────────────────── */
function FloatingNotification() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const notifs = [
    { city: "São Paulo, SP", name: "Pedro A.", item: "IA que Vende por Você" },
    { city: "Rio de Janeiro, RJ", name: "Maria L.", item: "TikTok Milionário" },
    { city: "Belo Horizonte, MG", name: "João S.", item: "Afiliados Expert" },
    { city: "Curitiba, PR", name: "Carla M.", item: "Marketing Digital 360°" },
    { city: "Salvador, BA", name: "Lucas R.", item: "IA que Vende por Você" },
  ];
  useEffect(() => {
    const show = () => {
      setVisible(true);
      setTimeout(() => { setVisible(false); setIndex(p => (p + 1) % notifs.length); }, 4000);
    };
    const interval = setInterval(show, 9000);
    const initial = setTimeout(show, 5000);
    return () => { clearInterval(interval); clearTimeout(initial); };
  }, []);
  const n = notifs[index];
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-4 z-40 bg-card border border-border rounded-xl p-3 flex items-center gap-3 max-w-xs"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">{n.name} de {n.city}</p>
            <p className="text-[10px] text-muted-foreground">Acabou de comprar: <span className="text-primary">{n.item}</span></p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── STICKY CTA ────────────────────────────────────────────── */
function StickyCTA({ vagas }: { vagas: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: -80 }} animate={{ y: 0 }} exit={{ y: -80 }}
          className="fixed top-0 left-0 right-0 z-40 border-b border-border py-3 px-4"
          style={{ background: "rgba(12,20,16,0.96)", backdropFilter: "blur(12px)" }}>
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-destructive rounded-full" />
              <span className="text-sm font-semibold text-foreground">🔥 Apenas <strong className="text-destructive">{vagas} vagas</strong> restantes neste preço!</span>
            </div>
            <a href="#checkout" className="ml-auto bg-primary text-primary-foreground font-black text-sm px-5 py-2 rounded-xl hover:opacity-90 transition-all"
              style={{ boxShadow: "0 0 16px rgba(0,255,136,0.35)" }}>
              GARANTIR AGORA →
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */
const Index = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [vagas, setVagas] = useState(23);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 9000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setVagas(p => Math.max(3, p - 1)), 55000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* GLOBAL ELEMENTS */}
      <StickyCTA vagas={vagas} />
      <FloatingNotification />
      <AnimatePresence>
        {showPopup && <UrgencyPopup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        {/* Animated grid bg */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(0,255,136,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,1) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        {/* Glow orbs */}
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.28, 0.12] }} transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-20 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,255,136,0.22) 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.08, 0.2, 0.08] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — Copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              {/* Live badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border border-primary/30"
                style={{ background: "rgba(0,255,136,0.08)" }}>
                <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-primary text-xs font-black uppercase tracking-wider">🔥 Método #1 de Renda Extra no Brasil</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
                Aprenda a Fazer{" "}
                <span className="text-primary relative inline-block">
                  Renda Extra
                  <motion.span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
                </span>{" "}
                Pelo Celular
              </motion.h1>

              <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Descubra como ganhar de <strong className="text-primary">R$ 3.000 a R$ 15.000</strong> por mês trabalhando pelo celular — sem precisar aparecer nas câmeras, sem chefe e sem horário fixo — usando <strong className="text-foreground">IA, TikTok e Afiliados</strong>.
              </motion.p>

              {/* Social proof avatars */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  {["A", "C", "F", "R", "J"].map((l, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-background bg-primary/25 flex items-center justify-center text-xs font-black text-primary">
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-xs text-muted-foreground"><strong className="text-foreground">+15.000 alunos</strong> já transformaram suas vidas</p>
                </div>
              </motion.div>

              {/* Scarcity */}
              <motion.div variants={fadeUp} className="rounded-xl px-4 py-3 mb-6 flex items-center gap-3 border border-destructive/30"
                style={{ background: "rgba(220,38,38,0.08)" }}>
                <Timer size={18} className="text-destructive shrink-0" />
                <div>
                  <p className="text-destructive text-sm font-black">⚠️ Apenas <strong>{vagas} vagas</strong> disponíveis neste preço!</p>
                  <p className="text-xs text-muted-foreground">Após esgotar, o valor volta para R$ 497</p>
                </div>
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <motion.a href="#checkout" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black text-base px-8 py-4 rounded-2xl"
                  style={{ boxShadow: "0 0 32px rgba(0,255,136,0.45), 0 4px 20px rgba(0,255,136,0.25)" }}>
                  <Zap size={18} />
                  COMEÇAR AGORA
                  <ArrowRight size={18} />
                </motion.a>
                <a href="#como-funciona" className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold text-sm px-6 py-4 rounded-2xl hover:border-primary/50 hover:text-primary transition-all">
                  Ver como funciona
                </a>
              </motion.div>

              <motion.p variants={fadeUp} className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                <Lock size={12} className="text-primary" />
                Compra 100% segura · Garantia de 7 dias · Acesso imediato
              </motion.p>
            </motion.div>

            {/* RIGHT — Phone mockup */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center">
              <PhoneMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="border-y border-border py-8 px-4" style={{ background: "rgba(0,255,136,0.03)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { target: 15000, suffix: "+", label: "Alunos Ativos", prefix: "" },
            { target: 38, suffix: "Mi+", label: "Gerado pelos Alunos", prefix: "R$" },
            { target: 97, suffix: "%", label: "Taxa de Satisfação", prefix: "" },
            { target: 7, suffix: " dias", label: "Para os Primeiros Ganhos", prefix: "" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-black text-primary font-mono">
                <AnimatedCounter target={s.target} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BENEFITS
      ══════════════════════════════════════════════════════ */}
      <section id="beneficios" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fadeUp} className="text-primary text-xs font-black uppercase tracking-widest">POR QUE FUNCIONA</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">
              Tudo que Você Precisa Para <span className="text-primary">Ganhar Dinheiro</span> Online
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto">
              Um método completo, testado e aprovado por mais de 15 mil alunos em todo o Brasil.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card border border-border rounded-2xl p-6 group hover:border-primary/40 transition-all"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-primary/20 group-hover:border-primary/40 transition-all"
                  style={{ background: "rgba(0,255,136,0.09)" }}>
                  <b.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-black text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RESULTS / DASHBOARD
      ══════════════════════════════════════════════════════ */}
      <section id="resultados" className="py-20 px-4" style={{ background: "rgba(0,255,136,0.02)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fadeUp} className="text-primary text-xs font-black uppercase tracking-widest">RESULTADOS REAIS</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">
              Veja os <span className="text-primary">Números Reais</span> dos Nossos Alunos
            </motion.h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <DashboardMockup />
              {/* Weekly chart */}
              <div className="bg-card border border-border rounded-2xl p-4 mt-4"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                <p className="text-sm font-black text-foreground mb-3">💸 Ganhos desta semana</p>
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={weeklyData}>
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00ff88" />
                        <stop offset="100%" stopColor="#00d4aa" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="dia" tick={{ fill: "#666", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "rgba(12,20,20,0.97)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 8, fontSize: 11 }}
                      formatter={(v: number) => [`R$ ${v}`, "Ganhos"]}
                    />
                    <Bar dataKey="valor" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              variants={stagger} className="space-y-4">
              {[
                { name: "João M. — Afiliados", amount: "R$ 8.320/mês", pct: 83 },
                { name: "Leticia F. — TikTok + IA", amount: "R$ 12.780/mês", pct: 95 },
                { name: "André P. — Marketing Digital", amount: "R$ 5.640/mês", pct: 65 },
                { name: "Tatiane C. — Afiliados", amount: "R$ 19.400/mês", pct: 100 },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-card border border-border rounded-xl p-4"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-foreground">{item.name}</span>
                    <span className="text-sm font-black text-primary font-mono">{item.amount}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }} />
                  </div>
                </motion.div>
              ))}
              <div className="border border-primary/30 rounded-xl p-5" style={{ background: "rgba(0,255,136,0.07)" }}>
                <p className="text-primary font-black text-3xl font-mono">R$ 38.450.000+</p>
                <p className="text-sm text-muted-foreground">Total gerado pelos alunos só em 2025</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section id="como-funciona" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fadeUp} className="text-primary text-xs font-black uppercase tracking-widest">COMO FUNCIONA</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">
              4 Passos Simples Para <span className="text-primary">Começar a Ganhar</span>
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="relative bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-colors">
                <div className="text-5xl font-black text-primary/8 font-mono mb-2 select-none">{s.num}</div>
                <div className="w-10 h-10 bg-primary text-primary-foreground font-black text-sm rounded-full flex items-center justify-center mx-auto mb-4 -mt-10 relative z-10"
                  style={{ boxShadow: "0 0 18px rgba(0,255,136,0.5)" }}>
                  {i + 1}
                </div>
                <h3 className="font-black text-foreground mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/25 z-10" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════════════════════ */}
      <section id="produtos" className="py-20 px-4" style={{ background: "rgba(0,255,136,0.02)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fadeUp} className="text-primary text-xs font-black uppercase tracking-widest">PRODUTOS DISPONÍVEIS</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">
              Escolha o Método <span className="text-primary">Ideal para Você</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
              Todos os produtos incluem acesso vitalício, suporte premium e garantia de 7 dias.
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -6 }}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col relative overflow-hidden transition-all hover:border-opacity-50"
                style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.35)" }}>
                <span className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full"
                  style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}45` }}>
                  {p.tag}
                </span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.color}12`, border: `1px solid ${p.color}30` }}>
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                <h3 className="font-black text-foreground mb-2 text-sm">{p.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed flex-1">{p.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle size={12} style={{ color: p.color }} className="shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>
                    <span className="text-xl font-black text-foreground">{p.price}</span>
                  </div>
                  <a href="#checkout" className="block w-full text-center font-black text-xs py-2.5 rounded-xl transition-all hover:opacity-80"
                    style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}40` }}>
                    COMPRAR AGORA →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section id="depoimentos" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fadeUp} className="text-primary text-xs font-black uppercase tracking-widest">DEPOIMENTOS</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">
              O Que Dizem <span className="text-primary">Nossos Alunos</span>
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border-l-4 border-l-primary border border-border rounded-2xl p-6"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-black text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-black text-foreground">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-primary font-mono">{t.amount}</p>
                    <p className="text-[10px] text-muted-foreground">{t.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GUARANTEE
      ══════════════════════════════════════════════════════ */}
      <section id="garantia" className="py-20 px-4" style={{ background: "rgba(0,255,136,0.02)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="bg-card border-2 border-primary/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(0,255,136,0.15)" }}>
            {/* Corner glow */}
            <div className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)" }} />
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}
              className="inline-flex w-24 h-24 rounded-full items-center justify-center mb-6 relative z-10 border-4 border-primary"
              style={{ background: "rgba(0,255,136,0.1)" }}>
              <Shield size={44} className="text-primary" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4 relative z-10">
              Garantia Incondicional de <span className="text-primary">7 Dias</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
              Se por qualquer motivo você não ficar 100% satisfeito, basta enviar uma mensagem dentro de 7 dias após a compra e devolveremos <strong className="text-foreground">todo o seu dinheiro</strong> — sem perguntas, sem burocracia.
            </p>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              {[
                { icon: Shield, label: "Compra 100% Segura" },
                { icon: Lock, label: "Dados Protegidos" },
                { icon: CheckCircle, label: "Garantia Total" },
                { icon: Award, label: "Satisfação Garantida" },
              ].map((seal, i) => (
                <div key={i} className="flex items-center gap-2 bg-muted/60 border border-border rounded-full px-4 py-2">
                  <seal.icon size={14} className="text-primary" />
                  <span className="text-xs font-black text-foreground">{seal.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.span variants={fadeUp} className="text-primary text-xs font-black uppercase tracking-widest">DÚVIDAS FREQUENTES</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mt-2">
              Perguntas <span className="text-primary">Frequentes</span>
            </motion.h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/30 transition-colors">
                  <span className="font-black text-foreground text-sm pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-6 pb-4 border-t border-border">
                        <p className="text-sm text-muted-foreground leading-relaxed pt-3">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CHECKOUT
      ══════════════════════════════════════════════════════ */}
      <section id="checkout" className="py-20 px-4" style={{ background: "rgba(0,255,136,0.02)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-xs font-black border border-destructive/30"
              style={{ background: "rgba(220,38,38,0.08)", color: "hsl(var(--destructive))" }}>
              <Timer size={14} />
              OFERTA POR TEMPO LIMITADO — <strong>{vagas} VAGAS RESTANTES</strong>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mb-3">
              Comece Sua <span className="text-primary">Jornada de Renda Extra</span> Hoje
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground">Acesso imediato após o pagamento. Sem mensalidade. Vitalício.</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ORDER SUMMARY */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
              <h3 className="font-black text-foreground mb-4 flex items-center gap-2">
                <Gift size={18} className="text-primary" /> O Que Você Recebe:
              </h3>
              <ul className="space-y-2.5 mb-6">
                {[
                  "✅ Acesso Vitalício à Plataforma",
                  "✅ 4 Métodos Completos (IA, TikTok, Afiliados, Marketing)",
                  "✅ Comunidade VIP no WhatsApp",
                  "✅ Suporte Premium com Especialistas",
                  "✅ Atualizações Gratuitas para Sempre",
                  "✅ Bônus: Scripts Prontos para Vender",
                  "✅ Bônus: Mentoria ao Vivo Semanal",
                ].map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{item}</li>
                ))}
              </ul>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Valor original:</span>
                  <span className="line-through text-muted-foreground">R$ 1.997</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Desconto especial:</span>
                  <span className="text-primary font-black">-R$ 1.750</span>
                </div>
                <div className="flex justify-between font-black text-foreground text-xl pt-3 border-t border-border">
                  <span>Total:</span>
                  <span className="text-primary font-mono">R$ 247</span>
                </div>
                <p className="text-xs text-muted-foreground">ou 12x de R$ 24,70 sem juros no cartão</p>
              </div>
            </motion.div>

            {/* PAYMENT */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-card border-2 border-primary/30 rounded-2xl p-6"
              style={{ boxShadow: "0 0 30px rgba(0,255,136,0.12)" }}>
              <h3 className="font-black text-foreground mb-4 flex items-center gap-2">
                <Lock size={16} className="text-primary" /> Dados de Pagamento
              </h3>
              {/* PIX */}
              <div className="rounded-xl p-4 mb-4 border-2 border-primary"
                style={{ background: "rgba(0,255,136,0.08)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-primary-foreground font-black text-xs">PIX</span>
                  </div>
                  <div>
                    <p className="font-black text-foreground text-sm">Pagar com Pix</p>
                    <p className="text-xs text-primary">✔ Acesso liberado na hora</p>
                  </div>
                  <CheckCircle size={18} className="text-primary ml-auto" />
                </div>
                <motion.a href="#" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="block w-full text-center bg-primary text-primary-foreground font-black py-3 rounded-xl text-sm"
                  style={{ boxShadow: "0 0 22px rgba(0,255,136,0.4)" }}>
                  GERAR PIX AGORA → R$ 247
                </motion.a>
              </div>
              {/* CARD */}
              <div className="bg-muted/40 border border-border rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-black text-foreground text-sm">Cartão de Crédito</p>
                    <p className="text-xs text-muted-foreground">Até 12x sem juros</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <input className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 transition-colors" placeholder="Número do cartão" />
                  <div className="grid grid-cols-2 gap-2">
                    <input className="bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 transition-colors" placeholder="MM/AA" />
                    <input className="bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 transition-colors" placeholder="CVV" />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-muted border border-border text-foreground font-black py-2.5 rounded-xl text-sm hover:border-primary/40 transition-all">
                    PAGAR COM CARTÃO
                  </motion.button>
                </div>
              </div>
              {/* Security seals */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[{ icon: Lock, label: "SSL 256-bit" }, { icon: Shield, label: "Compra Segura" }, { icon: CheckCircle, label: "7 dias Garantia" }].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <s.icon size={16} className="text-primary" />
                    <span className="text-[9px] text-muted-foreground text-center">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.3, 0.12] }} transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,255,136,0.18) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary text-xs font-black uppercase tracking-widest mb-4">
              SUA HORA É AGORA
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-foreground mb-6">
              Não Deixe Sua <span className="text-primary">Vida Financeira</span><br />Para Amanhã
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Cada dia que passa sem agir é um dia a menos de liberdade financeira.{" "}
              <strong className="text-foreground">Mais de 15.000 pessoas já transformaram suas vidas</strong> — você pode ser o próximo.
            </motion.p>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 text-xs font-black border border-destructive/30"
              style={{ background: "rgba(220,38,38,0.08)", color: "hsl(var(--destructive))" }}>
              <Timer size={14} />
              Restam apenas <strong className="ml-1">{vagas} vagas</strong> com este preço
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a href="#checkout" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-black text-lg px-10 py-5 rounded-2xl"
                style={{ boxShadow: "0 0 44px rgba(0,255,136,0.5), 0 8px 30px rgba(0,255,136,0.25)" }}>
                <Zap size={22} />
                COMEÇAR AGORA — R$ 247
                <ArrowRight size={22} />
              </motion.a>
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs text-muted-foreground mt-5 flex items-center justify-center gap-2">
              <Lock size={12} className="text-primary" />
              Pagamento 100% seguro · Garantia de 7 dias · Acesso imediato
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="border-t border-border py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg font-black text-primary mb-2">💚 RendaExtra Digital</p>
          <p className="text-xs text-muted-foreground mb-5">Transformando vidas através da renda digital no Brasil</p>
          <div className="flex flex-wrap justify-center gap-5 text-xs text-muted-foreground mb-5">
            {["Política de Privacidade", "Termos de Uso", "Suporte", "Contato"].map(link => (
              <a key={link} href="#" className="hover:text-primary transition-colors">{link}</a>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground max-w-lg mx-auto leading-relaxed">
            © 2026 RendaExtra Digital. Todos os direitos reservados.<br />
            Os resultados apresentados são individuais e não garantem os mesmos resultados para todos os alunos.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Index;
