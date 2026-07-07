/* Deeper framework modules — ISO 9001, ISO 22301, ISO 42001, SOC 2.
   Rich packs (procedure, workflow, RACI/controls, metrics, records) plus full
   management-system clause coverage. ctx = {ORG,ORGFULL,CUST,PLATFORM,USERS,SITES,HOURS,CONTRACT} */

function doclist(order, gen) { return order.map((k) => ({ key: k, name: gen[k].title, clause: gen[k].clause })); }

/* Rich process/control pack (flagship structure) */
function pack(c, s) {
  const steps = s.steps.map((x, i) => `${i + 1}. ${x}`).join("\n");
  let tbl = "";
  if (s.raci) {
    tbl = `## RACI Matrix
| Activity | ${s.owner} | Team | Manager | Executive |
|---|---|---|---|---|
${s.raci.map((r) => `| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} | ${r[4]} |`).join("\n")}

_R = Responsible, A = Accountable, C = Consulted, I = Informed._`;
  } else if (s.controls) {
    tbl = `## Key Controls
| Control | Standard |
|---|---|
${s.controls.map((r) => `| ${r[0]} | ${r[1]} |`).join("\n")}`;
  }
  const metrics = s.metrics ? `## Metrics & Targets
| Metric | Target |
|---|---|
${s.metrics.map((r) => `| ${r[0]} | ${r[1]} |`).join("\n")}

` : "";
  return `# ${s.name}
_${s.std} — ${s.ref} · ${c.ORG} · ${c.CUST}_

## Policy
It is ${c.ORG}'s policy to ${s.purpose}, in delivering the ${c.CONTRACT} to ${c.CUST} across ${c.PLATFORM} (${c.USERS} users, ${c.SITES} sites). Defined, measured and continually improved.

## Procedure
${steps}

## Workflow
${s.flow}

${tbl}

## Roles & Responsibilities
- **${s.owner}** — owns this area; accountable for its outcomes.
- **Team** — perform the work and record it.
- **Manager** — accountable for performance.
- **Executive / Program Manager** — owns the ${c.CUST} relationship; approves resources.

${metrics}## Required Records
${s.records} Retained per the records procedure.

## Review
Reviewed at least annually and on significant change. Revision 1.0.`;
}

/* Shared Annex SL management-system docs (clauses 7, 9, 10) */
function msCommon(c, std) {
  return {
    competency: { title: "Competence & Awareness", clause: "7.2 / 7.3", content: `# Competence & Awareness
_${std} — Clauses 7.2 & 7.3 · ${c.ORG}_

| Role | Required competence | Evidence |
|---|---|---|
| Management representative | ${std} operation; auditing | Training / certification |
| Process owners | Their process & controls | Role training records |
| Delivery staff | ${c.PLATFORM}; procedures | Onboarding + refresher |
| Internal auditors | Auditing this standard | Auditor training |

Awareness of the policy, objectives and their contribution is provided to all personnel at onboarding and annually. Records are retained.` },
    communication: { title: "Communication Plan", clause: "7.4", content: `# Communication Plan
_${std} — Clause 7.4 · ${c.ORG}_

| Communication | Audience | Frequency | Channel | Owner |
|---|---|---|---|---|
| Performance report | ${c.CUST} | Monthly | Report | Management rep |
| Management review | Top management | Quarterly | Meeting + minutes | Program Manager |
| Policy & changes | All staff | On change | Portal / briefing | Management rep |
| Issues & escalations | Affected parties | As needed | ${c.PLATFORM} / email | Process owners |
| Objectives & results | All staff | Quarterly | Briefing | Management rep |` },
    doccontrol: { title: "Control of Documented Information", clause: "7.5", content: `# Control of Documented Information
_${std} — Clause 7.5 · ${c.ORG}_

## Procedure
1. Create using approved templates.
2. Review and approve before publication.
3. Version as Major.Minor; record version, date, approver.
4. Publish to the controlled repository with access control.
5. Review at least annually and on significant change.
6. Archive superseded versions.

| Control | Rule |
|---|---|
| Naming | [Type] - [Title] - v[version] |
| Storage | Controlled, access-restricted repository |
| Change record | Version table in each document |
| Retention | Per the records procedure |` },
    records: { title: "Records & Retention", clause: "7.5", content: `# Records & Retention
_${std} — Clause 7.5 · ${c.ORG}_

| Record | Owner | Storage | Retention |
|---|---|---|---|
| Objectives & KPI results | Management rep | Repository | Term + 1 year |
| Internal audit reports | Internal auditor | Repository | Term + 1 year |
| Management review minutes | Program Manager | Repository | Term + 1 year |
| Nonconformity & actions | Management rep | Repository | Term + 1 year |
| Training records | HR | HR system | Employment + per policy |
| Operational records | Process owners | ${c.PLATFORM} | Term + 1 year |

Records are protected against loss and unauthorised change; disposed of securely at end of retention.` },
    internalaudit: { title: "Internal Audit Programme", clause: "9.2", content: `# Internal Audit Programme
_${std} — Clause 9.2 · ${c.ORG}_

## Procedure
1. Plan an annual audit programme covering all clauses/controls.
2. Assign impartial auditors (not auditing their own work).
3. Conduct audits against the standard and this system.
4. Record findings (conformities and nonconformities).
5. Raise corrective actions and track to closure.
6. Report results to management review.

| Element | Standard |
|---|---|
| Frequency | At least annual; risk-based |
| Auditor independence | Required |
| Evidence | Sampled records, interviews |
| Output | Audit report + actions |` },
    mgmtreview: { title: "Management Review", clause: "9.3", content: `# Management Review
_${std} — Clause 9.3 · ${c.ORG}_

Top management reviews the system at least quarterly. Inputs and outputs:

| Inputs | Outputs |
|---|---|
| Status of prior actions | Decisions on improvement |
| Objective & KPI performance | Resource decisions |
| Audit results & nonconformities | Changes to the system |
| Customer feedback / satisfaction | Updated objectives |
| Risks & opportunities | Action assignments |

Minutes are recorded and retained as evidence.` },
    improvement: { title: "Nonconformity, Corrective Action & Improvement", clause: "10.1 / 10.2", content: `# Nonconformity, Corrective Action & Improvement
_${std} — Clauses 10.1 & 10.2 · ${c.ORG}_

## Procedure
1. Identify and record the nonconformity.
2. Contain and correct the immediate issue.
3. Analyse the root cause.
4. Implement corrective action to prevent recurrence.
5. Verify effectiveness and close.
6. Feed improvement opportunities into the register.

| Field | Example |
|---|---|
| Source | Audit, complaint, incident, KPI miss |
| Correction | Immediate fix |
| Corrective action | Root-cause removal |
| Verification | Effectiveness confirmed |

Continual improvement is driven through the register, reviewed at management review.` },
  };
}
const CLNAME = { "4": "Context", "5": "Leadership", "6": "Planning", "7": "Support", "8": "Operation", "9": "Performance evaluation", "10": "Improvement" };
function mgmtAudit(c, std) {
  const a = {};
  ["4", "5", "6", "7", "8", "9", "10"].forEach((id) => {
    a[id] = {
      "Audit Checklist": `## Internal Audit Checklist — Clause ${id} (${CLNAME[id]})
${c.ORG} · ${c.CONTRACT} · ${std}

| # | Requirement | Audit question | Evidence | Conforms? |
|---|---|---|---|---|
| 1 | ${id}.1 | Defined & documented? | Policy/procedure | ( ) |
| 2 | ${id}.2 | Implemented? | Records | ( ) |
| 3 | ${id}.3 | Monitored & reviewed? | Reports, minutes | ( ) |`,
      "Interview Questions": `## Interview Questions — Clause ${id} (${CLNAME[id]})
- Who owns this and how is it kept current?
- Walk me through how you meet clause ${id}.
- What records evidence it, and where?
- How is effectiveness measured and improved?`,
      "Objective Evidence": `## Objective Evidence — Clause ${id} (${CLNAME[id]})
Expect controlling document(s), dated operational records, monitoring output, and evidence of closed actions — current, attributable, retained.`,
    };
  });
  return a;
}

