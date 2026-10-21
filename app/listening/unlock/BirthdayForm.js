'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  CircleX,
  ChevronRight,
  LoaderCircle,
  X
} from 'lucide-react'

const MONTHS = Array.from({ length: 12 }, (_, month) =>
  new Date(2000, month, 1).toLocaleString('en-GB', { month: 'long' })
)
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const ERRORS = {
  limited: 'A few too many guesses. Come back in 15 minutes.',
  unavailable: 'Please try again in a little while.',
  connection: 'Couldn’t connect. Try again.'
}
const iso = date =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

// What this browser says about itself, sent with each attempt.
function gpu() {
  try {
    const gl = document.createElement('canvas').getContext('webgl')
    const debug = gl?.getExtension('WEBGL_debug_renderer_info')
    return gl?.getParameter(debug ? debug.UNMASKED_RENDERER_WEBGL : gl.RENDERER)
  } catch {
    return undefined
  }
}

// A random ID kept in this browser, to tell repeat visitors apart.
let visit
function visitor() {
  if (visit) return visit
  try {
    const saved = JSON.parse(localStorage.getItem('music-gate-visitor'))
    visit = saved?.id
      ? { ...saved, visits: (Number(saved.visits) || 0) + 1 }
      : {
          id: Math.random().toString(36).slice(2, 10),
          first: new Date().toISOString(),
          visits: 1
        }
    localStorage.setItem('music-gate-visitor', JSON.stringify(visit))
  } catch {
    visit = {}
  }
  return visit
}

async function describeBrowser() {
  const n = navigator
  const media = query => matchMedia(query).matches
  const connection = n.connection
  const info = {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    languages: n.languages?.join(', '),
    screen: `${screen.width}×${screen.height}`,
    available: `${screen.availWidth}×${screen.availHeight}`,
    viewport: `${innerWidth}×${innerHeight}`,
    dpr: devicePixelRatio,
    colorDepth: screen.colorDepth,
    orientation: screen.orientation?.type,
    platform: n.platform,
    cores: n.hardwareConcurrency,
    memory: n.deviceMemory,
    touch: n.maxTouchPoints,
    scheme: media('(prefers-color-scheme: dark)') ? 'dark' : 'light',
    standalone: media('(display-mode: standalone)') || n.standalone === true,
    connection:
      connection &&
      [
        connection.type,
        connection.effectiveType,
        connection.downlink && `${connection.downlink} Mb/s`,
        connection.rtt && `${connection.rtt} ms`,
        connection.saveData && 'data saver'
      ]
        .filter(Boolean)
        .join(', '),
    gpu: gpu(),
    referrer: document.referrer,
    webdriver: n.webdriver === true,
    brave: Boolean(n.brave)
  }
  try {
    const hints = await n.userAgentData?.getHighEntropyValues([
      'architecture',
      'bitness',
      'formFactors',
      'fullVersionList',
      'model',
      'platformVersion'
    ])
    if (hints)
      info.hints = {
        platform: hints.platform,
        platformVersion: hints.platformVersion,
        model: hints.model,
        architecture: hints.architecture,
        bitness: hints.bitness,
        mobile: String(hints.mobile),
        formFactors: hints.formFactors?.join(', '),
        brands: (hints.fullVersionList || hints.brands || [])
          .filter(({ brand }) => !/not.?a.?brand/i.test(brand))
          .map(({ brand, version }) => `${brand} ${version}`)
          .join(', ')
      }
  } catch {
    /* Client hints are optional. */
  }
  return info
}

