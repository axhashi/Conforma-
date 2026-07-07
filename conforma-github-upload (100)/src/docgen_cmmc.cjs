/* CMMC Level 2 / NIST SP 800-171 framework module. Generates the core CMMC
   artifacts (System Security Plan, POA&M, scoping, policy) plus a pack for each
   of the 14 NIST 800-171 control families. Parameterized by contract facts. */

/* Organizational configuration — sensible defaults the org confirms/edits (the
   intake step). Each value flows into the per-practice implementation text so
   the SSP describes HOW each control is met, not just that it is. */
const CMMC_DEFAULTS = {
  idp: "Microsoft Entra ID", mdm: "Microsoft Intune", siem: "Microsoft Sentinel (SIEM)",
  edr: "Microsoft Defender for Endpoint (EDR)", mfa: "an authenticator app / FIDO2 security keys",
  vpn: "the managed VPN", crypto: "FIPS 140-2 validated AES-256", tls: "TLS 1.2 or higher",
  benchmark: "CIS / DISA STIG", ntp: "an authoritative time source (NIST NTP)",
  sessionLockMins: "15 minutes", logoffMins: "30 minutes", lockoutAttempts: "5",
  passwordMinLen: "14 characters", passwordReuse: "24", inactivityDisableDays: "35 days",
  scanFreq: "monthly", riskFreq: "annually", accessReviewFreq: "quarterly",
  criticalRemediation: "30 days", highRemediation: "90 days", logRetention: "at least one year",
  breachHours: "72 hours",
};

