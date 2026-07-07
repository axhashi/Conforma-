/* ISO/IEC 27001:2022 framework module — generates a populated ISMS document set
   from the same contract facts. Proves the engine generalizes beyond ISO 20000.
   ctx = {ORG, ORGFULL, CUST, PLATFORM, USERS, SITES, HOURS, CONTRACT} */

/* ---- Annex A 2022 control set (representative, across all four themes) ---- */
const ANNEX_A = {
  "5 Organizational": [
    ["A.5.1", "Policies for information security", "Applicable", "Information Security Policy set approved by management, communicated, reviewed annually"],
    ["A.5.2", "Information security roles and responsibilities", "Applicable", "Roles defined in the Leadership & Roles document with named owners"],
    ["A.5.3", "Segregation of duties", "Applicable", "Conflicting duties separated; request/approve/administer split across roles"],
    ["A.5.4", "Management responsibilities", "Applicable", "Management requires all personnel to apply security per policy"],
    ["A.5.5", "Contact with authorities", "Applicable", "Defined contacts with relevant authorities and regulators"],
    ["A.5.6", "Contact with special interest groups", "Applicable", "Membership in security forums and threat-sharing groups"],
    ["A.5.7", "Threat intelligence", "Applicable", "Threat feeds reviewed; findings drive risk and control updates"],
    ["A.5.8", "Information security in project management", "Applicable", "Security requirements addressed in project management"],
    ["A.5.9", "Inventory of information and associated assets", "Applicable", "Asset & classification register maintained with owners"],
    ["A.5.10", "Acceptable use of information and assets", "Applicable", "Acceptable Use Policy accepted by all users"],
    ["A.5.11", "Return of assets", "Applicable", "Assets recovered at termination via offboarding checklist"],
    ["A.5.12", "Classification of information", "Applicable", "Scheme: Public / Internal / Confidential / CUI"],
    ["A.5.13", "Labelling of information", "Applicable", "Labelling procedure aligned to the classification scheme"],
    ["A.5.14", "Information transfer", "Applicable", "Transfer rules and agreements; encryption in transit"],
    ["A.5.15", "Access control", "Applicable", "Access Control Policy; least privilege; RBAC in Microsoft Entra ID"],
    ["A.5.16", "Identity management", "Applicable", "Unique identities managed through the identity lifecycle"],
    ["A.5.17", "Authentication information", "Applicable", "Secure handling of credentials; MFA; no shared accounts"],
    ["A.5.18", "Access rights", "Applicable", "Access provisioned, reviewed quarterly, revoked on leaver"],
    ["A.5.19", "Information security in supplier relationships", "Applicable", "Supplier Security process; security clauses in contracts"],
    ["A.5.20", "Addressing security within supplier agreements", "Applicable", "Security requirements and right-to-audit in agreements"],
    ["A.5.21", "Managing security in the ICT supply chain", "Applicable", "ICT supply-chain risks assessed and monitored"],
    ["A.5.22", "Monitoring and change management of supplier services", "Applicable", "Supplier performance and changes reviewed periodically"],
    ["A.5.23", "Information security for use of cloud services", "Applicable", "Cloud security requirements; provider assurance reviewed"],
    ["A.5.24", "Incident management planning and preparation", "Applicable", "Security Incident Management procedure and roles"],
    ["A.5.25", "Assessment and decision on security events", "Applicable", "Events triaged and classified by severity"],
    ["A.5.26", "Response to information security incidents", "Applicable", "Documented response: contain, eradicate, recover"],
    ["A.5.27", "Learning from information security incidents", "Applicable", "Post-incident reviews feed control improvements"],
    ["A.5.28", "Collection of evidence", "Applicable", "Evidence preserved per a defined procedure"],
    ["A.5.29", "Information security during disruption", "Applicable", "Security maintained in continuity and recovery plans"],
    ["A.5.30", "ICT readiness for business continuity", "Applicable", "ICT continuity aligned to RTO/RPO; tested"],
    ["A.5.31", "Legal, statutory, regulatory, contractual requirements", "Applicable", "Obligations register; contract security terms tracked"],
    ["A.5.32", "Intellectual property rights", "Applicable", "IP and licensing compliance controls"],
    ["A.5.33", "Protection of records", "Applicable", "Records protected against loss and tampering; retained"],
    ["A.5.34", "Privacy and protection of PII", "Applicable", "PII handled per privacy obligations and data protection law"],
    ["A.5.35", "Independent review of information security", "Applicable", "Independent review / internal audit at planned intervals"],
    ["A.5.36", "Compliance with policies, rules and standards", "Applicable", "Compliance checks against policies and standards"],
    ["A.5.37", "Documented operating procedures", "Applicable", "Operating procedures documented and available"],
  ],
  "6 People": [
    ["A.6.1", "Screening", "Applicable", "Background screening prior to access, per contract"],
    ["A.6.2", "Terms and conditions of employment", "Applicable", "Security responsibilities stated in employment terms"],
    ["A.6.3", "Security awareness, education and training", "Applicable", "Awareness at onboarding and annually; role-based training"],
    ["A.6.4", "Disciplinary process", "Applicable", "Documented disciplinary process for violations"],
    ["A.6.5", "Responsibilities after termination or change", "Applicable", "Post-employment obligations communicated and enforced"],
    ["A.6.6", "Confidentiality or non-disclosure agreements", "Applicable", "NDAs signed by staff and relevant third parties"],
    ["A.6.7", "Remote working", "Applicable", "Remote-work security controls, VPN, device management"],
    ["A.6.8", "Information security event reporting", "Applicable", "Reporting channel for security events available to all"],
  ],
  "7 Physical": [
    ["A.7.1", "Physical security perimeters", "Applicable", "Secure perimeters defined for on-site work"],
    ["A.7.2", "Physical entry", "Applicable", "Badge access and visitor control at entry points"],
    ["A.7.3", "Securing offices, rooms and facilities", "Applicable", "Secured facilities housing information assets"],
    ["A.7.4", "Physical security monitoring", "Applicable", "CCTV/alarms monitoring secure areas"],
    ["A.7.5", "Protecting against physical and environmental threats", "Applicable", "Environmental protections in facilities"],
    ["A.7.6", "Working in secure areas", "Applicable", "Rules for working in secure areas"],
    ["A.7.7", "Clear desk and clear screen", "Applicable", "Clear-desk / clear-screen policy enforced"],
    ["A.7.8", "Equipment siting and protection", "Applicable", "Equipment sited to reduce risk"],
    ["A.7.9", "Security of assets off-premises", "Applicable", "Controls for assets used off-site"],
    ["A.7.10", "Storage media", "Applicable", "Media handling, encryption, and secure disposal"],
    ["A.7.11", "Supporting utilities", "Applicable", "Power/cooling protections for critical systems"],
    ["A.7.12", "Cabling security", "Applicable", "Cabling protected from interception/damage"],
    ["A.7.13", "Equipment maintenance", "Applicable", "Maintenance controlled and recorded"],
    ["A.7.14", "Secure disposal or re-use of equipment", "Applicable", "Sanitisation before disposal or re-use (NIST 800-88)"],
  ],
  "8 Technological": [
    ["A.8.1", "User endpoint devices", "Applicable", "Endpoint hardening and management via Microsoft Intune"],
    ["A.8.2", "Privileged access rights", "Applicable", "Privileged access limited, managed, reviewed quarterly"],
    ["A.8.3", "Information access restriction", "Applicable", "Access to information restricted per policy"],
    ["A.8.4", "Access to source code", "Conditional", "Applies where the team develops software; repo access controlled"],
    ["A.8.5", "Secure authentication", "Applicable", "MFA for remote and privileged access"],
    ["A.8.6", "Capacity management", "Applicable", "Capacity monitored and planned"],
    ["A.8.7", "Protection against malware", "Applicable", "EDR (Microsoft Defender); auto-updated"],
    ["A.8.8", "Management of technical vulnerabilities", "Applicable", "Vulnerability & Patch Management; scans monthly; severity SLAs"],
    ["A.8.9", "Configuration management", "Applicable", "Baselines enforced against CIS/STIG; changes controlled"],
    ["A.8.10", "Information deletion", "Applicable", "Data deleted per retention and on request"],
    ["A.8.11", "Data masking", "Applicable", "Masking used where appropriate to limit exposure"],
    ["A.8.12", "Data leakage prevention", "Applicable", "DLP controls on egress paths"],
    ["A.8.13", "Information backup", "Applicable", "Daily backups; encrypted; restore tested annually"],
    ["A.8.14", "Redundancy of information processing facilities", "Applicable", "Redundancy/failover for critical services"],
    ["A.8.15", "Logging", "Applicable", "Centralised logging to Microsoft Sentinel; retained 1 year"],
    ["A.8.16", "Monitoring activities", "Applicable", "Monitoring and alerting on anomalies via SIEM"],
    ["A.8.17", "Clock synchronization", "Applicable", "Clocks synced to an authoritative NTP source"],
    ["A.8.18", "Use of privileged utility programs", "Applicable", "Privileged utilities restricted and logged"],
    ["A.8.19", "Installation of software on operational systems", "Applicable", "Software installation controlled via Intune"],
    ["A.8.20", "Networks security", "Applicable", "Network controls: firewalls, segmentation, monitoring"],
    ["A.8.21", "Security of network services", "Applicable", "Security requirements for network services defined"],
    ["A.8.22", "Segregation of networks", "Applicable", "Networks segmented; public components in DMZ"],
    ["A.8.23", "Web filtering", "Applicable", "Web filtering to reduce exposure to malicious sites"],
    ["A.8.24", "Use of cryptography", "Applicable", "Cryptography & Key Management policy; AES-256, TLS 1.2+"],
    ["A.8.25", "Secure development life cycle", "Conditional", "Applies where the team develops software"],
    ["A.8.26", "Application security requirements", "Conditional", "Applies where the team develops software"],
    ["A.8.27", "Secure system architecture and engineering principles", "Applicable", "Secure architecture principles applied"],
    ["A.8.28", "Secure coding", "Conditional", "Applies where the team develops software"],
    ["A.8.29", "Security testing in development and acceptance", "Conditional", "Applies where the team develops software"],
    ["A.8.30", "Outsourced development", "Conditional", "Applies where development is outsourced"],
    ["A.8.31", "Separation of development, test and production", "Applicable", "Environments separated"],
    ["A.8.32", "Change management", "Applicable", "Change-management process with approval and testing"],
    ["A.8.33", "Test information", "Applicable", "Test data protected; no production CUI in test"],
    ["A.8.34", "Protection of systems during audit testing", "Applicable", "Audit tests planned to minimise disruption"],
  ],
};

