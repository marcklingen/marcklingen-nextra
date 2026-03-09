'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const SUCCESS_MESSAGE = 'Thanks, your email has been saved.'
const ERROR_MESSAGE = 'Couldn’t save your email. Please try again.'

export function FooterSubscribe() {
  const pathname = usePathname()

  return <FooterSubscribeForm source={pathname || '/'} />
}

export function SubscribeCta() {
  const pathname = usePathname()

  return <SubscribeForm source={pathname || '/posts'} variant="cta" />
}

function SubscribeForm({ source, variant }) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const isCta = variant === 'cta'
  const isLoading = status === 'submitting'

  async function handleSubmit(event) {
    event.preventDefault()

    if (!event.currentTarget.reportValidity()) {
      return
    }

    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          source,
          website
        })
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.ok) {
        throw new Error(data.message || ERROR_MESSAGE)
      }

      setWebsite('')
      setStatus('success')
      setMessage(SUCCESS_MESSAGE)
    } catch (error) {
      setStatus('error')
      setMessage(error.message || ERROR_MESSAGE)
    }
  }

  return (
    <section
      className={`subscribe-form subscribe-form--${variant}`}
      aria-label="Subscribe to blog updates"
    >
      {isCta ? (
        <div className="subscribe-form-copy">
          <div className="subscribe-form-terminal-bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="subscribe-form-terminal-kicker">$ subscribe --email &lt;email&gt;</p>
          <h2>Get the next post by email</h2>
          <p>I plan to publish more here about things I find interesting.</p>
          <p className="subscribe-form-note">
            // Your email is only stored so I can send occasional blog updates.
          </p>
        </div>
      ) : null}

      {isCta ? (
        <form
          className={`subscribe-form-fields${isLoading ? ' is-loading' : ''}`}
          onSubmit={handleSubmit}
          aria-busy={isLoading}
        >
          <label className="subscribe-form-label">
              <span className="subscribe-form-label-text">Email address</span>
              {isCta ? (
                <span className="subscribe-form-terminal-prompt" aria-hidden="true">
                  $ subscribe --email
                </span>
              ) : null}
            <input
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="enter email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              disabled={isLoading}
              required
            />
          </label>

          <div className="subscribe-form-honeypot" aria-hidden="true">
            <input
              tabIndex={-1}
              autoComplete="off"
              name="website"
              aria-label="Website"
              value={website}
              onChange={event => setWebsite(event.target.value)}
            />
          </div>

          <button type="submit" className="subscribe-form-hidden-submit" tabIndex={-1}>
            Subscribe
          </button>
        </form>
      ) : (
        <p className="subscribe-form-message" role="status">
          {message}
        </p>
      )}

      {isCta && status !== 'idle' ? (
        <p
          className={`subscribe-form-message subscribe-form-message--terminal${
            status === 'error' ? ' is-error' : ''
          }`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {isLoading
            ? 'saving subscription...'
            : status === 'success'
              ? `saved: ${message}`
              : `error: ${message || ERROR_MESSAGE}`}
        </p>
      ) : null}
    </section>
  )
}

function FooterSubscribeForm({ source }) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState('idle')
  const [active, setActive] = useState(false)
  const formRef = useRef(null)
  const inputRef = useRef(null)
  const isLoading = status === 'submitting'
  const isActive = active || isLoading || status === 'success' || status === 'error'
  const placeholder =
    isLoading
      ? 'Saving…'
      : status === 'success'
        ? 'Thanks, you are in'
        : status === 'error'
          ? 'Try again'
          : 'enter email'
  const buttonLabel =
    isLoading
      ? 'Saving…'
      : status === 'success'
        ? 'Saved'
        : 'Submit'

  async function handleSubmit(event) {
    event.preventDefault()

    if (!event.currentTarget.reportValidity()) {
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          source,
          website
        })
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.ok) {
        throw new Error(data.message || ERROR_MESSAGE)
      }

      setEmail('')
      setWebsite('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function activate() {
    setActive(true)
    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
  }

  function handleBlur() {
    requestAnimationFrame(() => {
      if (!formRef.current?.contains(document.activeElement) && !email && status === 'idle') {
        setActive(false)
      }
    })
  }

  return (
    <section
      className={`subscribe-form subscribe-form--footer${isActive ? ' is-active' : ''}`}
      aria-label="Subscribe to blog updates"
    >
      <button
        type="button"
        className="subscribe-form-footer-cta"
        onClick={activate}
      >
        Subscribe to updates
      </button>

      <form
        ref={formRef}
        className={`subscribe-form-fields${isLoading ? ' is-loading' : ''}`}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
        aria-busy={isLoading}
      >
        <label className="subscribe-form-label">
          <span className="subscribe-form-label-text">Email address</span>
          <input
            ref={inputRef}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder={placeholder}
            value={email}
            onFocus={() => setActive(true)}
            onChange={event => setEmail(event.target.value)}
            disabled={isLoading}
            required
          />
        </label>

        <div className="subscribe-form-honeypot" aria-hidden="true">
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            aria-label="Website"
            value={website}
            onChange={event => setWebsite(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="subscribe-form-inline-submit"
          disabled={isLoading}
        >
          {buttonLabel}
        </button>
      </form>
    </section>
  )
}
