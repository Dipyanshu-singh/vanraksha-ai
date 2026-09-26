import React, { useEffect, useMemo, useState } from 'react';
import { ALERTS, PROTECTED_ZONES, SPECIES_DATA } from '../data/data';
import { formatTimeAgo } from '../data/events.js';

const workflow = [
  { number: '01', title: 'Detect', label: 'Potential heat anomaly', detail: 'A coarse thermal or community signal enters the desk. It is a lead—not a confirmed fire.', next: 'Queue for context scoring', tone: 'amber' },
  { number: '02', title: 'Score', label: 'Context increases priority', detail: 'Forest cover, dryness, terrain, source agreement and nearby assets shape a decision-support score.', next: 'Assign the right field team', tone: 'blue' },
  { number: '03', title: 'Verify', label: 'Human gate', detail: 'A ranger confirms, rejects, qualifies or cannot verify the alert, with optional location and evidence.', next: 'Start monitoring only when supported', tone: 'red' },
  { number: '04', title: 'Simulate', label: 'Short-horizon outlook', detail: 'After confirmation, a 30–90 minute spread outlook can show a predicted area plus uncertainty band.', next: 'Review priorities—not evacuation orders', tone: 'green' },
  { number: '05', title: 'Refine', label: 'New evidence updates the event', detail: 'Higher-resolution observations and field notes can expand, contract or contradict the current picture.', next: 'Compare runs and preserve history', tone: 'purple' },
  { number: '06', title: 'Escalate', label: 'Coordinate by local protocol', detail: 'Configured thresholds surface habitat, settlement and infrastructure risk for an accountable hand-off.', next: 'Acknowledge and act with the department', tone: 'orange' },
];

const alertExamples = [
  { id: 'potential', title: 'Potential heat anomaly', status: 'Seek verification', confidence: 'Medium', evidence: '2 signals', observationAgeMinutes: 18, body: 'A coarse satellite signal overlaps forest and dry-fuel context. Fire is not confirmed.', color: 'amber' },
  { id: 'verified', title: 'Verified fire', status: 'Monitoring active', confidence: 'High', evidence: 'Ranger note', observationAgeMinutes: 7, body: 'A field observation supports a fire at the assigned location. A short-horizon outlook is now available.', color: 'red' },
  { id: 'refined', title: 'Refined incident', status: 'Prioritise impact zone', confidence: 'High', evidence: '3 sources', observationAgeMinutes: 4, body: 'New geometry refined the event and raised habitat exposure. The previous run remains in the audit trail.', color: 'green' },
];

const limitations = [
  ['Resolution', 'Small, under-canopy and rapidly changing ignitions may not be detected.'],
  ['Cloud cover', 'Cloud, smoke and sensor geometry can hide or distort a signal.'],
  ['Latency', 'Observation, processing and ingestion time can make a label stale.'],
  ['False alarms', 'Heat can come from permitted activity, industry or non-fire sources.'],
  ['Ground truth', 'No field observation means “not verified”, not “no fire exists”.'],
  ['Uncertainty', 'Scores guide attention and are not calibrated probabilities until validated.'],
];

const nowLabel = (date) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(date);