export function BirthdayForm({ next, initialError }) {
  const router = useRouter()
  const [, startNavigation] = useTransition()
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [failure, setFailure] = useState(initialError)
  const [attempt, setAttempt] = useState(0)
  const formRef = useRef(null)
  const report = useRef(null)
  const loadedAt = useRef(0)
  const guesses = useRef([])
  const error = ERRORS[failure]

  useEffect(() => {
    loadedAt.current = Date.now()
    const seen = visitor()
    report.current = describeBrowser().then(info => ({
      ...info,
      visitor: seen.id,
      firstSeen: seen.first,
      visits: seen.visits
    }))
    // A browser back navigation can restore this form from the page cache.
    const resetPending = () => setPending(false)
    window.addEventListener('pageshow', resetPending)
    return () => window.removeEventListener('pageshow', resetPending)
  }, [])

  async function submit(event) {
    event.preventDefault()
    if (pending || !selected) return
    const body = new FormData(event.currentTarget)
    const guess = iso(selected)
    setPending(true)
    setFailure(null)
    try {
      const info = await Promise.race([
        report.current,
        new Promise(resolve => setTimeout(resolve, 800))
      ])
      body.set(
        'client',
        JSON.stringify({
          ...info,
          localTime: new Date().toString(),
          onPage: Date.now() - loadedAt.current,
          tries: guesses.current.length + 1,
          guesses: guesses.current
        })
      )
      const response = await fetch('/api/listening/access', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
        cache: 'no-store',
        body,
        signal: AbortSignal.timeout(15000)
      })
      const result = await response.json()
      if (response.ok && result.next) {
        // Stay in the app: no full reload, so no blank flash between pages.
        startNavigation(() => router.replace(result.next))
        return
      }
      const code =
        result.error === 'incorrect'
          ? 'incorrect'
          : result.error in ERRORS
            ? result.error
            : 'unavailable'
      if (code === 'incorrect') guesses.current = [...guesses.current, guess].slice(-20)
      setFailure(code)
      setAttempt(value => value + 1)
      if (
        code === 'incorrect' &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        formRef.current
          ?.closest('.gate-card')
          ?.animate(
            [
              { transform: 'translateX(0) rotate(0)' },
              { transform: 'translateX(-8px) rotate(-1deg)' },
              { transform: 'translateX(7px) rotate(0.8deg)' },
              { transform: 'translateX(-5px) rotate(-0.5deg)' },
              { transform: 'translateX(3px) rotate(0.3deg)' },
              { transform: 'translateX(0) rotate(0)' }
            ],
            { duration: 520, easing: 'ease-in-out' }
          )
      }
    } catch {
      setFailure('connection')
    }
    setPending(false)
  }

  return (
    <form
      action='/api/listening/access'
      method='post'
      className='gate-form'
      ref={formRef}
      onSubmit={submit}
    >
      <input
        type='hidden'
        name='birthday'
        value={selected ? iso(selected) : ''}
      />
      <input type='hidden' name='next' value={next} />
      <label id='birthday-label' htmlFor='birthday-trigger'>
        When’s my birthday?
      </label>
      <button
        type='button'
        id='birthday-trigger'
        className='gate-date'
        data-rejected={failure === 'incorrect'}
        disabled={pending}
        aria-haspopup='dialog'
        aria-expanded={open}
        aria-controls={open ? 'birthday-calendar' : undefined}
        aria-labelledby='birthday-label birthday-value'
        aria-describedby={error ? 'gate-error' : undefined}
        onClick={() => setOpen(true)}
      >
        {failure === 'incorrect' ? (
          <CircleX size={19} aria-hidden='true' />
        ) : (
          <CalendarDays size={19} aria-hidden='true' />
        )}
        <span id='birthday-value' className={selected ? '' : 'placeholder'}>
          {selected ? selected.toLocaleDateString('en-GB') : 'DD / MM / YYYY'}
        </span>
        <ChevronRight size={16} aria-hidden='true' />
      </button>
      {open && (
        <CalendarDialog
          selected={selected}
          onClose={() => setOpen(false)}
          onSelect={date => {
            setSelected(date)
            setFailure(null)
            setOpen(false)
          }}
        />
      )}
      <div className='gate-feedback' aria-live='polite'>
        {failure === 'incorrect' && (
          <span key={attempt} className='sr-only'>
            That date didn’t unlock music. Try another date.
          </span>
        )}
        {error && (
          <p id='gate-error' className='gate-error'>
            {error}
          </p>
        )}
      </div>
      <button
        type='submit'
        className='gate-enter'
        disabled={!selected || pending}
      >
        Let me in{' '}
        {pending ? (
          <LoaderCircle size={18} className='gate-spinner' />
        ) : (
          <ArrowRight size={18} />
        )}
      </button>
      <noscript>
        <p className='gate-error'>
          Please enable JavaScript to use the calendar.
        </p>
      </noscript>
    </form>
  )
}

