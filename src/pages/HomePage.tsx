import { FeatureCard } from '../components/FeatureCard'
import { HeroSection } from '../components/HeroSection'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { StatisticsStrip } from '../components/StatisticsStrip'
import { FEATURES, STATISTICS } from '../data/home'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle()

  return (
    <>
      <HeroSection />

      <section
        id="institution"
        aria-labelledby="institution-title"
        className="relative scroll-mt-24 border-t border-line pt-24 lg:pt-36"
      >
        <div className="shell">
          <Reveal>
            <SectionHeading
              id="institution-title"
              eyebrow="The Institution"
              title="The Alpha Judiciary Parliament"
              description="The Alpha Judiciary Parliament is presented as a structured institutional framework through which qualifying AlphaWales cases may be reviewed for possible pardon or sentence reconsideration."
            />
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <li key={feature.number} className={index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}>
                <Reveal delay={index * 140} className="h-full">
                  <FeatureCard {...feature} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StatisticsStrip statistics={STATISTICS} />
    </>
  )
}
