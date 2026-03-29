import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'
import FadeIn, { StaggerContainer, StaggerItem } from '../components/FadeIn'

const howWeWork = [
  { icon: '📋', title: 'Structured Processes', desc: 'Every project follows documented workflows — from requirements gathering through deployment and ongoing maintenance. No ad-hoc decisions.' },
  { icon: '🔄', title: 'Continuous Monitoring', desc: 'All infrastructure is monitored proactively with automated alerting and incident response. We know about issues before your users do.' },
  { icon: '🔒', title: 'Security First', desc: 'Defence in depth — firewalls, WAFs, encryption, access controls, and regular security audits. Compliance-ready infrastructure.' },
  { icon: '📊', title: 'Data-Driven Decisions', desc: 'Performance metrics, uptime tracking, and resource utilization data inform every optimization decision we make.' },
  { icon: '🤝', title: 'Transparent Communication', desc: "Regular status updates, clear documentation, and honest assessments. We tell you what's happening, not what you want to hear." },
  { icon: '🚀', title: 'Continuous Improvement', desc: 'Post-incident reviews, performance benchmarking, and proactive infrastructure upgrades. Your platform gets better over time.' },
]

const infraSteps = [
  { num: '01', title: 'Tier-1 Data Centre Partners', desc: 'Our servers run in enterprise-grade data centres with redundant power supplies, precision cooling, and multi-carrier network connectivity. We select partners based on reliability, not price.' },
  { num: '02', title: 'Our Management Layer', desc: 'On top of raw infrastructure, we deploy our own monitoring stack, security hardening, automated backups, and management tooling. This is where our engineering value lives.' },
  { num: '03', title: 'Transparent Engineering', desc: "We don't just host — we engineer. Every service running on our infrastructure is configured, optimized, and managed by our team. We take ownership of the full stack." },
  { num: '04', title: 'Automation & Tooling', desc: 'Internal automation handles provisioning, monitoring, backups, and incident response. We use n8n for workflow orchestration and custom tooling for infrastructure management.' },
]

const timeline = [
  { icon: '💡', date: 'Jan 2026', event: 'The Idea Takes Shape', desc: 'Identified a gap in the SA market — businesses paying premium prices for "managed" hosting that was anything but. Technical Relief is born.', status: 'done' },
  { icon: '🏗️', date: 'Feb 2026', event: 'Infrastructure Goes Live', desc: 'First VPS deployed on local infrastructure. DirectAdmin configured, Blesta billing integrated, security hardening complete. Foundation laid.', status: 'done' },
  { icon: '🎨', date: 'Mar 2026', event: 'Command Center Launched', desc: 'Custom React dashboard goes live — billing, infrastructure monitoring, wallet, subscriptions, and project management in one unified portal.', status: 'active' },
  { icon: '🤝', date: 'Q2 2026', event: 'First Clients Onboarded', desc: 'Onboarding our first wave of clients with fully managed shared hosting and VPS packages. Every service set up and configured end-to-end.', status: 'upcoming' },
  { icon: '💻', date: 'Q3 2026', event: 'Custom Development Arm', desc: 'Expanding into full-stack development — custom web applications, APIs, and enterprise systems built with modern technologies.', status: 'upcoming' },
  { icon: '🤖', date: 'Q4 2026', event: 'AI & Automation Integration', desc: 'n8n workflow automation, AI-powered monitoring, predictive scaling, and intelligent alerting. Building the infrastructure of tomorrow.', status: 'upcoming' },
  { icon: '🚀', date: '2027', event: 'Scale & Grow', desc: 'Enterprise partnerships, expanded data centre presence, and a marketplace for one-click deployments. Making world-class hosting accessible to every SA business.', status: 'upcoming' },
]

const values = [
  { icon: '🎯', title: 'Clarity Over Complexity', desc: 'We believe technology should fade into the background. If our clients need to think about their hosting, we\'ve failed.' },
  { icon: '🔧', title: 'Engineering Over Sales', desc: 'We\'d rather solve a real problem well than upsell you something you don\'t need. Our revenue comes from doing great work.' },
  { icon: '🤝', title: 'Partnerships Over Transactions', desc: 'Every client is a long-term relationship. We grow with your business — scaling infrastructure as you scale revenue.' },
  { icon: '🛡️', title: 'Security Over Shortcuts', desc: 'We don\'t cut corners on security. Every server is hardened, every connection encrypted, every backup verified.' },
]

