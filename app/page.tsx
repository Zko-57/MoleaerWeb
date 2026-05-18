import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Hero } from '@/components/hero';
import { RdVisual } from '@/components/rd-visual';
import { ComparisonSection } from '@/components/comparison-section';
import { ContactForm } from '@/components/contact-form';
import { Reveal, RevealStagger } from '@/components/ui/reveal';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { FaqDetails } from '@/components/faq-details';
import { navSectionClass } from '@/lib/nav-section';

const NanoBubbleNetwork = dynamic(
  () => import('@/components/nano-bubble-network').then((m) => ({ default: m.NanoBubbleNetwork })),
  {
    loading: () => (
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#001428]/95 to-[#000a14]/95"
        aria-hidden
      />
    ),
  },
);

const TestimonialCarousel = dynamic(
  () => import('@/components/testimonial-carousel').then((m) => ({ default: m.TestimonialCarousel })),
  { loading: () => <div className="h-48 animate-pulse rounded-2xl bg-white/[0.04]" aria-hidden /> },
);

const IconChem = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7" aria-hidden>
    <path d="M9 3v6L3 19a2 2 0 0 0 2 3h14a2 2 0 0 0 2-3l-6-10V3" />
    <path d="M8 3h8" />
  </svg>
);
const IconEnergy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7" aria-hidden>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);
const IconData = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7" aria-hidden>
    <path d="M3 3v18h18" />
    <path d="M7 15l4-4 3 3 5-6" />
  </svg>
);