/* ---- security operational procedure packs ---- */
const SEC = {
  access: { name: "Access Control", ref: "A.5.15–5.18, A.8.2–8.5", owner: "Security Lead", purpose: "grant, review and revoke access on least-privilege and need-to-know principles",
    steps: ["Provision access via role-based access control (RBAC) on joiner.", "Require MFA for remote and privileged access.", "Enforce least privilege; separate duties for sensitive functions.", "Review access rights at least quarterly and on role change.", "Revoke access immediately on leaver or role removal.", "Log and monitor privileged access."],
    controls: [["Least privilege / RBAC", "Roles mapped to job function"], ["MFA", "Remote + privileged access"], ["Access review", "Quarterly + on change"], ["Joiner/mover/leaver", "Tied to HR process"]],
    records: "Access requests, quarterly access reviews, and privileged-access logs." },
  crypto: { name: "Cryptography & Key Management", ref: "A.8.24", owner: "Security Lead", purpose: "protect information in transit and at rest with appropriate cryptography and managed keys",
    steps: ["Encrypt data in transit (TLS 1.2+) and at rest (AES-256).", "Define approved algorithms and key lengths.", "Manage keys through their lifecycle: generate, store, rotate, revoke.", "Protect keys with access control and, where required, an HSM/KMS.", "Rotate keys on schedule and on compromise.", "Record cryptographic controls in the asset register."],
    controls: [["In transit", "TLS 1.2+"], ["At rest", "AES-256"], ["Key storage", "KMS/HSM, access-controlled"], ["Rotation", "Scheduled + on compromise"]],
    records: "The cryptographic controls register and key-rotation logs." },
  incident: { name: "Information Security Incident Management", ref: "A.5.24–5.28", owner: "Security Lead", purpose: "detect, respond to, and learn from information security incidents and breaches",
    steps: ["Provide a channel to report security events.", "Triage and classify events; declare incidents by severity.", "Contain, eradicate and recover per the response plan.", "Notify the customer and regulators within contractual/legal timeframes.", "Preserve evidence and conduct post-incident review.", "Feed lessons into risk and control improvements."],
    controls: [["Reporting channel", "Available to all staff"], ["Severity classification", "Defined matrix"], ["Breach notification", "Per contract/law timeframes"], ["Post-incident review", "For all major incidents"]],
    records: "Security incident records, breach notifications, and post-incident reviews." },
  supplier: { name: "Supplier & Cloud Security", ref: "A.5.19–5.23", owner: "Security Lead", purpose: "ensure suppliers and cloud services meet the organization's security requirements",
    steps: ["Assess supplier/cloud security before engagement.", "Include security requirements and right-to-audit in contracts.", "Review provider assurance (e.g. SOC 2, ISO 27001, FedRAMP).", "Monitor supplier security performance.", "Manage changes and offboarding securely.", "Maintain a register of suppliers and their assurance status."],
    controls: [["Pre-engagement assessment", "Required"], ["Contract security clauses", "Standard"], ["Provider assurance", "Reviewed periodically"], ["Offboarding", "Access and data removal"]],
    records: "The supplier security register and assurance reviews." },
  logging: { name: "Logging & Monitoring", ref: "A.8.15–8.16", owner: "Security Lead", purpose: "record security-relevant events and detect anomalies in a timely way",
    steps: ["Log authentication, access, and administrative events centrally.", "Protect logs from tampering; retain per policy.", "Define alerting rules for anomalies and threats.", "Review alerts and investigate as needed.", "Correlate events for detection (SIEM where available).", "Report monitoring outcomes to management."],
    controls: [["Central logging", "Security-relevant events"], ["Log protection", "Tamper-resistant, retained"], ["Alerting", "Anomaly + threat rules"], ["Review", "Defined cadence"]],
    records: "Log configuration, alert definitions, and monitoring reports." },
  vuln: { name: "Vulnerability & Patch Management", ref: "A.8.8", owner: "Security Lead", purpose: "identify and remediate technical vulnerabilities before they can be exploited",
    steps: ["Scan systems for vulnerabilities on a schedule.", "Rate findings by severity (e.g. CVSS).", "Remediate within severity-based SLAs.", "Patch systems on a defined cadence and for emergencies.", "Verify remediation and track exceptions.", "Report vulnerability posture to management."],
    controls: [["Scanning", "Scheduled"], ["Severity SLAs", "Critical fastest"], ["Patch cadence", "Routine + emergency"], ["Exceptions", "Tracked with risk acceptance"]],
    records: "Scan results, remediation tracking, and patch records." },
  continuity: { name: "Business Continuity & Backup", ref: "A.5.29–5.30, A.8.13–8.14", owner: "Continuity Manager", purpose: "maintain and recover information security during and after disruption",
    steps: ["Identify critical services and set RTO/RPO.", "Back up data on schedule and protect backups.", "Document continuity and recovery plans.", "Test recovery from backup at least annually.", "Include security requirements in continuity plans.", "Review and update after tests and major change."],
    controls: [["Backup schedule", "Defined; protected copies"], ["Restore testing", "At least annual"], ["RTO/RPO", "Agreed with customer"], ["Plan review", "Post-test + on change"]],
    records: "Backup logs, restore-test results, and continuity plans." },
  hr: { name: "Human Resource Security", ref: "A.6.1–6.8", owner: "HR + Security Lead", purpose: "ensure personnel are suitable for, aware of, and accountable to their security responsibilities",
    steps: ["Screen personnel before granting access, per contract.", "State security responsibilities in employment terms.", "Deliver security awareness training at onboarding and annually.", "Apply the disciplinary process for violations.", "Manage secure remote working.", "Remove access and return assets on exit."],
    controls: [["Screening", "Pre-access"], ["Awareness", "Onboarding + annual"], ["Disciplinary", "Documented"], ["Leaver process", "Access + asset return"]],
    records: "Screening records, training records, and leaver checklists." },
};

