/* Shared ISO 20000 document generator — POPULATED, process-specific documents.
   Each process has its own procedure, workflow, RACI, inputs/outputs and records
   (not shared boilerplate). Parameterized by contract facts. */

const PROC = {
  incident: { name: "Incident Management", clause: "8.6.1", owner: "Incident Manager", purpose: "restore normal service operation as quickly as possible after any unplanned interruption",
    steps: ["Detect and log every incident in {P} with impact and urgency.", "Categorise and set priority P1–P4 using the priority matrix.", "Attempt first-contact resolution at Tier 1; escalate to Tier 2 where criteria are met.", "For P1/major incidents, invoke the major-incident procedure and open a bridge.", "Keep users informed; restore service and confirm resolution with the user.", "Close with a documented resolution and raise a problem where warranted."],
    flow: "User contact or monitoring alert → log & categorise → prioritise → diagnose/resolve or escalate → (major-incident bridge if P1) → restore & confirm → close → feed problem & reporting.",
    raci: [["Log & categorise the incident", "A", "R", "C", "I"], ["Prioritise & assign", "A", "R", "C", "I"], ["Resolve or escalate", "R", "R", "A", "I"], ["Coordinate a major (P1) incident", "A", "C", "R", "I"], ["Communicate to users & customer", "R", "C", "A", "C"], ["Review trends & report", "R", "C", "A", "I"]],
    io: ["user contacts, monitoring alerts, known errors", "restored service, incident records, problem candidates, SLA data"],
    kpis: [["First Contact Resolution", "≥ 70%"], ["P1 resolution within SLA", "≥ 95%"], ["Reopen rate", "≤ 5%"]],
    risks: [["P1 raised outside core hours", "Coverage aligned to contracted hours; on-call escalation for P1"], ["Mis-prioritised tickets", "Priority matrix + monthly QA sampling"]],
    records: "Incident tickets, major-incident reports, user communications, and the monthly incident report." },

  request: { name: "Service Request Management", clause: "8.6.2", owner: "Request Fulfilment Lead", purpose: "fulfil standard service requests through a published catalogue within agreed timeframes",
    steps: ["Publish request types in the {P} service catalogue with descriptions and target times.", "Log and validate each request against catalogue entitlements.", "Route for approval where the request type requires it.", "Fulfil using the standard model for that request type.", "Confirm completion with the requester and capture satisfaction.", "Update the catalogue or knowledge base where a gap is revealed."],
    flow: "Catalogue request → validate → approval (if required) → fulfil per standard model → confirm with requester → close & capture satisfaction.",
    raci: [["Maintain the service catalogue", "A", "C", "R", "I"], ["Validate & route the request", "A", "R", "C", "I"], ["Approve (where required)", "I", "I", "R", "A"], ["Fulfil the request", "R", "R", "A", "I"], ["Confirm & close", "R", "R", "A", "I"]],
    io: ["catalogue requests, approvals, entitlements", "fulfilled requests, provisioning records, satisfaction data"],
    kpis: [["Fulfilment within SLA", "≥ 90%"], ["Catalogue coverage of routine requests", "≥ 95%"], ["Approval cycle time", "≤ 1 business day"]],
    risks: [["Approvals delay fulfilment", "Defined approval matrix in the tool"], ["Off-catalogue requests bypass the process", "Quarterly catalogue review and intake control"]],
    records: "Request records, approval logs, catalogue definitions, and the monthly request report." },

  problem: { name: "Problem Management", clause: "8.6.3", owner: "Problem Manager", purpose: "reduce recurring and high-impact incidents by finding and removing root causes",
    steps: ["Identify problems from incident trends, major incidents and monitoring.", "Log and prioritise the problem by impact and recurrence.", "Perform root-cause analysis using a structured method (e.g. 5 Whys, Ishikawa).", "Record known errors and workarounds in the known-error database.", "Raise changes to implement permanent fixes and track them to closure.", "Verify effectiveness after the fix and close the problem."],
    flow: "Incident trend / major incident → log problem → root-cause analysis → known error + workaround → change for permanent fix → verify → close.",
    raci: [["Identify & log problems", "A", "R", "C", "I"], ["Perform root-cause analysis", "A", "R", "C", "I"], ["Maintain the known-error database", "R", "R", "C", "I"], ["Raise permanent-fix changes", "R", "C", "A", "I"], ["Verify effectiveness & close", "R", "C", "A", "I"]],
    io: ["incident trends, major-incident outputs, monitoring data", "known errors, workarounds, change requests, fewer repeat incidents"],
    kpis: [["Repeat-incident reduction", "-10% year on year"], ["Known errors documented", "100% of open problems"], ["RCA completed on P1s", "100% within 5 business days"]],
    risks: [["Analysis without a permanent fix", "Corrective actions tracked to closure"], ["No capacity for proactive analysis", "Ring-fenced problem-management time"]],
    records: "Problem records, RCA reports, the known-error database, and corrective-action tracking." },

  change: { name: "Change Enablement", clause: "8.5.1", owner: "Change Manager", purpose: "make changes with the least disruption and risk while enabling needed change quickly",
    steps: ["Record and classify each change as standard, normal or emergency.", "Assess risk and impact and define a back-out plan.", "Route normal changes to the Change Advisory Board (CAB) for approval.", "Schedule approved changes to minimise disruption and communicate to stakeholders.", "Implement with the back-out plan ready and verify success.", "Conduct a post-implementation review (PIR) and capture lessons."],
    flow: "Change request → classify → risk/impact + back-out plan → CAB approval (normal) → schedule & communicate → implement → verify → post-implementation review.",
    raci: [["Raise & classify the change", "I", "R", "A", "I"], ["Assess risk & impact", "A", "R", "C", "I"], ["Approve at CAB", "C", "I", "R", "A"], ["Implement with back-out", "R", "R", "A", "I"], ["Post-implementation review", "A", "C", "R", "I"]],
    io: ["change requests, release plans, risk assessments", "approved & scheduled changes, back-out plans, PIR results"],
    kpis: [["Change success rate", "≥ 98%"], ["Emergency changes", "≤ 5% of total"], ["Unauthorised changes", "0"]],
    risks: [["Change causes an outage", "Risk assessment + back-out plan + CAB approval"], ["Process bypass / unauthorised change", "Discovery reconciliation and audit trail"]],
    records: "Change records, CAB minutes, risk assessments and back-out plans, and PIR reports." },

  config: { name: "Configuration Management", clause: "8.2.6", owner: "Configuration Manager", purpose: "maintain accurate information about configuration items (CIs) and their relationships",
    steps: ["Define CI types, attributes and relationships in the CMDB model.", "Identify, record and baseline CIs.", "Control changes to CI records through Change Enablement.", "Run automated discovery and reconcile against the CMDB monthly.", "Audit CMDB accuracy and correct discrepancies.", "Report CMDB health and coverage."],
    flow: "CI model → identify & baseline CIs → control via change → discovery & reconciliation → accuracy audit → report.",
    raci: [["Define the CI model", "A", "C", "R", "I"], ["Record & baseline CIs", "A", "R", "C", "I"], ["Reconcile against discovery", "R", "R", "C", "I"], ["Audit CMDB accuracy", "A", "R", "C", "I"], ["Report CMDB health", "R", "C", "A", "I"]],
    io: ["discovery data, change records, asset feeds", "accurate CMDB, relationship maps, health reports"],
    kpis: [["CMDB accuracy", "≥ 95%"], ["Unauthorised CI changes", "0"], ["Reconciliation cadence", "Monthly"]],
    risks: [["Stale CI data", "Automated discovery + scheduled audits"], ["Undefined relationships", "Defined CI model and ownership"]],
    records: "CMDB baselines, reconciliation results, and CMDB audit reports." },

  asset: { name: "Asset Management", clause: "8.2.5", owner: "Asset Manager", purpose: "manage IT assets across their lifecycle to control cost, risk and compliance",
    steps: ["Record assets at receipt with owner, location and status.", "Track assignment, moves and status changes through the lifecycle.", "Manage software licences and entitlements and reconcile against usage.", "Perform scheduled inventory reconciliation.", "Manage secure retirement and disposal per policy.", "Report asset and licence position."],
    flow: "Receipt → assign & track → licence management → inventory reconciliation → secure disposal → report.",
    raci: [["Record & tag assets", "A", "R", "C", "I"], ["Track assignments & moves", "R", "R", "C", "I"], ["Manage licences & entitlements", "A", "R", "C", "I"], ["Reconcile inventory", "R", "R", "C", "I"], ["Manage disposal", "A", "R", "C", "I"]],
    io: ["procurement data, assignments, discovery", "asset register, licence position, disposal records"],
    kpis: [["Inventory accuracy", "≥ 98%"], ["Software licence compliance", "100%"], ["Disposal per policy", "100%"]],
    risks: [["Licence non-compliance", "Entitlement tracking and periodic true-up"], ["Lost or untracked assets", "Barcoding and periodic audits"]],
    records: "Asset register, licence records, disposal certificates, and reconciliation reports." },

  knowledge: { name: "Knowledge Management", clause: "7.6", owner: "Knowledge Manager", purpose: "capture, share and improve knowledge to raise first-contact resolution and self-service success",
    steps: ["Identify knowledge needs from incident and request trends.", "Create and review articles using Knowledge-Centered Service (KCS).", "Publish articles to agents and the self-service portal.", "Maintain accuracy and retire stale content on a schedule.", "Measure article usage, value and self-service deflection.", "Feed gaps back into article creation."],
    flow: "Ticket trends → draft article (KCS) → review → publish (agent + portal) → measure use → review/retire.",
    raci: [["Identify knowledge needs", "R", "R", "A", "I"], ["Create & review articles", "A", "R", "C", "I"], ["Publish to the portal", "A", "R", "C", "I"], ["Review & retire content", "A", "R", "C", "I"], ["Measure value", "R", "C", "A", "I"]],
    io: ["incidents, requests, agent input", "knowledge articles, self-help content, usage metrics"],
    kpis: [["FCR uplift from the knowledge base", "≥ 5% year on year"], ["Article accuracy at review", "≥ 95%"], ["Self-service deflection", "Increasing each quarter"]],
    risks: [["Stale or incorrect articles", "Scheduled review cycle and feedback loop"], ["Low adoption", "KCS embedded in the ticket workflow"]],
    records: "The knowledge base, article review logs, and knowledge-health reports." },

  capacity: { name: "Capacity Management", clause: "8.4.3", owner: "Capacity Analyst", purpose: "ensure sufficient staffing, telephony and platform capacity to meet service levels at justifiable cost",
    steps: ["Set capacity targets from SLAs and forecast demand, including onboarding calendars.", "Monitor staffing, telephony/queue and platform utilisation.", "Forecast 3, 6 and 12 months ahead.", "Flag constraints as capacity risks with lead time and cost.", "Recommend actions and implement via Change Enablement.", "Review at the monthly capacity review."],
    flow: "SLA + demand → monitor utilisation → forecast → flag constraints → recommend → implement via change → review.",
    raci: [["Set capacity targets", "A", "C", "R", "I"], ["Monitor utilisation", "A", "R", "C", "I"], ["Forecast demand", "A", "R", "C", "I"], ["Recommend investment", "R", "C", "A", "C"], ["Review capacity", "R", "C", "A", "I"]],
    io: ["ticket/telephony/portal utilisation, staffing rosters, demand signals", "capacity plan, forecasts, investment recommendations"],
    kpis: [["Capacity-related SLA breaches", "0 per quarter"], ["Forecast accuracy", "± 10%"], ["Peak telephony headroom", "≥ 15%"]],
    risks: [["Onboarding spikes overwhelm staffing", "Demand forecast tied to HR calendar; flex staffing"], ["Telephony saturation at peak", "Headroom target and queue alerts"]],
    records: "The capacity plan, the monthly capacity report, and forecast worksheets." },

  availability: { name: "Availability Management", clause: "8.7.1", owner: "Availability Manager", purpose: "ensure services are available when users need them, meeting agreed availability targets",
    steps: ["Define availability requirements and targets from the SLAs.", "Design for resilience; identify and remove single points of failure.", "Monitor availability continuously with alert thresholds.", "Analyse downtime and availability trends.", "Drive improvements and test recovery.", "Report availability against targets."],
    flow: "Requirements → resilient design → monitor → analyse downtime → improve & test → report.",
    raci: [["Define availability targets", "A", "C", "R", "I"], ["Design for resilience", "A", "R", "C", "I"], ["Monitor availability", "R", "R", "A", "I"], ["Analyse downtime", "A", "R", "C", "I"], ["Report availability", "R", "C", "A", "I"]],
    io: ["availability requirements, monitoring data, incident data", "availability reports, improvement actions, risk inputs"],
    kpis: [["Self-service portal availability", "≥ 99.5%"], ["Unplanned downtime", "Reducing year on year"], ["Mean time to restore", "Within P-level targets"]],
    risks: [["Single point of failure", "Redundancy in design and periodic review"], ["Undetected degradation", "Proactive monitoring and alert thresholds"]],
    records: "The availability plan, uptime reports, and downtime analyses." },

  continuity: { name: "Service Continuity Management", clause: "8.7.2", owner: "Continuity Manager", purpose: "ensure services can be recovered and continued after a major disruption within agreed targets",
    steps: ["Assess continuity requirements and risks with the customer.", "Agree recovery objectives (RTO and RPO).", "Document continuity and recovery plans and run-books.", "Provision recovery capability: staffing, alternate access and backups.", "Test the plans at least annually and after major change.", "Review after each test and update the plans."],
    flow: "Risk assessment → agree RTO/RPO → document plans → provision recovery → test → review & update.",
    raci: [["Assess continuity risk", "A", "C", "R", "I"], ["Agree RTO/RPO with customer", "C", "I", "R", "A"], ["Document recovery plans", "A", "R", "C", "I"], ["Test the plans", "A", "R", "C", "I"], ["Review & update", "R", "C", "A", "I"]],
    io: ["risk assessments, RTO/RPO, dependency maps", "continuity plans, test results, improvement actions"],
    kpis: [["Continuity test cadence", "At least annual"], ["Recovery within RTO in tests", "100%"], ["Plan currency", "Reviewed annually"]],
    risks: [["Plans untested or outdated", "Annual test and post-test review"], ["Dependencies not covered", "Dependency mapping via the CMDB"]],
    records: "Continuity plans, recovery run-books, and continuity test reports." },

  slm: { name: "Service Level Management", clause: "8.3.3", owner: "Service Level Manager", purpose: "agree, monitor and report service levels and drive the service to meet them",
    steps: ["Agree SLAs, OLAs and targets with the customer and internal teams.", "Instrument dashboards to measure each target.", "Monitor performance and manage breaches.", "Report to the customer by the 5th business day.", "Hold monthly service reviews and record actions.", "Review and refresh SLAs periodically."],
    flow: "Agree SLAs/OLAs → instrument → monitor → report → service review → refresh.",
    raci: [["Agree SLAs & OLAs", "C", "I", "R", "A"], ["Measure performance", "A", "R", "C", "I"], ["Report to the customer", "A", "R", "C", "I"], ["Run the service review", "R", "C", "A", "C"], ["Manage breaches & actions", "A", "R", "C", "I"]],
    io: ["SLA definitions, performance data, customer feedback", "SLA reports, service-review minutes, improvement actions"],
    kpis: [["SLA targets achieved", "≥ 95%"], ["Report timeliness", "By 5th business day"], ["Service reviews held", "Monthly"]],
    risks: [["Unrealistic or stale SLAs", "Periodic SLA review with the customer"], ["Measurement blind spots", "Instrumented dashboards with data owners"]],
    records: "SLA/OLA documents, monthly SLA reports, and service-review minutes." },

  supplier: { name: "Supplier Management", clause: "8.3.4", owner: "Supplier Manager", purpose: "manage suppliers and subcontractors so their performance supports the agreed service levels",
    steps: ["Maintain a supplier register with role, contract and criticality.", "Define underpinning contracts and OLAs that support the SLAs.", "Monitor supplier performance against those agreements.", "Hold supplier reviews at the contracted cadence.", "Manage issues, disputes and improvement actions.", "Manage renewal, exit and continuity for key suppliers."],
    flow: "Register suppliers → underpinning contracts → monitor → supplier review → manage issues → renew/exit.",
    raci: [["Maintain the supplier register", "A", "R", "C", "I"], ["Define underpinning contracts", "A", "C", "R", "C"], ["Monitor performance", "A", "R", "C", "I"], ["Hold supplier reviews", "R", "C", "A", "C"], ["Manage renewal / exit", "R", "C", "A", "C"]],
    io: ["contracts, supplier performance data, escalations", "supplier scorecards, review minutes, improvement actions"],
    kpis: [["Supplier SLA conformance", "≥ 95%"], ["Supplier reviews held", "Per contract cadence"], ["Contracts current", "100% within term"]],
    risks: [["Supplier underperformance affects SLAs", "Underpinning contracts and monitoring"], ["Key-supplier dependency", "Continuity and exit planning"]],
    records: "The supplier register, underpinning contracts/OLAs, and supplier scorecards." },

  release: { name: "Release & Deployment Management", clause: "8.5.3", owner: "Release Manager", purpose: "plan, build, test and deploy releases so changes reach production reliably",
    steps: ["Plan releases and define scope and acceptance criteria.", "Build and package the release.", "Test against acceptance criteria and test gates.", "Approve deployment through Change Enablement.", "Deploy with back-out readiness and provide early-life support.", "Review the release and capture lessons."],
    flow: "Plan → build & package → test → change approval → deploy (+ early-life support) → review.",
    raci: [["Plan the release", "A", "C", "R", "I"], ["Build & test", "A", "R", "C", "I"], ["Approve deployment", "C", "I", "R", "A"], ["Deploy & support early life", "R", "R", "A", "I"], ["Review the release", "A", "C", "R", "I"]],
    io: ["approved changes, build artifacts, test results", "deployed releases, release notes, PIR results"],
    kpis: [["Release success rate", "≥ 98%"], ["Clean roll-backs of failed deployments", "100%"], ["Emergency releases", "≤ 5%"]],
    risks: [["Deployment failure", "Tested back-out and early-life support"], ["Scope or quality gaps", "Acceptance criteria and test gates"]],
    records: "Release plans, test evidence, deployment records, and release notes." },

  monitoring: { name: "Monitoring & Reporting", clause: "9.1", owner: "Reporting Analyst", purpose: "monitor service performance and report it accurately to the customer and management",
    steps: ["Define what to measure from the SLAs and objectives.", "Instrument dashboards in {P} and telephony.", "Collect and validate data with named data owners.", "Produce the monthly report pack by the 5th business day.", "Present at service and management reviews.", "Feed findings into Continual Improvement."],
    flow: "Define measures → instrument → collect & validate → monthly report → review → improvement.",
    raci: [["Define measures", "A", "C", "R", "I"], ["Build dashboards", "A", "R", "C", "I"], ["Validate data", "A", "R", "C", "I"], ["Produce the report pack", "A", "R", "C", "I"], ["Present at reviews", "R", "C", "A", "C"]],
    io: ["SLA data, utilisation, satisfaction, event data", "monthly reports, dashboards, trend analysis"],
    kpis: [["Report accuracy", "≥ 99%"], ["Report timeliness", "By 5th business day"], ["Dashboard coverage of SLAs", "100%"]],
    risks: [["Inaccurate data undermines trust", "Validation checks and named data owners"], ["Metrics without action", "Reviews drive improvement actions"]],
    records: "Report definitions, the monthly report pack, and dashboard exports." },

  improvement: { name: "Continual Improvement", clause: "10.2", owner: "Improvement Lead", purpose: "provide a repeatable way to identify and deliver improvements to services and the SMS",
    steps: ["Capture improvement opportunities from audits, SLA misses, feedback and reviews.", "Log them in the improvement register with owner and expected benefit.", "Prioritise by value and effort.", "Plan and assign actions with target dates.", "Implement and measure the result against a baseline.", "Review at management review and close with evidence."],
    flow: "Capture opportunity → log & prioritise → plan → implement → measure benefit → review & close.",
    raci: [["Capture opportunities", "R", "R", "A", "I"], ["Maintain the register", "A", "R", "C", "I"], ["Prioritise & plan", "A", "C", "R", "C"], ["Implement improvements", "R", "R", "A", "I"], ["Measure & review benefit", "A", "C", "R", "C"]],
    io: ["audit findings, SLA misses, feedback, review outputs", "improvement register, delivered improvements, benefit data"],
    kpis: [["Improvements delivered per quarter", "≥ target"], ["Register aging", "No item stale > 90 days"], ["Measured benefit", "Tracked per item"]],
    risks: [["Ideas captured but not delivered", "Owned register and review cadence"], ["No measurable benefit", "Baseline and post-implementation review"]],
    records: "The improvement register, action plans, and benefit measurements." },
};