/* ===================== ISO 9001:2015 ===================== */
function buildSet9001(c) {
  const std = "ISO 9001:2015"; const g = {};
  g.qualitypolicy = { title: "Quality Policy", clause: "5.2", content: `# Quality Policy
_${std} — Clause 5.2 · ${c.ORG}_

## Purpose
${c.ORGFULL} is committed to consistently delivering the ${c.CONTRACT} to ${c.CUST} in a way that meets requirements and enhances customer satisfaction, under a QMS conforming to ${std}.

## Policy statements
- Meet customer, statutory and regulatory requirements.
- Set and review measurable quality objectives.
- Apply the process approach and risk-based thinking.
- Continually improve the QMS.

| Version | Date | Author | Approved by |
|---|---|---|---|
| 1.0 | (current) | Quality Manager | Program Manager |` };
  g.qmsscope = { title: "QMS Scope", clause: "4.3", content: `# Scope of the QMS
_${std} — Clause 4.3 · ${c.ORG}_

**Organization:** ${c.ORGFULL} · **Customer:** ${c.CUST} · **Services:** delivery of the ${c.CONTRACT} (~${c.USERS} users, ${c.SITES} sites, on ${c.PLATFORM}).

The QMS covers planning, delivery, control and improvement of the contracted services. Clause 8.3 (Design & Development) applies only where the organization designs services; otherwise justified as not applicable. Governing standard: ${std}, clauses 4–10.` };
  g.context = { title: "Context & Interested Parties", clause: "4.1 / 4.2", content: `# Context & Interested Parties
_${std} — Clauses 4.1 & 4.2 · ${c.ORG}_

## Issues
| Type | Issue | Relevance |
|---|---|---|
| External | Customer & regulatory requirements | Set quality obligations |
| External | Technology & market change | Improvement drivers |
| Internal | Resource & competence | Affect conformity |
| Internal | Process maturity | Affects consistency |

## Interested parties
| Party | Requirements |
|---|---|
| ${c.CUST} | Conforming services; satisfaction |
| End users (~${c.USERS}) | Reliable, correct service |
| Employees | Clear processes; competence |
| Suppliers | Clear requirements |
| Regulators | Compliance |` };
  g.leadership = { title: "Leadership & Customer Focus", clause: "5.1", content: `# Leadership & Customer Focus
_${std} — Clause 5.1 · ${c.ORG}_

Top management demonstrates commitment by setting policy and objectives, ensuring resources, promoting the process approach and risk-based thinking, and maintaining customer focus.

| Role | Responsibility | Authority |
|---|---|---|
| Program Manager | Accountable for the QMS & ${c.CUST} relationship | Approves policy, budget |
| Quality Manager | Maintains QMS; audits; improvement | Manages documents, actions |
| Process Owners | Own & improve their processes | Direct their process |` };
  g.objectives = { title: "Quality Objectives", clause: "6.2", content: `# Quality Objectives
_${std} — Clause 6.2 · ${c.ORG}_

| Objective | Measure | Target | Owner |
|---|---|---|---|
| Meet service levels | SLA attainment | ≥ 95% | Service Delivery Manager |
| Satisfy customers | CSAT | ≥ 90% | Quality Manager |
| Reduce nonconformities | NCRs per quarter | Downward trend | Quality Manager |
| On-time delivery | Deliverables on time | ≥ 98% | Program Manager |

Reviewed at management review (9.3).` };
  g.riskopps = { title: "Risks & Opportunities Register", clause: "6.1", content: `# Risks & Opportunities Register
_${std} — Clause 6.1 · ${c.ORG}_

| ID | Risk / Opportunity | Type | Action | Owner |
|---|---|---|---|---|
| Q1 | Missed SLAs from resource gaps | Risk | Capacity planning | Service Delivery Manager |
| Q2 | Inconsistent execution | Risk | Documented procedures + audit | Quality Manager |
| Q3 | Automation to reduce errors | Opportunity | Pilot automation | Program Manager |
| Q4 | Best-practice reuse across sites | Opportunity | Standardize | Quality Manager |

Reviewed at management review.` };
  g.customerreq = { title: "Requirements & Customer Communication", clause: "8.2", content: pack(c, { std, name: "Requirements for Services & Customer Communication", ref: "Clause 8.2", owner: "Service Delivery Manager", purpose: "determine, review and communicate requirements for the services before commitment", steps: ["Capture requirements from the contract and customer.", "Review requirements for feasibility before committing (8.2.3).", "Resolve differences between stated and contracted requirements.", "Communicate with the customer on enquiries, changes and feedback.", "Record requirement reviews and changes.", "Handle customer property and feedback appropriately."], flow: "Requirement → review feasibility → commit → deliver → feedback → change control.", controls: [["Requirements review", "Before commitment (8.2.3)"], ["Change control", "Documented"], ["Customer communication", "Defined channels"], ["Feedback capture", "Continuous"]], metrics: [["Requirement reviews completed", "100%"], ["Customer enquiries answered on time", "≥ 95%"]], records: "Requirement reviews, change records, and customer communications." }) };
  g.serviceprovision = { title: "Service Provision (Operation)", clause: "8.1 / 8.5", content: pack(c, { std, name: "Operational Planning & Service Provision", ref: "Clauses 8.1 & 8.5", owner: "Service Delivery Manager", purpose: "plan and control service provision so outputs consistently meet requirements", steps: ["Plan delivery, resources and controls (8.1).", "Control service provision against defined criteria (8.5).", "Identify and trace outputs; preserve information.", "Control changes to service provision.", "Release only conforming services.", "Monitor against acceptance criteria."], flow: "Plan → control provision → monitor → release conforming service → change control.", raci: [["Plan delivery", "A", "R", "C", "I"], ["Control service provision", "A", "R", "C", "I"], ["Release conforming output", "R", "R", "A", "I"], ["Control changes", "A", "C", "R", "I"]], metrics: [["Services meeting acceptance criteria", "≥ 98%"], ["Unplanned changes", "Downward trend"]], records: "Service records, acceptance evidence, and change records." }) };
  g.purchasing = { title: "Control of External Providers", clause: "8.4", content: pack(c, { std, name: "Control of Externally Provided Processes & Suppliers", ref: "Clause 8.4", owner: "Quality Manager", purpose: "ensure externally provided processes, products and services conform to requirements", steps: ["Define criteria for evaluation and selection of providers.", "Communicate requirements to providers.", "Verify externally provided items meet requirements.", "Monitor provider performance.", "Re-evaluate and re-approve providers periodically.", "Address provider nonconformities."], flow: "Evaluate → select → communicate requirements → verify → monitor → re-approve.", controls: [["Evaluation & selection", "Criteria-based"], ["Requirements to suppliers", "Documented"], ["Verification", "On receipt/service"], ["Performance monitoring", "Periodic"]], metrics: [["Supplier conformance", "≥ 95%"], ["Approved-supplier use", "100%"]], records: "Approved supplier list, evaluations, and verification records." }) };
  g.nonconformity = { title: "Control of Nonconforming Outputs", clause: "8.7", content: pack(c, { std, name: "Control of Nonconforming Outputs", ref: "Clause 8.7", owner: "Quality Manager", purpose: "identify and control outputs that do not conform, to prevent unintended use", steps: ["Identify and segregate nonconforming output.", "Correct, or obtain concession where appropriate.", "Record the nonconformity and action taken.", "Verify conformity after correction.", "Raise corrective action where recurrence is likely."], flow: "Detect nonconformity → segregate → correct/concession → verify → record → corrective action.", controls: [["Identification", "Marked & segregated"], ["Disposition", "Correct / concession / reject"], ["Verification", "Re-checked"], ["Records", "Retained"]], metrics: [["Escaped nonconformities", "0"], ["NCR closure on time", "≥ 90%"]], records: "Nonconformity records and disposition decisions." }) };
  g.monitoring = { title: "Monitoring, Measurement & Customer Satisfaction", clause: "9.1", content: pack(c, { std, name: "Monitoring, Measurement & Customer Satisfaction", ref: "Clause 9.1", owner: "Quality Manager", purpose: "monitor performance and customer satisfaction and act on the results", steps: ["Determine what to monitor and measure.", "Track service performance against SLAs.", "Measure customer satisfaction (survey / feedback).", "Analyse data for trends.", "Report to management review.", "Trigger improvement where targets are missed."], flow: "Define measures → monitor → measure satisfaction → analyse → report → improve.", metrics: [["SLA attainment", "≥ 95%"], ["CSAT", "≥ 90%"], ["Data reviewed at MR", "100%"]], records: "Performance data, satisfaction results, and analysis." }) };
  const ms = msCommon(c, std);
  Object.assign(g, ms);
  const order = ["qualitypolicy", "qmsscope", "context", "leadership", "objectives", "riskopps", "competency", "communication", "doccontrol", "records", "customerreq", "serviceprovision", "purchasing", "nonconformity", "monitoring", "internalaudit", "mgmtreview", "improvement"];
  return { generated: g, audit: mgmtAudit(c, std), docList: doclist(order, g) };
}