const C = (ctx, s) => s.replace(/\{ORG\}/g, ctx.ORG).replace(/\{CUST\}/g, ctx.CUST).replace(/\{P\}/g, ctx.PLATFORM).replace(/\{U\}/g, ctx.USERS).replace(/\{S\}/g, ctx.SITES);

function soa(ctx) {
  let body = "";
  Object.keys(ANNEX_A).forEach((theme) => {
    body += `\n### Theme ${theme}\n\n| Control | Title | Applicability | Implementation |\n|---|---|---|---|\n`;
    body += ANNEX_A[theme].map((r) => `| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} |`).join("\n") + "\n";
  });
  return { title: "Statement of Applicability (SoA)", clause: "6.1.3 d)", content: `# Statement of Applicability
_ISO/IEC 27001:2022 — Clause 6.1.3 d) · ${ctx.ORG}_

The Statement of Applicability lists the Annex A controls, whether each is applicable to the ISMS for the ${ctx.CONTRACT}, and how it is implemented. Exclusions are justified by the risk assessment.
${body}
_This is a representative control set; the full SoA covers all Annex A:2022 controls. Applicability is confirmed by the risk assessment and treatment plan._` };
}

function secPack(key, ctx) {
  const p = SEC[key];
  const steps = p.steps.map((s, i) => `${i + 1}. ${C(ctx, s)}`).join("\n");
  const ctrl = p.controls.map((r) => `| ${r[0]} | ${r[1]} |`).join("\n");
  return `# ${p.name}
_ISO/IEC 27001:2022 — ${p.ref} · ${ctx.ORG} · ${ctx.CUST}_

## Policy
It is ${ctx.ORG}'s policy to ${p.purpose}, in support of securely delivering the ${ctx.CONTRACT} and maintaining ISO/IEC 27001 certification.

## Procedure
${steps}

## Key Controls
| Control | Standard |
|---|---|
${ctrl}

## Roles & Responsibilities
- **${p.owner}** — owns this control area and its effectiveness.
- **Asset/System Owners** — implement controls for their systems.
- **All personnel** — comply and report security events.

## Required Records
${p.records} Records are retained per the Documented Information Control procedure.

## Review
Reviewed at least annually and on significant change. Revision 1.0.`;
}