function implMap(c, g) {
  return {
    "3.1.1": `Access is limited to authorized users, processes, and devices through ${g.idp} with role-based access control (RBAC); accounts are provisioned via an approval workflow.`,
    "3.1.2": `Users are restricted to permitted transactions and functions via RBAC roles scoped to job duties in ${g.idp} and ${c.PLATFORM}.`,
    "3.1.3": `CUI flow is controlled by network segmentation, DLP policy, and approved connection rules documented in the boundary diagram.`,
    "3.1.4": `Separation of duties is enforced so request, approval, and administration of access are performed by different roles.`,
    "3.1.5": `Least privilege is enforced; privileged access is limited to named administrators and reviewed ${g.accessReviewFreq}.`,
    "3.1.6": `Administrators use separate non-privileged accounts for routine, non-security functions.`,
    "3.1.7": `Non-privileged users are prevented from executing privileged functions; such attempts are captured in ${g.siem}.`,
    "3.1.8": `Accounts lock after ${g.lockoutAttempts} failed logon attempts for a defined lockout period.`,
    "3.1.9": `A system-use / privacy banner consistent with CUI rules is displayed at logon.`,
    "3.1.10": `Session lock with a pattern-hiding display engages after ${g.sessionLockMins} of inactivity, enforced via ${g.mdm}.`,
    "3.1.11": `User sessions terminate automatically after ${g.logoffMins} of inactivity or at defined conditions.`,
    "3.1.12": `Remote access sessions are monitored and controlled through ${g.vpn} and logged to ${g.siem}.`,
    "3.1.13": `Remote access is protected with ${g.crypto} over ${g.tls}.`,
    "3.1.14": `Remote access is routed through a limited number of managed access control points (VPN concentrators).`,
    "3.1.15": `Remote execution of privileged commands and access to security-relevant information require explicit authorization and MFA.`,
    "3.1.16": `Wireless access is authorized before connection and restricted to approved SSIDs.`,
    "3.1.17": `Wireless access is protected with WPA2/WPA3-Enterprise authentication and encryption.`,
    "3.1.18": `Mobile device connections are controlled and enrolled in ${g.mdm}.`,
    "3.1.19": `CUI on mobile devices is encrypted using ${g.crypto} device encryption.`,
    "3.1.20": `Connections to external systems are verified and limited by policy and technical controls; unmanaged devices are denied.`,
    "3.1.21": `Use of portable storage on external systems is prohibited by policy and endpoint controls.`,
    "3.1.22": `CUI is prohibited from publicly accessible systems; public content is reviewed before posting.`,
    "3.2.1": `All users complete security awareness training at onboarding and annually, covering the risks of their activities.`,
    "3.2.2": `Personnel with security duties receive role-based training appropriate to their responsibilities.`,
    "3.2.3": `Awareness training includes recognizing and reporting insider-threat indicators.`,
    "3.3.1": `Audit logs are generated and retained ${g.logRetention} in ${g.siem} to support monitoring and investigation.`,
    "3.3.2": `Actions are uniquely traceable to individual users through unique IDs; shared accounts are prohibited.`,
    "3.3.3": `Logged event types are reviewed and updated ${g.accessReviewFreq}.`,
    "3.3.4": `Alerts are generated on audit logging process failure.`,
    "3.3.5": `Audit records are correlated and reviewed in ${g.siem} for investigation and response.`,
    "3.3.6": `Audit reduction and on-demand reporting are provided by ${g.siem}.`,
    "3.3.7": `System clocks are synchronized to ${g.ntp} for accurate time stamps.`,
    "3.3.8": `Audit information and logging tools are protected from unauthorized access and modification via access controls.`,
    "3.3.9": `Management of audit logging is limited to a defined subset of privileged users.`,
    "3.4.1": `Baseline configurations and asset inventories are established and maintained in ${g.mdm} / CMDB.`,
    "3.4.2": `Security configuration settings are enforced against ${g.benchmark} baselines.`,
    "3.4.3": `Changes are tracked, reviewed, approved, and logged through the change-management process.`,
    "3.4.4": `Security impact of changes is analyzed before implementation.`,
    "3.4.5": `Physical and logical access restrictions for changes are defined and enforced.`,
    "3.4.6": `Least functionality is enforced; only essential capabilities are enabled.`,
    "3.4.7": `Nonessential programs, ports, protocols, and services are restricted or disabled.`,
    "3.4.8": `Application allow-listing (permit-by-exception) controls software execution.`,
    "3.4.9": `User-installed software is controlled and monitored via ${g.mdm}.`,
    "3.5.1": `Users, processes, and devices are uniquely identified in ${g.idp}.`,
    "3.5.2": `Identities are authenticated before access is granted.`,
    "3.5.3": `MFA is required for privileged and network access using ${g.mfa}.`,
    "3.5.4": `Replay-resistant authentication is employed (e.g., Kerberos, FIDO2).`,
    "3.5.5": `Identifier reuse is prevented for a defined period.`,
    "3.5.6": `Identifiers are disabled after ${g.inactivityDisableDays} of inactivity.`,
    "3.5.7": `Password complexity requires a minimum of ${g.passwordMinLen}.`,
    "3.5.8": `Password reuse is prohibited for ${g.passwordReuse} generations.`,
    "3.5.9": `Temporary passwords require immediate change to a permanent password.`,
    "3.5.10": `Passwords are stored and transmitted only in cryptographically-protected form.`,
    "3.5.11": `Authentication feedback is obscured (masked entry).`,
    "3.6.1": `An operational incident-handling capability covers preparation, detection, analysis, containment, recovery, and user response.`,
    "3.6.2": `Incidents are tracked, documented, and reported to designated officials, including required DoD reporting within ${g.breachHours}.`,
    "3.6.3": `The incident response capability is tested at least annually via tabletop exercises.`,
    "3.7.1": `Maintenance is performed on a scheduled basis per the maintenance procedure.`,
    "3.7.2": `Maintenance tools, techniques, and personnel are controlled and approved.`,
    "3.7.3": `Equipment removed for off-site maintenance is sanitized of CUI first.`,
    "3.7.4": `Diagnostic and test media are scanned for malicious code before use.`,
    "3.7.5": `Nonlocal maintenance sessions require ${g.mfa} and are terminated when complete.`,
    "3.7.6": `Maintenance personnel without authorization are supervised.`,
    "3.8.1": `System media containing CUI (paper and digital) are physically controlled and securely stored.`,
    "3.8.2": `Access to CUI on media is limited to authorized users.`,
    "3.8.3": `Media is sanitized or destroyed before disposal or reuse per NIST SP 800-88.`,
    "3.8.4": `Media is marked with CUI markings and distribution limitations.`,
    "3.8.5": `Media in transport is controlled and accountability maintained.`,
    "3.8.6": `CUI on digital media in transport is encrypted with ${g.crypto}.`,
    "3.8.7": `Use of removable media is controlled via ${g.mdm} policy.`,
    "3.8.8": `Portable storage without an identifiable owner is prohibited.`,
    "3.8.9": `Backup CUI is protected with encryption at the storage location.`,
    "3.9.1": `Individuals are screened (background checks) before authorizing access to CUI.`,
    "3.9.2": `Access is revoked and assets recovered during terminations and transfers via the offboarding workflow.`,
    "3.10.1": `Physical access to systems and facilities is limited to authorized individuals via badge access.`,
    "3.10.2": `Facilities and support infrastructure are protected and monitored (CCTV, alarms).`,
    "3.10.3": `Visitors are escorted and their activity monitored.`,
    "3.10.4": `Physical access audit logs are maintained.`,
    "3.10.5": `Physical access devices (badges, keys) are controlled and managed.`,
    "3.10.6": `CUI safeguarding measures are enforced at alternate / remote work sites.`,
    "3.11.1": `Risk to operations and CUI is assessed ${g.riskFreq}.`,
    "3.11.2": `Vulnerability scans are performed ${g.scanFreq} and when new vulnerabilities are identified.`,
    "3.11.3": `Vulnerabilities are remediated per risk: critical within ${g.criticalRemediation}, high within ${g.highRemediation}.`,
    "3.12.1": `Security controls are assessed for effectiveness at least annually.`,
    "3.12.2": `Deficiencies are tracked in the POA&M with owners and milestones.`,
    "3.12.3": `Controls are monitored on an ongoing basis via ${g.siem}.`,
    "3.12.4": `This System Security Plan is maintained and updated at least annually and on significant change.`,
    "3.13.1": `Communications at external and key internal boundaries are monitored and protected via firewalls and ${g.siem}.`,
    "3.13.2": `Secure architecture and engineering principles are applied to system design.`,
    "3.13.3": `User functionality is separated from system management functionality.`,
    "3.13.4": `Unauthorized information transfer via shared resources is prevented.`,
    "3.13.5": `Publicly accessible components are placed in a separated subnet (DMZ).`,
    "3.13.6": `Network traffic is denied by default and permitted by exception (deny-all firewall posture).`,
    "3.13.7": `Split tunneling is prevented on remote devices.`,
    "3.13.8": `CUI in transmission is protected with ${g.crypto} over ${g.tls}.`,
    "3.13.9": `Network connections terminate after ${g.logoffMins} of inactivity or at session end.`,
    "3.13.10": `Cryptographic keys are established and managed per a key-management procedure.`,
    "3.13.11": `${g.crypto} (FIPS-validated) is employed to protect the confidentiality of CUI.`,
    "3.13.12": `Remote activation of collaborative computing devices is prohibited; in-use indication is provided.`,
    "3.13.13": `Mobile code is controlled and monitored.`,
    "3.13.14": `VoIP use is controlled and monitored.`,
    "3.13.15": `Communications session authenticity is protected (TLS, signed sessions).`,
    "3.13.16": `CUI at rest is protected with ${g.crypto} encryption.`,
    "3.14.1": `System flaws are identified and remediated timely: critical within ${g.criticalRemediation}.`,
    "3.14.2": `Malicious code protection (${g.edr}) is deployed at designated locations.`,
    "3.14.3": `Security alerts and advisories are monitored and acted upon.`,
    "3.14.4": `Malicious code protection mechanisms are updated automatically.`,
    "3.14.5": `Periodic and real-time scans are performed on files from external sources.`,
    "3.14.6": `Systems and inbound/outbound traffic are monitored to detect attacks via ${g.siem} / ${g.edr}.`,
    "3.14.7": `Unauthorized use of systems is identified through monitoring and alerting.`,
  };
}