/* ===================== ISO 22301:2019 ===================== */
function buildSet22301(c) {
  const std = "ISO 22301:2019"; const g = {};
  g.bcpolicy = { title: "Business Continuity Policy", clause: "5.2", content: `# Business Continuity Policy
_${std} — Clause 5.2 · ${c.ORG}_

${c.ORGFULL} maintains the capability to continue delivery of the ${c.CONTRACT} to ${c.CUST} during and after disruption, under a BCMS conforming to ${std}.

- Identify critical activities and set recovery objectives.
- Prepare, maintain and exercise continuity plans.
- Meet contractual and regulatory continuity obligations.

| Version | Date | Approved by |
|---|---|---|
| 1.0 | (current) | Program Manager |` };
  g.bcscope = { title: "BCMS Scope", clause: "4.3", content: `# Scope of the BCMS
_${std} — Clause 4.3 · ${c.ORG}_

Covers the people, processes and technology (${c.PLATFORM}) delivering the ${c.CONTRACT} across ${c.SITES} sites (~${c.USERS} users). Governing standard: ${std}, clauses 4–10.` };
  g.context = { title: "Context & Interested Parties", clause: "4.1 / 4.2", content: `# Context & Interested Parties
_${std} — Clauses 4.1 & 4.2 · ${c.ORG}_

| Party | Continuity requirement |
|---|---|
| ${c.CUST} | Continued service within agreed targets |
| End users (~${c.USERS}) | Minimal disruption |
| Regulators | Compliance with continuity obligations |
| Suppliers | Coordinated recovery |

External/internal issues (threats, dependencies, resourcing) are reviewed at management review.` };
  g.leadership = { title: "Leadership & Roles", clause: "5.1 / 5.3", content: `# Leadership & Roles
_${std} — Clauses 5.1 & 5.3 · ${c.ORG}_

| Role | Responsibility |
|---|---|
| Program Manager | Accountable for the BCMS and ${c.CUST} relationship |
| Continuity Manager | Runs the BCMS; BIA, strategy, plans, exercises |
| Incident Manager | Leads incident response and recovery |
| Process Owners | Maintain their recovery procedures |` };
  g.objectives = { title: "BC Objectives", clause: "6.2", content: `# Business Continuity Objectives
_${std} — Clause 6.2 · ${c.ORG}_

| Objective | Measure | Target |
|---|---|---|
| Meet recovery targets | RTO met in tests | 100% |
| Exercise the plans | Exercises completed | Per programme |
| Maintain currency | Plans reviewed | Annual + on change |

Reviewed at management review.` };
  g.bia = { title: "Business Impact Analysis (BIA)", clause: "8.2.2", content: `# Business Impact Analysis (BIA)
_${std} — Clause 8.2.2 · ${c.ORG}_

| Activity | Impact of disruption | MTPD | RTO | RPO | Priority |
|---|---|---|---|---|---|
| Service desk (P1 handling) | Users unable to work; SLA breach | 4h | 2h | 15m | Critical |
| Ticketing platform (${c.PLATFORM}) | No incident/request handling | 4h | 2h | 15m | Critical |
| Reporting | Delayed SLA reporting | 5d | 3d | 1d | Medium |
| Knowledge base | Lower FCR | 3d | 2d | 1d | Medium |

_MTPD = maximum tolerable period of disruption; RTO/RPO = recovery time/point objectives._ Reviewed at least annually and on significant change.` };
  g.riskassessment = { title: "BC Risk Assessment", clause: "8.2.3", content: `# Business Continuity Risk Assessment
_${std} — Clause 8.2.3 · ${c.ORG}_

| ID | Threat | Likelihood | Impact | Treatment | Owner |
|---|---|---|---|---|---|
| B1 | Platform/data-center outage | Low | High | Redundancy; failover; backups | Continuity Manager |
| B2 | Loss of site access | Low | High | Remote-work capability | Continuity Manager |
| B3 | Key staff unavailability | Medium | Medium | Cross-training; on-call | Service Delivery Manager |
| B4 | Cyber incident | Medium | High | IR + continuity integration | Security Lead |

Reviewed at least annually.` };
  g.strategy = { title: "BC Strategy & Solutions", clause: "8.3", content: pack(c, { std, name: "Business Continuity Strategy & Solutions", ref: "Clause 8.3", owner: "Continuity Manager", purpose: "select strategies and solutions that meet the recovery objectives from the BIA", steps: ["Derive requirements from the BIA (RTO/RPO/MTPD).", "Identify options for people, premises, technology and suppliers.", "Select strategies that meet objectives at justifiable cost.", "Provision the required resources.", "Document solution details and dependencies.", "Validate against the BIA."], flow: "BIA requirements → options → selection → provision → validate.", controls: [["Meet RTO/RPO", "Redundancy; frequent backups; tested restore"], ["Site loss", "Remote-work + alternate site"], ["Staffing", "Cross-training; on-call"], ["Platform", "Provider resilience + failover"]], metrics: [["Strategies meeting BIA targets", "100%"], ["Provisioned resources ready", "100%"]], records: "The strategy document and resource provisioning records." }) };
  g.plans = { title: "Business Continuity Plans", clause: "8.4", content: pack(c, { std, name: "Business Continuity Plans", ref: "Clause 8.4", owner: "Continuity Manager", purpose: "provide documented procedures to continue and recover critical activities", steps: ["Define activation criteria and authority.", "Establish the incident response team and roles.", "Set out communications (staff, ${c.CUST}, suppliers).", "Document recovery procedures per critical activity to meet RTO/RPO.", "List resources and dependencies.", "Define return-to-normal criteria."], flow: "Activation → mobilize team → communicate → recover per procedure → return to normal.", controls: [["Activation criteria", "Defined & authorized"], ["Team & roles", "Named"], ["Communications", "Pre-drafted"], ["Recovery procedures", "Per critical activity"]], metrics: [["Plans covering critical activities", "100%"], ["Plans accessible during disruption", "Yes"]], records: "Continuity plans, contact lists, and recovery procedures." }) };
  g.incident = { title: "Incident Response Structure", clause: "8.4.2", content: pack(c, { std, name: "Incident Response Structure", ref: "Clause 8.4.2", owner: "Incident Manager", purpose: "provide a defined structure to respond to disruptive incidents", steps: ["Detect and assess the incident's severity.", "Activate the response structure and escalate.", "Establish command, safety and communications.", "Coordinate recovery per the plans.", "Communicate with ${c.CUST} and stakeholders.", "Stand down and review after resolution."], flow: "Detect → assess → activate → command → recover → communicate → stand down → review.", raci: [["Assess & declare", "A", "R", "C", "I"], ["Activate response", "A", "R", "C", "I"], ["Coordinate recovery", "R", "R", "A", "I"], ["Stakeholder comms", "R", "C", "A", "C"]], metrics: [["Time to activate", "Within target"], ["Post-incident reviews", "100%"]], records: "Incident logs, decisions, and post-incident reviews." }) };
  g.exercise = { title: "Exercising & Testing Programme", clause: "8.5", content: pack(c, { std, name: "Exercising & Testing Programme", ref: "Clause 8.5", owner: "Continuity Manager", purpose: "validate the plans and build capability through a programme of exercises", steps: ["Plan a programme of exercises across plan types.", "Run tabletop walkthroughs of the plans.", "Run technical recovery / failover tests.", "Test communications and notifications.", "Capture findings and lessons.", "Update plans and re-test as needed."], flow: "Plan programme → tabletop → technical test → comms test → findings → update.", controls: [["Plan walkthrough", "Semi-annual"], ["Recovery / failover", "Annual"], ["Communications test", "Annual"], ["Findings", "Tracked to closure"]], metrics: [["Exercises completed", "Per programme"], ["Recovery within RTO in tests", "100%"]], records: "Exercise plans, results, and improvement actions." }) };
  g.performance = { title: "Performance Evaluation", clause: "9.1", content: `# Performance Evaluation
_${std} — Clause 9.1 · ${c.ORG}_

Continuity performance is measured via exercise results, RTO/RPO achievement in tests, plan currency, and post-incident reviews.

| Metric | Target |
|---|---|
| Recovery within RTO (tests) | 100% |
| Plan currency | Reviewed annually + on change |
| Exercises completed | Per programme |
| Post-incident reviews | 100% of activations |

Reported at management review.` };
  const ms = msCommon(c, std);
  ["competency", "communication", "doccontrol", "records", "internalaudit", "mgmtreview", "improvement"].forEach((k) => { g[k] = ms[k]; });
  const order = ["bcpolicy", "bcscope", "context", "leadership", "objectives", "bia", "riskassessment", "strategy", "plans", "incident", "exercise", "performance", "competency", "communication", "doccontrol", "records", "internalaudit", "mgmtreview", "improvement"];
  return { generated: g, audit: mgmtAudit(c, std), docList: doclist(order, g) };
}