function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl space-y-5 text-center lg:mb-16">
      <Reveal>
        <div className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-zinc-400">
          {badge}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{title}</h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-zinc-400">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <main id="top" className="relative">
      <Hero />

      {/* Global metrics */}
      <section className="px-5 pb-[var(--section-y)] sm:px-8" aria-label="Métricas globales">
        <Reveal className="mx-auto max-w-[1320px]">
          <div className="glass grid grid-cols-2 gap-6 p-6 sm:grid-cols-4 sm:gap-8 sm:p-8">
            {[
              { t: 4, suf: 'M+ L/min', label: 'Agua tratada por minuto' },
              { t: 10_000, suf: '+', label: 'Generadores instalados' },
              { t: 50, suf: '+', label: 'Países con presencia' },
              { t: 550, suf: '+', label: 'Cuerpos de agua restaurados' },
            ].map((m) => (
              <div key={m.label} className="text-center sm:text-left">
                <AnimatedCounter
                  target={m.t}
                  suffix={m.suf}
                  className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
                />
                <div className="mt-1 text-xs text-zinc-500 sm:text-sm">{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Technology */}
      <section id="tecnologia" className={navSectionClass}>
        <SectionHeader
          badge="Tecnología patentada"
          title={
            <>
              Ingeniería de precisión.
              <br />
              <span className="text-gradient">Resultados medibles.</span>
            </>
          }
          subtitle="Nuestra tecnología patentada altera las propiedades físicas del agua para resolver los desafíos industriales más complejos del planeta."
        />

        <div className="mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-3">
          <Reveal className="glass grid gap-8 p-8 lg:col-span-2 lg:grid-cols-2 lg:p-10">
            <div className="flex flex-col justify-center gap-4">
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-cyan-light/90">Estabilidad & Difusión</div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">Flotabilidad Neutra</h3>
              <p className="text-[0.95rem] leading-relaxed text-zinc-400">
                Las nanoburbujas carecen de la flotabilidad suficiente para alcanzar la superficie. Permanecen suspendidas
                en el líquido durante meses, entregando oxígeno de forma continua hasta donde se necesita.
              </p>
              <Link href="#nanoburbujas" className="w-fit text-sm font-semibold text-cyan-light transition-opacity hover:opacity-90">
                Cómo funciona →
              </Link>
            </div>
            <div className="relative aspect-square min-h-[200px] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[280px]">
              <Image
                src="/images/frutiger_bubbles.jpg"
                alt="Nanoburbujas suspendidas en agua"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal className="glass flex flex-1 flex-col gap-4 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/15 text-cyan-light">
                <IconChem />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Oxidación sin químicos</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Al colapsar, las nanoburbujas generan radicales hidroxilo (HO•) que destruyen patógenos y biopelículas de
                forma 100% natural.
              </p>
            </Reveal>
            <Reveal delay={0.06} className="glass flex flex-1 flex-col gap-4 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/15 text-cyan-light">
                <IconEnergy />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Eficiencia energética</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Reduce el consumo eléctrico en sistemas de aireación aeróbica hasta un <b>40%</b>, optimizando el OPEX
                de tu planta.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="glass flex flex-1 flex-col gap-4 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/15 text-cyan-light">
                <IconData />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Monitoreo en tiempo real</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Todos nuestros equipos integran telemetría IoT: oxígeno disuelto, caudal, presión y diagnóstico
                predictivo desde la nube.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="glass grid gap-8 p-8 lg:col-span-3 lg:grid-cols-2 lg:p-10">
            <div className="flex flex-col justify-center gap-4">
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-cyan-light/90">I+D Global</div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                El mayor equipo de I+D en nanoburbujas del mundo
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-zinc-400">
                Química de superficies, dinámica de fluidos y electroquímica colaboran para convertir cada descubrimiento
                científico en soluciones reales para tu industria.
              </p>
              <Link href="#contacto" className="w-fit text-sm font-semibold text-cyan-light transition-opacity hover:opacity-90">
                Conocer al equipo de I+D →
              </Link>
            </div>
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-gradient-to-b from-[#001a34]/90 to-black/40 p-6">
              <RdVisual />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Nanoburbujas compare */}
      <section id="nanoburbujas" className={navSectionClass}>
        <SectionHeader
          badge="¿Qué son las nanoburbujas?"
          title={
            <>
              2.500 veces más pequeñas.
              <br />
              <span className="text-gradient">Infinitamente más poderosas.</span>
            </>
          }
          subtitle="A diferencia de las burbujas comunes que suben y explotan, las nanoburbujas permanecen suspendidas en el líquido, mejorando el intercambio de gases y entregando oxígeno donde se necesita."
        />

        <Reveal className="mx-auto grid max-w-[1120px] gap-6 md:grid-cols-2">
          <div className="glass flex flex-col overflow-hidden">
            <div className="border-b border-white/10 p-6">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">Convencional</span>
              <h3 className="font-display mt-2 text-xl font-bold text-white">Burbujas grandes</h3>
            </div>
            <div className="relative isolate min-h-[220px] overflow-hidden bg-gradient-to-b from-[#1a0a14]/80 to-black/60">
              <div className="big-bubble bb-1" />
              <div className="big-bubble bb-2" />
              <div className="big-bubble bb-3" />
            </div>
            <ul className="space-y-3 p-6 text-sm text-zinc-300">
              <li className="flex gap-2">
                <span className="text-red-400">✕</span> Suben y explotan en segundos
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">✕</span> Baja transferencia de oxígeno
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">✕</span> Requieren mayor energía
              </li>
            </ul>
          </div>
          <div className="glass flex flex-col overflow-hidden ring-1 ring-cyan/25">
            <div className="border-b border-cyan/20 bg-cyan/5 p-6">
              <span className="panel-cyan-underline text-[0.65rem] font-bold uppercase tracking-wider text-cyan-light">
                MOLEAER
              </span>
              <h3 className="font-display mt-2 text-xl font-bold text-white">Nanoburbujas</h3>
            </div>
            <div className="relative min-h-[220px] overflow-hidden bg-gradient-to-b from-[#001428]/95 to-[#000a14]/95">
              <NanoBubbleNetwork />
            </div>
            <ul className="space-y-3 p-6 text-sm text-zinc-200">
              <li className="flex gap-2">
                <span className="text-cyan-light">✓</span> Estables durante semanas
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-light">✓</span> Transferencia &gt; 85%
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-light">✓</span> Generan radicales hidroxilo
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Impact case — sin bloque sólido al final: el fondo sigue siendo el ambient fijo */}
      <section id="impacto" className={navSectionClass}>
        <div className="mx-auto max-w-[1320px]">
          <ComparisonSection />
        </div>
      </section>

      {/* KPI grid */}
      <section className="px-5 py-[var(--section-y)] sm:px-8">
        <SectionHeader
          badge="Nuestro Impacto"
          title={
            <>
              Innovación que <span className="text-gradient">genera impacto positivo</span>
            </>
          }
          subtitle="Estamos comprometidos con un impacto cuantificable. Así es cómo la tecnología Moleaer transforma industrias, reduce huella ambiental e impulsa el crecimiento sostenible."
        />
        <div className="mx-auto grid max-w-[1320px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="glass p-8">
            <AnimatedCounter target={20} suffix="%" className="font-display text-4xl font-bold text-cyan-light" />
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Más capacidad en tratamiento de aguas residuales.</p>
          </Reveal>
          <Reveal delay={0.06} className="glass p-8">
            <AnimatedCounter target={50} suffix="%" className="font-display text-4xl font-bold text-cyan-light" />
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Menos agua en procesamiento de alimentos post-cosecha.</p>
          </Reveal>
          <Reveal delay={0.12} className="glass p-8">
            <AnimatedCounter target={40} suffix="%" className="font-display text-4xl font-bold text-cyan-light" />
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Más producción de petróleo sin químicos añadidos.</p>
          </Reveal>
          <Reveal className="glass p-8">
            <div className="flex items-start gap-0.5 font-display text-4xl font-bold text-cyan-light">
              <AnimatedCounter target={550} suffix="" />
              <sup className="mt-1 text-2xl">+</sup>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Cuerpos de agua tratados y restaurados sin químicos.</p>
          </Reveal>
          <Reveal delay={0.06} className="glass p-8">
            <AnimatedCounter target={15} suffix="%" className="font-display text-4xl font-bold text-cyan-light" />
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Aumento promedio en rendimiento de cultivos.</p>
          </Reveal>
          <Reveal delay={0.12} className="glass p-8">
            <AnimatedCounter target={20} suffix="k" className="font-display text-4xl font-bold text-cyan-light" />
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Toneladas de CO₂ reducidas en acuicultura.</p>
          </Reveal>
        </div>
      </section>

      {/* Applications strip */}
      <section className="px-5 py-[var(--section-y)] sm:px-8">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative overflow-hidden rounded-[1.75rem]">
            <div className="glass relative aspect-[4/3] overflow-hidden p-2 sm:aspect-[14/9]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] sm:rounded-[1.5rem]">
                <Image
                  src="/images/water_hands.jpg"
                  alt="Manos sosteniendo agua pura con nanoburbujas"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                aria-hidden
              />
              <div className="absolute left-4 top-4 glass rounded-full px-3 py-1.5 text-xs font-medium text-white/95">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-light" />
                Agua tratada en tiempo real
              </div>
              <div className="absolute bottom-4 left-4 glass rounded-full px-3 py-1.5 text-xs font-medium text-white/95">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />0 químicos añadidos
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <div className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-zinc-400">
                Soluciones plug & play
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Transformando industrias <span className="text-gradient">a nivel global</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-zinc-400">
                Desde la acuicultura hasta el tratamiento de aguas residuales municipales, nuestras soluciones se integran
                en infraestructuras existentes sin interrumpir las operaciones.
              </p>
            </Reveal>
            <div className="space-y-4">
              {[
                { icon: '💧', title: 'Agua Superficial', desc: 'Eliminación de algas, olores y restauración natural de lagos y embalses.' },
                { icon: '🏭', title: 'Aguas Residuales', desc: 'Tratamiento eficiente para plantas industriales y municipales sin químicos.' },
                { icon: '🐟', title: 'Acuicultura', desc: 'Prevención de hipoxia y mejora en la tasa de conversión alimenticia.' },
              ].map((item, i) => (
                <Reveal key={item.title} delay={0.04 * i}>
                  <div className="glass flex gap-4 rounded-2xl p-5 transition-[transform,opacity] duration-300 ease-out hover:translate-y-[-2px]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white">{item.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industrias" className={navSectionClass}>
        <SectionHeader
          badge="Sectores que apoyamos"
          title={
            <>
              Una tecnología, <span className="text-gradient">infinitas aplicaciones</span>
            </>
          }
        />
        <div className="mx-auto grid max-w-[1320px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/*
            No usar display:contents en el padre de Framer whileInView: sin caja, el observer nunca
            entra en vista y los hijos se quedan en opacity:0.
          */}
          <RevealStagger
            className="col-span-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
            children={[
              <IndustryCard
                key="e0"
                icon="🐟"
                title="Acuicultura"
                desc="Mejora el bienestar de los peces, la calidad del agua y reduce costes de oxígeno hasta un 60%."
              />,
              <IndustryCard
                key="e1"
                icon="🌱"
                title="Agricultura"
                desc="Aumenta la producción más de un 10% reduciendo agua, fertilizantes y químicos."
              />,
              <IndustryCard
                key="e2"
                icon="🏞️"
                title="Lagos & Lagunas"
                desc="Acelera la recuperación natural de cuerpos de agua sin uso de químicos."
              />,
              <IndustryCard
                key="e3"
                icon="⛽"
                title="Recursos Naturales"
                desc="Mejora la separación y aumenta la producción de petróleo en pozos más de un 40%."
              />,
              <IndustryCard
                key="e4"
                icon="🥩"
                title="Alimentos & Bebidas"
                desc="Mejora la higiene alimentaria y el control de patógenos en líneas de producción."
              />,
              <IndustryCard
                key="e5"
                icon="🏭"
                title="Industrial"
                desc="Optimiza procesos de tratamiento, mezclas y reactores en plantas industriales pesadas."
              />,
            ]}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 py-[var(--section-y)] sm:px-8">
        <SectionHeader
          badge="Testimonios"
          title={
            <>
              Lo que dicen <span className="text-gradient">nuestros clientes</span>
            </>
          }
        />
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <TestimonialCarousel />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={navSectionClass}>
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-zinc-400">
                FAQ
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Respuestas a las
                <br />
                <span className="text-gradient">preguntas más frecuentes</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-zinc-400">¿Tienes más preguntas? Conecta con un experto de nuestro equipo en menos de 24h.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="#contacto"
                className="inline-flex rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/90 transition-[transform,background-color] hover:bg-white/[0.06]"
              >
                Hablar con un experto
              </Link>
            </Reveal>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {[
              {
                q: '¿Qué son las nanoburbujas exactamente?',
                a: 'Burbujas de gas con un diámetro inferior a 200 nanómetros — aproximadamente 2.500 veces más pequeñas que un grano de sal. Por su tamaño, no flotan: permanecen suspendidas durante semanas y aportan oxígeno o cualquier gas directamente donde el proceso lo necesita.',
                open: true,
              },
              {
                q: '¿Cuánto tiempo lleva Moleaer en el mercado?',
                a: 'Moleaer fue fundada en 2016 por Warren Russell y Bruce Scholten. Desde entonces somos el líder global en tecnología de nanoburbujas con instalaciones en más de 50 países.',
              },
              {
                q: '¿Cuáles son sus propiedades físicas únicas?',
                a: 'Superficie fuertemente cargada negativamente, capacidad de separar partículas, liberación de radicales hidroxilo que destruyen contaminantes, y flotabilidad neutra que las mantiene suspendidas durante semanas.',
              },
              {
                q: '¿Existe opción de alquiler (NaaS)?',
                a: 'Sí. Nuestro servicio Nanobubbles-as-a-Service permite alquileres modulares y flexibles entre 2 y 200 m³/h, ideales para demandas estacionales o pruebas piloto.',
              },
              {
                q: '¿Por qué mejora el crecimiento vegetal?',
                a: 'Las nanoburbujas de oxígeno sobre-saturan el agua de riego con oxígeno disuelto que llega hasta la zona radicular. Esto optimiza la respiración celular y la absorción de nutrientes, además de suprimir patógenos y biofilm.',
              },
              {
                q: '¿Hay soporte técnico disponible?',
                a: 'Contamos con la red de soporte más amplia del sector. Servicio técnico local en 50+ países e ingenieros especializados por industria. Disponible vía portal, email o WhatsApp Business.',
              },
            ].map((item) => (
              <Reveal key={item.q}>
                <FaqDetails
                  className="faq-item group glass open:ring-1 open:ring-cyan/20"
                  initiallyOpen={Boolean(item.open)}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-white">
                    <span>{item.q}</span>
                    <span className="faq-icon text-xl text-cyan-light/80">+</span>
                  </summary>
                  <div className="border-t border-white/10 px-5 pb-5 pt-0">
                    <p className="pt-4 text-sm leading-relaxed text-zinc-400">{item.a}</p>
                  </div>
                </FaqDetails>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className={`${navSectionClass} pb-[calc(var(--section-y)+3rem)]`}>
        <Reveal className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-zinc-400">
              Ponte en contacto
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Diseñemos juntos
              <br />
              <span className="text-gradient">tu solución de nanoburbujas</span>
            </h2>
            <p className="text-lg leading-relaxed text-zinc-400">
              Nuestros ingenieros estudiarán tu caso y te presentarán una solución a medida en menos de 48h.
            </p>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex gap-2">
                <span className="text-cyan-light">✓</span> Evaluación gratuita por industria
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-light">✓</span> Plan piloto NaaS disponible
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-light">✓</span> Soporte técnico local 24/7
              </li>
            </ul>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-white/18 px-5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/[0.06]"
              >
                <span className="text-emerald-400">W</span> WhatsApp Business
              </Link>
              <span className="text-sm text-zinc-500">+34 950 062 953</span>
            </div>
          </div>
          <ContactForm />
        </Reveal>
      </section>
    </main>
  );
}

function IndustryCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <Link
      href="#"
      className="glass group block rounded-[1.75rem] p-8 transition-[transform,opacity] duration-300 ease-out hover:translate-y-[-3px]"
    >
      <div className="mb-4 text-2xl" aria-hidden>
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-cyan-light opacity-90 transition-opacity group-hover:opacity-100">
        Explorar →
      </span>
    </Link>
  );
}
