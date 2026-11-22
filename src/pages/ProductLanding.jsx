import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import ProductGallery from '../components/ProductGallery.jsx'
import NotifyMe from '../components/NotifyMe.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { productOrder, realProducts } from '../data/realProducts.js'

const proposedNote = 'proposed, subject to validation'

function Bullets({ items }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-navy/80">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-cyan" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function DataTable({ rows, head }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-brand-light bg-white">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-brand-pale text-brand-navy">
            {head.map((label) => (
              <th key={label} className="px-5 py-3 font-extrabold">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`} className="border-t border-brand-light align-top">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className={`px-5 py-3 ${cellIndex === 0 ? 'font-bold text-brand-navy' : 'text-brand-navy/75'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ProductLanding({ productKey }) {
  const product = realProducts[productKey]

  if (!product) {
    return (
      <>
        <PageHero eyebrow="Not found" title="Product not found" />
        <div className="page-shell py-16">
          <Link to="/" className="btn-primary">
            <ArrowLeft size={18} aria-hidden="true" /> Back to home
          </Link>
        </div>
      </>
    )
  }

  const otherProducts = productOrder.filter((slug) => slug !== product.slug)

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        intro={product.tagline}
      />

      <section className="page-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <ProductGallery gallery={product.gallery} name={product.name} />
            <p className="mt-3 text-xs leading-relaxed text-brand-navy/60">{product.imageNote}</p>
          </div>

          <div>
            <p className="font-display text-2xl font-extrabold text-brand-navy">{product.fullName}</p>
            <p className="mt-4 text-lg leading-relaxed text-brand-navy/80">{product.oneLiner}</p>
            <p className="mt-6 leading-relaxed text-brand-navy/75">{product.description}</p>

            <div className="mt-7 rounded-3xl border border-brand-light bg-brand-pale/70 p-5">
              <p className="text-sm font-extrabold text-brand-navy">Good to know</p>
              <p className="mt-1 text-sm leading-relaxed text-brand-navy/70">
                {product.problem} {product.why}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <NotifyMe product={product.name} />
              <a href="#downloads" className="btn-ghost">
                <Download size={18} aria-hidden="true" /> Downloads
              </a>
            </div>

            <div className="mt-10 border-t border-brand-light pt-6">
              <p className="eyebrow">Explore the family</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {otherProducts.map((slug) => (
                  <Link
                    key={slug}
                    to={`/products/${slug}`}
                    className="rounded-full bg-brand-pale px-4 py-2 text-sm font-bold text-brand-blue transition hover:bg-brand-light"
                  >
                    {realProducts[slug].name} <ArrowRight size={14} className="ml-1 inline" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="page-shell">
          <SectionHeading eyebrow="Step by step" title="How it works" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {product.howItWorks.map((step, index) => (
              <div key={step.title} className="card-surface p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue font-display font-extrabold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <SectionHeading eyebrow="The details" title="Key features" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-brand-light bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
                <Sparkles size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">{feature.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="page-shell">
          <SectionHeading eyebrow="Why it matters" title="Benefits" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="card-surface p-7">
              <h3 className="font-display text-2xl font-extrabold">For dogs</h3>
              <Bullets items={product.benefits.dogs} />
            </div>
            <div className="card-surface p-7">
              <h3 className="font-display text-2xl font-extrabold">For owners</h3>
              <Bullets items={product.benefits.owners} />
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Technical details" title="Specifications" />
          <span className="rounded-full bg-brand-pale px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            {proposedNote}
          </span>
        </div>
        <div className="mt-8">
          <DataTable rows={product.specs} head={['Specification', 'Proposed value']} />
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-extrabold">Materials, colours & finishes</h3>
          <span className="rounded-full bg-brand-pale px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            {proposedNote}
          </span>
        </div>
        <div className="mt-6">
          <DataTable rows={product.materials} head={['Part', 'Proposed material / finish', 'Colour']} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
                <FileText size={20} aria-hidden="true" />
              </span>
              <h2 className="font-display text-2xl font-extrabold">What’s in the box</h2>
            </div>
            <Bullets items={product.inTheBox} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
                <CheckCircle2 size={20} aria-hidden="true" />
              </span>
              <h2 className="font-display text-2xl font-extrabold">Setup</h2>
            </div>
            <ol className="mt-4 space-y-3">
              {product.setup.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-brand-navy/80">
                  <span className="font-extrabold text-brand-blue">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="card-surface p-7">
            <h2 className="font-display text-2xl font-extrabold">Care & maintenance</h2>
            <Bullets items={product.care} />
          </div>
          <div className="card-surface p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <h2 className="font-display text-2xl font-extrabold">Safety information</h2>
            </div>
            <Bullets items={product.safety} />
          </div>
        </div>
        {product.privacy && (
          <div className="card-surface mt-6 p-7">
            <h2 className="font-display text-2xl font-extrabold">Privacy</h2>
            <Bullets items={product.privacy} />
          </div>
        )}
      </section>

      <section id="downloads" className="bg-white py-16 sm:py-20">
        <div className="page-shell">
          <SectionHeading eyebrow="Documents" title="Downloads" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {product.downloads.map((download) => (
              <a
                key={download.href}
                href={download.href}
                target="_blank"
                rel="noreferrer"
                className="card-surface flex items-center justify-between gap-4 p-6 transition hover:-translate-y-1"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
                    <Download size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-extrabold">{download.label}</span>
                    <span className="block text-xs font-bold uppercase tracking-widest text-brand-navy/50">
                      PDF document
                    </span>
                  </span>
                </span>
                <ArrowRight size={20} className="text-brand-blue" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <SectionHeading eyebrow="Good to know" title={`${product.name} FAQs`} align="center" />
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {product.faqs.map(({ q, a }) => (
            <details key={q} className="group card-surface px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-lg font-extrabold marker:hidden">
                {q}
                <ArrowRight
                  size={18}
                  className="shrink-0 text-brand-blue transition-transform duration-200 group-open:rotate-90"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-4 leading-relaxed text-brand-navy/75">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