function CalendarDialog({ selected, onSelect, onClose }) {
  const picker = useRef(null)
  const today = new Date()
  const [view, setView] = useState(
    () => selected || new Date(today.getFullYear(), 0, 1)
  )
  const [focusedDay, setFocusedDay] = useState(selected?.getDate() || 1)
  const [panel, setPanel] = useState('days')
  const year = view.getFullYear()
  const month = view.getMonth()
  const count = new Date(year, month + 1, 0).getDate()
  const offset = (new Date(year, month, 1).getDay() + 6) % 7

  useEffect(() => {
    const dialog = picker.current
    const previous = document.activeElement
    dialog.showModal()
    dialog.querySelector('[data-date][tabindex="0"]')?.focus()
    return () => {
      dialog.close()
      previous?.focus({ preventScroll: true })
    }
  }, [])

  function changeView(next) {
    // Keep every month offered selectable, including after changing the year.
    const bounded =
      next > today ? new Date(today.getFullYear(), today.getMonth(), 1) : next
    setView(bounded)
    setFocusedDay(1)
  }

  function moveFocus(event, day) {
    const weekday = (new Date(year, month, day).getDay() + 6) % 7
    const steps = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -weekday,
      End: 6 - weekday
    }
    const next =
      event.key === 'PageUp' || event.key === 'PageDown'
        ? new Date(
            year,
            month + (event.key === 'PageUp' ? -1 : 1),
            Math.min(
              day,
              new Date(
                year,
                month + (event.key === 'PageUp' ? 0 : 2),
                0
              ).getDate()
            )
          )
        : event.key in steps
          ? new Date(year, month, day + steps[event.key])
          : null
    if (!next) return
    event.preventDefault()
    if (next > today || next.getFullYear() < 1900) return
    setView(new Date(next.getFullYear(), next.getMonth(), 1))
    setFocusedDay(next.getDate())
    requestAnimationFrame(() =>
      picker.current?.querySelector(`[data-date="${iso(next)}"]`)?.focus()
    )
  }

  return (
    <dialog
      id='birthday-calendar'
      className='gate-calendar'
      aria-labelledby='calendar-title'
      ref={picker}
      onCancel={event => {
        if (panel !== 'days') {
          event.preventDefault()
          const trigger =
            panel === 'months' ? 'calendar-month' : 'calendar-year'
          setPanel('days')
          document.getElementById(trigger)?.focus({ preventScroll: true })
        } else onClose()
      }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return
        const controls = [
          ...event.currentTarget.querySelectorAll('button, select')
        ].filter(control => !control.disabled && control.tabIndex >= 0)
        const index = controls.indexOf(document.activeElement)
        event.preventDefault()
        controls[
          (index + (event.shiftKey ? -1 : 1) + controls.length) %
            controls.length
        ]?.focus()
      }}
      onClick={event => {
        // The native dialog's backdrop is outside its bounds, but targets the dialog.
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose()
      }}
    >
      <div className='gate-calendar-top'>
        <h2 id='calendar-title'>Pick my birthdate</h2>
        <button
          type='button'
          className='gate-calendar-close'
          aria-label='Close calendar'
          onClick={onClose}
        >
          <X size={19} />
        </button>
      </div>
      <div className='gate-calendar-body'>
        <div className='gate-calendar-head'>
          <button
            type='button'
            aria-label='Previous month'
            disabled={panel !== 'days' || (year === 1900 && month === 0)}
            onClick={() => changeView(new Date(year, month - 1, 1))}
          >
            <ChevronLeft size={18} />
          </button>
          <div className='gate-calendar-selects'>
            <button
              type='button'
              id='calendar-month'
              aria-label={`Choose month, ${MONTHS[month]}`}
              aria-expanded={panel === 'months'}
              aria-controls='calendar-panel'
              onClick={() => setPanel(panel === 'months' ? 'days' : 'months')}
            >
              {MONTHS[month]} <ChevronDown size={14} aria-hidden='true' />
            </button>
            <button
              type='button'
              id='calendar-year'
              aria-label={`Choose year, ${year}`}
              aria-expanded={panel === 'years'}
              aria-controls='calendar-panel'
              onClick={() => setPanel(panel === 'years' ? 'days' : 'years')}
            >
              {year} <ChevronDown size={14} aria-hidden='true' />
            </button>
          </div>
          <button
            type='button'
            aria-label='Next month'
            disabled={
              panel !== 'days' ||
              (year >= today.getFullYear() && month >= today.getMonth())
            }
            onClick={() => changeView(new Date(year, month + 1, 1))}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        {panel === 'days' ? (
          <div
            id='calendar-panel'
            className='gate-calendar-grid'
            role='group'
            aria-label={`${MONTHS[month]} ${year}`}
          >
            {WEEKDAYS.map(day => (
              <span className='gate-weekday' key={day} aria-hidden='true'>
                {day}
              </span>
            ))}
            {Array.from({ length: 42 }, (_, index) => {
              const day = index - offset + 1
              if (day < 1 || day > count)
                return (
                  <span
                    key={index}
                    className='gate-calendar-empty'
                    aria-hidden='true'
                  />
                )
              const date = new Date(year, month, day)
              const value = iso(date)
              return (
                <button
                  key={index}
                  type='button'
                  data-date={value}
                  tabIndex={day === focusedDay ? 0 : -1}
                  aria-label={date.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  aria-pressed={Boolean(selected && iso(selected) === value)}
                  aria-current={iso(today) === value ? 'date' : undefined}
                  disabled={date > today}
                  onFocus={() => setFocusedDay(day)}
                  onClick={() => onSelect(date)}
                  onKeyDown={event => moveFocus(event, day)}
                >
                  {day}
                </button>
              )
            })}
          </div>
        ) : (
          <CalendarChoices
            key={panel}
            kind={panel}
            year={year}
            month={month}
            today={today}
            onChoose={value => {
              changeView(
                new Date(
                  panel === 'years' ? value : year,
                  panel === 'months' ? value : month,
                  1
                )
              )
              const trigger =
                panel === 'months' ? 'calendar-month' : 'calendar-year'
              setPanel('days')
              document.getElementById(trigger)?.focus({ preventScroll: true })
            }}
          />
        )}
      </div>
    </dialog>
  )
}

