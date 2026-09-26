// Normalized demo-event contract shared by the public demo and field desk.
// All timestamps are ISO 8601 UTC; UI formatting happens at render time.
export const DEMO_DATA_MODE = 'sample';

const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60 * 1000).toISOString();

export const DEMO_EVENTS = [
  {
    eventId: 'demo-event-001',
    signalId: 'signal-simlipal-001',
    status: 'potential_heat_anomaly',
    priority: 'critical',
    title: 'Fire signal — Simlipal NP',
    summary: 'Potential heat anomaly overlaps forest and dry-fuel context.',
    jurisdiction: { state: 'Odisha', district: 'Mayurbhanj', range: 'Simlipal North', beat: 'Barehipani' },
    geometry: {
      originalCell: { type: 'Point', coordinates: [86.5, 21.6], resolutionMeters: 1000 },
      targetNodes: [{ id: 'target-node-1', type: 'Point', coordinates: [86.503, 21.602] }],
      confirmedPoint: null,
    },
    location: { lat: 21.6, lng: 86.5, label: 'Simlipal National Park' },
    confidence: {
      level: 'medium', score: null,
      explanation: ['thermal signal detected', 'forest and dryness context aligned'],
    },
    sources: [{ provider: 'Sample satellite indicator', sensor: 'geostationary-demo', product: 'thermal anomaly', resolutionMeters: 1000, observationTime: minutesAgo(18), ingestedAt: minutesAgo(15), quality: 'sample' }],
    verification: { outcome: null, verifiedAt: null, verifiedBy: null, evidence: [] },
    simulation: { status: 'blocked_until_verification', horizonMinutes: null, runAt: null, modelVersion: null, uncertainty: null },
    impact: { settlements: [], habitats: ['Simlipal tiger habitat'], corridors: [], infrastructure: [] },
    assignment: { team: 'Simlipal North beat team', assignedAt: null, assignedBy: null },
    audit: [{ action: 'created', actor: 'demo-ingestion', at: minutesAgo(18), note: 'Sample signal created for public demo.' }],
    dataQuality: { mode: DEMO_DATA_MODE, freshness: 'sample', flags: ['illustrative', 'not_calibrated'] },
  },
  {
    eventId: 'demo-event-002',
    signalId: 'signal-karbi-002',
    status: 'prioritized_for_verification',
    priority: 'critical',
    title: 'Deforestation signal — Karbi Anglong',
    summary: 'Forest-loss pattern is prioritized for field review.',
    jurisdiction: { state: 'Assam', district: 'Karbi Anglong', range: 'Diphu', beat: 'West Karbi' },
    geometry: { originalCell: { type: 'Point', coordinates: [92.8, 26.3], resolutionMeters: 500 }, targetNodes: [], confirmedPoint: null },
    location: { lat: 26.3, lng: 92.8, label: 'Karbi Anglong' },
    confidence: { level: 'medium', score: null, explanation: ['forest-cover change detected', 'source agreement pending'] },
    sources: [{ provider: 'Sample forest-change layer', sensor: 'optical-demo', product: 'forest loss', resolutionMeters: 500, observationTime: minutesAgo(36), ingestedAt: minutesAgo(30), quality: 'sample' }],
    verification: { outcome: null, verifiedAt: null, verifiedBy: null, evidence: [] },
    simulation: { status: 'not_applicable', horizonMinutes: null, runAt: null, modelVersion: null, uncertainty: null },
    impact: { settlements: ['Diphu fringe'], habitats: ['Karbi Anglong elephant corridor'], corridors: ['Karbi Anglong corridor'], infrastructure: [] },
    assignment: { team: 'Diphu range team', assignedAt: minutesAgo(12), assignedBy: 'demo-operator' },
    audit: [{ action: 'prioritized', actor: 'demo-scoring', at: minutesAgo(12), note: 'Context score raised operational priority.' }],
    dataQuality: { mode: DEMO_DATA_MODE, freshness: 'sample', flags: ['illustrative', 'not_calibrated'] },
  },
  {
    eventId: 'demo-event-003',
    signalId: 'signal-pench-003',
    status: 'verified_fire',
    priority: 'critical',
    title: 'Verified fire — Pench TR',
    summary: 'Ranger observation confirms a fire; outlook is available with uncertainty.',
    jurisdiction: { state: 'Madhya Pradesh', district: 'Seoni', range: 'Pench East', beat: 'Karmajhiri' },
    geometry: { originalCell: { type: 'Point', coordinates: [79.8, 22.0], resolutionMeters: 1000 }, targetNodes: [{ id: 'target-node-3', type: 'Point', coordinates: [79.803, 22.004] }], confirmedPoint: { type: 'Point', coordinates: [79.803, 22.004] } },
    location: { lat: 22.0, lng: 79.8, label: 'Pench Tiger Reserve' },
    confidence: { level: 'high', score: null, explanation: ['thermal signal detected', 'forest and dryness context aligned', 'field confirmation received'] },
    sources: [{ provider: 'Sample satellite indicator', sensor: 'polar-orbiting-demo', product: 'active fire', resolutionMeters: 1000, observationTime: minutesAgo(22), ingestedAt: minutesAgo(18), quality: 'sample' }, { provider: 'Sample ranger observation', sensor: 'field-report', product: 'verification note', resolutionMeters: null, observationTime: minutesAgo(7), ingestedAt: minutesAgo(6), quality: 'sample' }],
    verification: { outcome: 'confirmed_fire', verifiedAt: minutesAgo(7), verifiedBy: 'demo-ranger-01', evidence: ['sample-photo-001', 'sample-gps-001'] },
    simulation: { status: 'available', horizonMinutes: 60, runAt: minutesAgo(4), modelVersion: 'pilot-model-0.1', uncertainty: 'high' },
    impact: { settlements: ['Karmajhiri village'], habitats: ['Pench tiger habitat'], corridors: ['Pench–Kanha corridor'], infrastructure: ['Forest access road'] },
    assignment: { team: 'Karmajhiri beat team', assignedAt: minutesAgo(15), assignedBy: 'demo-operator' },
    audit: [{ action: 'created', actor: 'demo-ingestion', at: minutesAgo(22), note: 'Sample signal created.' }, { action: 'verified', actor: 'demo-ranger-01', at: minutesAgo(7), note: 'Confirmed fire with sample GPS and photo.' }, { action: 'simulation_run', actor: 'demo-model', at: minutesAgo(4), note: '60-minute outlook generated with high uncertainty.' }],
    dataQuality: { mode: DEMO_DATA_MODE, freshness: 'sample', flags: ['illustrative', 'not_calibrated', 'high_uncertainty'] },
  },
  ...[
    ['demo-event-004', 'Tiger corridor breach — Pench–Kanha', 'Human encroachment signal requires review.', 'Madhya Pradesh', 'Pench–Kanha corridor', 22.2, 80.1, 60],
    ['demo-event-005', 'Species habitat loss — Silent Valley', 'Habitat fragmentation signal requires review.', 'Kerala', 'Silent Valley', 11.1, 76.4, 120],
    ['demo-event-006', 'Drought stress — Rajasthan–MP border', 'NDVI decline is being monitored as a contextual risk.', 'Rajasthan / Madhya Pradesh', 'Rajasthan–MP border', 24.5, 76.0, 180],
  ].map(([eventId, title, summary, state, label, lat, lng, ageMinutes]) => ({
    eventId,
    signalId: `${eventId}-signal`,
    status: 'potential_heat_anomaly',
    priority: eventId === 'demo-event-006' ? 'info' : 'warning',
    title,
    summary,
    jurisdiction: { state, district: label, range: 'Demo range', beat: 'Demo beat' },
    geometry: { originalCell: { type: 'Point', coordinates: [lng, lat], resolutionMeters: 1000 }, targetNodes: [], confirmedPoint: null },
    location: { lat, lng, label },
    confidence: { level: 'low', score: null, explanation: ['context signal detected', 'field verification pending'] },
    sources: [{ provider: 'Sample contextual layer', sensor: 'static-demo', product: 'risk indicator', resolutionMeters: 1000, observationTime: minutesAgo(ageMinutes), ingestedAt: minutesAgo(Math.max(ageMinutes - 5, 0)), quality: 'sample' }],
    verification: { outcome: null, verifiedAt: null, verifiedBy: null, evidence: [] },
    simulation: { status: 'blocked_until_verification', horizonMinutes: null, runAt: null, modelVersion: null, uncertainty: null },
    impact: { settlements: [], habitats: [], corridors: [], infrastructure: [] },
    assignment: { team: null, assignedAt: null, assignedBy: null },
    audit: [{ action: 'created', actor: 'demo-ingestion', at: minutesAgo(ageMinutes), note: 'Sample contextual signal created.' }],
    dataQuality: { mode: DEMO_DATA_MODE, freshness: 'sample', flags: ['illustrative', 'not_calibrated'] },
  })),
];

export function formatTimeAgo(value, now = Date.now()) {
  const timestamp = value instanceof Date ? value.getTime() : new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return 'time unavailable';
  const seconds = Math.max(0, Math.floor((new Date(now).getTime() - timestamp) / 1000));
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getEventObservationTime(event) {
  return event.sources?.map((source) => source.observationTime).filter(Boolean).sort().at(-1) || null;
}

export function getEventFreshness(event, now = Date.now()) {
  return formatTimeAgo(getEventObservationTime(event), now);
}

export function toAlert(event) {
  const type = event.priority || (event.status === 'verified_fire' ? 'critical' : event.status === 'prioritized_for_verification' ? 'warning' : 'info');
  return {
    id: event.eventId,
    eventId: event.eventId,
    type,
    title: event.title,
    sub: event.summary,
    time: getEventFreshness(event),
    observationTime: getEventObservationTime(event),
    lat: event.location.lat,
    lng: event.location.lng,
    status: event.status,
    dataMode: event.dataQuality.mode,
    sourceQuality: event.dataQuality.freshness,
  };
}