const FAMILIES = [
  ["3.1", "ac", "Access Control", "limit system access to authorized users and processes, on least privilege",
    [["3.1.1", "Limit system access to authorized users, processes, and devices"], ["3.1.2", "Limit access to permitted transactions and functions"], ["3.1.3", "Control the flow of CUI per approved authorizations"], ["3.1.4", "Separate duties to reduce risk of malevolent activity"], ["3.1.5", "Employ least privilege, including for privileged accounts"], ["3.1.6", "Use non-privileged accounts for nonsecurity functions"], ["3.1.7", "Prevent non-privileged users from executing privileged functions; log them"], ["3.1.8", "Limit unsuccessful logon attempts"], ["3.1.9", "Provide privacy and security notices consistent with CUI rules"], ["3.1.10", "Use session lock with pattern-hiding displays after inactivity"], ["3.1.11", "Terminate a user session after a defined condition"], ["3.1.12", "Monitor and control remote access sessions"], ["3.1.13", "Use cryptographic mechanisms to protect remote access sessions"], ["3.1.14", "Route remote access via managed access control points"], ["3.1.15", "Authorize remote execution of privileged commands"], ["3.1.16", "Authorize wireless access prior to connection"], ["3.1.17", "Protect wireless access using authentication and encryption"], ["3.1.18", "Control connection of mobile devices"], ["3.1.19", "Encrypt CUI on mobile devices and platforms"], ["3.1.20", "Verify and control connections to external systems"], ["3.1.21", "Limit use of portable storage devices on external systems"], ["3.1.22", "Control CUI posted on publicly accessible systems"]]],
  ["3.2", "at", "Awareness & Training", "make personnel aware of security risks and their responsibilities",
    [["3.2.1", "Make users aware of security risks of their activities"], ["3.2.2", "Train personnel for assigned security duties"], ["3.2.3", "Provide insider-threat awareness training"]]],
  ["3.3", "au", "Audit & Accountability", "create and protect audit logs to enable monitoring and investigation",
    [["3.3.1", "Create and retain system audit logs and records"], ["3.3.2", "Ensure actions are uniquely traceable to individual users"], ["3.3.3", "Review and update logged events"], ["3.3.4", "Alert on audit logging process failure"], ["3.3.5", "Correlate audit review for investigation and response"], ["3.3.6", "Provide audit reduction and report generation"], ["3.3.7", "Synchronize internal clocks with an authoritative source"], ["3.3.8", "Protect audit information and tools from tampering"], ["3.3.9", "Limit management of audit logging to privileged users"]]],
  ["3.4", "cm", "Configuration Management", "establish and maintain secure baseline configurations",
    [["3.4.1", "Establish and maintain baseline configurations and inventories"], ["3.4.2", "Establish and enforce security configuration settings"], ["3.4.3", "Track, review, approve, and log changes"], ["3.4.4", "Analyze security impact of changes before implementation"], ["3.4.5", "Define and enforce access restrictions for changes"], ["3.4.6", "Employ least functionality"], ["3.4.7", "Restrict nonessential programs, ports, protocols, services"], ["3.4.8", "Apply deny-by-exception / permit-by-exception for software"], ["3.4.9", "Control and monitor user-installed software"]]],
  ["3.5", "ia", "Identification & Authentication", "identify and authenticate users and devices before access",
    [["3.5.1", "Identify users, processes, and devices"], ["3.5.2", "Authenticate identities before access"], ["3.5.3", "Use multifactor authentication for privileged and network access"], ["3.5.4", "Employ replay-resistant authentication"], ["3.5.5", "Prevent reuse of identifiers for a defined period"], ["3.5.6", "Disable identifiers after inactivity"], ["3.5.7", "Enforce minimum password complexity"], ["3.5.8", "Prohibit password reuse for a number of generations"], ["3.5.9", "Allow temporary passwords with immediate change"], ["3.5.10", "Store and transmit only cryptographically-protected passwords"], ["3.5.11", "Obscure feedback of authentication information"]]],
  ["3.6", "ir", "Incident Response", "establish an operational incident-handling capability",
    [["3.6.1", "Establish an operational incident-handling capability"], ["3.6.2", "Track, document, and report incidents to authorities"], ["3.6.3", "Test the incident response capability"]]],
  ["3.7", "ma", "Maintenance", "perform maintenance securely and control maintenance tools/personnel",
    [["3.7.1", "Perform maintenance on organizational systems"], ["3.7.2", "Control tools, techniques, and personnel for maintenance"], ["3.7.3", "Sanitize equipment removed for off-site maintenance"], ["3.7.4", "Check diagnostic media for malicious code before use"], ["3.7.5", "Require MFA to establish nonlocal maintenance sessions"], ["3.7.6", "Supervise maintenance personnel without access authorization"]]],
  ["3.8", "mp", "Media Protection", "protect and sanitize media containing CUI",
    [["3.8.1", "Protect system media containing CUI, paper and digital"], ["3.8.2", "Limit access to CUI on media to authorized users"], ["3.8.3", "Sanitize or destroy media before disposal or reuse"], ["3.8.4", "Mark media with CUI markings and distribution limits"], ["3.8.5", "Control and maintain accountability for media in transport"], ["3.8.6", "Use cryptographic mechanisms to protect CUI on media in transport"], ["3.8.7", "Control the use of removable media"], ["3.8.8", "Prohibit portable storage devices with no identifiable owner"], ["3.8.9", "Protect the confidentiality of backup CUI"]]],
  ["3.9", "ps", "Personnel Security", "screen personnel and protect CUI during personnel actions",
    [["3.9.1", "Screen individuals prior to authorizing access to CUI"], ["3.9.2", "Protect systems containing CUI during personnel actions"]]],
  ["3.10", "pe", "Physical Protection", "limit physical access to systems and environments",
    [["3.10.1", "Limit physical access to systems and environments"], ["3.10.2", "Protect and monitor the physical facility"], ["3.10.3", "Escort visitors and monitor visitor activity"], ["3.10.4", "Maintain audit logs of physical access"], ["3.10.5", "Control and manage physical access devices"], ["3.10.6", "Enforce safeguarding measures for CUI at alternate work sites"]]],
  ["3.11", "ra", "Risk Assessment", "assess and manage risk to operations and CUI",
    [["3.11.1", "Periodically assess risk to operations and CUI"], ["3.11.2", "Scan for vulnerabilities periodically and when identified"], ["3.11.3", "Remediate vulnerabilities per risk assessments"]]],
  ["3.12", "ca", "Security Assessment", "assess controls and maintain plans of action",
    [["3.12.1", "Periodically assess security controls for effectiveness"], ["3.12.2", "Develop and implement plans of action (POA&M)"], ["3.12.3", "Monitor security controls on an ongoing basis"], ["3.12.4", "Develop and maintain the System Security Plan"]]],
  ["3.13", "sc", "System & Communications Protection", "monitor and protect communications and system boundaries",
    [["3.13.1", "Monitor, control, and protect communications at boundaries"], ["3.13.2", "Employ secure architecture and engineering principles"], ["3.13.3", "Separate user functionality from system management"], ["3.13.4", "Prevent unauthorized transfer via shared resources"], ["3.13.5", "Implement subnetworks for publicly accessible components"], ["3.13.6", "Deny network traffic by default, permit by exception"], ["3.13.7", "Prevent split tunneling on remote devices"], ["3.13.8", "Use cryptography to protect CUI in transmission"], ["3.13.9", "Terminate network connections after inactivity"], ["3.13.10", "Establish and manage cryptographic keys"], ["3.13.11", "Employ FIPS-validated cryptography to protect CUI"], ["3.13.12", "Prohibit remote activation of collaborative devices"], ["3.13.13", "Control and monitor use of mobile code"], ["3.13.14", "Control and monitor use of VoIP"], ["3.13.15", "Protect authenticity of communications sessions"], ["3.13.16", "Protect the confidentiality of CUI at rest"]]],
  ["3.14", "si", "System & Information Integrity", "identify and correct flaws and protect against malicious code",
    [["3.14.1", "Identify, report, and correct system flaws timely"], ["3.14.2", "Provide protection from malicious code"], ["3.14.3", "Monitor security alerts and advisories and act"], ["3.14.4", "Update malicious code protection mechanisms"], ["3.14.5", "Perform periodic and real-time scans"], ["3.14.6", "Monitor systems and traffic to detect attacks"], ["3.14.7", "Identify unauthorized use of systems"]]],
];

