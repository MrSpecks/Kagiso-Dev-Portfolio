import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Shield, Eye } from "lucide-react";

const PrivacyPolicy = () => {
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
          <Lock className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>

        <p className="text-muted-foreground text-lg mb-2">
          Last Updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Shield className="h-4 w-4" />
          <span>Compliant with South Africa's Protection of Personal Information Act (POPIA)</span>
        </div>

        {/* Policy Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kagiso Mfusi ("we", "us", "our") is committed to protecting your personal information and respecting
              your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website, engage our services, or communicate with us. We comply with South Africa's
              Protection of Personal Information Act (POPIA) and other applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">1.1 Personal Information You Provide</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect personal information that you voluntarily provide when:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Contacting Us:</strong> Name, email address, phone number, company
                name, and any other information you choose to include in contact forms or email communications.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Engaging Our Services:</strong> Business information, project
                requirements, technical specifications, billing details, payment information, and any documentation
                provided for project execution.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Newsletter Subscription:</strong> Email address and communication
                preferences (if newsletter service is offered).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Project Collaboration:</strong> Technical information, system access
                credentials (encrypted), API keys, and other project-specific data necessary for service delivery.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Automatically Collected Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you visit our website, we may automatically collect certain information:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Usage Data:</strong> IP address, browser type, operating system,
                referring URLs, pages viewed, time spent on pages, access times, and dates.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Analytics Data:</strong> Website interaction data collected through
                Vercel Analytics to understand user behavior and improve website performance.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Device Information:</strong> Device type, unique device identifiers,
                mobile network information (when accessing via mobile).
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">1.3 Information We Do NOT Collect</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We explicitly do not collect:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                Sensitive personal information (race, health data, biometric data, religious beliefs, political opinions)
                unless absolutely necessary and explicitly consented to for specific project requirements.
              </li>
              <li className="leading-relaxed">
                Children's personal information (we do not knowingly collect information from individuals under 18).
              </li>
              <li className="leading-relaxed">
                Unnecessary personal information beyond what is required for service delivery.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use collected information for the following legitimate purposes:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Service Delivery:</strong> To provide, maintain, and improve our
                professional services including web development, AI solutions, and consulting.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Communication:</strong> To respond to inquiries, provide project
                updates, send service-related notifications, and maintain client relationships.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Project Management:</strong> To manage projects, coordinate
                deliverables, track milestones, and ensure successful project completion.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Billing and Payments:</strong> To process invoices, track payments,
                manage financial records, and fulfill contractual obligations.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Website Improvement:</strong> To analyze website usage, improve
                user experience, optimize performance, and develop new features.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Legal Compliance:</strong> To comply with legal obligations,
                enforce our terms and policies, and protect our rights and interests.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Marketing (with consent):</strong> To send occasional updates about
                services, industry insights, or relevant opportunities (you may opt out at any time).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Legal Basis for Processing (POPIA Compliance)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under POPIA, we process your personal information based on the following lawful grounds:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Consent:</strong> You have explicitly consented to processing for
                specific purposes (e.g., receiving marketing communications).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Contractual Necessity:</strong> Processing is necessary to perform
                our contractual obligations when providing services to you.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Legal Obligation:</strong> Processing is required to comply with
                South African laws and regulations.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Legitimate Interests:</strong> Processing is necessary for our
                legitimate business interests, provided these do not override your privacy rights.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Third-Party Services</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share limited information with trusted third-party service providers:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Vercel (Hosting & Analytics):</strong> Website hosting and analytics
                data (US-based service with international data transfer safeguards).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Email Service Providers:</strong> For sending project communications
                and service notifications (Outlook/Microsoft services).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Payment Processors:</strong> For secure payment processing when
                applicable (credit card information is never stored on our systems).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Cloud Storage Providers:</strong> For secure project file storage
                and backup (encrypted).
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All third-party providers are carefully selected and required to maintain appropriate security standards
              and confidentiality. We ensure they comply with POPIA or equivalent data protection standards.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 We Will NOT Sell Your Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              We will never sell, rent, or trade your personal information to third parties for marketing purposes.
              Your information is used solely for the purposes outlined in this policy.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Legal Disclosure</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may disclose your information if required by law to:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">Comply with court orders, subpoenas, or legal processes</li>
              <li className="leading-relaxed">Protect our rights, property, or safety</li>
              <li className="leading-relaxed">Investigate fraud, security issues, or illegal activities</li>
              <li className="leading-relaxed">Respond to government or regulatory requests</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As we use some international service providers (e.g., Vercel hosting in the US), your data may be
              transferred outside of South Africa. We ensure such transfers comply with POPIA Chapter 9 requirements:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                Transfers are only made to countries with adequate data protection laws or where appropriate safeguards
                are in place.
              </li>
              <li className="leading-relaxed">
                Service providers commit to protecting your data according to standards equivalent to POPIA.
              </li>
              <li className="leading-relaxed">
                We implement contractual protections (data processing agreements) with all international providers.
              </li>
              <li className="leading-relaxed">
                You have the right to object to international transfers; please contact us to discuss alternatives.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Storage and Security</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Security Measures</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Encryption:</strong> Data in transit is protected using SSL/TLS
                encryption (HTTPS). Sensitive data at rest is encrypted.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Access Controls:</strong> Strict access controls limit who can view
                or process personal information.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Secure Systems:</strong> Regular security updates, firewalls, and
                monitoring to prevent unauthorized access.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Password Protection:</strong> Strong password policies and multi-factor
                authentication where applicable.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Regular Backups:</strong> Encrypted backups to prevent data loss while
                maintaining security.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Data Retention</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain personal information only as long as necessary:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Active Projects:</strong> Throughout the project lifecycle and for
                90 days post-completion for support and warranty purposes.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Financial Records:</strong> Minimum 5 years as required by South
                African tax laws (SARS requirements).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Communications:</strong> Up to 3 years for business records and
                potential dispute resolution.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Marketing Data:</strong> Until you unsubscribe or request deletion.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              After retention periods expire, we securely delete or anonymize personal information unless legal
              obligations require longer retention.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Security Limitations</h3>
            <p className="text-muted-foreground leading-relaxed">
              While we implement robust security measures, no system is 100% secure. We cannot guarantee absolute
              security but commit to promptly notifying you of any data breaches as required by POPIA and taking
              immediate remedial action.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights Under POPIA</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under South Africa's Protection of Personal Information Act, you have the following rights:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Right to Access:</strong> Request access to your personal information
                we hold and receive a copy in a structured, commonly used format.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Right to Correction:</strong> Request correction of inaccurate,
                outdated, or incomplete personal information.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Right to Deletion:</strong> Request deletion of your personal
                information (subject to legal retention requirements).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Right to Object:</strong> Object to processing of your information
                for direct marketing or other purposes where we rely on legitimate interests.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Right to Restriction:</strong> Request restriction of processing
                in certain circumstances (e.g., while verifying accuracy).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Right to Data Portability:</strong> Receive your personal information
                in a portable format and transfer it to another service provider.
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Right to Withdraw Consent:</strong> Withdraw previously given consent
                at any time (does not affect lawfulness of prior processing).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Right to Complain:</strong> Lodge a complaint with the Information
                Regulator if you believe your privacy rights have been violated.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">How to Exercise Your Rights</h3>
            <p className="text-muted-foreground leading-relaxed">
              To exercise any of these rights, please submit a written request to
              <a href="mailto:kagisomfusi@outlook.com" className="text-primary hover:underline ml-1">
                kagisomfusi@outlook.com
              </a> with "POPIA Data Subject Request" in the subject line. We will respond within 30 days as required
              by law. There is no fee for reasonable requests, though we may charge for excessive or repetitive requests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking Technologies</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">8.1 What We Use</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our website uses minimal tracking technologies:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground">Essential Cookies:</strong> Required for website functionality,
                security, and user preferences (e.g., theme selection).
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Analytics Cookies:</strong> Vercel Analytics collects anonymous
                usage data to help us improve website performance (no personally identifiable information).
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Your Cookie Choices</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can control cookies through your browser settings. Most browsers allow you to refuse cookies or
              delete existing cookies. Note that disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal
              information from children. If you believe we have inadvertently collected information from a child, please
              contact us immediately so we can delete it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal
              requirements, or business operations. Material changes will be communicated via email to active clients
              or through prominent notice on our website. The "Last Updated" date at the top indicates when the policy
              was last revised. Your continued use of our services after policy changes constitutes acceptance of the
              updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information & Data Protection Officer</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For privacy-related questions, concerns, or to exercise your POPIA rights, contact:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg border border-border">
              <p className="text-foreground font-semibold mb-2">Kagiso Mfusi (Responsible Party)</p>
              <p className="text-muted-foreground mb-1">
                Email: <a href="mailto:kagisomfusi@outlook.com" className="text-primary hover:underline">
                  kagisomfusi@outlook.com
                </a>
              </p>
              <p className="text-muted-foreground mb-1">
                Phone: <a href="tel:+27696287623" className="text-primary hover:underline">+27 69 628 7623</a>
              </p>
              <p className="text-muted-foreground mb-3">Location: South Africa</p>
              <p className="text-muted-foreground text-sm">
                We will respond to all privacy inquiries within 30 days as required by POPIA.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Information Regulator Contact Details</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you believe your privacy rights have been violated, you may lodge a complaint with:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg border border-border">
              <p className="text-foreground font-semibold mb-2">Information Regulator (South Africa)</p>
              <p className="text-muted-foreground mb-1">
                Email: <a href="mailto:inforeg@justice.gov.za" className="text-primary hover:underline">
                  inforeg@justice.gov.za
                </a>
              </p>
              <p className="text-muted-foreground mb-1">
                Phone: <a href="tel:0123069400" className="text-primary hover:underline">012 406 4818</a>
              </p>
              <p className="text-muted-foreground mb-1">
                Website: <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer"
                           className="text-primary hover:underline">
                  www.inforegulator.org.za
                </a>
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Address: JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Transparency Commitment
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We believe in transparent data practices and treating your personal information with the utmost care
                and respect. Your privacy is not a negotiable commodity—it's a fundamental right we are committed to
                protecting. If you have any questions or concerns about how we handle your data, please don't hesitate
                to reach out.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
