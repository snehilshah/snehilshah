import {
  Award,
  BriefcaseBusiness,
  ChartLine,
  FlaskConical,
  School
} from 'lucide-react'
import Heading from '../Heading'
import TimelineProgress from './TimelineProgress'

const experience = [
  {
    years: '2024–Now',
    period: 'Jul 2024 – Present',
    role: 'Associate Engineer II',
    organization: 'N7.io',
    link: 'https://www.n7.io',
    context: 'CDN and distributed cloud infrastructure',
    award: 'Rising Star Award',
    points: [
      'Build the Go microservices behind the CDN product, served over gRPC with a REST gateway and JWT auth.',
      'Set up Kubernetes monitoring with Prometheus and Grafana, keeping pod uptime near 99.9%.',
      'Run browser-automation services (ChromeDP, Playwright, Puppeteer) handling 50,000+ requests a day.',
      'Built event-driven pipelines on GCP Pub/Sub feeding BigQuery for analytics and alerting.'
    ],
    tags: ['Go', 'gRPC', 'Kubernetes', 'GCP', 'Pub/Sub', 'MongoDB'],
    Icon: BriefcaseBusiness
  },
  {
    years: '2023–24',
    period: 'Jun 2023 – Mar 2024',
    role: 'Research Intern',
    organization: 'IIT Bombay',
    context: 'Hyperspectral image classification with few-shot learning',
    points: [
      'Evaluated a few-shot learning framework on benchmark hyperspectral datasets, improving classification accuracy over the baseline.'
    ],
    tags: ['Python', 'TensorFlow', 'Few-shot learning'],
    Icon: FlaskConical
  },
  {
    years: '2022–23',
    period: 'Dec 2022 – Mar 2023',
    role: 'Software Development Intern',
    organization: 'Indian Development Foundation (Balgurukul)',
    points: [
      'Built and deployed a student-data portal used across 300+ Balgurukuls to collect and organise student records.'
    ],
    tags: ['Next.js', 'Tailwind', 'MySQL'],
    Icon: School
  },
  {
    years: '2022',
    period: 'Aug – Sep 2022',
    role: 'Python Developer Intern',
    organization: 'Second Source',
    points: [
      'Wrote Python algorithms on yfinance data to find demand and supply zones and recurring trading patterns.'
    ],
    tags: ['Python', 'NumPy', 'Pandas'],
    Icon: ChartLine
  }
]

const Organization = ({ name, link }) =>
  link ? (
    <a
      target='_blank'
      href={link}
      rel='noopener noreferrer'
      className='underline decoration-cyan-500/60 underline-offset-2 transition-colors hover:text-cyan-300'
    >
      {name}
    </a>
  ) : (
    name
  )

const Timeline = () => {
  return (
    <section
      className='max-w-(--breakpoint-xl) mx-auto overflow-x-hidden'
      id='experience'
    >
      <div className='text-white'>
        <Heading
          title={'Experience'}
          details={'Where I have worked and what I built'}
        />
      </div>

      <div className='relative pb-20'>
        {experience.map(
          ({
            years,
            period,
            role,
            organization,
            link,
            context,
            award,
            points,
            tags,
            Icon
          }) => (
            <div
              key={organization}
              className='flex justify-start pt-10 md:gap-10 md:pt-24'
            >
              {/* Sticky left: dot + years */}
              <div className='sticky top-28 z-20 flex max-w-xs flex-col items-center self-start md:w-full md:max-w-sm md:flex-row'>
                <div className='absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-stone-400 ring-4 ring-[#0097A7] md:left-2'>
                  <Icon className='h-5 w-5 text-stone-800' aria-hidden='true' />
                </div>
                <p className='hidden text-4xl font-bold text-stone-400 md:block md:pl-24 lg:text-5xl'>
                  {years}
                </p>
              </div>

              {/* Right: content card */}
              <div className='relative w-full pl-20 pr-2 md:pl-4'>
                <p className='mb-2 block text-2xl font-bold text-stone-400 md:hidden'>
                  {years}
                </p>
                <article className='rounded-lg bg-stone-700/60 p-5 text-white shadow-[2px_5px_4px_0px_#0097A7] backdrop-blur-sm'>
                  <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
                    <h3 className='text-xl font-semibold'>{role}</h3>
                    <p className='text-sm text-stone-300'>{period}</p>
                  </div>
                  <p className='text-cyan-100'>
                    <Organization name={organization} link={link} />
                  </p>
                  {context && (
                    <p className='mt-1 text-sm text-stone-300'>{context}</p>
                  )}
                  {award && (
                    <p className='mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-300/15 px-3 py-1 text-xs font-medium text-amber-200'>
                      <Award className='h-3.5 w-3.5' aria-hidden='true' />
                      {award}
                    </p>
                  )}
                  <ul className='mt-3 list-disc space-y-1.5 pl-5 font-supreme text-sm leading-relaxed text-stone-200 marker:text-cyan-400'>
                    {points.map(point => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <ul
                    className='mt-4 flex flex-wrap gap-2'
                    aria-label='Technologies'
                  >
                    {tags.map(tag => (
                      <li
                        key={tag}
                        className='rounded-md bg-stone-900/60 px-2 py-0.5 text-xs text-cyan-100'
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          )
        )}

        <p className='px-4 pt-12 text-center text-sm text-stone-400'>
          Also led the projects team at the college Research Cell (2022–2024):
          16 people, six client projects delivered.
        </p>

        {/* Progress line */}
        <div className='absolute inset-y-0 left-8 w-[2px] overflow-hidden bg-stone-600/40 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]'>
          <TimelineProgress />
        </div>
      </div>
    </section>
  )
}

export default Timeline
