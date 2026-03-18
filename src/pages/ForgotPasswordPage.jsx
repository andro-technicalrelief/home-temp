import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { resetPassword, checkEmailExists } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // ── Validate email format ──
    const emailTrimmed = email.trim().toLowerCase()
    if (!emailTrimmed) {
      setError('Please enter your email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)

    // ── Check if account exists first ──
    const check = await checkEmailExists(emailTrimmed)
    if (check.exists === false) {
      setSubmitting(false)
      setError('No account found with this email address. Please check and try again, or register a new account.')
      return
    }

    // ── Send reset email ──
    const result = await resetPassword(emailTrimmed)
    setSubmitting(false)

    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error || 'Failed to send reset email. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center px-6 py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none opacity-40" />

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center no-underline mb-4">
            <img src="/images/headericon-white.svg" alt="Technical Relief" className="h-12 mr-2.5 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-[21px] text-white">Technical</span>
              <span className="font-extrabold text-[21px] text-white">Relief</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">Reset your password</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">Enter the email address associated with your account</p>
        </div>

        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8">
          {submitted ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-lg font-bold text-white mb-2">Check your email</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6">
                A password reset link has been sent to <span className="text-white">{email}</span>. Check your spam folder if you don't see it within a few minutes.
              </p>
              <Link to="/login" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-medium no-underline">
                ← Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-xl text-[var(--color-error)] text-sm">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="reset_email" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                  Email Address
                </label>
                <input
                  id="reset_email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Verifying...' : 'Send Reset Link'}
              </button>

              <Link to="/login" className="text-center text-[var(--color-text-muted)] hover:text-white text-sm no-underline">
                ← Back to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
