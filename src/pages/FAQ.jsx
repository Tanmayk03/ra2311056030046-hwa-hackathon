import { ChevronDown } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const questions = [
  {
    question: 'Are the products and prices real?',
    answer:
      'No. The collection shown here is a placeholder range. Product names, details, photography and prices are unconfirmed and are labelled as placeholders throughout the site.',
  },
  {
    question: 'Does the checkout take payment?',
    answer:
      'No. Checkout is a demonstration. It sends a test order to a demo endpoint and shows a confirmation reference. No payment details are requested or processed.',
  },
  {
    question: 'Will I get delivery updates?',
    answer:
      'No. Delivery information is still to be confirmed, so this demo does not promise dispatch times, shipping methods or tracking.',
  },
  {
    question: 'What happens to the details I enter?',
    answer:
      'The checkout and contact forms are demonstrations. The information is used to show the form working and is not stored after you leave the page.',
  },
  {
    question: 'Why is there a golden retriever on the homepage?',
    answer:
      'The dog is a playful companion that appears after the door opens. You can move your pointer or finger to get its attention, tap it for a greeting, and watch its pose change as you scroll.',
  },
  {
    question: 'Is the site accessible?',
    answer:
      'The site includes keyboard-friendly navigation, visible focus states, reduced-motion support and clear labels. The dog is decorative and is not needed to use the store.',
  },
]

export default function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="Good to know"
        title="Frequently asked questions"
        intro="Straight answers about this demonstration storefront, its placeholder products and the demo checkout."
      />

      <section className="page-shell py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="The details" align="center" />
          <div className="mt-10 space-y-4">
            {questions.map(({ question, answer }) => (
              <details key={question} className="group card-surface px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-lg font-extrabold marker:hidden">
                  {question}
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-brand-blue transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-4 leading-relaxed text-brand-navy/75">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