/* ---- ISMS management-system (clause 4–10) documents ---- */
const FOUND = {
  ismspolicy: (c) => ({ title: "Information Security Policy", clause: "5.2", content: `# Information Security Policy
_ISO/IEC 27001:2022 — Clause 5.2 · ${c.ORG}_

## 1. Purpose
This policy states ${c.ORGFULL}'s commitment to protecting the confidentiality, integrity and availability of information involved in delivering the ${c.CONTRACT} to ${c.CUST}, under an ISMS conforming to ISO/IEC 27001:2022.

## 2. Scope
Applies to all information, systems (${c.PLATFORM}), personnel and sites (${c.SITES}) within the ISMS scope supporting approximately ${c.USERS} users.

## 3. Policy Statements
- We protect information based on assessed risk and classification.
- We grant access on least-privilege and need-to-know principles.
- We meet legal, regulatory and contractual security obligations.
- We detect, respond to and learn from security incidents.
- We continually improve the ISMS and maintain ISO/IEC 27001 certification.

## 4. Authority & Approval
Issued by top management; communicated to all personnel; reviewed at least annually.

| Version | Date | Author | Approved by |
|---|---|---|---|
| 1.0 | (current) | ISMS / Security Manager | Program Manager |` }),

  ismsscope: (c) => ({ title: "ISMS Scope", clause: "4.3", content: `# Scope of the ISMS
_ISO/IEC 27001:2022 — Clause 4.3 · ${c.ORG}_

**Organization:** ${c.ORGFULL}
**Customer / driver:** ${c.CUST} — ${c.CONTRACT}
**Systems:** ${c.PLATFORM} and supporting infrastructure

## In scope
Information, systems, people and processes used to deliver the ${c.CONTRACT}, supporting ~${c.USERS} users across ${c.SITES} sites.

## Interfaces & dependencies
Customer-provided network and hosting are dependencies at the boundary; cloud services are governed through Supplier & Cloud Security.

## Exclusions
Exclusions (if any) are justified in the Statement of Applicability by the risk assessment.

## Governing standard
ISO/IEC 27001:2022, clauses 4–10 and Annex A.` }),

  context: (c) => ({ title: "Context of the Organization", clause: "4.1", content: `# Context of the Organization
_ISO/IEC 27001:2022 — Clause 4.1 · ${c.ORG}_

Internal and external issues relevant to the ISMS for the ${c.CONTRACT}, reviewed at management review.

## External issues
| Issue | Relevance to the ISMS |
|---|---|
| Regulatory & contractual security obligations | Set mandatory controls and reporting |
| Threat landscape (phishing, ransomware, insider) | Drives control selection and monitoring |
| Customer security expectations | Set assurance and reporting requirements |
| Cloud & supplier ecosystem | Introduces third-party risk |

## Internal issues
| Issue | Relevance to the ISMS |
|---|---|
| Security maturity and tooling | Affects control effectiveness |
| Staffing and security skills | Affects operation of controls |
| Culture and awareness | Affects human-factor risk |

## Review
Reviewed at least annually and on significant change.` }),

  parties: (c) => ({ title: "Interested Parties & Requirements", clause: "4.2", content: `# Interested Parties & Requirements
_ISO/IEC 27001:2022 — Clause 4.2 · ${c.ORG}_

| Interested party | Security needs & expectations | How the ISMS meets them |
|---|---|---|
| ${c.CUST} | Protection of its data; breach notification; assurance | Controls, incident process, reporting, certification |
| End users (~${c.USERS}) | Secure, available services | Access control, availability, awareness |
| Regulators | Compliance with applicable law | Obligations register; controls; records |
| ${c.ORG} management | Low-risk, compliant delivery | Governance, risk management, audits |
| Employees | Clear responsibilities; training | Roles, awareness programme |
| Suppliers / cloud providers | Clear security requirements | Supplier & Cloud Security process |

## Review
Reviewed at least annually and when requirements change.` }),

  leadership: (c) => ({ title: "Leadership & Roles", clause: "5.1 / 5.3", content: `# Leadership & Roles
_ISO/IEC 27001:2022 — Clauses 5.1 & 5.3 · ${c.ORG}_

## Management commitment
Top management is accountable for the ISMS: it sets policy and objectives, ensures resources, and reviews performance.

| Role | Responsibility | Authority |
|---|---|---|
| Program Manager | Accountable for the ISMS and the ${c.CUST} relationship | Approves policy, budget, risk acceptance |
| ISMS / Security Manager | Runs the ISMS; risk, controls, audits | Directs security operations |
| Information Security Officer | Owns technical security controls | Approves controls and exceptions |
| Asset / System Owners | Implement controls for their systems | Manage their assets |
| All personnel | Comply and report events | — |

## Review
Reviewed at least annually and on organizational change.` }),

  riskmethod: (c) => ({ title: "Risk Assessment & Treatment Methodology", clause: "6.1.2", content: `# Risk Assessment & Treatment Methodology
_ISO/IEC 27001:2022 — Clause 6.1.2 · ${c.ORG}_

## Method
1. Identify information assets and their owners.
2. Identify threats and vulnerabilities for each asset.
3. Assess likelihood and impact on a defined scale (1–5).
4. Calculate risk = likelihood × impact; compare to the risk acceptance criteria.
5. Select treatment: mitigate (apply Annex A controls), transfer, avoid, or accept.
6. Record residual risk and obtain risk owner acceptance.

## Risk acceptance criteria
Risks scoring above the agreed threshold require treatment; residual risks are accepted by the risk owner and recorded.

## Review
The assessment is reviewed at least annually and on significant change.` }),

  riskreport: (c) => ({ title: "Risk Assessment Report", clause: "6.1.2", content: `# Risk Assessment Report
_ISO/IEC 27001:2022 — Clause 6.1.2 · ${c.ORG}_

| ID | Asset | Threat | L | I | Risk | Treatment (Annex A) | Owner |
|---|---|---|---|---|---|---|---|
| IR1 | ${c.CUST} data in ${c.PLATFORM} | Unauthorised access | 3 | 5 | High | A.5.15, A.8.2, A.8.5 access control + MFA | Security Manager |
| IR2 | Credentials | Phishing | 4 | 4 | High | A.6.3 awareness; A.8.5 MFA | Security Manager |
| IR3 | Endpoints | Malware / ransomware | 3 | 4 | High | A.8.7 anti-malware; A.8.13 backup | Security Officer |
| IR4 | Data in transit | Interception | 2 | 4 | Medium | A.8.24 encryption (TLS) | Security Officer |
| IR5 | Cloud service | Provider weakness | 2 | 4 | Medium | A.5.23 cloud security; assurance review | Security Manager |
| IR6 | Systems | Unpatched vulnerability | 3 | 4 | High | A.8.8 vulnerability & patch mgmt | Security Officer |

Risks are reviewed at least annually and at management review.` }),

  rtp: (c) => ({ title: "Risk Treatment Plan", clause: "6.1.3", content: `# Risk Treatment Plan
_ISO/IEC 27001:2022 — Clause 6.1.3 · ${c.ORG}_

| Risk | Treatment | Controls | Owner | Target | Status |
|---|---|---|---|---|---|
| IR1 Unauthorised access | Mitigate | RBAC, least privilege, MFA, access reviews | Security Manager | Q1 | In progress |
| IR2 Phishing | Mitigate | Awareness training, MFA, email filtering | Security Manager | Q1 | In progress |
| IR3 Malware/ransomware | Mitigate | Endpoint protection, backup, restore tests | Security Officer | Q2 | Planned |
| IR4 Interception | Mitigate | TLS 1.2+, encryption at rest | Security Officer | Q1 | Done |
| IR5 Cloud provider | Mitigate/transfer | Assurance review, contract clauses | Security Manager | Q2 | Planned |
| IR6 Vulnerabilities | Mitigate | Scanning, patch SLAs | Security Officer | Ongoing | In progress |

Progress is tracked to closure and reported at management review.` }),

  objectives: (c) => ({ title: "Information Security Objectives", clause: "6.2", content: `# Information Security Objectives
_ISO/IEC 27001:2022 — Clause 6.2 · ${c.ORG}_

| Objective | Measure | Target | Owner |
|---|---|---|---|
| Reduce access risk | Access reviews completed | 100% quarterly | Security Manager |
| Raise awareness | Staff completing training | ≥ 95% | Security Manager |
| Patch quickly | Critical patches within SLA | ≥ 95% | Security Officer |
| Respond to incidents | Major incidents reviewed | 100% | Security Manager |
| Maintain certification | ISO/IEC 27001 certified | Within 12 months | Program Manager |

Objectives are monitored and reviewed at management review (clause 9.3).` }),

  competency: (c) => ({ title: "Competence & Awareness", clause: "7.2 / 7.3", content: `# Competence & Awareness
_ISO/IEC 27001:2022 — Clauses 7.2 & 7.3 · ${c.ORG}_

| Role | Required competence | Evidence |
|---|---|---|
| ISMS / Security Manager | ISMS operation; risk management | ISO 27001 training / certification |
| Security Officer | Technical security controls | Security certifications (e.g. Security+) |
| Asset / System Owners | Controls for their systems | Role training records |
| All personnel | Security awareness | Onboarding + annual training |

## Awareness programme
Security awareness at onboarding and at least annually, plus targeted phishing simulations. Records are retained.` }),

  commplan: (c) => ({ title: "Communication Plan", clause: "7.4", content: `# Communication Plan
_ISO/IEC 27001:2022 — Clause 7.4 · ${c.ORG}_

| Communication | Audience | Frequency | Channel | Owner |
|---|---|---|---|---|
| Security posture report | ${c.CUST} | Per contract | Report | Security Manager |
| Management review | Top management | Quarterly | Meeting + minutes | Program Manager |
| Security incident notification | Customer/regulator | On occurrence | Per plan | Security Manager |
| Awareness communications | All staff | Ongoing | Email/portal | Security Manager |
| Policy updates | All staff | On change | Portal | ISMS Manager |` }),

  doccontrol: (c) => ({ title: "Documented Information Control", clause: "7.5", content: `# Documented Information Control
_ISO/IEC 27001:2022 — Clause 7.5 · ${c.ORG}_

## Procedure
1. Create using approved templates.
2. Review and approve before publication.
3. Version as Major.Minor; record version, date and approver.
4. Publish to the controlled repository with access control.
5. Review at least annually and on significant change.
6. Retire and archive superseded versions.

| Control | Rule |
|---|---|
| Classification | Documents classified and access-controlled |
| Versioning | Major.Minor with change record |
| Retention | Per Records procedure |` }),

  records: (c) => ({ title: "Records & Retention", clause: "7.5", content: `# Records & Retention
_ISO/IEC 27001:2022 — Clause 7.5 · ${c.ORG}_

| Record | Owner | Storage | Retention |
|---|---|---|---|
| Risk assessments & treatment plans | Security Manager | Repository | ISMS term + 1 year |
| Access reviews | Security Manager | Repository | ISMS term + 1 year |
| Security incident records | Security Manager | ${c.PLATFORM}/repository | ISMS term + 1 year |
| Training & awareness records | HR | HR system | Employment + per policy |
| Internal audit reports | ISMS Manager | Repository | ISMS term + 1 year |
| Management review minutes | Program Manager | Repository | ISMS term + 1 year |

Records are protected and disposed of securely at end of retention.` }),
  monitoring: (c) => ({ title: "Monitoring, Measurement & Evaluation", clause: "9.1", content: `# Monitoring, Measurement, Analysis & Evaluation
_ISO/IEC 27001:2022 — Clause 9.1 · ${c.ORG}_

| What is measured | Method | Frequency | Owner |
|---|---|---|---|
| Control effectiveness | KPI review vs objectives | Monthly | Security Manager |
| Security incidents | Trend analysis in ${c.PLATFORM} | Monthly | Security Manager |
| Access reviews completed | Completion rate | Quarterly | Security Manager |
| Vulnerability remediation | SLA attainment | Monthly | Security Manager |
| Awareness training | Completion rate | Quarterly | HR |

Results are analysed and reported to management review to drive improvement.` }),
  internalaudit: (c) => ({ title: "Internal Audit Programme", clause: "9.2", content: `# ISMS Internal Audit Programme
_ISO/IEC 27001:2022 — Clause 9.2 · ${c.ORG}_

## Procedure
1. Plan an annual audit programme covering all ISMS clauses (4–10) and applicable Annex A controls.
2. Assign impartial auditors who do not audit their own work.
3. Conduct audits against ISO/IEC 27001:2022 and this ISMS.
4. Record conformities and nonconformities with objective evidence.
5. Raise corrective actions and track them to closure.
6. Report results to management review.

| Element | Standard |
|---|---|
| Frequency | At least annually; risk-based |
| Auditor independence | Required |
| Scope | All clauses + applicable Annex A controls |
| Output | Audit report + corrective actions |

Audit results are retained as documented information.` }),
  mgmtreview: (c) => ({ title: "Management Review", clause: "9.3", content: `# ISMS Management Review
_ISO/IEC 27001:2022 — Clause 9.3 · ${c.ORG}_

Top management reviews the ISMS at least quarterly.

| Inputs (9.3.2) | Outputs (9.3.3) |
|---|---|
| Status of prior actions | Decisions on continual improvement |
| Changes in internal/external issues | Resource decisions |
| Feedback on security performance & KPIs | Changes to the ISMS |
| Risk assessment & treatment status | Updated objectives |
| Audit results & nonconformities | Action assignments with owners |
| Interested-party feedback | |

Minutes and decisions are retained as documented information.` }),
  improvement: (c) => ({ title: "Nonconformity, Corrective Action & Continual Improvement", clause: "10.1 / 10.2", content: `# Nonconformity, Corrective Action & Continual Improvement
_ISO/IEC 27001:2022 — Clauses 10.1 & 10.2 · ${c.ORG}_

## Procedure
1. Identify and record the nonconformity (from audits, incidents, or reviews).
2. Contain and correct the immediate issue.
3. Analyse the root cause.
4. Implement corrective action to prevent recurrence.
5. Verify effectiveness and close.
6. Feed improvement opportunities into the ISMS.

| Field | Example |
|---|---|
| Source | Internal audit, incident, KPI miss |
| Correction | Immediate fix |
| Corrective action | Root-cause removal |
| Verification | Effectiveness confirmed |

The ISMS is continually improved; nonconformities and actions are retained as documented information.` }),
};