/* ===================== ISO 42001:2023 ===================== */
function buildSet42001(c) {
  const std = "ISO/IEC 42001:2023"; const g = {};
  g.aipolicy = { title: "AI Management Policy", clause: "5.2", content: `# AI Management Policy
_${std} — Clause 5.2 · ${c.ORG}_

${c.ORGFULL} develops and uses AI systems responsibly in delivering the ${c.CONTRACT}, under an AIMS conforming to ${std}.

- Assess AI risks and impacts on people and society.
- Ensure human oversight, transparency and data governance.
- Manage AI across its lifecycle.
- Meet legal and ethical obligations; continually improve.

| Version | Date | Approved by |
|---|---|---|
| 1.0 | (current) | Program Manager |` };
  g.aimsscope = { title: "AIMS Scope", clause: "4.3", content: `# Scope of the AIMS
_${std} — Clause 4.3 · ${c.ORG}_

Covers AI systems used or provided in delivering the ${c.CONTRACT} to ${c.CUST} (e.g. AI-assisted support and automation on ${c.PLATFORM}). Governing standard: ${std}, clauses 4–10 and Annex A.` };
  g.context = { title: "Context & Interested Parties", clause: "4.1 / 4.2", content: `# Context & Interested Parties
_${std} — Clauses 4.1 & 4.2 · ${c.ORG}_

| Party | AI-related needs |
|---|---|
| ${c.CUST} | Safe, fair, transparent AI use |
| End users (~${c.USERS}) | Reliable AI assistance; recourse |
| Regulators | Compliance with AI/data law |
| Employees | Clear roles for AI oversight |
| Society | Avoidance of harm and bias |

AI-specific issues (bias, explainability, data quality, regulation) are reviewed at management review.` };
  g.roles = { title: "AI Roles & Responsibilities", clause: "5.3", content: `# AI Roles & Responsibilities
_${std} — Clause 5.3 · ${c.ORG}_

| Role | Responsibility |
|---|---|
| Program Manager | Accountable for the AIMS |
| AI Owner | Owns AI systems, risk and impact |
| Security Lead | AI data protection |
| Human reviewers | Oversee AI outputs |
| All users | Use AI per policy; report issues |` };
  g.objectives = { title: "AI Objectives", clause: "6.2", content: `# AI Management Objectives
_${std} — Clause 6.2 · ${c.ORG}_

| Objective | Measure | Target |
|---|---|---|
| Human oversight of material AI actions | % reviewed | 100% |
| AI accuracy monitored | Accuracy sampling | Per schedule |
| Impact assessments current | AI systems assessed | 100% |

Reviewed at management review.` };
  g.riskassessment = { title: "AI Risk Assessment", clause: "6.1", content: `# AI Risk Assessment
_${std} — Clause 6.1 · ${c.ORG}_

| ID | AI risk | Likelihood | Impact | Treatment | Owner |
|---|---|---|---|---|---|
| AI1 | Inaccurate AI output misleads users | Medium | Medium | Human review of AI suggestions | AI Owner |
| AI2 | Bias in handling | Low | High | Testing; monitoring; oversight | AI Owner |
| AI3 | Data leakage into AI | Medium | High | No sensitive data to AI; controls | Security Lead |
| AI4 | Over-reliance on automation | Medium | Medium | Human-in-the-loop; audit | AI Owner |

Reviewed at least annually and on AI change.` };
  g.impact = { title: "AI System Impact Assessment", clause: "6.1.4", content: `# AI System Impact Assessment
_${std} — Clause 6.1.4 · ${c.ORG}_

For each AI system, assess impacts on individuals and society:

| Dimension | Assessment |
|---|---|
| Affected individuals | End users receiving AI-assisted support |
| Potential harms | Incorrect guidance; unfair treatment |
| Likelihood & severity | Assessed and rated |
| Mitigations | Human oversight; accuracy monitoring; opt-out |
| Transparency | Users informed AI is assisting |
| Recourse | Human escalation always available |
| Residual impact | Accepted by the AI Owner |

Documented before deployment and reviewed on change.` };
  g.inventory = { title: "AI System Inventory", clause: "Annex A", content: `# AI System Inventory
_${std} — Annex A · ${c.ORG}_

| AI system | Purpose | Data used | Risk level | Oversight | Owner |
|---|---|---|---|---|---|
| AI support assistant | Draft responses / triage | Ticket text (no sensitive data) | Limited | Human review | Service Delivery Manager |
| Automation rules | Routing & classification | Metadata | Minimal | Audited | Platform Owner |

Each AI system has an impact assessment and defined oversight.` };
  g.datagovernance = { title: "Data Governance for AI", clause: "Annex A", content: pack(c, { std, name: "Data Governance for AI", ref: "Annex A", owner: "Security Lead", purpose: "ensure AI is built and run on appropriate, well-governed data", steps: ["Document data sources and permitted uses.", "Validate data quality for the AI purpose.", "Exclude sensitive data unless controlled.", "Record data provenance.", "Apply retention and disposal rules.", "Review data governance on AI change."], flow: "Source → permitted use → quality check → provenance → retention → review.", controls: [["Data sources", "Documented; permitted use"], ["Data quality", "Validated"], ["Sensitive data", "Controlled / excluded"], ["Provenance", "Recorded"]], metrics: [["AI systems with documented data lineage", "100%"], ["Sensitive-data exposure to AI", "0"]], records: "Data source register, quality checks, and provenance records." }) };
  const A42 = {
    "A.2 Policies related to AI": [
      ["A.2.2", "AI policy", "AI Management Policy approved by top management and communicated"],
      ["A.2.3", "Alignment with other organizational policies", "AI policy aligned with security, privacy, and quality policies"],
      ["A.2.4", "Review of the AI policy", "AI policy reviewed at least annually and on significant change"]],
    "A.3 Internal organization": [
      ["A.3.2", "AI roles and responsibilities", "AI Owner, reviewers, and Security Lead roles defined and assigned"],
      ["A.3.3", "Reporting of concerns", "Channel provided to report AI concerns and issues"]],
    "A.4 Resources for AI systems": [
      ["A.4.2", "Resource documentation", "AI resources (data, tooling, compute, people) documented"],
      ["A.4.3", "Data resources", "Data resources for AI documented and governed"],
      ["A.4.4", "Tooling resources", "AI tools and models inventoried"],
      ["A.4.5", "System and computing resources", "Compute and hosting resources documented"],
      ["A.4.6", "Human resources", "Competence for AI oversight defined and resourced"]],
    "A.5 Assessing impacts of AI systems": [
      ["A.5.2", "AI system impact assessment process", "Documented impact-assessment process performed before deployment"],
      ["A.5.3", "Documentation of AI system impact assessments", "Impact assessments recorded and retained"],
      ["A.5.4", "Assessing impact on individuals or groups", "Impacts on individuals assessed (harms, bias, recourse)"],
      ["A.5.5", "Assessing societal impacts", "Broader societal impacts assessed and mitigated"]],
    "A.6 AI system life cycle": [
      ["A.6.1.2", "Objectives for responsible development", "Responsible-AI objectives defined for development"],
      ["A.6.1.3", "Processes for responsible design and development", "Design/development follows responsible-AI processes"],
      ["A.6.2.2", "AI system requirements and specification", "Requirements including safety, fairness, and oversight specified"],
      ["A.6.2.3", "Documentation of design and development", "Design and development documented"],
      ["A.6.2.4", "AI system verification and validation", "Performance and fairness validated before deployment"],
      ["A.6.2.5", "AI system deployment", "Deployment with human oversight and rollback"],
      ["A.6.2.6", "AI system operation and monitoring", "Accuracy and drift monitored in operation"],
      ["A.6.2.7", "AI system technical documentation", "Technical documentation maintained"],
      ["A.6.2.8", "AI system recording of event logs", "AI event logs recorded and retained"]],
    "A.7 Data for AI systems": [
      ["A.7.2", "Data for development and enhancement", "Data used for AI documented and permitted"],
      ["A.7.3", "Acquisition of data", "Data acquisition controlled and lawful"],
      ["A.7.4", "Quality of data for AI systems", "Data quality validated for the AI purpose"],
      ["A.7.5", "Data provenance", "Provenance of AI data recorded"],
      ["A.7.6", "Data preparation", "Data preparation documented and controlled"]],
    "A.8 Information for interested parties": [
      ["A.8.2", "System documentation and information for users", "Users informed AI is assisting; usage documented"],
      ["A.8.3", "External reporting", "External reporting mechanism provided"],
      ["A.8.4", "Communication of incidents", "AI incidents communicated to affected parties"],
      ["A.8.5", "Information for interested parties", "Interested parties given relevant AI information"]],
    "A.9 Use of AI systems": [
      ["A.9.2", "Processes for responsible use", "Responsible-use processes defined"],
      ["A.9.3", "Objectives for responsible use", "Responsible-use objectives set and tracked"],
      ["A.9.4", "Intended use of the AI system", "Intended use defined; misuse controls in place"]],
    "A.10 Third-party and customer relationships": [
      ["A.10.2", "Allocating responsibilities", "Responsibilities allocated across third parties"],
      ["A.10.3", "Suppliers", "AI supplier assurance obtained where used"],
      ["A.10.4", "Customers", "Customer obligations and information addressed"]],
  };
  let soaBody = "";
  Object.keys(A42).forEach((obj) => {
    soaBody += `\n### ${obj}\n\n| Control | Title | Applicable | Implementation |\n|---|---|---|---|\n`;
    soaBody += A42[obj].map((r) => `| ${r[0]} | ${r[1]} | Yes | ${r[2]} |`).join("\n") + "\n";
  });
  g.soa = { title: "Statement of Applicability (Annex A)", clause: "6.1.3", content: `# Statement of Applicability
_${std} — Annex A · ${c.ORG}_

This Statement of Applicability lists the ISO/IEC 42001:2023 Annex A controls, their applicability to the AI management system for the ${c.CONTRACT}, and how each is implemented. Exclusions are justified by the AI risk and impact assessments.
${soaBody}
All 38 Annex A controls are applicable and implemented as above, confirmed by the AI risk and impact assessments.` };
  g.lifecycle = { title: "AI System Lifecycle Controls", clause: "Annex A", content: pack(c, { std, name: "AI System Lifecycle Management", ref: "Annex A", owner: "AI Owner", purpose: "manage AI systems responsibly across design, deployment, operation and retirement", steps: ["Define intended use and requirements.", "Assess risk and impact before build/procurement.", "Validate performance and fairness before deployment.", "Deploy with human oversight and monitoring.", "Monitor accuracy and drift in operation.", "Retire or retrain when performance degrades."], flow: "Define → assess → validate → deploy (oversight) → monitor → retrain/retire.", controls: [["Pre-deployment validation", "Performance & fairness"], ["Oversight", "Human-in-the-loop"], ["Monitoring", "Accuracy & drift"], ["Retirement", "On degradation"]], metrics: [["AI systems validated pre-deployment", "100%"], ["Monitored in operation", "100%"]], records: "Validation reports, monitoring logs, and change/retirement records." }) };
  g.oversight = { title: "Human Oversight & Transparency", clause: "Annex A", content: `# Human Oversight & Transparency
_${std} — Annex A · ${c.ORG}_

- AI suggestions are reviewed by a human before acting where impact is material.
- Users are informed when AI assists them.
- A human escalation path is always available.
- AI performance is monitored; humans can override or disable AI.

| Control | Standard |
|---|---|
| Human review | Material actions |
| Disclosure | Users informed of AI |
| Override | Always available |
| Kill switch | AI can be disabled |` };
  g.monitoring = { title: "Monitoring, Measurement & Evaluation", clause: "9.1", content: `# Monitoring, Measurement, Analysis & Evaluation
_${std} — Clause 9.1 · ${c.ORG}_

| What is measured | Method | Frequency | Owner |
|---|---|---|---|
| AI accuracy / performance | Accuracy sampling & drift monitoring | Per schedule | AI Owner |
| Human oversight of material actions | % reviewed | Monthly | AI Owner |
| AI impact assessments current | Coverage of AI systems | Quarterly | AI Owner |
| AI incidents | Trend analysis | Monthly | Security Lead |
| Data quality for AI | Validation results | Per release | Security Lead |

Results are analysed and reported to management review to drive improvement of the AIMS.` };
  const ms = msCommon(c, std);
  ["competency", "communication", "doccontrol", "records", "internalaudit", "mgmtreview", "improvement"].forEach((k) => { g[k] = ms[k]; });
  const order = ["aipolicy", "aimsscope", "context", "roles", "objectives", "riskassessment", "impact", "inventory", "datagovernance", "soa", "lifecycle", "oversight", "monitoring", "competency", "communication", "doccontrol", "records", "internalaudit", "mgmtreview", "improvement"];
  return { generated: g, audit: mgmtAudit(c, std), docList: doclist(order, g) };
}

