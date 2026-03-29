import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-8 bg-white dark:bg-slate-800 rounded-xl border border-border p-8">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              AppHostFast ("we", "our", or "us") operates the AppHostFast service. This page informs you of our
              policies regarding the collection, use, and disclosure of personal data when you use our Service and the
              choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information Collection and Use</h2>
            <p className="text-muted-foreground mb-4">We collect several different types of information for various purposes to provide and improve our Service to you.</p>

            <h3 className="text-xl font-semibold mb-2">2.1 Account Information</h3>
            <p className="text-muted-foreground mb-4">
              We collect your email address, name, and password when you create an account. This information is used to
              authenticate your access to our service.
            </p>

            <h3 className="text-xl font-semibold mb-2">2.2 GitHub Integration</h3>
            <p className="text-muted-foreground">
              If you connect your GitHub account, we request access to your repositories to enable automatic deployments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
            <p className="text-muted-foreground">
              The security of your data is important to us but remember that no method of transmission over the Internet
              or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
              protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at: privacy@apphostfast.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