export default function Landing({ onLaunch }) {
  const [now, setNow] = useState(() => new Date());
  const [activeStep, setActiveStep] = useState(2);
  const [activeAlert, setActiveAlert] = useState('potential');
  const [formSent, setFormSent] = useState(false);
  const [treesMonitored, setTreesMonitored] = useState(2400000);

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 30000);
    const ticker = setInterval(() => setTreesMonitored((value) => value + 1), 4000);
    return () => { clearInterval(clock); clearInterval(ticker); };
  }, []);

  const stats = useMemo(() => ({
    activeAlerts: ALERTS.filter((alert) => alert.type === 'critical').length,
    protectedZones: PROTECTED_ZONES.length,
    endangeredSpecies: SPECIES_DATA.filter((species) => species.status === 'CR' || species.status === 'EN').length,
  }), []);

  const selectedAlert = alertExamples.find((alert) => alert.id === activeAlert) || alertExamples[0];

  return (
    <div className="landing-container">
      <nav className="landing-nav" aria-label="Primary navigation">
        <div className="landing-logo"><span className="logo-icon">VR</span><span className="logo-text">VanaRaksha<span className="highlight"> / field intelligence</span></span></div>
        <div className="landing-nav-links"><a href="#workflow">How it works</a><a href="#field-desk">Field desk</a><a href="#confidence">Data & confidence</a><a href="#pilot">Pilot with us</a></div>
        <span className="landing-live-status"><span className="landing-live-dot"></span>Demo snapshot</span>
      </nav>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-meta-row"><span className="badge-pill"><span className="pulse-dot"></span>Conservation operations desk</span><span className="freshness-stamp">Snapshot · {nowLabel(now)}</span></div>
          <p className="hero-kicker">From scattered signals to verified field action.</p>
          <h1 className="hero-title">Protect the place, not just the <span className="text-gradient">pin.</span></h1>
          <p className="hero-subtitle">VanaRaksha brings alerts, maps, habitat context and field observations into one practical workspace—so teams can see what changed, understand uncertainty and decide what to verify next.</p>
          <div className="hero-cta"><button className="btn-primary btn-glow btn-large" onClick={onLaunch}>Explore the field desk <span aria-hidden="true">→</span></button><a className="btn-outline btn-large" href="#confidence">Read how confidence works</a></div>
          <p className="hero-note"><strong>Demo data:</strong> the figures below are illustrative static seed data with a current viewing timestamp. VanaRaksha complements FSI and state workflows; it does not replace them.</p>
        </section>

        <section className="status-strip" aria-label="Product status">
          <div><span className="strip-label">Experience</span><strong><span className="status-dot amber"></span>Demo / pilot-ready concept</strong></div><div><span className="strip-label">Data posture</span><strong>Illustrative static snapshot</strong></div><div><span className="strip-label">Last viewed</span><strong>{nowLabel(now)}</strong></div><div><span className="strip-label">Official systems</span><strong>Complementary by design</strong></div>
        </section>

        <section className="landing-brief" id="field-desk">
          <div className="brief-intro"><p className="section-kicker">The field desk</p><h2>Make the next decision visible.</h2><p>Signals arrive from satellites, sensors, reports and communities, but they rarely arrive together. The desk keeps source, age, confidence and human verification in view so a map pin becomes an accountable next step.</p><button className="text-button" onClick={onLaunch}>Open the illustrated workspace <span>↗</span></button></div>
          <div className="brief-list"><article className="brief-item"><span>01</span><div><h3>See change early</h3><p>Surface potential fire, deforestation, air quality and habitat signals before they become a crisis.</p></div></article><article className="brief-item"><span>02</span><div><h3>Understand the place</h3><p>Connect protected zones, species pressure, terrain, dryness, settlements and live observations.</p></div></article><article className="brief-item"><span>03</span><div><h3>Act with confidence</h3><p>Give operators and rangers a shared evidence trail without hiding what the system cannot know.</p></div></article></div>
        </section>

        <section className="workflow-section" id="workflow"><div className="section-heading"><div><p className="section-kicker">Alert to action</p><h2>Six steps. One human verification gate.</h2></div><p className="section-description">Move through the controlled sample to see how the label changes. Simulation only appears after verification or a documented high-confidence rule.</p></div><div className="workflow-layout"><div className="workflow-rail" role="tablist" aria-label="Alert-to-action workflow">{workflow.map((step, index) => <button key={step.number} className={`workflow-step ${activeStep === index ? 'active' : ''} ${step.tone}`} onClick={() => setActiveStep(index)} role="tab" aria-selected={activeStep === index}><span>{step.number}</span><strong>{step.title}</strong><small>{step.label}</small></button>)}</div><div className={`workflow-detail ${workflow[activeStep].tone}`} role="tabpanel"><div className="detail-topline"><span className="detail-number">{workflow[activeStep].number}</span><span className="detail-state">{activeStep === 2 ? 'Verification is the gate' : 'Decision-support step'}</span></div><h3>{workflow[activeStep].title}: {workflow[activeStep].label}</h3><p>{workflow[activeStep].detail}</p><div className="detail-next"><span>Human decision next</span><strong>{workflow[activeStep].next} →</strong></div></div></div></section>

        <section className="alert-demo-section" id="confidence"><div className="section-heading"><div><p className="section-kicker">Confidence before certainty</p><h2>Same signal. Different operational state.</h2></div><p className="section-description">Every alert exposes an evidence count, source list, observation age, verification status and limitations statement.</p></div><div className="alert-demo-grid"><div className="alert-tabs" role="tablist" aria-label="Example alert states">{alertExamples.map((alert) => <button key={alert.id} className={`alert-tab ${activeAlert === alert.id ? 'active' : ''} ${alert.color}`} onClick={() => setActiveAlert(alert.id)} role="tab" aria-selected={activeAlert === alert.id}><span className="tab-indicator"></span><span><strong>{alert.title}</strong><small>{alert.status}</small></span></button>)}</div><article className={`alert-detail-card ${selectedAlert.color}`}><div className="card-kicker"><span className="status-dot"></span>{selectedAlert.status}<span className="age-pill">{selectedAlert.evidence} · {formatTimeAgo(new Date(now.getTime() - selectedAlert.observationAgeMinutes * 60000), now)}</span></div><h3>{selectedAlert.title}</h3><p>{selectedAlert.body}</p><div className="alert-detail-meta"><div><span>Confidence</span><strong>{selectedAlert.confidence}</strong></div><div><span>Source posture</span><strong>Static demo seed</strong></div><div><span>Decision next</span><strong>{activeAlert === 'potential' ? 'Request field check' : activeAlert === 'verified' ? 'Review outlook' : 'Prioritise assets'}</strong></div></div><p className="card-limit">Limitation: this demonstration is not a live government feed or an evacuation order.</p></article></div></section>

        <section className="impact-section"><div className="impact-heading"><p className="section-kicker">Intended pilot impact</p><h2>More time protecting forests. Less time assembling the picture.</h2></div><div className="impact-grid"><div><strong>Earlier</strong><span>threat detection</span></div><div><strong>Clearer</strong><span>field priorities</span></div><div><strong>Stronger</strong><span>protection decisions</span></div></div></section>

        <section className="stats-ticker" aria-label="Illustrative pilot dashboard"><div className="stats-heading"><span className="section-kicker">Illustrative pilot dashboard</span><span>Static seed data · viewed {nowLabel(now)}</span></div><div className="stats-row"><div className="stat-item"><span className="stat-value text-red">{stats.activeAlerts}</span><span className="stat-label">Critical alerts</span></div><div className="stat-divider"></div><div className="stat-item"><span className="stat-value text-green">{stats.protectedZones}</span><span className="stat-label">Protected zones</span></div><div className="stat-divider"></div><div className="stat-item"><span className="stat-value text-yellow">{stats.endangeredSpecies}</span><span className="stat-label">Species at risk</span></div><div className="stat-divider"></div><div className="stat-item"><span className="stat-value text-blue">{(treesMonitored / 1000000).toFixed(2)}M+</span><span className="stat-label">Hectares monitored</span></div></div></section>

        <section className="confidence-section"><div className="section-heading"><div><p className="section-kicker">Known limits</p><h2>Useful context, honest boundaries.</h2></div><p className="section-description">The product should make uncertainty easier to act on—not easier to overlook.</p></div><div className="limitations-grid">{limitations.map(([title, text]) => <article key={title}><span className="limit-mark">↳</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="interoperability-note"><div><p className="section-kicker">Interoperability</p><h3>Complement FSI and state protocols.</h3></div><p>VanaRaksha is designed to import or reference approved official alerts, preserve source provenance and support local escalation paths. It does not claim government ownership, endorsement or access that has not been granted.</p></div></section>

        <section className="pilot-section" id="pilot"><div className="pilot-copy"><p className="section-kicker">For departments and pilots</p><h2>Start with one or two high-fire districts.</h2><p>Tell us where the operational bottleneck is. This form creates a draft inquiry for a pilot conversation—it is not an official submission.</p><div className="pilot-points"><span>✓ Defined roles and jurisdictions</span><span>✓ Data-source and freshness review</span><span>✓ Field verification feedback loop</span></div></div><form className="pilot-form" onSubmit={(event) => { event.preventDefault(); setFormSent(true); }}><label>Organization<input required name="organization" placeholder="Forest department / research partner" /></label><label>Jurisdiction<input required name="jurisdiction" placeholder="District, range or landscape" /></label><div className="form-two"><label>Expected users<select name="users" defaultValue=""><option value="" disabled>Select a range</option><option>1–10</option><option>11–50</option><option>50+</option></select></label><label>Preferred language<select name="language" defaultValue="English"><option>English</option><option>Hindi (validation needed)</option><option>Other</option></select></label></div><label>Operational problem<textarea required name="problem" rows="3" placeholder="What should a field team be able to decide faster?" /></label><button className="btn-primary" type="submit">{formSent ? 'Draft inquiry saved ✓' : 'Create draft inquiry →'}</button>{formSent && <p className="form-success" role="status">Thanks—this static demo has captured the draft locally for review.</p>}</form></section>

        <footer className="landing-footer"><span>VanaRaksha AI / field intelligence</span><span>Demo snapshot · {nowLabel(now)}</span><span>Built for accountable conservation operations</span></footer>
      </main>
    </div>
  );
}
