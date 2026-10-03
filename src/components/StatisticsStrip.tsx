import type { Statistic } from '../data/home'
import { Reveal } from './Reveal'

interface StatisticsStripProps {
  statistics: Statistic[]
}

export function StatisticsStrip({ statistics }: StatisticsStripProps) {
  return (
    <section aria-labelledby="statistics-title" className="relative py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="panel corner-marks">
            <div className="flex flex-col gap-3 border-b border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <h2
                id="statistics-title"
                className="font-display text-sm font-medium tracking-[0.24em] text-white uppercase"
              >
                Framework at a Glance
              </h2>
              <p className="inline-flex items-center gap-2.5 self-start border border-sky/40 bg-azure/10 px-3 py-1.5 text-[0.5625rem] font-semibold tracking-[0.3em] text-sky uppercase sm:self-auto">
                <span aria-hidden className="size-1 rotate-45 bg-sky" />
                Parliamentary Metrics
              </p>
            </div>

            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {statistics.map((statistic, index) => (
                <div
                  key={statistic.label}
                  className={`group relative flex flex-col-reverse gap-4 px-6 py-10 sm:px-10 sm:py-14 ${
                    index % 2 === 1 ? 'border-l border-line' : ''
                  } ${index >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${
                    index === 2 ? 'lg:border-l' : ''
                  }`}
                >
                  <dt className="text-[0.625rem] leading-relaxed font-semibold tracking-[0.26em] text-muted uppercase sm:text-[0.6875rem]">
                    {statistic.label}
                  </dt>
                  <dd className="font-display text-5xl leading-none font-medium tracking-[0.04em] text-white transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_30px_rgba(25,118,210,0.9)] sm:text-6xl lg:text-7xl">
                    {statistic.value}
                  </dd>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-6 h-px w-10 bg-sky transition-[width] duration-700 ease-expo group-hover:w-24 sm:left-10"
                  />
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