function famPack(fam, ctx, impl) {
  const [id, key, name, purpose, practices] = fam;
  const rows = practices.map((p) => `| ${p[0]} | ${p[1]} | ${impl[p[0]] || "Implemented"} |`).join("\n");
  return `# ${name}
_NIST SP 800-171 · ${id} · CMMC Level 2 · ${ctx.ORG} · ${ctx.CUST}_

## Policy
It is ${ctx.ORG}'s policy to ${purpose}, protecting Controlled Unclassified Information (CUI) processed in support of the ${ctx.CONTRACT}.

## Procedure
1. Apply the ${name} controls to all in-scope systems (${ctx.PLATFORM} and CUI assets).
2. Assign responsibility to the System Owner and Security Lead.
3. Operate and monitor the controls day to day.
4. Record evidence of implementation and effectiveness.
5. Remediate gaps via the Plan of Action & Milestones (POA&M).
6. Review at least annually and on significant change.

## Implementation of practices (NIST SP 800-171)
_The implementation column reflects the organization's configuration; confirm each value against your environment._

| Practice | Requirement | Implementation |
|---|---|---|
${rows}

## Roles & Responsibilities
- **Security Lead** — accountable for this family's implementation and assessment.
- **System Owners** — implement and operate the controls on their systems.
- **All personnel** — comply and report issues.

## Required Records
Implementation evidence, monitoring output, and POA&M entries for ${name}, retained per policy.

## Review
Assessed at least annually and on significant change. Revision 1.0.`;
}