function pack(key, c) {
  const p = PROC[key];
  const sub = (s) => s.replace(/\{P\}/g, c.PLATFORM);
  const steps = p.steps.map((s, i) => `${i + 1}. ${sub(s)}`).join("\n");
  const raciRows = p.raci.map((r) => `| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} | ${r[4]} |`).join("\n");
  const kpi = p.kpis.map(([k, t]) => `| ${k} | ${t} |`).join("\n");
  const risk = p.risks.map(([r, ctrl]) => `| ${r} | ${ctrl} |`).join("\n");
  return `# ${p.name}
_ISO/IEC 20000-1:2018 — Clause ${p.clause} · ${c.ORG} · ${c.CUST}_

## Policy
It is ${c.ORG}'s policy to ${p.purpose}. This process operates across ${c.PLATFORM} supporting approximately ${c.USERS} users at ${c.SITES} sites (${c.HOURS}), is defined, measured and continually improved, and supports the contractual service levels and ISO/IEC 20000-1 certification.

## Procedure
${steps}

## Workflow
${sub(p.flow)}

## RACI Matrix
| Activity | ${p.owner} | Analyst / Technician | Service Delivery Manager | Program Manager |
|---|---|---|---|---|
${raciRows}

_R = Responsible, A = Accountable, C = Consulted, I = Informed._

## Roles & Responsibilities
- **${p.owner}** — owns and runs ${p.name}; accountable for its outcomes and reporting.
- **Analyst / Technician** — performs the day-to-day work and records it in ${c.PLATFORM}.
- **Service Delivery Manager** — accountable for performance against the service levels.
- **Program Manager** — owns the ${c.CUST} relationship and approves investment.

## Inputs & Outputs
**Inputs:** ${p.io[0]}.
**Outputs:** ${p.io[1]}.

## KPIs & Targets
| KPI | Target |
|---|---|
${kpi}

## Risks & Controls
| Risk | Control |
|---|---|
${risk}

## Required Records
${p.records} Records are retained per the Records Management Procedure (clause 7.5).

## Review
Reviewed at least annually and on significant change. Revision 1.0 — prepared by the ${p.owner}, approved by the Service Delivery Manager.`;
}

