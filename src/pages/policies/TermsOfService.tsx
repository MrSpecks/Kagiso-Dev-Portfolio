import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Shield } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Policy Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>

        <p className="text-muted-foreground text-lg mb-2">
          Last Updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Shield className="h-4 w-4" />
          <span>Compliant with South African Electronic Communications and Transactions Act (ECTA)</span>
        </div>

        {/* Policy Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms", "Agreement") govern your engagement with professional services provided
              by Kagiso Mfusi ("we", "us", "our", "the Contractor"). By engaging our services, contacting us for
              consultations, or entering into a service agreement, you ("you", "your", "the Client") agree to be bound
              by these Terms. Please read them carefully.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Services Offered</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">1.1 Service Scope</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We provide professional technology and consulting services including, but not limited to:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Website Development:</strong> Custom website design, development,
                and deployment using modern frameworks and technologies.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">AI System Development:</strong> AI model integration, automation
                solutions, machine learning implementations, and intelligent system design.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Automation Solutions:</strong> Business process automation, workflow
                optimization, and system integration.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">AI Strategy Consultation:</strong> Strategic planning for AI adoption,
                technology assessments, and implementation roadmaps.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Multicloud Architecture:</strong> Cloud infrastructure design,
                deployment, and optimization across multiple cloud platforms.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">UI/UX Design:</strong> User interface and experience design, usability
                optimization, and design systems.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Service Delivery Model</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Services are provided on a project-by-project basis as an independent contractor:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                Each project is governed by a specific scope of work, timeline, and deliverables agreed upon in writing.
              </li>
              <li className="leading-relaxed">
                We operate as a freelancer/contractor, not as an employee, retainer-based consultant, or agency.
              </li>
              <li className="leading-relaxed">
                Services are delivered remotely with collaboration via digital communication channels.
              </li>
              <li className="leading-relaxed">
                Project phases typically include: Discovery, Design/Planning, Development/Implementation, Testing, and
                Deployment/Delivery.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">1.3 Services Not Offered</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not provide:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Full-time employment or retainer-based engagements (unless explicitly agreed)</li>
              <li className="leading-relaxed">24/7 emergency support outside of agreed maintenance contracts</li>
              <li className="leading-relaxed">Legal, financial, or accounting services</li>
              <li className="leading-relaxed">Content creation (copywriting, photography, videography) unless specified in project scope</li>
              <li className="leading-relaxed">Services involving illegal, unethical, or harmful activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Pricing and Payment Terms</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Pricing Structure</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our pricing is outcome-driven and value-based:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Value-Based Pricing:</strong> Project fees are determined based on
                the value delivered, project complexity, required expertise, and business impact—not arbitrary "starting from"
                rates.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Custom Quotes:</strong> Each project receives a detailed, transparent
                quote after thorough discovery and requirements analysis.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Fixed-Price Projects:</strong> Most projects are quoted as fixed-price
                engagements with clear deliverables and timelines.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Time-Based Engagements:</strong> For certain consulting or ongoing
                work, hourly or daily rates may apply (agreed in advance).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">No Hidden Fees:</strong> All costs, including third-party services,
                are disclosed upfront in project proposals.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Payment Schedule</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Standard payment terms are structured as follows:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Deposit:</strong> Typically 30-50% deposit required before project
                commencement to secure resources and cover initial costs.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Milestone Payments:</strong> For larger projects, payments are structured
                around key milestones (e.g., 30% deposit, 30% at mid-point, 40% on completion).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Final Payment:</strong> Final payment due upon project completion and
                delivery of all deliverables, before final handover.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Invoice Terms:</strong> Payment due within 7-14 days of invoice date
                (specific terms stated on each invoice).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Late Payment:</strong> Overdue invoices may incur interest at 2% per
                month or the maximum legal rate, whichever is lower.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Payment Methods</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Accepted payment methods:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Bank transfer / EFT (South African bank accounts)</li>
              <li className="leading-relaxed">International wire transfer (for international clients)</li>
              <li className="leading-relaxed">PayPal or other digital payment platforms (subject to processing fees)</li>
              <li className="leading-relaxed">Credit/Debit card payments (if arranged)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.4 Third-Party Costs</h3>
            <p className="text-muted-foreground leading-relaxed">
              Client is responsible for all third-party costs including hosting, domain registration, API subscriptions,
              software licenses, and external services required for the project. These are typically paid directly by the
              client or reimbursed if paid on client's behalf (with prior written approval).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Project Phases and Process</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Discovery Phase</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Initial consultation to understand requirements, objectives, constraints, and success criteria:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Requirements gathering and needs analysis</li>
              <li className="leading-relaxed">Technical feasibility assessment</li>
              <li className="leading-relaxed">Project scope definition and documentation</li>
              <li className="leading-relaxed">Timeline and budget estimation</li>
              <li className="leading-relaxed">Proposal and contract preparation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Design/Planning Phase</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Detailed planning and design before development:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Architecture and technical design</li>
              <li className="leading-relaxed">UI/UX wireframes and mockups (if applicable)</li>
              <li className="leading-relaxed">Data modeling and system design</li>
              <li className="leading-relaxed">Technology stack finalization</li>
              <li className="leading-relaxed">Project roadmap and milestone definition</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Development/Implementation Phase</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Core development work with regular progress updates:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Iterative development with milestone check-ins</li>
              <li className="leading-relaxed">Regular progress reports and demonstrations</li>
              <li className="leading-relaxed">Client feedback incorporation at agreed checkpoints</li>
              <li className="leading-relaxed">Code reviews and quality assurance</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.4 Testing and Quality Assurance</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Comprehensive testing before delivery:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Functional testing of all features</li>
              <li className="leading-relaxed">Performance and security testing</li>
              <li className="leading-relaxed">Cross-browser and device compatibility (for web projects)</li>
              <li className="leading-relaxed">User acceptance testing (UAT) with client participation</li>
              <li className="leading-relaxed">Bug fixes and refinements</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.5 Deployment and Handover</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Final delivery and knowledge transfer:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Production deployment and configuration</li>
              <li className="leading-relaxed">Comprehensive documentation delivery</li>
              <li className="leading-relaxed">Knowledge transfer and training (if included in scope)</li>
              <li className="leading-relaxed">Source code and asset handover</li>
              <li className="leading-relaxed">Post-launch support period (typically 30 days included)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property Rights</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Client Ownership of Deliverables</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Upon full payment:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Work Product:</strong> You own all rights, title, and interest in
                the final deliverables specifically created for your project.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Source Code:</strong> For development projects, you receive full
                source code ownership (unless otherwise specified for proprietary components).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Documentation:</strong> All project documentation created becomes
                your property.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Conditional Transfer:</strong> Ownership transfer is contingent on
                full payment of all invoices. We retain rights until final payment.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Contractor Retained Rights</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain ownership of:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Pre-Existing IP:</strong> Any code libraries, frameworks, tools,
                methodologies, or intellectual property developed before or outside of your project.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Reusable Components:</strong> Generic, non-client-specific components,
                utilities, or patterns that can be used in other projects.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Process Knowledge:</strong> Our methodologies, workflows, and
                professional expertise gained through the project.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Portfolio Rights:</strong> Right to showcase the project in our
                portfolio with your permission (client identity can be anonymized if requested).
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Third-Party Components</h3>
            <p className="text-muted-foreground leading-relaxed">
              Open-source libraries, frameworks, and third-party services used in projects remain subject to their
              original licenses. We ensure compliance with all licensing requirements and will document all third-party
              dependencies.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Client-Provided Materials</h3>
            <p className="text-muted-foreground leading-relaxed">
              You retain all rights to materials, content, branding, and intellectual property you provide to us.
              You grant us a limited license to use these materials solely for the purpose of delivering the project.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Confidentiality and Data Protection</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Mutual Confidentiality</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Both parties agree to maintain confidentiality of:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Business information, strategies, and plans</li>
              <li className="leading-relaxed">Technical specifications, source code, and architectures</li>
              <li className="leading-relaxed">Financial information and pricing details</li>
              <li className="leading-relaxed">Proprietary processes and methodologies</li>
              <li className="leading-relaxed">Any information marked as confidential or reasonably considered confidential</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Data Protection Obligations</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We commit to:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                Protecting your data in accordance with POPIA (see our Privacy Policy)
              </li>
              <li className="leading-relaxed">
                Implementing appropriate security measures for data in our possession
              </li>
              <li className="leading-relaxed">
                Not sharing your confidential information with third parties without consent (except as required for
                project delivery or legal compliance)
              </li>
              <li className="leading-relaxed">
                Securely deleting or returning confidential data upon project completion (unless retention is legally required)
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Confidentiality Duration</h3>
            <p className="text-muted-foreground leading-relaxed">
              Confidentiality obligations survive project completion and termination indefinitely, unless the information
              becomes publicly available through no fault of the receiving party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Warranties and Disclaimers</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Service Warranties</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We warrant that:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                Services will be performed in a professional and workmanlike manner consistent with industry standards.
              </li>
              <li className="leading-relaxed">
                Deliverables will substantially conform to the agreed specifications at the time of delivery.
              </li>
              <li className="leading-relaxed">
                We have the right and authority to provide services and grant the intellectual property rights specified.
              </li>
              <li className="leading-relaxed">
                Work will not knowingly infringe on third-party intellectual property rights.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Warranty Period and Remedies</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Standard warranty coverage:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Duration:</strong> 30-day warranty on deliverables from final delivery
                date (extended warranties may be purchased separately).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Coverage:</strong> Fixes for defects, bugs, or non-conformance to
                specifications at no additional charge.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Exclusions:</strong> Warranty does not cover issues caused by client
                modifications, third-party changes, hosting problems, or feature additions beyond original scope.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Sole Remedy:</strong> Our obligation is limited to correcting defects.
                We are not liable for refunds due to warranty claims unless unable to remedy issues.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Disclaimers</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              EXCEPT AS EXPRESSLY STATED, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">No Guarantee of Results:</strong> We do not guarantee specific
                business outcomes, traffic, revenue, or other metrics (unless explicitly stated in writing).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">No Uninterrupted Operation:</strong> We do not warrant that systems
                will operate error-free or without interruption.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Third-Party Reliability:</strong> We are not responsible for failures
                or issues with third-party services, APIs, hosting, or platforms.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Technology Limitations:</strong> Technology evolves rapidly; we cannot
                guarantee indefinite compatibility or future-proofing.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">7.1 Liability Cap</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our total liability for any claims arising from services provided shall not exceed the total amount paid
              by you for the specific project giving rise to the claim. This applies to all causes of action including
              contract breach, negligence, or other torts.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Excluded Damages</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Indirect, incidental, consequential, or punitive damages</li>
              <li className="leading-relaxed">Loss of profits, revenue, data, or business opportunities</li>
              <li className="leading-relaxed">Cost of substitute services or downtime</li>
              <li className="leading-relaxed">Damages arising from third-party services, hosting, or platforms</li>
              <li className="leading-relaxed">Issues caused by client actions, modifications, or negligence</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Liability Exceptions</h3>
            <p className="text-muted-foreground leading-relaxed">
              Liability limitations do not apply to damages caused by our willful misconduct, gross negligence, fraud,
              or violations of law that cannot be limited by contract.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Client Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Timely Communication:</strong> Respond to requests for information,
                feedback, and approvals within reasonable timeframes (typically 5-7 business days).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Accurate Information:</strong> Provide accurate, complete information
                and materials necessary for project success.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Access and Credentials:</strong> Provide necessary access to systems,
                accounts, and resources required for project work.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Timely Payment:</strong> Make payments according to agreed schedules
                and terms.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Scope Adherence:</strong> Understand that changes beyond agreed scope
                may require additional time and cost.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Legal Compliance:</strong> Ensure your project requirements comply
                with applicable laws and do not involve illegal activities.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Rights to Materials:</strong> Confirm you have rights to all materials,
                content, and assets you provide for the project.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes and Scope Adjustments</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">9.1 Change Requests</h3>
            <p className="text-muted-foreground leading-relaxed">
              Changes to project scope, requirements, or deliverables after commencement must be submitted in writing.
              We will assess the impact on timeline and budget and provide a change order for approval before proceeding.
              Additional charges may apply for out-of-scope changes.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">9.2 Timeline Adjustments</h3>
            <p className="text-muted-foreground leading-relaxed">
              Project timelines may be adjusted if: client feedback or approvals are delayed, scope changes are
              requested, required information is not provided timely, or force majeure events occur. We will
              communicate timeline impacts proactively.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Either party may terminate the engagement according to our Cancellation Policy. Upon termination:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Client remains liable for all work completed and costs incurred</li>
              <li className="leading-relaxed">Work product for paid work will be delivered</li>
              <li className="leading-relaxed">Confidentiality obligations continue</li>
              <li className="leading-relaxed">Final accounting and settlement will be conducted</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              See our <Link to="/policies/cancellation" className="text-primary hover:underline">Cancellation Policy</Link> for
              detailed terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Dispute Resolution</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">11.1 Good Faith Negotiation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Parties agree to first attempt to resolve disputes through good faith discussions and negotiation.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">11.2 Mediation</h3>
            <p className="text-muted-foreground leading-relaxed">
              If negotiation fails, parties agree to attempt mediation through a mutually agreed independent mediator
              before pursuing legal action.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">11.3 Governing Law and Jurisdiction</h3>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of the Republic of South Africa. Any legal proceedings shall be
              conducted in South African courts. However, parties agree to explore alternative dispute resolution
              before litigation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. General Provisions</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">12.1 Independent Contractor</h3>
            <p className="text-muted-foreground leading-relaxed">
              We operate as an independent contractor. Nothing in these Terms creates an employment, partnership, joint
              venture, or agency relationship.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">12.2 Entire Agreement</h3>
            <p className="text-muted-foreground leading-relaxed">
              These Terms, together with project-specific agreements and our policies, constitute the entire agreement
              and supersede all prior understandings. Modifications must be in writing and signed by both parties.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">12.3 Severability</h3>
            <p className="text-muted-foreground leading-relaxed">
              If any provision is found unenforceable, the remaining provisions continue in full effect.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">12.4 Waiver</h3>
            <p className="text-muted-foreground leading-relaxed">
              Failure to enforce any provision does not waive our right to enforce it later.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">12.5 Assignment</h3>
            <p className="text-muted-foreground leading-relaxed">
              You may not assign or transfer these Terms without our written consent. We may assign our rights and
              obligations with reasonable notice.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">12.6 Force Majeure</h3>
            <p className="text-muted-foreground leading-relaxed">
              Neither party is liable for failure to perform due to causes beyond reasonable control including natural
              disasters, pandemics, government actions, or infrastructure failures.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Electronic Communications and Transactions (ECTA Compliance)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under South Africa's Electronic Communications and Transactions Act (ECTA):
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Electronic Contracts:</strong> Agreements formed electronically
                (via email, electronic signatures, or online acceptance) are valid and enforceable.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Electronic Signatures:</strong> Digital signatures and confirmations
                via email constitute valid acceptance of terms.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Consumer Information:</strong> We provide clear information about
                services, pricing, and terms before engagement as required by ECTA Section 43.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Right to Withdraw:</strong> Consumer protection provisions of ECTA
                apply where relevant (see our Cancellation Policy).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Modifications to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms periodically. Material changes will be communicated to active clients via email.
              The "Last Updated" date indicates the latest revision. Continuing engagement after changes constitutes
              acceptance. Changes do not apply retroactively to existing active projects unless mutually agreed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For questions about these Terms of Service:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg border border-border">
              <p className="text-foreground font-semibold mb-2">Kagiso Mfusi</p>
              <p className="text-muted-foreground mb-1">
                Email: <a href="mailto:kagisomfusi@outlook.com" className="text-primary hover:underline">
                  kagisomfusi@outlook.com
                </a>
              </p>
              <p className="text-muted-foreground mb-1">
                Phone: <a href="tel:+27696287623" className="text-primary hover:underline">+27 69 628 7623</a>
              </p>
              <p className="text-muted-foreground">Location: South Africa</p>
              <p className="text-muted-foreground text-sm mt-3">
                Business Hours: Monday-Friday, 9:00 AM - 5:00 PM SAST
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Built on Trust and Transparency
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                These terms are designed to create clear expectations and protect both parties. We believe in transparent,
                respectful professional relationships built on mutual trust. If anything in these terms is unclear or you
                have concerns, please reach out—we're committed to finding solutions that work for everyone.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-muted/30 p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-3">Related Policies</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/policies/refund" className="text-primary hover:underline">
                    Refund Policy
                  </Link> - Learn about our refund terms and eligibility
                </li>
                <li>
                  <Link to="/policies/cancellation" className="text-primary hover:underline">
                    Cancellation Policy
                  </Link> - Understand project cancellation procedures
                </li>
                <li>
                  <Link to="/policies/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link> - See how we protect your personal information
                </li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default TermsOfService;
