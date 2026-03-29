'use client'

import { useState } from 'react'
import { generateApiKey, generateCronCommand, rotateCronKey } from '../../services/systemUtils'
import { useAuth } from '../../context/AuthContext'

const MOCK_TEAM = [
  { id: 1, name: 'André Admin', email: 'admin@technicalrelief.co.za', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Sarah Billing', email: 'sarah@example.co.za', role: 'Billing', status: 'Active' },
]

const NOTIFICATION_PREFS = [
  { id: 'billing_email', label: 'Invoice & Payment Alerts', channel: 'Email', defaultOn: true },
  { id: 'billing_sms', label: 'Invoice & Payment Alerts', channel: 'SMS', defaultOn: false },
  { id: 'security_email', label: 'Security Alerts', channel: 'Email', defaultOn: true },
  { id: 'security_sms', label: 'Security Alerts', channel: 'SMS', defaultOn: true },
  { id: 'backup_email', label: 'Backup Reports', channel: 'Email', defaultOn: true },
  { id: 'backup_sms', label: 'Backup Reports', channel: 'SMS', defaultOn: false },
  { id: 'project_email', label: 'Project Updates', channel: 'Email', defaultOn: true },
  { id: 'downtime_email', label: 'Downtime / Uptime Alerts', channel: 'Email', defaultOn: true },
  { id: 'downtime_sms', label: 'Downtime / Uptime Alerts', channel: 'SMS', defaultOn: true },
]

export default function SettingsPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address1: user?.address1 || '',
    city: user?.city || '',
    state: user?.state || '',
    zip: user?.zip || '',
    country: user?.country || 'ZA',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeSection, setActiveSection] = useState('personal')
  const [team, setTeam] = useState(MOCK_TEAM)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Billing')
  const [notifs, setNotifs] = useState(
    Object.fromEntries(NOTIFICATION_PREFS.map((n) => [n.id, n.defaultOn]))
  )
  const [brandColor, setBrandColor] = useState('#6366f1')
  const [cronKey, setCronKey] = useState(generateApiKey(48))
  const [cronKeyVisible, setCronKeyVisible] = useState(false)
  const [rotating, setRotating] = useState(false)
  const [rotateSuccess, setRotateSuccess] = useState(false)
  const [copied, setCopied] = useState(null)
  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [passwordChanging, setPasswordChanging] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const { changePassword, isFirebaseAuth } = useAuth()

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
  }

  const handleInvite = () => {
    if (!inviteEmail) return
    setTeam((prev) => [...prev, { id: Date.now(), name: inviteEmail.split('@')[0], email: inviteEmail, role: inviteRole, status: 'Pending' }])
    setInviteEmail('')
  }

  const handleRemoveTeam = (id) => setTeam((prev) => prev.filter((m) => m.id !== id))

  const inputClass = "w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"

  const displayName = `${form.first_name} ${form.last_name}`.trim()
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  const handleRotateKey = async () => {
    setRotating(true)
    setRotateSuccess(false)
    const result = await rotateCronKey(user?.id || 'admin')
    if (result.success) {
      setCronKey(result.newKey)
      setRotateSuccess(true)
      setTimeout(() => setRotateSuccess(false), 5000)
    }
    setRotating(false)
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'branding', label: 'Branding', icon: '🎨' },
    { id: 'team', label: 'Team Access', icon: '👥' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security & API', icon: '🔐' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white">Account Settings</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Manage your profile, branding, team, and notification preferences.</p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-1 mb-8 overflow-x-auto">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
              activeSection === s.id
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-white'
            }`}
          >
            <span>{s.icon}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="max-w-[700px]">
        {/* ── Personal Info ── */}
        {activeSection === 'personal' && (
          <>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 mb-6">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold text-xl flex items-center justify-center flex-shrink-0">
                  {initials || '?'}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{displayName || 'Your Name'}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm">{form.email}</p>
                </div>
                <button className="ml-auto px-4 py-2 border border-[var(--color-border-dark)] text-[var(--color-text-muted)] text-sm rounded-xl hover:text-white hover:border-white/20 transition-all cursor-pointer">
                  Upload Photo
                </button>
              </div>
            </div>

            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-6">Personal Information</h3>

              {saved && (
                <div className="mb-6 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-xl text-[var(--color-success)] text-sm">
                  Settings saved successfully.
                </div>
              )}

              <form onSubmit={handleSave} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">First Name</label>
                    <input type="text" value={form.first_name} onChange={update('first_name')} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Last Name</label>
                    <input type="text" value={form.last_name} onChange={update('last_name')} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Email Address</label>
                  <input type="email" value={form.email} onChange={update('email')} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Phone</label>
                  <input type="tel" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+27 12 345 6789" />
                </div>
                <hr className="border-[var(--color-border-dark)]" />
                <h4 className="text-white font-semibold text-sm">Address</h4>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Street Address</label>
                  <input type="text" value={form.address1} onChange={update('address1')} className={inputClass} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">City</label>
                    <input type="text" value={form.city} onChange={update('city')} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Province</label>
                    <input type="text" value={form.state} onChange={update('state')} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Postal Code</label>
                    <input type="text" value={form.zip} onChange={update('zip')} className={inputClass} />
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  {saved && <span className="text-[var(--color-success)] text-sm">✓ Saved</span>}
                </div>
              </form>
            </div>

            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 mt-6">
              <h3 className="text-lg font-bold text-white mb-2">Password & Security</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-4">Change your account password. {isFirebaseAuth ? 'Managed via Firebase Authentication.' : 'Using demo account — password change requires Firebase Auth.'}</p>
              
              {passwordSuccess && (
                <div className="mb-4 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-xl text-[var(--color-success)] text-sm">
                  ✅ Password changed successfully!
                </div>
              )}
              {passwordError && (
                <div className="mb-4 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-xl text-[var(--color-error)] text-sm">
                  {passwordError}
                </div>
              )}

              {showPasswordModal ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
                      placeholder="Min 6 characters"
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
                      placeholder="Re-enter new password"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={async () => {
                        setPasswordError('')
                        setPasswordSuccess(false)
                        if (!newPassword || newPassword.length < 6) {
                          setPasswordError('Password must be at least 6 characters.')
                          return
                        }
                        if (newPassword !== confirmNewPassword) {
                          setPasswordError('Passwords do not match.')
                          return
                        }
                        setPasswordChanging(true)
                        const result = await changePassword(newPassword)
                        setPasswordChanging(false)
                        if (result.success) {
                          setPasswordSuccess(true)
                          setShowPasswordModal(false)
                          setNewPassword('')
                          setConfirmNewPassword('')
                        } else {
                          setPasswordError(result.error || 'Failed to change password.')
                        }
                      }}
                      disabled={passwordChanging}
                      className="px-6 py-2.5 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {passwordChanging ? 'Changing...' : 'Update Password'}
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordModal(false)
                        setNewPassword('')
                        setConfirmNewPassword('')
                        setPasswordError('')
                      }}
                      className="px-4 py-2 text-[var(--color-text-muted)] hover:text-white text-sm rounded-xl transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="px-5 py-2.5 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] text-white text-sm font-medium rounded-xl hover:border-[var(--color-accent)]/30 transition-all cursor-pointer"
                >
                  🔑 Change Password
                </button>
              )}
            </div>

            <div className="bg-[var(--color-bg-card)] border border-[var(--color-error)]/20 rounded-2xl p-8 mt-6">
              <h3 className="text-lg font-bold text-[var(--color-error)] mb-2">Danger Zone</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-4">These actions are irreversible. Please contact support before proceeding.</p>
              <div className="flex gap-4">
                <button className="px-4 py-2 border border-[var(--color-error)]/30 text-[var(--color-error)] text-sm rounded-xl hover:bg-[var(--color-error)]/10 transition-all cursor-pointer">Close Account</button>
              </div>
            </div>
          </>
        )}

        {/* ── Branding ── */}
        {activeSection === 'branding' && (
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-6">Brand Customization</h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-6">Upload your logo and set brand colors for client-facing reports and the billing portal.</p>

            <div className="flex flex-col gap-6">
              {/* Logo upload */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-3">Company Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--color-bg-dark)] border-2 border-dashed border-[var(--color-border-dark)] flex items-center justify-center text-[var(--color-text-muted)] text-3xl">
                    🖼️
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer mb-1">
                      Upload Logo
                    </button>
                    <p className="text-[var(--color-text-muted)] text-xs">PNG, SVG, or WEBP. Max 2 MB.</p>
                  </div>
                </div>
              </div>

              {/* Favicon */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-3">Favicon</label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-dark)] border-2 border-dashed border-[var(--color-border-dark)] flex items-center justify-center text-[var(--color-text-muted)] text-lg">
                    🌐
                  </div>
                  <div>
                    <button className="px-4 py-2 border border-[var(--color-border-dark)] text-[var(--color-text-muted)] text-sm rounded-xl hover:text-white hover:border-white/20 transition-all cursor-pointer">
                      Upload Favicon
                    </button>
                    <p className="text-[var(--color-text-muted)] text-xs mt-1">ICO or PNG. 32×32 or 64×64.</p>
                  </div>
                </div>
              </div>

              <hr className="border-[var(--color-border-dark)]" />

              {/* Brand color */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-3">Brand Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-12 h-12 rounded-xl border-2 border-[var(--color-border-dark)] cursor-pointer bg-transparent"
                  />
                  <div>
                    <input
                      type="text"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className={`${inputClass} w-[140px] font-mono`}
                    />
                  </div>
                  <div className="flex gap-2">
                    {['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setBrandColor(c)}
                        className="w-8 h-8 rounded-lg border-2 transition-all cursor-pointer"
                        style={{ backgroundColor: c, borderColor: brandColor === c ? 'white' : 'transparent' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-max px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer">
                Save Branding
              </button>
            </div>
          </div>
        )}

        {/* ── Team Access ── */}
        {activeSection === 'team' && (
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-2">Team Members</h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-6">Invite team members and manage their access levels.</p>

            {/* Invite form */}
            <div className="flex gap-3 mb-6">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="team@example.co.za"
                className={`${inputClass} flex-1`}
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className={`${inputClass} w-[140px]`}
              >
                <option value="Admin">Admin</option>
                <option value="Billing">Billing</option>
                <option value="Read-only">Read-only</option>
              </select>
              <button
                onClick={handleInvite}
                className="px-5 py-3 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer whitespace-nowrap"
              >
                Invite
              </button>
            </div>

            {/* Team table */}
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-dark)]">
                  {['Name', 'Email', 'Role', 'Status', ''].map((h) => (
                    <th key={h} className="text-left py-2.5 px-3 text-[var(--color-text-muted)] text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {team.map((m) => (
                  <tr key={m.id} className="border-b border-[var(--color-border-dark)] last:border-b-0">
                    <td className="py-3 px-3 text-white text-sm font-medium">{m.name}</td>
                    <td className="py-3 px-3 text-[var(--color-text-light)] text-sm">{m.email}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.role === 'Admin' ? 'bg-purple-500/15 text-purple-400' : m.role === 'Billing' ? 'bg-blue-500/15 text-blue-400' : 'bg-[var(--color-bg-dark)] text-[var(--color-text-muted)]'}`}>
                        {m.role}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-bold ${m.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>{m.status}</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleRemoveTeam(m.id)}
                        className="text-[var(--color-text-muted)] text-xs hover:text-[var(--color-error)] transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Notifications ── */}
        {activeSection === 'notifications' && (
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-2">Notification Preferences</h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-6">Choose how and when you get notified about your account activity.</p>

            <div className="flex flex-col gap-0">
              {NOTIFICATION_PREFS.map((pref) => (
                <div key={pref.id} className="flex items-center justify-between py-3.5 border-b border-[var(--color-border-dark)] last:border-b-0">
                  <div>
                    <div className="text-white text-sm font-medium">{pref.label}</div>
                    <div className="text-[var(--color-text-muted)] text-xs">{pref.channel}</div>
                  </div>
                  <button
                    onClick={() => setNotifs((prev) => ({ ...prev, [pref.id]: !prev[pref.id] }))}
                    className={`w-11 h-6 rounded-full transition-all cursor-pointer relative ${
                      notifs[pref.id] ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)]'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                        notifs[pref.id] ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <button className="mt-6 px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer">
              Save Preferences
            </button>
          </div>
        )}

        {/* ── Security & API ── */}
        {activeSection === 'security' && (
          <>
            {/* Cron Key Management */}
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 mb-6">
              <h3 className="text-lg font-bold text-white mb-2">API / Cron Key</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6">This key authenticates automated cron jobs against the technicalrelief.co.za endpoint. Rotate it periodically for security.</p>

              {rotateSuccess && (
                <div className="mb-4 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-xl text-[var(--color-success)] text-sm flex items-center gap-2">
                  <span>✓</span> API key rotated successfully. Update your cron jobs with the new key below.
                </div>
              )}

              {/* Current Key */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Current Cron Key</label>
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm font-mono overflow-hidden">
                    {cronKeyVisible ? cronKey : '•'.repeat(32) + cronKey.slice(-8)}
                  </div>
                  <button
                    onClick={() => setCronKeyVisible(!cronKeyVisible)}
                    className="px-3 py-2 border border-[var(--color-border-dark)] text-[var(--color-text-muted)] text-sm rounded-xl hover:text-white hover:border-white/20 transition-all cursor-pointer"
                  >
                    {cronKeyVisible ? '🙈' : '👁️'}
                  </button>
                  <button
                    onClick={() => copyToClipboard(cronKey, 'key')}
                    className="px-3 py-2 border border-[var(--color-border-dark)] text-[var(--color-text-muted)] text-sm rounded-xl hover:text-white hover:border-white/20 transition-all cursor-pointer"
                  >
                    {copied === 'key' ? '✓' : '📋'}
                  </button>
                </div>
              </div>

              {/* Generated Cron Command */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Cron Command</label>
                <div className="flex gap-2">
                  <code className="flex-1 px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-emerald-400 text-xs font-mono break-all">
                    {generateCronCommand(cronKey)}
                  </code>
                  <button
                    onClick={() => copyToClipboard(generateCronCommand(cronKey), 'cron')}
                    className="px-3 py-2 border border-[var(--color-border-dark)] text-[var(--color-text-muted)] text-sm rounded-xl hover:text-white hover:border-white/20 transition-all cursor-pointer self-start"
                  >
                    {copied === 'cron' ? '✓' : '📋'}
                  </button>
                </div>
                <p className="text-[var(--color-text-muted)] text-xs mt-2">
                  Output redirected to <code className="text-white">/dev/null</code> — no trailing slash.
                </p>
              </div>

              {/* Rotate button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleRotateKey}
                  disabled={rotating}
                  className="px-5 py-3 bg-amber-500/15 text-amber-400 border border-amber-500/20 font-semibold text-sm rounded-xl hover:bg-amber-500/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  {rotating ? '🔄 Rotating...' : '🔑 Rotate API / Cron Key'}
                </button>
                <span className="text-[var(--color-text-muted)] text-xs">Generates a new 48-character high-entropy key</span>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4">Security Overview</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Key Entropy', value: '48-char hex (192 bits)', status: 'secure', icon: '🔐' },
                  { label: 'Cron Path', value: '/dev/null (no trailing slash)', status: 'fixed', icon: '✅' },
                  { label: 'Token Storage', value: 'Encrypted at rest', status: 'secure', icon: '🔒' },
                  { label: 'Payment Tokens', value: 'PayFast PCI-DSS vault', status: 'secure', icon: '💳' },
                  { label: 'API Requests', value: 'HTTPS-only with key auth', status: 'secure', icon: '🛡️' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-[var(--color-border-dark)] last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <div className="text-white text-sm font-medium">{item.label}</div>
                        <div className="text-[var(--color-text-muted)] text-xs">{item.value}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[var(--color-success)] bg-[var(--color-success)]/10 px-2.5 py-1 rounded-full capitalize">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