const FOUND = {
  smpolicy: (c) => ({ title: "Service Management Policy", clause: "5.2", content: `# Service Management Policy
_ISO/IEC 20000-1:2018 — Clause 5.2 · ${c.ORG}_

## 1. Purpose
This policy sets out ${c.ORGFULL}'s commitment to delivering the ${c.CONTRACT} to ${c.CUST} under a service management system (SMS) conforming to ISO/IEC 20000-1:2018.

## 2. Scope
Applies to all services, personnel and processes supporting approximately ${c.USERS} users across ${c.SITES} sites, delivered on ${c.PLATFORM} (${c.HOURS}).

## 3. Policy Statements
- We manage services through defined, measurable and continually improving processes.
- We meet or exceed all contractual service levels and report performance transparently.
- We restore service quickly, reduce recurring incidents, and manage change safely.
- We protect customer information in line with applicable security and privacy obligations.
- We achieve and maintain ISO/IEC 20000-1 certification.

## 4. Authority & Approval
This policy is issued by top management, is communicated to all personnel, and is reviewed at least annually.

| Version | Date | Author | Approved by |
|---|---|---|---|
| 1.0 | (current) | ITSM / Quality Manager | Program Manager |` }),

  scope: (c) => ({ title: "Scope Statement", clause: "4.3", content: `# Scope of the Service Management System
_ISO/IEC 20000-1:2018 — Clause 4.3 · ${c.ORG}_

**Organization:** ${c.ORGFULL}
**Customer:** ${c.CUST}
**Contract:** ${c.CONTRACT}
**Platform:** ${c.PLATFORM}

## Services in scope
Tier 1 and Tier 2 IT service desk and end-user support for approximately ${c.USERS} users across ${c.SITES} sites, delivered ${c.HOURS}.

## Processes in scope
Incident, service request, problem, change, configuration, asset, knowledge, capacity, availability, continuity, service level, supplier, release, monitoring & reporting, and continual improvement.

## Boundaries & exclusions
Underlying network and data-centre operations provided by the customer are interfaces to, not part of, this SMS. Where services are delivered by subcontractors, they are governed through Supplier Management.

## Governing standard
ISO/IEC 20000-1:2018, clauses 4–10.` }),

  context: (c) => ({ title: "Context of the Organization", clause: "4.1", content: `# Context of the Organization
_ISO/IEC 20000-1:2018 — Clause 4.1 · ${c.ORG}_

The following internal and external issues are relevant to ${c.ORG}'s ability to deliver the ${c.CONTRACT} and are reviewed at each management review.

## External issues
| Issue | Relevance to the SMS |
|---|---|
| Contractual & regulatory obligations (customer policy, security mandates) | Drive required controls, reporting and certification |
| Customer expectations for uptime and responsiveness | Set service-level targets |
| Labour market for qualified service-desk staff | Affects staffing capacity and continuity |
| Technology change (${c.PLATFORM}, automation, AI) | Creates improvement opportunities and training needs |
| Cyber-threat landscape | Drives security and continuity requirements |

## Internal issues
| Issue | Relevance to the SMS |
|---|---|
| Maturity of ITSM tooling and processes | Affects consistency and audit-readiness |
| Staffing levels and skills coverage | Affects SLA achievement |
| Knowledge retention across shifts | Affects first-contact resolution |
| Governance and management commitment | Affects resourcing and improvement |

## Review
Reviewed at least annually and on significant change to the contract, organization or services.` }),

  parties: (c) => ({ title: "Interested Parties Register", clause: "4.2", content: `# Interested Parties Register
_ISO/IEC 20000-1:2018 — Clause 4.2 · ${c.ORG}_

| Interested party | Needs & expectations | How the SMS meets them |
|---|---|---|
| ${c.CUST} (COR / agency) | Meets SLAs; transparent reporting; certification maintained | Monthly SLA reports; service reviews; certified SMS |
| End users (~${c.USERS}) | Fast, correct resolution; easy self-service | Incident & request processes; knowledge base; portal |
| ${c.ORG} executive / Program Manager | Compliant delivery; profitable, low-risk operation | Governance, risk register, management review |
| Service-desk employees | Clear roles; training; workable processes | Roles & competency matrix; training plan |
| Suppliers / subcontractors | Clear requirements; timely information | Supplier Management; underpinning contracts |
| Certification body | Evidence of conformity to ISO/IEC 20000-1 | Documented SMS; internal audits; records |
| Regulators (security/privacy) | Compliance with applicable mandates | Security controls; records; audits |

## Review
Reviewed at least annually and when parties or their requirements change.` }),

  leadership: (c) => ({ title: "Leadership & Responsibilities", clause: "5.1 / 5.3", content: `# Leadership Responsibilities
_ISO/IEC 20000-1:2018 — Clauses 5.1 & 5.3 · ${c.ORG}_

## Management commitment
Top management is accountable for the SMS: it sets the policy and objectives, ensures resources, promotes continual improvement, and reviews performance at management reviews.

## Roles, responsibilities & authorities
| Role | Responsibility | Authority |
|---|---|---|
| Program Manager | Accountable for the SMS and the ${c.CUST} relationship | Approves policy, budget, major decisions |
| Service Delivery Manager | Owns day-to-day operations and SLA performance | Directs operations; approves service changes |
| ITSM / Quality Manager | Maintains the SMS; runs internal audits and improvement | Manages documents, audits, corrective actions |
| Information Security Officer | Owns security obligations within the SMS | Approves security controls and exceptions |
| Process Owners | Own individual ITSM processes | Direct their process; raise improvements |

## Review
Reviewed at least annually and on organizational change.` }),

  objectives: (c) => ({ title: "Service Management Objectives", clause: "6.2", content: `# Service Management Objectives
_ISO/IEC 20000-1:2018 — Clause 6.2 · ${c.ORG}_

Objectives are measurable, aligned to the policy and the ${c.CUST} contract, and reviewed monthly.

| Objective | Measure | Target | Owner |
|---|---|---|---|
| Meet service levels | SLA targets achieved | ≥ 95% | Service Level Manager |
| Resolve at first contact | First Contact Resolution | ≥ 70% | Incident Manager |
| Keep users satisfied | Customer satisfaction (CSAT) | ≥ 90% | Service Delivery Manager |
| Change safely | Change success rate | ≥ 98% | Change Manager |
| Reduce recurring issues | Repeat incidents | -10% YoY | Problem Manager |
| Achieve certification | ISO/IEC 20000-1 certified | Within 12 months | Program Manager |

Objectives are monitored monthly and reviewed at management review (clause 9.3).` }),

  riskreg: (c) => ({ title: "Risk Register", clause: "6.1", content: `# Risk Register
_ISO/IEC 20000-1:2018 — Clause 6.1 · ${c.ORG}_

| ID | Risk | Likelihood | Impact | Control / Treatment | Owner |
|---|---|---|---|---|---|
| R1 | Insufficient staffing to meet the contracted service hours (${c.HOURS}) | Medium | High | Capacity forecasting; flex staffing; on-call coverage | Service Delivery Manager |
| R2 | Major change causes an outage | Low | High | CAB review; risk assessment; back-out plans | Change Manager |
| R3 | ${c.PLATFORM} outage disrupts service | Low | High | Availability & continuity plans; monitoring | Availability Manager |
| R4 | Loss of key knowledge on staff turnover | Medium | Medium | Knowledge base; KCS; cross-training | Knowledge Manager |
| R5 | Supplier underperformance affects SLAs | Medium | Medium | Underpinning contracts; supplier reviews | Supplier Manager |
| R6 | Security incident affecting customer data | Low | High | Security controls; incident response; training | Information Security Officer |

Risks are reviewed at least quarterly and at management review.` }),

  oppreg: (c) => ({ title: "Opportunity Register", clause: "6.1", content: `# Opportunity Register
_ISO/IEC 20000-1:2018 — Clause 6.1 · ${c.ORG}_

| ID | Opportunity | Expected benefit | Owner | Status |
|---|---|---|---|---|
| O1 | Expand the self-service catalogue in ${c.PLATFORM} | Deflect ~15% of routine requests | Request Fulfilment Lead | In progress |
| O2 | Add knowledge articles for the top 20 incidents | Raise FCR by ~5% | Knowledge Manager | Planned |
| O3 | Automate password-reset requests | Faster fulfilment; lower load | Service Delivery Manager | Under review |
| O4 | Proactive problem analysis on P1 trends | Fewer repeat incidents | Problem Manager | Planned |

Reviewed at management review alongside the risk register.` }),

  commplan: (c) => ({ title: "Communication Plan", clause: "7.4", content: `# Communication Plan
_ISO/IEC 20000-1:2018 — Clause 7.4 · ${c.ORG}_

| Communication | Audience | Frequency | Channel | Owner |
|---|---|---|---|---|
| SLA performance report | ${c.CUST} (COR) | Monthly | Written report | Service Level Manager |
| Service review | Customer & delivery team | Monthly | Meeting + minutes | Service Delivery Manager |
| Management review | Top management | Quarterly | Meeting + minutes | Program Manager |
| Major incident notification | Affected users & customer | On occurrence | ${c.PLATFORM} + email/phone | Incident Manager |
| Change notifications | Affected stakeholders | Per change | ${c.PLATFORM} + email | Change Manager |
| Team briefing | Service-desk staff | Weekly | Stand-up | Service Delivery Manager |
| Customer satisfaction survey | End users | Continuous / quarterly rollup | Survey tool | Service Level Manager |` }),

  competency: (c) => ({ title: "Competency Matrix", clause: "7.2", content: `# Competency Matrix
_ISO/IEC 20000-1:2018 — Clause 7.2 · ${c.ORG}_

| Role | Required competencies | Certifications | Status |
|---|---|---|---|
| Service Delivery Manager | Service management leadership; SLA governance | ITIL 4; PMP (desired) | Met |
| Incident Manager | Incident & major-incident handling | ITIL 4 | Met |
| Change Manager | Change/risk assessment; CAB facilitation | ITIL 4 | Met |
| Problem Manager | Root-cause analysis; trend analysis | ITIL 4 | In progress |
| Tier 1 Analyst | ${c.PLATFORM} use; customer service; triage | ITIL 4 Foundation | In progress |
| Tier 2 Engineer | Advanced troubleshooting; platform expertise | Relevant technical certs | Met |
| ITSM / Quality Manager | SMS maintenance; internal auditing | ISO 20000 / auditor training | Met |

Gaps drive the Training Plan. Reviewed at least annually.` }),

  training: (c) => ({ title: "Training Plan", clause: "7.2 / 7.3", content: `# Training Plan
_ISO/IEC 20000-1:2018 — Clauses 7.2 & 7.3 · ${c.ORG}_

## Onboarding (first 90 days)
1. ${c.CUST} account, security and privacy briefing.
2. ${c.PLATFORM} tool training and shadowing.
3. Process training for the analyst's role (incident, request, knowledge).
4. ITIL 4 Foundation enrolment.

## Ongoing training
| Topic | Audience | Frequency |
|---|---|---|
| ISO 20000 SMS awareness | All staff | Annual |
| Security & privacy refresher | All staff | Annual |
| Process/tool updates | Affected roles | On change |
| Major-incident drill | Incident team | Semi-annual |
| Knowledge-Centered Service | Analysts | Onboarding + annual |

Training records are retained per the Records Management Procedure.` }),

  doccontrol: (c) => ({ title: "Document Control Procedure", clause: "7.5", content: `# Document Control Procedure
_ISO/IEC 20000-1:2018 — Clause 7.5 · ${c.ORG}_

## Purpose
Ensure the right version of each controlled document is available where needed and that obsolete versions are not used.

## Procedure
1. **Create** — the author drafts using the approved template.
2. **Review** — the ITSM/Quality Manager reviews for accuracy and completeness.
3. **Approve** — the accountable owner approves before publication.
4. **Version** — versions follow Major.Minor (e.g. 1.0, 1.1); version, date and approver are recorded.
5. **Distribute** — the approved version is published to the controlled repository.
6. **Review cycle** — each document is reviewed at least annually and on significant change.
7. **Retire** — superseded documents are marked obsolete and archived.

| Control | Rule |
|---|---|
| Naming | [DocType] - [Title] - v[version] |
| Storage | Controlled repository with access control |
| Change record | Version table in each document |
| Retention | Per the Records Management Procedure |` }),

  records: (c) => ({ title: "Records Management Procedure", clause: "7.5", content: `# Records Management Procedure
_ISO/IEC 20000-1:2018 — Clause 7.5 · ${c.ORG}_

## Purpose
Define how records that provide evidence of conformity and effective SMS operation are identified, stored, protected, retained and disposed of.

| Record type | Owner | Storage | Retention |
|---|---|---|---|
| Incident / request records | Service Delivery Manager | ${c.PLATFORM} | Contract term + 1 year |
| Change records & CAB minutes | Change Manager | ${c.PLATFORM} | Contract term + 1 year |
| Problem / known-error records | Problem Manager | ${c.PLATFORM} | Contract term |
| SLA & performance reports | Service Level Manager | Repository | Contract term + 1 year |
| Management review minutes | Program Manager | Repository | Contract term + 1 year |
| Internal audit reports | ITSM / Quality Manager | Repository | Contract term + 1 year |
| Training records | Service Delivery Manager | HR system | Employment + per policy |

Records are protected against loss and unauthorised change, and disposed of securely at end of retention.` }),
  internalaudit: (c) => ({ title: "Internal Audit Programme", clause: "9.2", content: `# SMS Internal Audit Programme
_ISO/IEC 20000-1:2018 — Clause 9.2 · ${c.ORG}_

## Procedure
1. Plan an annual audit programme covering all SMS clauses (4–10) and service management processes.
2. Assign impartial auditors who do not audit their own work.
3. Conduct audits against ISO/IEC 20000-1:2018 and the SMS.
4. Record conformities and nonconformities with objective evidence.
5. Raise corrective actions and track them to closure.
6. Report results to management review.

| Element | Standard |
|---|---|
| Frequency | At least annually; risk-based |
| Auditor independence | Required |
| Scope | All clauses + service management processes |
| Output | Audit report + corrective actions |

Audit results are retained as documented information.` }),
  mgmtreview: (c) => ({ title: "Management Review", clause: "9.3", content: `# SMS Management Review
_ISO/IEC 20000-1:2018 — Clause 9.3 · ${c.ORG}_

Top management reviews the SMS at least quarterly.

| Inputs | Outputs |
|---|---|
| Status of prior actions | Decisions on continual improvement |
| Changes in internal/external issues | Resource decisions |
| Service performance & SLA results | Changes to the SMS |
| Audit results & nonconformities | Updated objectives |
| Customer feedback & satisfaction | Action assignments with owners |
| Improvement opportunities | |

Minutes and decisions are retained as documented information.` }),
};

