import { realProducts } from './realProducts.js'

// Small, transparent Q&A helper. Every answer below comes from the company
// pages or the supplied product content; no prices, delivery promises,
// certifications or product claims are added.
export const chatSuggestions = [
  'What is HABI?',
  'How does PAWCTRL work?',
  'Does VOX understand feelings?',
  'Are prices confirmed?',
  'Tell me about the company',
]

export const chatAnswers = [
  {
    id: 'price',
    phrases: ['price', 'prices', 'pricing', 'cost', 'how much', 'buy', 'purchase'],
    answer: {
      paragraphs: [
        'Pricing is coming soon. No confirmed prices are shown for HABI, PAWCTRL or VOX, and there is no add-to-cart for them yet.',
        'You can use “coming soon / notify me” on any product card to register demo interest. No email is actually sent.',
      ],
      links: [{ label: 'See the collection', to: '/shop' }],
    },
  },
  {
    id: 'delivery',
    phrases: ['delivery', 'deliver', 'dispatch', 'shipping', 'ship', 'tracking', 'stock', 'in stock', 'when will it arrive'],
    answer: {
      paragraphs: [
        'No stock quantities, dispatch times, shipping methods or tracking are promised on this site. Those details have not been confirmed.',
      ],
      links: [{ label: 'Read the FAQ', to: '/faq' }],
    },
  },
  {
    id: 'validation',
    phrases: ['certified', 'certification', 'test results', 'clinical', 'final specifications', 'are specs final', 'proposed', 'real', 'are products real'],
    answer: {
      paragraphs: [
        'All dimensions, materials and technical details are proposed, subject to validation with physical prototypes. No certifications, test results, clinical benefits or prices are claimed.',
      ],
      links: [{ label: 'View product details', to: '/products/habi' }],
    },
  },
  {
    id: 'company',
    phrases: ['company', 'about', 'who are you', 'who is happy while away', 'what do you do', 'brand'],
    answer: {
      paragraphs: [
        'Happy While Away is a premium dog enrichment brand built around one idea: “A little adventure while you’re away.”',
        'The brand is playful, premium, friendly and trustworthy. It focuses on thoughtful enrichment for the hours dogs spend without their people.',
      ],
      links: [{ label: 'Our story', to: '/about' }],
    },
  },
  {
    id: 'products',
    phrases: ['products', 'collection', 'range', 'what do you sell', 'what do you have', 'shop'],
    answer: {
      paragraphs: [
        'The collection has three proposed products: HABI, a modular comfort and enrichment hub; PAWCTRL, smart paw detection with automatic comfort lighting; and VOX, a familiar-voice companion.',
        'Each has its own product page with the supplied details, gallery, downloads and FAQs. Pricing is coming soon.',
      ],
      links: [{ label: 'Shop the collection', to: '/shop' }],
    },
  },
  {
    id: 'compatibility',
    phrases: ['need pawctrl', 'need vox', 'work without', 'work together', 'compatible', 'compatibility'],
    answer: {
      paragraphs: [
        'HABI works on its own as a comfort and enrichment space. PAWCTRL adds automatic comfort lighting, and VOX adds owner-voice playback.',
        'PAWCTRL can also control the PAWCTRL Glow lamp without HABI. VOX can be used on its own too; with HABI it can stay quiet while your dog rests in the den.',
      ],
      links: [{ label: 'Compare the family', to: '/shop' }],
    },
  },
  {
    id: 'dog',
    phrases: ['dog', 'retriever', 'golden retriever', 'dog on the page', 'why is there a dog'],
    answer: {
      paragraphs: [
        'The retriever is a playful companion that appears after the door opens. It follows your pointer or touch, wags, blinks and changes pose as you scroll.',
        'Tap the dog to open this chat. The site is fully usable without it, and reduced-motion settings are respected.',
      ],
      links: [{ label: 'Accessibility FAQ', to: '/faq' }],
    },
  },
  {
    id: 'contact',
    phrases: ['contact', 'email', 'call', 'reach you', 'speak to someone', 'question'],
    answer: {
      paragraphs: [
        'No contact address has been supplied for this demo. The contact form demonstrates a working submission, but no email is sent and no details are stored.',
      ],
      links: [{ label: 'Open the contact form', to: '/contact' }],
    },
  },
  {
    id: 'checkout',
    phrases: ['checkout', 'payment', 'pay', 'order', 'test order'],
    answer: {
      paragraphs: [
        'Checkout is a demonstration. It sends a test order to a demo endpoint and shows a confirmation reference. No payment details are requested or processed.',
      ],
      links: [{ label: 'Read the FAQ', to: '/faq' }],
    },
  },
  {
    id: 'privacy',
    phrases: ['privacy', 'data', 'details i enter', 'stored', 'recordings'],
    answer: {
      paragraphs: [
        'For VOX, sound is processed on the device by default; only short dog-sound clips are kept with your consent to personalise the model. Other sounds are discarded, and a hardware mic-mute switch is provided.',
        'The checkout and contact forms are demonstrations. The information is used to show the form working and is not stored after you leave the page.',
      ],
      links: [{ label: 'VOX details', to: '/products/vox' }],
    },
  },
  {
    id: 'habi',
    phrases: ['habi', 'what is habi', 'how does habi work', 'den', 'sniff tile', 'lick station'],
    answer: {
      paragraphs: [
        `${realProducts.habi.tagline} ${realProducts.habi.oneLiner}`,
        'It combines a semi-enclosed resting den with a fleece sniff tile, scent ports, a sliding treat drawer, a removable lick station and a play post with a rope toy — all on one footprint.',
      ],
      links: [{ label: 'Explore HABI', to: '/products/habi' }],
    },
  },
  {
    id: 'pawctrl',
    phrases: ['pawctrl', 'how does pawctrl work', 'sensor mat', 'glow lamp', 'comfort lighting'],
    answer: {
      paragraphs: [
        `${realProducts.pawctrl.tagline} ${realProducts.pawctrl.oneLiner}`,
        'A pressure-sensing grid notices when your dog stays on the mat. After the settling time you choose, the den light and Glow lamp fade gradually to your comfort scene, never below the safe-visibility floor.',
      ],
      links: [{ label: 'Explore PAWCTRL', to: '/products/pawctrl' }],
    },
  },
  {
    id: 'vox',
    phrases: ['vox', 'what is vox', 'how does vox work', 'voice companion', 'familiar voice'],
    answer: {
      paragraphs: [
        `${realProducts.vox.tagline} ${realProducts.vox.oneLiner}`,
        'You record short messages in the app. After about 10 days of learning your dog’s recurring sound patterns, and once you switch on active mode, VOX can play a matching message following the rules you set.',
      ],
      links: [{ label: 'Explore VOX', to: '/products/vox' }],
    },
  },
  {
    id: 'vox-feelings',
    phrases: ['understand feelings', 'understand my dog', 'separation anxiety', 'cure', 'treatment', 'emotions'],
    answer: {
      paragraphs: [
        'No. VOX recognises recurring sound patterns, such as repeated barking. It does not understand your dog’s exact emotions or thoughts, and bark classification is not perfect.',
        'VOX is not a treatment for separation anxiety. For behaviour concerns, speak to a vet or qualified behaviour professional.',
      ],
      links: [{ label: 'Read VOX FAQs', to: '/products/vox' }],
    },
  },
  {
    id: 'setup',
    phrases: ['setup', 'set up', 'assemble', 'assembly', 'assemble habi', 'install', 'how do i set it up'],
    answer: {
      paragraphs: [
        'Each product page has a full setup section. HABI uses four den panels with tool-free twist-locks and click-in enrichment modules; PAWCTRL lays under the HABI cushion or beside a resting place; VOX sits on a stable surface or bracket out of your dog’s reach.',
      ],
      links: [
        { label: 'HABI setup', to: '/products/habi' },
        { label: 'PAWCTRL setup', to: '/products/pawctrl' },
        { label: 'VOX setup', to: '/products/vox' },
      ],
    },
  },
  {
    id: 'downloads',
    phrases: ['manual', 'quick start', 'download', 'pdf', 'instructions'],
    answer: {
      paragraphs: [
        'Instruction manuals and quick-start guides are available as PDF downloads on each product page.',
      ],
      links: [
        { label: 'HABI downloads', to: '/products/habi' },
        { label: 'PAWCTRL downloads', to: '/products/pawctrl' },
        { label: 'VOX downloads', to: '/products/vox' },
      ],
    },
  },
]

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function scoreAnswer(entry, question) {
  let score = 0
  for (const phrase of entry.phrases) {
    if (phrase.includes(' ')) {
      if (question.includes(phrase)) score += 3
    } else if (new RegExp(`\\b${escapeRegExp(phrase)}\\b`).test(question)) {
      score += phrase.length > 3 ? 2 : 1
    }
  }
  return score
}

export function findChatAnswer(question) {
  const normalized = question.toLowerCase().trim()
  let best = null
  let bestScore = 0

  for (const entry of chatAnswers) {
    const score = scoreAnswer(entry, normalized)
    if (score > bestScore) {
      best = entry
      bestScore = score
    }
  }

  if (bestScore >= 2) return best.answer

  return {
    paragraphs: [
      'I don’t have an answer for that in this demo. I can help with the company, the three products, setup, downloads, pricing status, privacy and the retriever.',
      'You can also use the regular FAQ or the contact form.',
    ],
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
  }
}
