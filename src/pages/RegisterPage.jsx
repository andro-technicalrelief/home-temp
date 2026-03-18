import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    address1: '', city: '', state: '', zip: '', country: 'ZA',
    password: '', password_confirm: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [verificationSent, setVerificationSent] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.first_name || !form.last_name || !form.email || !form.password) {
      setError('Please fill in all required fields.')
      return
    }
    if (form.password !== form.password_confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setSubmitting(true)
    setError('')
    const result = await register(form)
    setSubmitting(false)
    if (result.success) {
      if (result.emailVerification) {
        // Show verification message before redirecting
        setVerificationSent(true)
        setTimeout(() => navigate('/dashboard', { replace: true }), 3000)
      } else {
        navigate('/dashboard', { replace: true })
      }
    } else {
      setError(result.error || 'Registration failed. Please try again.')
    }
  }

  const inputClass = "w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"

  return (
    <main className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center px-6 py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none opacity-40" />

      <div className="relative z-10 w-full max-w-[520px]">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center no-underline mb-4">
            <img src="/images/headericon-white.svg" alt="Technical Relief" className="h-12 mr-2.5 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-[21px] text-white">Technical</span>
              <span className="font-extrabold text-[21px] text-white">Relief</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">Create your account</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">Get started with managed hosting & development</p>
        </div>

        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8">
          {verificationSent && (
            <div className="mb-6 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-xl text-[var(--color-success)] text-sm">
              <div className="font-bold mb-1">✅ Account created!</div>
              A verification email has been sent to <span className="font-medium text-white">{form.email}</span>. Check your inbox. Redirecting to dashboard...
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-xl text-[var(--color-error)] text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">First Name *</label>
                <input id="first_name" type="text" value={form.first_name} onChange={update('first_name')} className={inputClass} placeholder="John" />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Last Name *</label>
                <input id="last_name" type="text" value={form.last_name} onChange={update('last_name')} className={inputClass} placeholder="Doe" />
              </div>
            </div>

            <div>
              <label htmlFor="reg_email" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Email Address *</label>
              <input id="reg_email" type="email" value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" autoComplete="email" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Phone</label>
              <input id="phone" type="tel" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+27 12 345 6789" />
            </div>

            <div>
              <label htmlFor="address1" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Street Address</label>
              <input id="address1" type="text" value={form.address1} onChange={update('address1')} className={inputClass} placeholder="123 Main Street" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">City</label>
                <input id="city" type="text" value={form.city} onChange={update('city')} className={inputClass} placeholder="Cape Town" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Province</label>
                <input id="state" type="text" value={form.state} onChange={update('state')} className={inputClass} placeholder="WC" />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Postal Code</label>
                <input id="zip" type="text" value={form.zip} onChange={update('zip')} className={inputClass} placeholder="8001" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="reg_password" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Password *</label>
                <input id="reg_password" type="password" value={form.password} onChange={update('password')} className={inputClass} placeholder="Min 8 characters" autoComplete="new-password" />
              </div>
              <div>
                <label htmlFor="password_confirm" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Confirm *</label>
                <input id="password_confirm" type="password" value={form.password_confirm} onChange={update('password_confirm')} className={inputClass} placeholder="Re-enter password" autoComplete="new-password" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {submitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-[var(--color-text-muted)] text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium no-underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
