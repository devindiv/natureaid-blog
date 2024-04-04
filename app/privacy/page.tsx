import Container from "@/components/ui/container";

export default function PrivacyPolicy() {
  return (
    <div className="text-slate-800">
      <Container>
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            <em>Last Updated: April 5, 2024</em>
          </p>
          <p className="mb-4">
            Thank you for visiting NatureAid. Your privacy is important to us.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website
            (natureaid.com) or subscribe to our newsletter. Please read this
            Privacy Policy carefully. If you do not agree with the terms of this
            Privacy Policy, please do not access the site or subscribe to our
            newsletter.
          </p>
          <h2 className="text-xl font-semibold mb-2">
            Collection of Information
          </h2>
          <p className="mb-4">
            We collect personal information that you provide to us when you
            subscribe to our newsletter. This information includs your email
            address.
          </p>
          <h2 className="text-xl font-semibold mb-2">Use of Information</h2>
          <p className="mb-4">
            The information we collect is used to send you our newsletter,
            updates, and promotional materials. We may also use your information
            to improve our products and services.
          </p>
          <h2 className="text-xl font-semibold mb-2">
            Disclosure of Information
          </h2>
          <p className="mb-4">
            We may disclose your information to third parties who assist us in
            operating our website, conducting our business, or servicing you. We
            may also disclose your information when we believe release is
            appropriate .
          </p>
          <h2 className="text-xl font-semibold mb-2">Security</h2>
          <p className="mb-4">
            We take reasonable measures to protect your information from
            unauthorized access, use, or disclosure. However, please be aware
            that no method of transmission over the internet, or method of
            electronic storage is 100% secure and we cannot guarantee its
            absolute security.
          </p>
          <h2 className="text-xl font-semibold mb-2">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We reserve the right to update or change our Privacy Policy at any
            time. Your continued use of the website or subscription to our
            newsletter after we post any modifications to the Privacy Policy on
            this page will constitute your acknowledgment of the modifications
            and your consent to abide and be bound by the modified Privacy
            Policy.
          </p>
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:contact@natureaid.com"
              className="text-primary hover:underline"
            >
              contact@natureaid.com
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