const CLNAME = { "4": "Context of the organization", "5": "Leadership", "6": "Planning", "7": "Support", "8": "Operation", "9": "Performance evaluation", "10": "Improvement" };
function auditKit(id, c) {
  const name = CLNAME[id];
  return {
    "Audit Checklist": `## ISMS Internal Audit Checklist — Clause ${id} (${name})
${c.ORG} · ${c.CONTRACT} · ${c.CUST}

| # | Requirement | Audit question | Evidence to sample | Conforms? |
|---|---|---|---|---|
| 1 | ${id}.1 | Is the requirement defined and documented? | Policy/procedure | ( ) |
| 2 | ${id}.2 | Is it implemented? | Records, logs, tickets | ( ) |
| 3 | ${id}.3 | Is it monitored and reviewed? | Reports, minutes | ( ) |

**Sampling:** at least 5 records across the last 3 months.`,
    "Interview Questions": `## ISMS Auditor Interview Questions — Clause ${id} (${name})

- Who owns this part of the ISMS?
- Walk me through how clause ${id} works day to day.
- What records evidence it, and where are they?
- How is effectiveness measured and improved?`,
    "Objective Evidence Requirements": `## Objective Evidence — Clause ${id} (${name})

Expect the controlling document(s), dated operational records, monitoring output, and evidence of actions closed — current, attributable, and retained.`,
  };
}

function buildSet27k(c) {
  const generated = {};
  Object.keys(FOUND).forEach((k) => { generated[k] = FOUND[k](c); });
  generated["soa"] = soa(c);
  Object.keys(SEC).forEach((k) => { generated["sec_" + k] = { title: SEC[k].name + " — Control Pack", clause: SEC[k].ref, content: secPack(k, c) }; });
  const audit = {};
  ["4", "5", "6", "7", "8", "9", "10"].forEach((id) => { audit[id] = auditKit(id, c); });
  return { generated, audit };
}

module.exports = { buildSet27k, ANNEX_A, SEC, FOUND };