const FOUND = {
  ssp: (c) => ({ title: "System Security Plan (SSP)", clause: "3.12.4", content: `# System Security Plan (SSP)
_NIST SP 800-171 · 3.12.4 · CMMC Level 2 · ${c.ORG}_

## 1. System identification
**Organization:** ${c.ORGFULL}
**Contract / driver:** ${c.CUST} — ${c.CONTRACT}
**System:** ${c.PLATFORM} and supporting infrastructure serving ~${c.USERS} users across ${c.SITES} sites.

## 2. CUI environment
The system processes Controlled Unclassified Information (CUI) in support of the contract. The security boundary, data flows, and connections are documented in the CUI Scoping document.

## 3. Control implementation summary
The 110 NIST SP 800-171 security requirements across 14 families are implemented as described in the control-family documents. Status by family:

| Family | Area | Status |
|---|---|---|
${FAMILIES.map((f) => `| ${f[0]} | ${f[2]} | Implemented (see pack) |`).join("\n")}

## 4. Assessment & POA&M
Controls are assessed at least annually; gaps are tracked to closure in the Plan of Action & Milestones (POA&M). A CMMC Level 2 assessment is targeted per contract.

## 5. Approval
| Version | Date | Author | Approved by |
|---|---|---|---|
| 1.0 | (current) | Security Lead | Program Manager |` }),

  scope: (c) => ({ title: "CUI Scoping & Boundary", clause: "Scoping", content: `# CUI Scoping & Boundary
_CMMC Level 2 · ${c.ORG}_

## In-scope assets
| Category | Examples | In scope |
|---|---|---|
| CUI assets | Systems that store/process/transmit CUI (${c.PLATFORM}) | Yes |
| Security protection assets | Identity, logging, endpoint protection | Yes |
| Contractor risk-managed assets | Endpoints, admin workstations | Yes |
| Specialized assets | On-site devices, if any | Assessed |
| Out-of-scope | Systems with no CUI and no connection | No |

## Boundary
The security boundary covers the people, processes and technology used to deliver the ${c.CONTRACT} for ${c.CUST}. Customer-provided infrastructure is a documented interface.

## Review
Reviewed at least annually and on significant change.` }),

  policy: (c) => ({ title: "CUI Security Policy", clause: "Policy", content: `# CUI Security Policy
_CMMC Level 2 / NIST SP 800-171 · ${c.ORG}_

## Purpose
${c.ORGFULL} protects Controlled Unclassified Information (CUI) handled in delivering the ${c.CONTRACT} to ${c.CUST}, meeting NIST SP 800-171 and CMMC Level 2 requirements.

## Policy statements
- We identify and mark CUI and limit access to authorized personnel.
- We implement all 110 NIST SP 800-171 requirements across the 14 families.
- We use FIPS-validated cryptography to protect CUI in transit and at rest.
- We detect, report and respond to incidents involving CUI.
- We assess controls, maintain an SSP and POA&M, and pursue CMMC certification.

## Approval
Issued by top management; reviewed at least annually.` }),

  roles: (c) => ({ title: "Roles & Responsibilities", clause: "3.1 / 3.9", content: `# Roles & Responsibilities
_CMMC Level 2 · ${c.ORG}_

| Role | Responsibility |
|---|---|
| Program Manager | Accountable for CMMC compliance and the ${c.CUST} relationship |
| Security Lead / ISSO | Implements and assesses the 800-171 controls; owns SSP & POA&M |
| System Owners | Operate controls on their systems |
| Privileged Admins | Manage access, configuration and logging |
| All personnel | Handle CUI correctly; complete training; report incidents |

Reviewed at least annually.` }),

  risk: (c) => ({ title: "Risk Assessment", clause: "3.11", content: `# Risk Assessment
_NIST SP 800-171 · 3.11 · ${c.ORG}_

| ID | Risk to CUI | Likelihood | Impact | Treatment (practice) | Owner |
|---|---|---|---|---|---|
| CR1 | Unauthorized access to CUI | Medium | High | 3.1 access control; 3.5 MFA | Security Lead |
| CR2 | Phishing / credential theft | High | High | 3.2 training; 3.5.3 MFA | Security Lead |
| CR3 | Unpatched vulnerabilities | Medium | High | 3.11.2/3 scan & remediate | System Owner |
| CR4 | CUI exfiltration | Medium | High | 3.13 boundary protection; 3.8 media | Security Lead |
| CR5 | Malicious code | Medium | High | 3.14.2 anti-malware | System Owner |

Assessed at least annually; scanning performed on a defined cadence.` }),

  poam: (c) => ({ title: "Plan of Action & Milestones (POA&M)", clause: "3.12.2", content: `# Plan of Action & Milestones (POA&M)
_NIST SP 800-171 · 3.12.2 · ${c.ORG}_

| Item | Requirement | Weakness | Remediation | Owner | Milestone | Status |
|---|---|---|---|---|---|---|
| P1 | 3.3.5 | Log correlation not automated | Deploy SIEM correlation rules | Security Lead | Q2 | Open |
| P2 | 3.4.1 | Baseline not documented for all hosts | Document and enforce baselines | System Owner | Q1 | In progress |
| P3 | 3.6.3 | IR plan not yet tested | Run tabletop exercise | Security Lead | Q2 | Open |
| P4 | 3.11.2 | Vulnerability scanning ad hoc | Establish scheduled scanning | System Owner | Q1 | In progress |

Open items are tracked to closure and reviewed at management review.` }),

  training: (c) => ({ title: "Awareness & Training Plan", clause: "3.2", content: `# Awareness & Training Plan
_NIST SP 800-171 · 3.2 · ${c.ORG}_

| Topic | Audience | Frequency |
|---|---|---|
| CUI handling & marking | All personnel | Onboarding + annual |
| Security awareness | All personnel | Annual + phishing sims |
| Role-based security training | Privileged/admin roles | Onboarding + annual |
| Insider-threat awareness | All personnel | Annual |

Training records are retained as assessment evidence.` }),

  config: (c) => ({ title: "Configuration Baseline Standard", clause: "3.4", content: `# Configuration Baseline Standard
_NIST SP 800-171 · 3.4 · ${c.ORG}_

## Baselines
Secure baseline configurations are defined and enforced for endpoints, servers and ${c.PLATFORM}, based on recognized benchmarks (e.g. CIS/DISA STIG).

| Control | Standard |
|---|---|
| Baseline & inventory | Documented; maintained (3.4.1) |
| Security settings | Enforced via policy/MDM (3.4.2) |
| Change control | Tracked and approved (3.4.3) |
| Least functionality | Unnecessary services disabled (3.4.6) |

Reviewed at least annually and on significant change.` }),

  irplan: (c) => ({ title: "Incident Response Plan", clause: "3.6", content: `# Incident Response Plan
_NIST SP 800-171 · 3.6 · ${c.ORG}_

## Phases
1. **Prepare** — roles, tools and reporting channels defined.
2. **Detect & analyze** — identify and classify incidents, including CUI exposure.
3. **Contain, eradicate, recover** — limit impact and restore service.
4. **Report** — notify the customer and required authorities (including DoD reporting where applicable) within required timeframes.
5. **Post-incident** — review, preserve evidence, and improve.

The plan is tested (e.g. tabletop) at least annually per 3.6.3.` }),
};

