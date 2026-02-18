import React from "react";
import {  } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-300">
      
      {/* HEADER */}
      <section className="pt-32 pb-16 text-center border-b border-white/10 bg-navy-900/80">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-6"
        >
          <div className="flex justify-center mb-4">
            <ShieldCheck className="text-accent-cyan" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400">
            Effective Date: 1 March 2026
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-10 leading-relaxed">

          {/* INTRO */}
          <div>
            <p>
              PaperBuddy ERP ("we", "our", or "us") operates the PaperBuddy School ERP
              applications for Students, Teachers, Administrators, and Parents.
              We are committed to protecting your privacy and ensuring transparency
              in how we collect, use, and safeguard your data.
            </p>
          </div>

          {/* INFO WE COLLECT */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-white font-semibold mb-2">Personal Information</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Profile photo (optional)</li>
              <li>School and class details</li>
            </ul>

            <h3 className="text-white font-semibold mt-4 mb-2">Academic Data</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Attendance records</li>
              <li>Marks and results</li>
              <li>Assignments and submissions</li>
              <li>Performance analytics</li>
            </ul>

            <h3 className="text-white font-semibold mt-4 mb-2">Device & Usage Data</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Device type and OS version</li>
              <li>App usage logs</li>
              <li>Crash reports for performance improvement</li>
            </ul>
          </div>

          {/* HOW WE USE */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide and maintain ERP services</li>
              <li>Manage attendance, results, and academic records</li>
              <li>Enable communication between schools and users</li>
              <li>Improve app performance and user experience</li>
              <li>Provide customer support</li>
              <li>Ensure security and prevent misuse</li>
            </ul>
          </div>

          {/* DATA SHARING */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Data Sharing & Disclosure
            </h2>
            <p>
              We do <strong>not sell personal data</strong>. Data may be shared only with:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Authorized school administrators and teachers</li>
              <li>Service providers for hosting and analytics (under confidentiality)</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </div>

          {/* DATA SECURITY */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Secure cloud storage</li>
              <li>Role-based access control</li>
              <li>Regular security monitoring</li>
            </ul>
          </div>

          {/* DATA RETENTION */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Data Retention
            </h2>
            <p>
              We retain user data only as long as necessary to provide services
              or comply with legal obligations. Schools control student record
              retention policies.
            </p>
          </div>

          {/* CHILDREN PRIVACY */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Children's Privacy
            </h2>
            <p>
              PaperBuddy ERP is designed for educational institutions and may be
              used by students under 18. Data is collected only through schools
              and managed by authorized administrators.
            </p>
          </div>

          {/* USER RIGHTS */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Access your data</li>
              <li>Request corrections</li>
              <li>Request deletion through your school</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </div>

          {/* THIRD PARTY */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Third-Party Services
            </h2>
            <p>
              We may use trusted third-party services such as cloud hosting and
              analytics providers. These services follow strict data protection
              standards.
            </p>
          </div>

          {/* POLICY CHANGES */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will
              be posted on this page with a revised effective date.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Contact Us
            </h2>
            <p>If you have questions about this Privacy Policy:</p>
            <ul className="list-none mt-2 space-y-1">
              <li>Email: support@paperbuddy.in</li>
              <li>Phone: +91 97182 03533</li>
              <li>Location: Gurugram, Haryana, India</li>
            </ul>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-slate-500 text-sm">
        © 2026 PaperBuddy ERP. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;