const CLNAME = { "4": "Context of the organization", "5": "Leadership", "6": "Planning", "7": "Support", "8": "Operation", "9": "Performance evaluation", "10": "Improvement" };
function auditKit(id, c) {
  const name = CLNAME[id];
  return {
    "Audit Checklist": `## Internal Audit Checklist — Clause ${id} (${name})
${c.ORG} · ${c.CONTRACT} · ${c.CUST}

| # | Requirement | Audit question | Evidence to sample | Conforms? |
|---|---|---|---|---|
| 1 | ${id}.1 | Is the requirement defined and documented? | Controlling policy/procedure | ( ) |
| 2 | ${id}.2 | Is it implemented in day-to-day operation? | Records, tickets, minutes | ( ) |
| 3 | ${id}.3 | Is it monitored and reviewed? | Reports, review minutes | ( ) |
| 4 | ${id}.x | Are improvements tracked to closure? | Improvement register | ( ) |

**Sampling:** at least 5 records across the last 3 months per requirement.`,
    "Interview Questions": `## Auditor Interview Questions — Clause ${id} (${name})

- Who owns this part of the SMS, and how is it kept current?
- Walk me through how you meet clause ${id} day to day.
- What records prove it is working, and where are they kept?
- How do you know it is effective, and what changed after the last review?`,
    "Objective Evidence Requirements": `## Objective Evidence — Clause ${id} (${name})

Expect to see: the controlling document(s) for clause ${id}; dated records showing the process operating (tickets, minutes, reports); monitoring/measurement output; and evidence that issues were actioned and closed. Evidence must be current, attributable and retained per the Records Management Procedure.`,
  };
}

function buildSet(c) {
  const generated = {};
  Object.keys(FOUND).forEach((k) => { generated[k] = FOUND[k](c); });
  Object.keys(PROC).forEach((k) => { generated["proc_" + k] = { title: PROC[k].name + " — Full Pack", clause: PROC[k].clause, content: pack(k, c) }; });
  const audit = {};
  ["4", "5", "6", "7", "8", "9", "10"].forEach((id) => { audit[id] = auditKit(id, c); });
  return { generated, audit };
}

module.exports = { buildSet, FOUND, PROC };