const CLNAME = { "4": "Context", "5": "Leadership", "6": "Planning", "7": "Support", "8": "Operation", "9": "Assessment", "10": "Improvement" };
function auditKit(id, c) {
  return {
    "Assessment Checklist": `## CMMC / 800-171 Assessment Checklist — Family group ${id}
${c.ORG} · ${c.CONTRACT} · ${c.CUST}

| # | Practice area | Assessment question | Evidence | Met? |
|---|---|---|---|---|
| 1 | Definition | Is the requirement documented in the SSP? | SSP section | ( ) |
| 2 | Implementation | Is it implemented on in-scope systems? | Configs, logs, records | ( ) |
| 3 | Assessment | Is it assessed, with gaps in the POA&M? | Assessment + POA&M | ( ) |

**Objective:** meet or POA&M every applicable 800-171 practice.`,
    "Assessor Interview Questions": `## Assessor Interview Questions — group ${id}

- Show me where this is documented in the SSP.
- Demonstrate the control operating on an in-scope system.
- Where are the records, and how far back do they go?
- For any gap, show the POA&M entry and milestone.`,
    "Objective Evidence": `## Objective Evidence — group ${id}

Expect: the SSP narrative, system configurations, logs/records showing operation, assessment results, and POA&M entries for gaps — current, attributable and retained.`,
  };
}

function buildSetCmmc(c, config) {
  const g = Object.assign({}, CMMC_DEFAULTS, config || {});
  const impl = implMap(c, g);
  const generated = {};
  Object.keys(FOUND).forEach((k) => { generated[k] = FOUND[k](c); });
  FAMILIES.forEach((f) => { generated["fam_" + f[1]] = { title: f[2] + " (" + f[0] + ")", clause: f[0], content: famPack(f, c, impl) }; });
  const audit = {};
  ["4", "5", "6", "7", "8", "9", "10"].forEach((id) => { audit[id] = auditKit(id, c); });
  return { generated, audit };
}

module.exports = { buildSetCmmc, FAMILIES, FOUND };
