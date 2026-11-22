import { useState } from 'react'

export default function ProductGallery({ gallery, name }) {
  const [active, setActive] = useState(0)

  return (
    <div className="card-surface p-3 sm:p-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-pale">
        {gallery.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-contain transition duration-500 ease-out ${
              index === active ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'
            }`}
          />
        ))}
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-brand-blue shadow-soft">
          {active + 1} / {gallery.length}
        </span>
      </div>

      <div
        className="mt-3 flex gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label={`${name} image gallery`}
      >
        {gallery.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1}: ${image.alt}`}
            aria-pressed={active === index}
            className={`shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 transition ${
              active === index
                ? 'border-brand-blue shadow-soft'
                : 'border-transparent hover:border-brand-light'
            }`}
          >
            <img
              src={image.src}
              alt=""
              loading="lazy"
              className="h-14 w-20 object-contain sm:h-16 sm:w-24"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