function CalendarChoices({ kind, year, month, today, onChoose }) {
  const container = useRef(null)
  const selected = kind === 'months' ? month : year
  const [focused, setFocused] = useState(selected)
  const values =
    kind === 'months'
      ? MONTHS.map((_, index) => index)
      : Array.from(
          { length: today.getFullYear() - 1899 },
          (_, index) => today.getFullYear() - index
        )

  useEffect(() => {
    const option = container.current.querySelector('[aria-pressed="true"]')
    option?.focus({ preventScroll: true })
    if (option)
      container.current.scrollTop =
        option.offsetTop -
        container.current.clientHeight / 2 +
        option.clientHeight / 2
  }, [])

  return (
    <div
      id='calendar-panel'
      ref={container}
      className={`gate-calendar-choices ${kind}`}
      role='group'
      aria-label={kind === 'months' ? 'Choose month' : 'Choose year'}
      onKeyDown={event => {
        const controls = [
          ...event.currentTarget.querySelectorAll('button:not(:disabled)')
        ]
        const index = controls.indexOf(document.activeElement)
        const columns = kind === 'months' ? 3 : 4
        const step = {
          ArrowLeft: -1,
          ArrowRight: 1,
          ArrowUp: -columns,
          ArrowDown: columns
        }[event.key]
        const next =
          event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? controls.length - 1
              : step === undefined
                ? null
                : index + step
        if (next === null) return
        event.preventDefault()
        controls[Math.max(0, Math.min(controls.length - 1, next))]?.focus()
      }}
    >
      {values.map(value => (
        <button
          type='button'
          key={value}
          data-choice={value}
          tabIndex={focused === value ? 0 : -1}
          aria-pressed={selected === value}
          disabled={
            kind === 'months' &&
            year === today.getFullYear() &&
            value > today.getMonth()
          }
          onFocus={() => setFocused(value)}
          onClick={() => onChoose(value)}
        >
          {kind === 'months' ? MONTHS[value].slice(0, 3) : value}
        </button>
      ))}
    </div>
  )
}
