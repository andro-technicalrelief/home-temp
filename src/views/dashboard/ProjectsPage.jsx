'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const MOCK_PROJECTS = [
  {
    id: 'proj-001',
    name: 'GreenLeaf Marketing Site',
    client: 'GreenLeaf Organics',
    type: 'Marketing Site',
    status: 'In Progress',
    progress: 65,
    startDate: '2026-02-10',
    targetDate: '2026-04-15',
    budget: 'R14,500',
    retainer: 'R6,500/mo',
    phases: [
      { name: 'Discovery & Strategy', status: 'complete', date: '2026-02-10' },
      { name: 'UI/UX Design', status: 'complete', date: '2026-02-28' },
      { name: 'Development', status: 'active', date: '2026-03-15' },
      { name: 'Testing & QA', status: 'pending', date: null },
      { name: 'Deployment & Launch', status: 'pending', date: null },
    ],
    deliverables: [
      { name: 'Brand style guide', done: true },
      { name: 'Responsive homepage', done: true },
      { name: 'About / Team page', done: true },
      { name: 'Services page', done: false },
      { name: 'Contact & CTA forms', done: false },
      { name: 'SEO optimization', done: false },
      { name: 'Analytics setup', done: false },
    ],
    stack: ['React', 'Tailwind CSS', 'Vite', 'DirectAdmin'],
  },
  {
    id: 'proj-002',
    name: 'Urban Threads E-commerce',
    client: 'Urban Threads ZA',
    type: 'Custom E-commerce',
    status: 'In Progress',
    progress: 30,
    startDate: '2026-03-01',
    targetDate: '2026-06-15',
    budget: 'R54,500',
    retainer: 'R27,500/mo',
    phases: [
      { name: 'Discovery & Strategy', status: 'complete', date: '2026-03-01' },
      { name: 'UI/UX Design', status: 'active', date: '2026-03-12' },
      { name: 'Development', status: 'pending', date: null },
      { name: 'Payment Integration', status: 'pending', date: null },
      { name: 'Testing & QA', status: 'pending', date: null },
      { name: 'Deployment & Launch', status: 'pending', date: null },
    ],
    deliverables: [
      { name: 'Product catalog schema', done: true },
      { name: 'User authentication', done: false },
      { name: 'Shopping cart & checkout', done: false },
      { name: 'PayFast integration', done: false },
      { name: 'Inventory dashboard', done: false },
      { name: 'Order notification emails', done: false },
      { name: 'Admin panel', done: false },
      { name: 'Mobile-responsive storefront', done: false },
    ],
    stack: ['Next.js', 'Tailwind CSS', 'PayFast API', 'PostgreSQL'],
  },
]

const statusColors = {
  'In Progress': 'bg-blue-500/15 text-blue-400',
  'Review': 'bg-amber-500/15 text-amber-400',
  'Complete': 'bg-emerald-500/15 text-emerald-400',
  'On Hold': 'bg-red-500/15 text-red-400',
}

const phaseIcon = {
  complete: '✓',
  active: '●',
  pending: '○',
}

export default function ProjectsPage() {
  const [expanded, setExpanded] = useState(MOCK_PROJECTS[0]?.id)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white">Project Tracker</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Track the progress of your custom development projects.</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Projects', value: MOCK_PROJECTS.filter((p) => p.status === 'In Progress').length, icon: '🚀', color: 'text-blue-400' },
          { label: 'Total Budget', value: 'R69,000', icon: '💰', color: 'text-emerald-400' },
          { label: 'Avg. Progress', value: `${Math.round(MOCK_PROJECTS.reduce((a, p) => a + p.progress, 0) / MOCK_PROJECTS.length)}%`, icon: '📊', color: 'text-amber-400' },
          { label: 'Deliverables Done', value: `${MOCK_PROJECTS.reduce((a, p) => a + p.deliverables.filter((d) => d.done).length, 0)}/${MOCK_PROJECTS.reduce((a, p) => a + p.deliverables.length, 0)}`, icon: '✅', color: 'text-purple-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-[var(--color-text-muted)] text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Project cards */}
      <div className="flex flex-col gap-5">
        {MOCK_PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            layout
            className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setExpanded(expanded === project.id ? null : project.id)}
              className="w-full px-6 py-5 flex items-center justify-between cursor-pointer text-left hover:bg-[var(--color-bg-card-hover)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-bold text-lg">{project.name}</h3>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="text-[var(--color-text-muted)] text-sm">{project.client} · {project.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <div className="text-white font-bold text-sm">{project.progress}%</div>
                  <div className="text-[var(--color-text-muted)] text-[10px]">Complete</div>
                </div>
                <div className="w-[100px] h-2 bg-[var(--color-bg-dark)] rounded-full overflow-hidden hidden sm:block">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-[var(--color-accent)] rounded-full"
                  />
                </div>
                <span className={`text-[var(--color-text-muted)] transition-transform ${expanded === project.id ? 'rotate-180' : ''}`}>▾</span>
              </div>
            </button>

            {/* Expanded content */}
            {expanded === project.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-[var(--color-border-dark)]"
              >
                <div className="px-6 py-6">
                  {/* Info grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Budget</div>
                      <div className="text-white text-sm font-medium">{project.budget}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Retainer</div>
                      <div className="text-white text-sm font-medium">{project.retainer}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Started</div>
                      <div className="text-white text-sm font-medium">{project.startDate}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Target</div>
                      <div className="text-white text-sm font-medium">{project.targetDate}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Timeline */}
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-accent-light)] uppercase tracking-wider mb-4">Project Timeline</h4>
                      <div className="flex flex-col gap-0.5">
                        {project.phases.map((phase, i) => (
                          <div key={i} className="flex items-start gap-3 py-2">
                            <div className="flex flex-col items-center">
                              <span className={`text-sm ${phase.status === 'complete' ? 'text-emerald-400' : phase.status === 'active' ? 'text-blue-400' : 'text-[var(--color-text-muted)]'}`}>
                                {phaseIcon[phase.status]}
                              </span>
                              {i < project.phases.length - 1 && (
                                <div className={`w-px flex-1 min-h-[18px] mt-1 ${phase.status === 'complete' ? 'bg-emerald-400/30' : 'bg-[var(--color-border-dark)]'}`} />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className={`text-sm font-medium ${phase.status === 'active' ? 'text-white' : phase.status === 'complete' ? 'text-[var(--color-text-light)]' : 'text-[var(--color-text-muted)]'}`}>
                                {phase.name}
                              </div>
                              {phase.date && <div className="text-[10px] text-[var(--color-text-muted)]">{phase.date}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-accent-light)] uppercase tracking-wider mb-4">Deliverables</h4>
                      <div className="flex flex-col gap-2">
                        {project.deliverables.map((d, i) => (
                          <div key={i} className="flex items-center gap-3 py-1.5">
                            <span className={`w-5 h-5 rounded flex items-center justify-center text-xs flex-shrink-0 ${d.done ? 'bg-emerald-500/15 text-emerald-400' : 'bg-[var(--color-bg-dark)] text-[var(--color-text-muted)]'}`}>
                              {d.done ? '✓' : ''}
                            </span>
                            <span className={`text-sm ${d.done ? 'text-[var(--color-text-light)] line-through opacity-60' : 'text-white'}`}>
                              {d.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="mt-6 pt-4 border-t border-[var(--color-border-dark)] flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mr-1">Stack:</span>
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-[var(--color-bg-dark)] text-[var(--color-text-light)] text-[11px] rounded-md font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
