import { Link } from "react-router-dom";
import { ArrowLeft, XCircle, Shield } from "lucide-react";

const CancellationPolicy = () => {
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
          <XCircle className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Cancellation Policy</h1>
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
              This Cancellation Policy outlines the terms and conditions under which either party—Kagiso Mfusi
              ("we", "us", "our", "the Contractor") or the client ("you", "your", "the Client")—may cancel
              professional service engagements. We are committed to fair, transparent business practices in
              accordance with South African law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Client Cancellation Rights</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">1.1 Early Cancellation (Pre-Commencement)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you wish to cancel before any work has commenced:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Within 7 Days of Agreement:</strong> Full refund of deposit minus
                processing fees (maximum 5%). Written notice required via email to
                <a href="mailto:kagisomfusi@outlook.com" className="text-primary hover:underline ml-1">
                  kagisomfusi@outlook.com
                </a>.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">After 7 Days, Before Work Starts:</strong> 50% of deposit retained
                to cover project preparation, planning, and opportunity cost. Remaining 50% refunded within 14 business days.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Mid-Project Cancellation</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you cancel after work has commenced:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Notice Requirement:</strong> Minimum 14 days written notice required
                for orderly project wind-down and documentation handover.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Payment Obligation:</strong> You remain responsible for payment of
                all work completed up to the effective cancellation date, including:
                <ul className="mt-2 ml-6 space-y-2">
                  <li>Completed project phases and milestones</li>
                  <li>Work-in-progress calculated on a pro-rata basis</li>
                  <li>Third-party service costs already incurred</li>
                  <li>Non-refundable expenses paid on your behalf</li>
                </ul>
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Work Product Rights:</strong> You retain full rights to all completed
                deliverables and work product provided up to the cancellation date, subject to full payment of outstanding
                invoices.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Documentation Handover:</strong> We will provide comprehensive documentation
                of all work completed, source code (if applicable), and transition materials within 7 business days of final
                payment.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">1.3 Cancellation for Cause</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may cancel immediately without penalty if:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                We materially breach the service agreement and fail to remedy the breach within 14 days of written notice.
              </li>
              <li className="leading-relaxed">
                We fail to deliver agreed-upon milestones beyond reasonable timelines without valid justification or
                prior communication.
              </li>
              <li className="leading-relaxed">
                We engage in fraudulent, illegal, or unethical conduct related to the project.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              In such cases, you are entitled to a refund of all payments made for undelivered work, calculated based
              on completed milestones.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Contractor Cancellation Rights</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Cancellation for Non-Payment</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We reserve the right to cancel the project engagement if:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Overdue Invoices:</strong> Any invoice remains unpaid for more than
                30 days beyond the due date, despite two written reminders.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Milestone Payment Failure:</strong> Payment for completed milestones
                is not received within the agreed payment terms (typically 7-14 days of invoice).
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Upon cancellation for non-payment:
            </p>
            <ul className="space-y-3 text-muted-foreground mt-4">
              <li className="leading-relaxed">
                You remain liable for all outstanding payments for work completed.
              </li>
              <li className="leading-relaxed">
                We retain all intellectual property rights and work product until full payment is received.
              </li>
              <li className="leading-relaxed">
                Access to project deliverables, code repositories, and work product will be suspended.
              </li>
              <li className="leading-relaxed">
                We may pursue legal remedies to recover outstanding amounts plus interest and collection costs.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Cancellation for Material Breach</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may terminate the engagement immediately if you:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                Materially breach the service agreement and fail to remedy within 14 days of written notice.
              </li>
              <li className="leading-relaxed">
                Engage in abusive, harassing, or discriminatory conduct toward us or our team.
              </li>
              <li className="leading-relaxed">
                Request or require us to perform illegal, unethical, or harmful activities.
              </li>
              <li className="leading-relaxed">
                Fail to provide necessary access, information, or cooperation required for project completion after
                repeated requests.
              </li>
              <li className="leading-relaxed">
                Breach confidentiality obligations or misuse proprietary information shared during the engagement.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Cancellation for Force Majeure</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Either party may cancel without liability if project completion becomes impossible due to:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                Acts of God (natural disasters, pandemics, extreme weather events)
              </li>
              <li className="leading-relaxed">
                Government actions, regulations, or legal prohibitions
              </li>
              <li className="leading-relaxed">
                War, terrorism, civil unrest, or national emergencies
              </li>
              <li className="leading-relaxed">
                Critical infrastructure failures beyond either party's control
              </li>
              <li className="leading-relaxed">
                Serious illness, injury, or death of key personnel
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              In force majeure situations, payment obligations are calculated based on work completed up to the date
              of cancellation, with refunds processed for undelivered work.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Project Suspension and Pause Terms</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Temporary Project Hold</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Projects may be temporarily suspended by mutual written agreement:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Maximum Hold Period:</strong> 90 days without formal cancellation
                or resumption decision.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Resumption Notice:</strong> Minimum 14 days notice required to resume
                work after suspension exceeding 30 days.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Scope Revalidation:</strong> Projects suspended for more than 60 days
                may require scope, timeline, and pricing revalidation before resumption.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Capacity Not Guaranteed:</strong> We cannot guarantee immediate
                availability upon project resumption. Restart timelines will be communicated upon resumption request.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Automatic Cancellation After Hold Period</h3>
            <p className="text-muted-foreground leading-relaxed">
              If a project remains on hold for more than 90 days without communication or resumption:
            </p>
            <ul className="space-y-3 text-muted-foreground mt-4">
              <li className="leading-relaxed">
                The project will be deemed automatically cancelled.
              </li>
              <li className="leading-relaxed">
                Final accounting of completed work and payments will be conducted.
              </li>
              <li className="leading-relaxed">
                Available refunds (if any) will be processed according to our Refund Policy.
              </li>
              <li className="leading-relaxed">
                All work product completed to date will be delivered subject to full payment.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Cancellation Process and Procedures</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.1 How to Cancel</h3>
            <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
              <li className="leading-relaxed">
                <strong className="text-foreground">Written Notice Required:</strong> All cancellations must be submitted
                in writing via email to
                <a href="mailto:kagisomfusi@outlook.com" className="text-primary hover:underline ml-1">
                  kagisomfusi@outlook.com
                </a>.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Include Required Information:</strong>
                <ul className="mt-2 ml-6 space-y-2">
                  <li>Your name and project identification details</li>
                  <li>Effective cancellation date (minimum 14 days from notice unless otherwise agreed)</li>
                  <li>Reason for cancellation (optional but helpful)</li>
                  <li>Request for final accounting and deliverables handover</li>
                </ul>
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Acknowledgment:</strong> We will acknowledge receipt of your
                cancellation notice within 2 business days.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Wind-Down Plan:</strong> We will provide a project wind-down plan
                outlining final deliverables, outstanding payments, and handover timeline.
              </li>
            </ol>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Post-Cancellation Obligations</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Upon project cancellation:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Final Invoice:</strong> A final invoice will be issued within 7 business
                days detailing all completed work, outstanding payments, and any applicable refunds.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Payment Terms:</strong> Final payments are due within 14 days of invoice
                unless otherwise agreed in writing.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Deliverables Transfer:</strong> Upon final payment, all work product
                will be transferred with comprehensive documentation.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Data Deletion:</strong> Project-related data will be retained for 90 days
                post-cancellation for potential resumption or dispute resolution, then securely deleted unless requested otherwise.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Confidentiality Continues:</strong> Confidentiality obligations survive
                project cancellation indefinitely.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property on Cancellation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Intellectual property rights upon cancellation are handled as follows:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Paid Work Product:</strong> You receive full ownership rights to all
                completed deliverables for which full payment has been made.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Unpaid Work:</strong> We retain all rights to work for which payment
                has not been received. Transfer of rights occurs only upon full payment.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Pre-Existing IP:</strong> Each party retains ownership of any pre-existing
                intellectual property brought to the project.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Open Source Components:</strong> Any open-source components remain subject
                to their original licenses regardless of project cancellation.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Process and Methodologies:</strong> We retain rights to our proprietary
                processes, methodologies, tools, and frameworks used during the project.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Consumer Protection Act (CPA) Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under the South African Consumer Protection Act, you have specific cancellation rights:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Cooling-Off Period:</strong> For certain services, you may have a
                5-business-day cooling-off period during which you can cancel without penalty (subject to CPA terms).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Fair Cancellation Terms:</strong> Cancellation penalties must be
                reasonable and proportionate to actual losses incurred.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Clear Communication:</strong> You have the right to clear, transparent
                communication about cancellation procedures and financial implications.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">No Unreasonable Barriers:</strong> We will not create unreasonable
                barriers or difficulties to exercising your cancellation rights.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Nothing in this policy limits your statutory rights under the Consumer Protection Act or other applicable
              South African law. Where this policy conflicts with CPA provisions, the CPA prevails.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If disputes arise regarding project cancellation:
            </p>
            <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
              <li className="leading-relaxed">
                <strong className="text-foreground">Good Faith Discussion:</strong> Both parties commit to discussing
                concerns openly and in good faith to reach amicable resolution.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Mediation:</strong> If direct discussion fails, we recommend mediation
                through an independent mediator before pursuing legal action.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">National Consumer Commission:</strong> You may lodge a complaint with
                the National Consumer Commission at
                <a href="tel:0860103600" className="text-primary hover:underline ml-1">086 010 3600</a> or
                <a href="http://www.thencc.gov.za" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  www.thencc.gov.za
                </a>.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Legal Proceedings:</strong> As a last resort, disputes will be resolved
                through South African courts under South African law.
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Modifications to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cancellation Policy from time to time. Changes become effective upon posting with an
              updated "Last Updated" date. Modifications will not apply retroactively to existing active projects unless
              mutually agreed in writing. Continuing an engagement after policy changes constitutes acceptance of the
              modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For questions about this Cancellation Policy or to submit a cancellation notice:
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
                Fair Treatment Guaranteed
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We believe in transparent, respectful business relationships. Our cancellation terms are designed to
                be fair to both parties while protecting the interests of all involved. If you have concerns about
                cancellation terms or procedures, please contact us to discuss your specific situation.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default CancellationPolicy;
