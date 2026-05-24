import Container from "@/components/ui/container";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FAF8F2] text-[#1B2A22]">
      <Container>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Header */}
          <div className="border-b border-border pb-10 mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#2E7A52] font-semibold mb-4">
              Legal
            </p>

            <h1 className="font-editorial text-4xl md:text-6xl leading-[0.95] tracking-tight mb-6">
              Privacy Policy
            </h1>

            <p className="text-sm text-muted-foreground">
              Last updated: May 24, 2026
            </p>
          </div>

          {/* Intro */}
          <div className="space-y-6 text-[16px] leading-[1.9] text-muted-foreground">
            <p>
              NatureAid (“NatureAid”, “we”, “our”, or “us”) respects your
              privacy and is committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, store, disclose,
              and protect information when you visit or interact with our
              website, services, consultations, newsletters, or digital
              platforms.
            </p>

            <p>
              By using our website or services, you acknowledge that you have
              read and understood this Privacy Policy.
            </p>
          </div>

          {/* Sections */}
          <div className="mt-16 space-y-16">
            {/* Information We Collect */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">
                Information We Collect
              </h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>
                  We may collect personal and technical information including:
                </p>

                <ul className="list-disc pl-6 space-y-3">
                  <li>Name, email address, and contact information</li>
                  <li>Consultation requests and submitted messages</li>
                  <li>Newsletter subscription details</li>
                  <li>Device, browser, IP address, and usage analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>
                    Information voluntarily submitted through forms or email
                    communication
                  </li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">
                How We Use Your Information
              </h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>We may use collected information to:</p>

                <ul className="list-disc pl-6 space-y-3">
                  <li>Provide and improve our services and content</li>
                  <li>Respond to consultation requests and inquiries</li>
                  <li>Send newsletters or editorial updates</li>
                  <li>Analyze website performance and user behavior</li>
                  <li>Improve security and prevent abuse or fraud</li>
                  <li>Comply with legal and regulatory obligations</li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">
                Cookies & Analytics
              </h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>
                  We use cookies and similar technologies to improve website
                  functionality, analyze traffic, remember preferences, and
                  measure engagement.
                </p>

                <p>
                  Third-party analytics services such as Vercel Analytics,
                  Google Analytics, or similar providers may collect anonymous
                  usage information including browser type, operating system,
                  pages visited, and interaction data.
                </p>

                <p>
                  You can disable cookies through your browser settings, though
                  some website functionality may be affected.
                </p>
              </div>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">
                Legal Basis for Processing
              </h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>
                  Where applicable under privacy laws, we process personal data
                  based on:
                </p>

                <ul className="list-disc pl-6 space-y-3">
                  <li>Your consent</li>
                  <li>Performance of requested services</li>
                  <li>Legitimate business interests</li>
                  <li>Legal and regulatory compliance obligations</li>
                </ul>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">
                Data Sharing & Third Parties
              </h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>We do not sell your personal data.</p>

                <p>
                  We may share limited information with trusted service
                  providers and platforms that help us operate our website,
                  analytics, email communication, hosting infrastructure, and
                  consultation systems.
                </p>

                <p>
                  Information may also be disclosed if required by law,
                  regulation, legal process, or governmental request.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">Data Retention</h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>
                  We retain personal information only for as long as reasonably
                  necessary for operational, legal, security, and legitimate
                  business purposes.
                </p>

                <p>
                  You may request deletion of your personal information by
                  contacting us directly.
                </p>
              </div>
            </section>

            {/* Security */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">Data Security</h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>
                  We implement commercially reasonable technical and
                  organizational safeguards to protect your information.
                </p>

                <p>
                  However, no internet-based platform or storage system can be
                  guaranteed completely secure.
                </p>
              </div>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">Your Rights</h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>Depending on your jurisdiction, you may have rights to:</p>

                <ul className="list-disc pl-6 space-y-3">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of personal data</li>
                  <li>Withdraw consent for communications</li>
                  <li>Object to certain processing activities</li>
                </ul>

                <p>
                  To exercise these rights, please contact us using the details
                  below.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">
                Children's Privacy
              </h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>
                  Our services are not directed toward children under the age of
                  13. We do not knowingly collect personal information from
                  children.
                </p>
              </div>
            </section>

            {/* International */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">
                International Data Transfers
              </h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>
                  Your information may be processed and stored in jurisdictions
                  outside your local region where privacy laws may differ.
                </p>

                <p>
                  By using our services, you consent to such transfers where
                  legally permitted.
                </p>
              </div>
            </section>

            {/* Policy Changes */}
            <section>
              <h2 className="font-editorial text-3xl mb-6">
                Changes to This Policy
              </h2>

              <div className="space-y-5 text-[16px] leading-[1.9] text-muted-foreground">
                <p>
                  We may update this Privacy Policy periodically to reflect
                  operational, legal, or regulatory changes.
                </p>

                <p>
                  Updated versions will be posted on this page with the revised
                  effective date.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t border-border pt-12">
              <h2 className="font-editorial text-3xl mb-6">Contact Us</h2>

              <div className="space-y-4 text-[16px] leading-[1.9] text-muted-foreground">
                <p>
                  If you have questions regarding this Privacy Policy or your
                  personal information, you may contact us at:
                </p>

                <div className="rounded-2xl border border-border bg-white p-6">
                  <p className="font-medium text-foreground">NatureAid</p>

                  <p>contact@natureaid.in</p>

                  <p>Kolkata, West Bengal, India</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