/* ===================== SOC 2 (AICPA TSC) ===================== */
function buildSetSoc2(c) {
  const std = "SOC 2 (AICPA TSC)"; const g = {};
  g.description = { title: "System Description", clause: "DC", content: `# System Description
_${std} · ${c.ORG}_

## Services
${c.ORGFULL} provides the ${c.CONTRACT} to ${c.CUST}, on ${c.PLATFORM}, supporting ~${c.USERS} users across ${c.SITES} sites.

## System components
| Component | Examples |
|---|---|
| Infrastructure | Cloud hosting, networks |
| Software | ${c.PLATFORM}, endpoint tools |
| People | Service desk, security, management |
| Procedures | Documented policies & processes |
| Data | Customer and operational data |

## Boundaries
People, processes and technology used to deliver the service. Subservice organizations (cloud/hosting) are covered via the carve-out method and vendor management.

## Trust Services Categories in scope
Security (Common Criteria), Availability, and Confidentiality.` };
  g.controlmatrix = { title: "Control Matrix (Common Criteria)", clause: "CC1–CC9", content: `# Control Matrix — Common Criteria
_${std} · ${c.ORG}_

| Ref | Criterion (point of focus) | Control |
|---|---|---|
| CC1.1 | Integrity and ethical values | Code of conduct; background screening |
| CC1.2 | Board / management oversight | Governance oversight of security program |
| CC1.3 | Structure, authority, responsibility | Org structure with defined security roles |
| CC1.4 | Commitment to competence | Role-based training and competence records |
| CC1.5 | Accountability | Performance and accountability for controls |
| CC2.1 | Quality information | Relevant, quality information used for controls |
| CC2.2 | Internal communication | Security policy communicated internally |
| CC2.3 | External communication | Commitments communicated to customers |
| CC3.1 | Objectives specified | Security objectives defined |
| CC3.2 | Risk identification | Annual risk assessment identifies risks |
| CC3.3 | Fraud risk | Fraud risk considered in assessment |
| CC3.4 | Change risk | Impact of change assessed |
| CC4.1 | Control evaluations | Ongoing and separate control evaluations |
| CC4.2 | Deficiency evaluation | Deficiencies tracked and remediated |
| CC5.1 | Control selection | Controls selected to mitigate risk |
| CC5.2 | Technology controls | Technology general controls in place |
| CC5.3 | Policies and procedures | Documented policies deployed |
| CC6.1 | Logical access security | RBAC, least privilege via ${c.PLATFORM}/IdP |
| CC6.2 | Registration / authorization | Access provisioning with approval |
| CC6.3 | Access modification / removal | Access reviewed quarterly; removed on exit |
| CC6.4 | Physical access | Facility controls; badge access |
| CC6.5 | Data disposal | Secure media sanitization |
| CC6.6 | Boundary protection | Firewalls; segmentation; monitoring |
| CC6.7 | Transmission / movement | Encryption in transit (TLS 1.2+) |
| CC6.8 | Malicious software | EDR / anti-malware deployed |
| CC7.1 | Vulnerability detection | Scheduled vulnerability scanning |
| CC7.2 | Security monitoring | SIEM monitoring and alerting |
| CC7.3 | Incident evaluation | Incidents evaluated for impact |
| CC7.4 | Incident response | Documented incident response |
| CC7.5 | Recovery | Recovery and BC/DR procedures |
| CC8.1 | Change management | Changes tested, approved, tracked |
| CC9.1 | Risk mitigation | Risk-mitigation and insurance measures |
| CC9.2 | Vendor management | Vendor assessment and assurance review |

Each control has an owner and evidence, tested over the review period for a Type II opinion.` };
  g.policies = { title: "Information Security Policies", clause: "CC1–CC2", content: `# Information Security Policies
_${std} · CC1–CC2 · ${c.ORG}_

A documented policy set covers acceptable use, access control, data classification, incident response, change management, vendor management and business continuity — approved, communicated, and reviewed at least annually.

| Policy | Owner | Review |
|---|---|---|
| Information security | Security Lead | Annual |
| Access control | Security Lead | Annual |
| Incident response | Security Lead | Annual |
| Change management | Ops Lead | Annual |
| Vendor management | Security Lead | Annual |` };
  g.riskassessment = { title: "Risk Assessment", clause: "CC3", content: `# Risk Assessment
_${std} · CC3 · ${c.ORG}_

| ID | Risk | Likelihood | Impact | Control | Owner |
|---|---|---|---|---|---|
| S1 | Unauthorized access | Medium | High | CC6 access controls | Security Lead |
| S2 | Outage | Low | High | A1 availability controls | Ops Lead |
| S3 | Data disclosure | Low | High | C1 confidentiality controls | Security Lead |
| S4 | Vendor weakness | Medium | Medium | CC9 vendor management | Security Lead |
| S5 | Change failure | Medium | Medium | CC8 change management | Ops Lead |

Performed at least annually and on significant change.` };
  g.monitoring = { title: "Monitoring of Controls", clause: "CC4", content: pack(c, { std, name: "Monitoring of Controls", ref: "CC4", owner: "Security Lead", purpose: "monitor that controls are present and operating effectively", steps: ["Define control monitoring activities.", "Collect evidence of control operation.", "Perform internal control reviews / audits.", "Track deficiencies to remediation.", "Report control status to management.", "Improve controls based on findings."], flow: "Define monitoring → collect evidence → review → remediate → report.", controls: [["Continuous monitoring", "Security & availability"], ["Internal review", "Periodic"], ["Deficiency tracking", "To closure"], ["Reporting", "To management"]], metrics: [["Controls monitored", "100%"], ["Deficiencies remediated on time", "≥ 90%"]], records: "Monitoring results, review reports, and remediation tracking." }) };
  g.access = { title: "Logical & Physical Access", clause: "CC6", content: pack(c, { std, name: "Logical & Physical Access", ref: "CC6", owner: "Security Lead", purpose: "restrict logical and physical access to authorized users and protect information assets", steps: ["Provision access via RBAC and least privilege (CC6.1).", "Require MFA for remote and privileged access.", "Review access rights periodically (CC6.2).", "Deprovision on termination (CC6.3).", "Control physical access to facilities (CC6.4).", "Encrypt data in transit and at rest (CC6.7)."], flow: "Provision (RBAC+MFA) → review → deprovision → physical controls → encryption.", controls: [["Access provisioning", "RBAC; least privilege"], ["Authentication", "MFA"], ["Access reviews", "Quarterly"], ["Encryption", "In transit & at rest"]], metrics: [["Access reviews completed", "100% quarterly"], ["MFA coverage (remote/privileged)", "100%"]], records: "Access records, review logs, and encryption configuration." }) };
  g.operations = { title: "System Operations & Incident Response", clause: "CC7", content: pack(c, { std, name: "System Operations & Incident Response", ref: "CC7", owner: "Security Lead", purpose: "detect, respond to, and recover from security and availability incidents", steps: ["Monitor systems for anomalies and threats (CC7.1–7.2).", "Detect and classify incidents.", "Contain, eradicate and recover (CC7.3–7.4).", "Notify affected parties (CC7.5).", "Preserve evidence and review post-incident.", "Improve controls from lessons learned."], flow: "Monitor → detect → contain → recover → notify → review.", controls: [["Monitoring", "Security & availability"], ["Incident handling", "Detect→respond→recover"], ["Communication", "Affected parties"], ["Post-incident review", "For majors"]], metrics: [["Incidents reviewed", "100%"], ["Mean time to respond", "Within target"]], records: "Monitoring config, incident tickets, and post-incident reviews." }) };
  g.change = { title: "Change Management", clause: "CC8", content: pack(c, { std, name: "Change Management", ref: "CC8", owner: "Ops Lead", purpose: "authorize, test and control changes to infrastructure and software", steps: ["Record and classify each change.", "Assess risk and test before production.", "Obtain approval.", "Separate development and production.", "Deploy with back-out readiness.", "Review changes for success."], flow: "Request → test → approve → deploy (dev/prod separation) → verify.", controls: [["Change request", "Documented"], ["Testing & approval", "Before production"], ["Segregation", "Dev/prod separation"], ["Back-out", "Defined"]], metrics: [["Changes with approval & test", "100%"], ["Change-related incidents", "Downward trend"]], records: "Change tickets, approvals, and test records." }) };
  g.vendor = { title: "Vendor / Risk Mitigation", clause: "CC9", content: pack(c, { std, name: "Vendor Management & Risk Mitigation", ref: "CC9", owner: "Security Lead", purpose: "manage vendor risk and other risk-mitigation measures", steps: ["Assess vendors before engagement.", "Review vendor assurance (SOC 2 / ISO reports).", "Include security terms in contracts.", "Monitor vendor performance and risk.", "Maintain risk-transfer measures (e.g. insurance).", "Offboard vendors securely."], flow: "Assess → assurance review → contract → monitor → offboard.", controls: [["Vendor assessment", "Before engagement"], ["Assurance review", "SOC 2 / ISO reports"], ["Contracts", "Security terms"], ["Monitoring", "Ongoing"]], metrics: [["Critical vendors assessed", "100%"], ["Assurance reports reviewed", "Annual"]], records: "Vendor register, assurance reviews, and contracts." }) };
  g.availability = { title: "Availability", clause: "A1", content: `# Availability
_${std} · A1 · ${c.ORG}_

| Control | Standard |
|---|---|
| Capacity | Monitored (A1.1) |
| Backup & recovery | Scheduled; tested (A1.2) |
| BC/DR | Plans tested annually (A1.3) |
| Monitoring | Availability tracked vs SLA |

Evidence: uptime reports, backup/restore logs, DR test results.` };
  g.confidentiality = { title: "Confidentiality", clause: "C1", content: `# Confidentiality
_${std} · C1 · ${c.ORG}_

| Control | Standard |
|---|---|
| Data classification | Confidential data identified (C1.1) |
| Handling | Access-controlled; encrypted |
| Retention & disposal | Per policy (C1.2) |
| DLP | Egress controls |

Evidence: classification, encryption config, disposal records.` };
  const order = ["description", "controlmatrix", "policies", "riskassessment", "monitoring", "access", "operations", "change", "vendor", "availability", "confidentiality"];
  const audit = {};
  [["CC", "Common Criteria (Security)"], ["A", "Availability"], ["C", "Confidentiality"]].forEach(([id, name]) => {
    audit[id] = {
      "Audit Checklist": `## SOC 2 Test Procedures — ${name}\n${c.ORG} · ${c.CONTRACT}\n\n| # | Criterion | Test | Evidence | Result |\n|---|---|---|---|---|\n| 1 | Design | Is the control designed to meet the criterion? | Policy/config | ( ) |\n| 2 | Operating | Did it operate over the period? | Samples over period | ( ) |\n| 3 | Exceptions | Any exceptions & remediation? | Exception log | ( ) |`,
      "Interview Questions": `## Interview Questions — ${name}\n- Who owns this control and how is it evidenced?\n- Show the control operating over the review period.\n- Where are exceptions logged and remediated?`,
      "Objective Evidence": `## Objective Evidence — ${name}\nExpect policy/config, samples demonstrating operation across the period, and an exception log with remediation — sufficient for a Type II opinion.`,
    };
  });
  return { generated: g, audit, docList: doclist(order, g) };
}

module.exports = { buildSet9001, buildSet22301, buildSet42001, buildSetSoc2 };
