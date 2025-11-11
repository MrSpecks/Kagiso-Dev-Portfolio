import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Shield } from "lucide-react";

const RefundPolicy = () => {
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
          <RefreshCw className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Refund Policy</h1>
        </div>

        <p className="text-muted-foreground text-lg mb-2">
          Last Updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Shield className="h-4 w-4" />
          <span>Compliant with South African Consumer Protection Act (CPA)</span>
        </div>

        {/* Policy Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Refund Policy outlines the terms and conditions under which Kagiso Mfusi ("we", "us", "our")
              provides refunds for professional services including web development, AI system development, automation
              solutions, and consulting services. We are committed to fair business practices and compliance with the
              South African Consumer Protection Act (CPA).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Refund Eligibility Criteria</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Refunds may be issued under the following circumstances:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Project Cancellation Before Commencement:</strong> If you cancel the project
                within 7 days of the initial deposit payment and before any work has commenced, you are eligible for a full refund
                minus any processing fees (maximum 5% or as charged by payment processor).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Service Not Delivered as Agreed:</strong> If we fail to deliver the agreed-upon
                services within the specified timeline and scope, and cannot reach a mutually acceptable resolution, you may be eligible
                for a partial or full refund of payments made for undelivered work.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Material Breach of Contract:</strong> If we materially breach the terms of our
                service agreement and fail to remedy the breach within a reasonable timeframe (typically 14 days of written notice).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Technical Impossibility:</strong> If it becomes technically impossible to complete
                the project as specified, and we cannot propose an acceptable alternative solution.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Non-Refundable Items</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The following items are non-refundable:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Completed Work:</strong> Any work that has been completed, delivered, and accepted
                by the client is non-refundable. This includes completed project phases, deliverables, and milestones.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Third-Party Service Costs:</strong> Expenses incurred for third-party services,
                licenses, APIs, hosting, domain registration, or other external costs paid on your behalf are non-refundable.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Custom Development Work:</strong> Once custom code, designs, or solutions have been
                provided to you, the development time invested is non-refundable, even if you choose not to proceed.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Consulting and Strategy Sessions:</strong> Time spent in discovery meetings,
                consultation sessions, strategy development, and planning is non-refundable once the sessions have been conducted.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Change of Mind:</strong> Refunds will not be issued if you simply change your mind
                about the project after work has commenced, unless otherwise agreed in writing.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Refund Request Timeframes</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To be eligible for a refund, you must submit a written refund request within the following timeframes:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Early Cancellation:</strong> Within 7 days of initial deposit payment and before
                work commencement.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Service Issues:</strong> Within 14 days of becoming aware of any issue with service
                delivery or quality concerns.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Project Completion:</strong> Within 30 days of final project delivery for any
                unresolved issues not addressed during the project warranty period.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Refund requests submitted after these timeframes may not be honored unless required by law under the Consumer Protection Act.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Refund Process</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To request a refund, please follow these steps:
            </p>
            <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
              <li className="leading-relaxed">
                <strong className="text-foreground">Submit Written Request:</strong> Send a detailed refund request via email to
                <a href="mailto:kagisomfusi@outlook.com" className="text-primary hover:underline ml-1">
                  kagisomfusi@outlook.com
                </a> including your name, project details, payment information, and reason for the refund request.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Review Period:</strong> We will review your refund request within 5 business days
                and respond with our determination.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Documentation:</strong> You may be asked to provide supporting documentation or
                evidence to substantiate your refund claim.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Approval and Processing:</strong> If approved, refunds will be processed within
                14-30 business days, depending on your payment method and financial institution.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Refund Method:</strong> Refunds will be issued to the original payment method
                used for the transaction. If this is not possible, an alternative payment method will be arranged.
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Partial Refunds</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In cases where a project is partially completed, partial refunds may be calculated as follows:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Milestone-Based Projects:</strong> Refunds will be calculated based on completed
                milestones versus total project value. Completed and approved milestones are non-refundable.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Time-Based Projects:</strong> For hourly or time-based engagements, refunds will
                be calculated based on hours worked versus total hours contracted.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Value-Based Projects:</strong> For projects with value-based pricing, refunds
                will be calculated based on the proportion of deliverables completed and value provided.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All partial refund calculations will be documented and provided to you for review before processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Payment Method Return Policies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Refunds are processed according to the original payment method:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Bank Transfer/EFT:</strong> Refunds will be transferred back to the originating
                bank account within 5-10 business days after approval.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Credit/Debit Card:</strong> Refunds will appear on your card statement within
                10-14 business days, depending on your card issuer's processing times.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">PayPal or Other Payment Platforms:</strong> Refunds will be credited to your
                platform account within 7-10 business days.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">International Transfers:</strong> May take up to 30 business days and may be
                subject to currency conversion rates at the time of refund processing.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Consumer Protection Act (CPA) Compliance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a service provider operating in South Africa, we comply with the Consumer Protection Act (CPA). Under the CPA,
              you have the following rights:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                The right to fair, honest, and transparent dealings.
              </li>
              <li className="leading-relaxed">
                The right to receive services of good quality that are reasonably suitable for the purposes intended.
              </li>
              <li className="leading-relaxed">
                The right to receive services performed in a professional manner and with reasonable care and skill.
              </li>
              <li className="leading-relaxed">
                The right to cancel advance bookings, reservations, orders, or service agreements under certain circumstances.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Nothing in this Refund Policy limits your statutory rights under the Consumer Protection Act or other applicable
              South African consumer protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disputes and Resolution</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you disagree with our refund determination:
            </p>
            <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
              <li className="leading-relaxed">
                <strong className="text-foreground">Internal Review:</strong> Request a review of the decision by providing additional
                information or clarification within 7 days of our initial determination.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Good Faith Negotiation:</strong> We commit to negotiating in good faith to reach
                a mutually acceptable resolution.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Mediation:</strong> If we cannot resolve the dispute internally, we recommend
                mediation through an independent third party before pursuing legal action.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Consumer Commission:</strong> You have the right to lodge a complaint with the
                National Consumer Commission if you believe your consumer rights have been violated.
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Modifications to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting
              to our website with an updated "Last Updated" date. Your continued engagement with our services after policy changes
              constitutes acceptance of the modified policy. Material changes affecting existing projects will not be applied
              retroactively without your written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For questions about this Refund Policy or to submit a refund request, please contact:
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
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Your Rights Are Protected
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We are committed to fair business practices and treating all clients with respect and transparency.
                If you have concerns about our refund process or believe your consumer rights have been violated,
                you may contact the National Consumer Commission at
                <a href="tel:0860103600" className="text-primary hover:underline ml-1">086 010 3600</a> or visit
                <a href="http://www.thencc.gov.za" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  www.thencc.gov.za
                </a>.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default RefundPolicy;