export default function AboutPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-[var(--color-bg-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-4 py-2 px-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              About <span className="text-gradient">Technical Relief</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[700px] mx-auto leading-relaxed">
              We believe infrastructure should be invisible, development should be disciplined, and every client
              deserves enterprise-grade reliability — <strong className="text-white">without lifting a finger.</strong>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 bg-[var(--color-bg-dark)] border-t border-[var(--color-border-dark)]">
        <div className="max-w-[900px] mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)]">The Beginning</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Born from <span className="text-gradient">Frustration</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 md:p-10">
              <p className="text-[var(--color-text-light)] leading-relaxed mb-4 text-base">
                Technical Relief started because we watched too many businesses struggle with technology that should have been simple. Business owners — talented people running amazing companies — were spending hours wrestling with hosting panels, debugging email configurations, and panicking about SSL certificate expirations.
              </p>
              <p className="text-[var(--color-text-light)] leading-relaxed mb-4 text-base">
                We saw agencies charge for "managed hosting" that was anything but managed. Clients paying premium prices but still calling support for basic server tasks. Developers building beautiful applications but deploying them on fragile infrastructure.
              </p>
              <p className="text-white leading-relaxed font-medium text-base">
                So we built the company we wished existed — one that actually handles <em>everything</em>. Not "we'll set up the server and give you a login." Instead: "tell us what you need, and we'll build it, deploy it, secure it, monitor it, and manage it. You'll never need to think about the tech."
              </p>
              <div className="mt-6 pt-6 border-t border-[var(--color-border-dark)] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold text-sm flex items-center justify-center flex-shrink-0">TR</div>
                <div>
                  <div className="text-white font-bold text-sm">Technical Relief Team</div>
                  <div className="text-[var(--color-text-muted)] text-xs">Founded 2026 · South Africa</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[800px] mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)]">Our Journey</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Building the <span className="text-gradient">Roadmap</span>
              </h2>
              <p className="mt-3 text-[var(--color-text-muted)] text-sm max-w-[500px] mx-auto">
                From idea to infrastructure — here's where we've been and where we're headed.
              </p>
            </div>
          </FadeIn>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)]/50 via-[var(--color-accent)]/20 to-transparent" />

            {timeline.map((t, i) => (
              <FadeIn key={t.date} delay={i * 0.1}>
                <div className="flex gap-5 mb-10 relative group">
                  {/* Node */}
                  <div className={`relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl z-10 border-2 transition-all duration-300 ${
                    t.status === 'active'
                      ? 'bg-[var(--color-accent)]/20 border-[var(--color-accent)] shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                      : t.status === 'done'
                        ? 'bg-emerald-500/15 border-emerald-500/40'
                        : 'bg-[var(--color-bg-card)] border-[var(--color-border-dark)] group-hover:border-[var(--color-accent)]/30'
                  }`}>
                    {t.icon}
                    {t.status === 'active' && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--color-accent)] animate-pulse" />
                    )}
                    {t.status === 'done' && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold">✓</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 rounded-2xl p-5 transition-all duration-300 ${
                    t.status === 'active'
                      ? 'bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/20'
                      : 'bg-[var(--color-bg-card)]/50 border border-transparent group-hover:border-[var(--color-border-dark)]'
                  }`}>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                        t.status === 'active'
                          ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent-light)]'
                          : t.status === 'done'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-white/5 text-[var(--color-text-muted)]'
                      }`}>
                        {t.date}
                      </span>
                      {t.status === 'active' && (
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--color-accent-light)]">← We are here</span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-base mb-1">{t.event}</h3>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="Our Values"
              title="What We"
              titleGradient="Stand For"
              description="These aren't platitudes on a wall. They're the principles that shape every decision we make — from how we architect systems to how we price our services."
              dark
            />
          </FadeIn>
          <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-[var(--color-bg-light)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent)]">Our Philosophy</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--color-text-dark)] tracking-tight leading-tight">
                  Built by Engineers, for Businesses
                </h2>
                <p className="mt-6 text-lg text-[var(--color-text-body)] leading-relaxed">
                  Technical Relief was founded on a simple observation: most businesses don't need a server admin
                  — they need their technology to just work. Reliably, securely, and without constant attention.
                </p>
                <p className="text-[var(--color-text-body)] leading-relaxed">
                  We combine deep systems engineering expertise with a relentless focus on managed services. Every
                  server we deploy, every application we build, every domain we manage — it's all backed by
                  engineering discipline and a commitment to zero operational overhead for our clients.
                </p>
                <p className="text-[var(--color-text-body)] leading-relaxed">
                  We don't sell "hosting." We sell <strong>peace of mind</strong> — backed by SLAs, monitoring,
                  and a team that sets everything up and manages it for you. <strong>You focus on your business.
                  We handle all the tech.</strong>
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '99.9%', label: 'SLA Uptime', color: 'text-[var(--color-accent)]' },
                  { value: '24/7', label: 'Active Monitoring', color: 'text-[var(--color-success)]' },
                  { value: '100%', label: 'Set Up For You', color: 'text-[var(--color-secondary)]' },
                  { value: '0', label: 'Hidden Fees', color: 'text-[var(--color-warning)]' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[var(--color-bg-dark)] rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300">
                    <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
                    <div className="text-[var(--color-text-muted)] text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="How We Work"
              title="Engineering Discipline at"
              titleGradient="Every Level"
              description={<>From infrastructure deployment to application development, every process follows structured engineering practices. <strong className="text-white">We handle the complexity so you don't have to.</strong></>}
              dark
            />
          </FadeIn>
          <StaggerContainer stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howWeWork.map((item) => (
              <StaggerItem key={item.title}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Infrastructure Transparency */}
      <section className="py-24 bg-[var(--color-bg-light)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="Infrastructure Partners"
              title="Enterprise Infrastructure, Expertly Managed"
              description="We partner with industry-leading infrastructure providers and layer our engineering, monitoring, and management expertise on top."
            />
          </FadeIn>
          <div className="max-w-[700px] mx-auto space-y-10">
            {infraSteps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-sm flex items-center justify-center">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-text-dark)] text-lg mb-1">{step.title}</h4>
                    <p className="text-[var(--color-text-body)] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <CTABanner
              title="Ready to Experience the Difference?"
              description={<>Join the businesses that trust Technical Relief for their digital infrastructure. Premium hosting and development — <strong className="text-white">fully set up and managed for you.</strong></>}
              primaryText="View Plans & Pricing"
              primaryHref="/pricing"
              secondaryText="Client Area"
              secondaryHref="https://www.technicalrelief.co.za/billing/client/"
            />
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
