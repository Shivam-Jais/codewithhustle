import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Shield, Mail } from "lucide-react";
import { useTheme } from "next-themes";

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─── Table of Contents ────────────────────────────────────────────────────────
const TOC_SECTIONS = [
  { id: "s1", label: "1. Introduction" },
  { id: "s2", label: "2. Information We Collect" },
  { id: "s3", label: "3. How We Use Your Information" },
  { id: "s4", label: "4. Data Storage and Security" },
  { id: "s5", label: "5. Third-Party Services" },
  { id: "s6", label: "6. Data Retention" },
  { id: "s7", label: "7. Account Deletion" },
  { id: "s8", label: "8. Children's Privacy" },
  { id: "s9", label: "9. Android Permissions" },
  { id: "s10", label: "10. Push Notifications" },
  { id: "s11", label: "11. Your Rights" },
  { id: "s12", label: "12. Changes to This Policy" },
  { id: "s13", label: "13. Contact Us" },
];

// ─── Reusable Section Heading ─────────────────────────────────────────────────
const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24 flex items-center gap-2 border-b border-border/40 pb-2"
  >
    {children}
  </h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base md:text-lg font-semibold text-foreground mt-6 mb-3">{children}</h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed mb-3 text-sm md:text-base">{children}</p>
);

// ─── Component ────────────────────────────────────────────────────────────────
const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky Nav ── */}
      <nav
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-2xl border-b border-border/40"
        aria-label="Page navigation"
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Back to portfolio"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-all border border-border/30"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 lg:py-24" aria-label="Privacy Policy header">
        {/* Ambient blobs */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest">
                <Shield size={12} />
                Legal · P-GYM App
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight mb-4"
            >
              Privacy{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Policy
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
              <span>
                <strong className="text-foreground">Last Updated:</strong> November 22, 2026
              </span>
              <span>·</span>
              <span>
                <strong className="text-foreground">App:</strong> P-GYM (com.SKJ.gymapp)
              </span>
              <span>·</span>
              <span>
                <strong className="text-foreground">Platform:</strong> Android (Google Play Store)
              </span>
            </motion.div>

            <motion.p variants={itemVariants} className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
              Developed and maintained by{" "}
              <strong className="text-foreground">Shivam Jaiswal</strong> (Individual Developer).
              Contact:{" "}
              <a
                href="mailto:shivamkujaiswal322@gmail.com"
                className="text-primary underline hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                <Mail size={12} />
                shivamkujaiswal322@gmail.com
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-10 pb-20 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-start">

            {/* ── Sidebar Table of Contents (desktop) ── */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block sticky top-24 bg-card border border-border/40 rounded-2xl p-5 self-start"
              aria-label="Table of contents"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                Contents
              </p>
              <nav>
                <ul className="space-y-1">
                  {TOC_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollTo(section.id)}
                        className="w-full text-left text-xs text-muted-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-lg hover:bg-primary/5"
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>

            {/* ── Policy Content ── */}
            <motion.article
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="min-w-0"
              aria-label="Privacy Policy content"
            >
              {/* ─ Section 1 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s1">1. Introduction</SectionHeading>
                <P>
                  P-GYM ("the App," "we," "our," "us") is a gym membership and fitness management application
                  developed and maintained by Shivam Jaiswal. This Privacy Policy describes how we collect, use,
                  store, and protect your personal information when you use the App.
                </P>
                <P>
                  By creating an account or using the App, you agree to the collection and use of information as
                  described in this policy. If you do not agree with this policy, please do not use the App.
                </P>
              </motion.div>

              {/* ─ Section 2 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s2">2. Information We Collect</SectionHeading>

                <SubHeading>2.1 Information You Provide Directly</SubHeading>
                <div className="overflow-x-auto rounded-xl border border-border/40 mb-5">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border/40">
                        <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Data</th>
                        <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">When Collected</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        ["Full Name", "Account registration, profile editing", "Display name in App, admin identification"],
                        ["Email Address", "Account registration", "Login credentials, password reset OTPs, account identification"],
                        ["Phone Number (optional)", "Profile editing", "Contact information for gym administration"],
                        ["Password", "Account registration, password change", "Authentication (stored as a salted bcrypt hash — never in plain text)"],
                        ["Profile Image", "Profile editing (uploaded via the App)", "Display photo in user profile and admin dashboard"],
                        ["Support Requests", "When you submit a support ticket", "Subject and message text to resolve your issue"],
                        ["Event Comments", "When you comment on gym events", "Display your comment on the event post (max 500 characters)"],
                      ].map(([data, when, purpose]) => (
                        <tr key={data} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{data}</td>
                          <td className="px-4 py-3 text-muted-foreground">{when}</td>
                          <td className="px-4 py-3 text-muted-foreground">{purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <SubHeading>2.2 Information Generated by the App</SubHeading>
                <div className="overflow-x-auto rounded-xl border border-border/40 mb-5">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border/40">
                        <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Data</th>
                        <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">When Generated</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        ["Subscription Records", "When you request or receive a gym membership plan", "Track plan type, status (Pending/Active/Expired), start date, expiry date, and renewal state"],
                        ["In-App Notifications", "When the admin sends announcements or your subscription status changes", "Display notification title, message, type, and read status"],
                        ["Event Likes", "When you like a gym event post", "Track which events you have liked"],
                      ].map(([data, when, purpose]) => (
                        <tr key={data} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{data}</td>
                          <td className="px-4 py-3 text-muted-foreground">{when}</td>
                          <td className="px-4 py-3 text-muted-foreground">{purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <SubHeading>2.3 Information Collected Automatically</SubHeading>
                <div className="overflow-x-auto rounded-xl border border-border/40 mb-5">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border/40">
                        <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Data</th>
                        <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">When Collected</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        ["FCM Device Tokens", "When you grant notification permissions", "Deliver push notifications to your specific device. Tokens are removed on logout and account deletion. Stale or invalid tokens are automatically cleaned."],
                        ["Account Timestamps", "Account creation and updates", "Record when your account was created (createdAt) and last modified (updatedAt)"],
                        ["App Version", "On each app launch", "Check whether a mandatory update is available on Google Play"],
                      ].map(([data, when, purpose]) => (
                        <tr key={data} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{data}</td>
                          <td className="px-4 py-3 text-muted-foreground">{when}</td>
                          <td className="px-4 py-3 text-muted-foreground">{purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <SubHeading>2.4 Information We Do NOT Collect</SubHeading>
                <ul className="space-y-2 mb-4">
                  {[
                    "Location data — The App does not request or access your GPS, fine location, or coarse location.",
                    "Contacts, call logs, or SMS — The App does not access your phone contacts, call history, or text messages.",
                    "Camera or microphone data — The App does not directly access your camera or microphone. The RECORD_AUDIO permission is declared by a dependency (expo-video) but is not actively used by the App for recording.",
                    "Browsing history or cookies — The App does not track your browsing activity.",
                    "Device identifiers (IMEI, advertising ID) — The App does not collect hardware identifiers or advertising IDs.",
                    "Analytics or behavioral tracking — The App does not use Firebase Analytics, Google Analytics, or any third-party analytics or tracking SDK.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ─ Section 3 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s3">3. How We Use Your Information</SectionHeading>
                <P>We use your information solely for the following purposes:</P>
                <ol className="space-y-2 mb-4 list-none">
                  {[
                    ["Authentication and Account Management", "To register your account, verify your identity during login, and process password resets via email OTP."],
                    ["Gym Membership Management", "To process subscription requests, track membership status (Pending, Active, Expiring Soon, Expired), and manage admin approvals."],
                    ["Push Notifications", "To send you subscription reminders (starting 7 days before expiry), membership activation confirmations, gym announcements, and event notifications via Firebase Cloud Messaging (FCM)."],
                    ["In-App Communication", "To display announcements, event posts, daily motivational thoughts, and support request status."],
                    ["Profile Display", "To show your name, profile image, and membership status within the App."],
                    ["App Updates", "To check for newer versions on Google Play and prompt you to update when required."],
                    ["Admin Operations", "To allow gym administrators to manage members, approve subscriptions, view support requests, and post announcements and events."],
                  ].map(([title, desc], i) => (
                    <li key={title} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 shrink-0 font-bold text-primary text-xs bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span>
                        <strong className="text-foreground">{title}</strong> — {desc}
                      </span>
                    </li>
                  ))}
                </ol>
              </motion.div>

              {/* ─ Section 4 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s4">4. Data Storage and Security</SectionHeading>

                <SubHeading>4.1 Where Your Data Is Stored</SubHeading>
                <div className="overflow-x-auto rounded-xl border border-border/40 mb-5">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border/40">
                        <th className="px-4 py-3 font-semibold text-foreground">Component</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Provider</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        ["Backend Server", "Render (render.com)", "Cloud-hosted Node.js + Express API server"],
                        ["Database", "MongoDB Atlas", "Cloud-hosted MongoDB database"],
                        ["Media Uploads", "Cloudinary (when configured) or local server storage", "Cloud-hosted image/video CDN, or server filesystem"],
                        ["Push Notifications", "Firebase Cloud Messaging (Google)", "Google Cloud infrastructure"],
                        ["Email Delivery", "Resend (resend.com)", "Resend's infrastructure for transactional emails"],
                      ].map(([comp, provider, location]) => (
                        <tr key={comp} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground">{comp}</td>
                          <td className="px-4 py-3 text-muted-foreground">{provider}</td>
                          <td className="px-4 py-3 text-muted-foreground">{location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <SubHeading>4.2 Security Measures</SubHeading>
                <ul className="space-y-2 mb-4">
                  {[
                    ["Password Hashing", "All passwords are hashed using bcrypt with a salt factor of 10 before storage. Plain-text passwords are never stored or logged."],
                    ["JWT Authentication", "API access is protected by JSON Web Tokens. Tokens are validated on every authenticated request."],
                    ["HTTPS", "All communication between the App and the backend server is encrypted via HTTPS/TLS."],
                    ["Helmet.js", "The backend uses Helmet.js to set secure HTTP headers."],
                    ["CORS Protection", "Cross-origin request restrictions are enforced on the backend."],
                    ["Input Validation", "All user inputs are validated and sanitized on the server side."],
                    ["OTP Security", "Password reset OTPs are 6-digit cryptographically random numbers, expire after 10 minutes, are single-use, and are rate-limited to one request per 60 seconds. OTPs are never returned in API error responses."],
                    ["FCM Token Hygiene", "Device tokens are removed on logout and account deletion. Invalid tokens are automatically pruned when push delivery fails."],
                    ["Password Field Exclusion", "The password field is excluded from all database queries by default (select: false) and is never returned in any API response."],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>
                        <strong className="text-foreground">{title}</strong> — {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ─ Section 5 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s5">5. Third-Party Services</SectionHeading>
                <P>
                  The App integrates with the following third-party services, each governed by their own privacy
                  policies:
                </P>
                <div className="overflow-x-auto rounded-xl border border-border/40 mb-4">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border/40">
                        <th className="px-4 py-3 font-semibold text-foreground">Service</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Purpose</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Data Shared</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Privacy Policy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        ["Firebase Cloud Messaging (FCM)", "Push notifications", "FCM device tokens (opaque strings identifying your device for notification delivery)", "https://policies.google.com/privacy", "Google Privacy Policy"],
                        ["Google Play In-App Updates", "App version checking", "App version and package name (queried locally via Google Play APIs on your device)", "https://policies.google.com/privacy", "Google Privacy Policy"],
                        ["MongoDB Atlas", "Database hosting", "All account and subscription data described in Section 2", "https://www.mongodb.com/legal/privacy-policy", "MongoDB Privacy Policy"],
                        ["Render", "Backend server hosting", "All data processed by the backend API", "https://render.com/privacy", "Render Privacy Policy"],
                        ["Resend", "Transactional email delivery", "Your email address and OTP email content (for password resets only)", "https://resend.com/legal/privacy-policy", "Resend Privacy Policy"],
                        ["Cloudinary (when configured)", "Image and video hosting", "Uploaded profile images and gym media files", "https://cloudinary.com/privacy", "Cloudinary Privacy Policy"],
                      ].map(([service, purpose, data, url, linkLabel]) => (
                        <tr key={service} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{service}</td>
                          <td className="px-4 py-3 text-muted-foreground">{purpose}</td>
                          <td className="px-4 py-3 text-muted-foreground">{data}</td>
                          <td className="px-4 py-3">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline hover:text-primary/80 transition-colors text-xs whitespace-nowrap"
                            >
                              {linkLabel}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4 text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> We do not sell, trade, or rent your personal
                  information to any third party. Data is shared with the services above only to the extent necessary
                  to operate the App's features.
                </div>
              </motion.div>

              {/* ─ Section 6 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s6">6. Data Retention</SectionHeading>
                <div className="overflow-x-auto rounded-xl border border-border/40 mb-4">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border/40">
                        <th className="px-4 py-3 font-semibold text-foreground">Data Type</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Retention Period</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        ["Active User Accounts", "Retained as long as your account is active"],
                        ["Deleted Accounts", "When a user confirms deletion through the in-app Delete Account button, the account and associated personal data are permanently deleted from the application database. FCM tokens are cleared and the device is unsubscribed from push notification topics."],
                        ["Password Reset OTPs", "Expire after 10 minutes. Used OTPs are marked as consumed. OTP records remain in the database for rate-limiting and audit purposes."],
                        ["In-App Notifications", "Retained until the account is deleted"],
                        ["Support Requests", "Retained for administrative record-keeping"],
                        ["Event Comments and Likes", "Retained as long as the associated event exists"],
                        ["Server Logs", "Render retains server logs according to their data retention policy. Backend request logs are transient and not permanently stored by the App."],
                      ].map(([type, period]) => (
                        <tr key={type} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap align-top">{type}</td>
                          <td className="px-4 py-3 text-muted-foreground">{period}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* ─ Section 7 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s7">7. Account Deletion</SectionHeading>

                <SubHeading>7.1 Self-Service Permanent Account Deletion</SubHeading>
                <P>
                  You can permanently delete your account at any time by using the Delete Account button in the App.
                  When you confirm account deletion:
                </P>
                <ul className="space-y-2 mb-4">
                  {[
                    "Your account record and associated personal data stored by the App are permanently deleted from the application's database.",
                    "Associated account data, including profile details and membership-related records, is deleted as part of the account deletion process.",
                    "Your FCM device tokens are cleared, and your device is unsubscribed from push notification topics — you will no longer receive push notifications for that account.",
                    "You are immediately logged out and cannot use the deleted account to log in again.",
                    "To use the App again, you may need to create a new account, subject to the App's registration requirements.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <SubHeading>7.2 Permanent Data Deletion</SubHeading>
                <P>
                  If you are unable to delete your account through the App, or believe some of your personal data
                  remains after deletion, contact us at{" "}
                  <a
                    href="mailto:shivamkujaiswal322@gmail.com"
                    className="text-primary underline hover:text-primary/80 transition-colors"
                  >
                    shivamkujaiswal322@gmail.com
                  </a>{" "}
                  with the subject line "Data Deletion Request" and include the email address associated with your
                  account. We will review and respond to your request.
                </P>

                <SubHeading>7.3 Admin Account Deletion</SubHeading>
                <P>
                  Gym administrators can delete user accounts through the admin dashboard. Admin deletion permanently
                  removes the user record from the database.
                </P>
              </motion.div>

              {/* ─ Section 8 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s8">8. Children's Privacy</SectionHeading>
                <P>
                  P-GYM is not intended for use by children under the age of <strong className="text-foreground">13</strong>. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us at the email address below, and we will take steps to remove that information.
                </P>
              </motion.div>

              {/* ─ Section 9 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s9">9. Android Permissions</SectionHeading>
                <P>The App declares the following Android permissions:</P>
                <div className="overflow-x-auto rounded-xl border border-border/40 mb-4">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border/40">
                        <th className="px-4 py-3 font-semibold text-foreground">Permission</th>
                        <th className="px-4 py-3 font-semibold text-foreground">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        ["INTERNET", "Required to communicate with the backend server and third-party services"],
                        ["VIBRATE", "Used for push notification vibration alerts"],
                        ["READ_EXTERNAL_STORAGE (Android 12 and below only)", "Used for selecting profile images from device storage"],
                        ["WRITE_EXTERNAL_STORAGE (Android 12 and below only)", "Used for saving uploaded media files locally"],
                        ["RECORD_AUDIO", "Declared by a video playback dependency (expo-video); not actively used by the App for recording"],
                        ["SYSTEM_ALERT_WINDOW", "Used by the development framework (Expo) for developer tools; not used in production builds"],
                      ].map(([permission, purpose]) => (
                        <tr key={permission} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-foreground font-medium whitespace-nowrap align-top">{permission}</td>
                          <td className="px-4 py-3 text-muted-foreground">{purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* ─ Section 10 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s10">10. Push Notifications</SectionHeading>
                <P>
                  The App uses <strong className="text-foreground">Firebase Cloud Messaging (FCM)</strong> to send
                  push notifications. You can manage notification preferences through your device's Android
                  notification settings for the P-GYM app.
                </P>
                <P>Types of notifications you may receive:</P>
                <ul className="space-y-2 mb-4">
                  {[
                    "Subscription reminders — Sent when your membership is approaching expiry (starting 7 days before, throttled to once every 12 hours).",
                    "Subscription activation — Sent when the gym admin activates or renews your membership.",
                    "Gym announcements — General announcements posted by the gym administration.",
                    "Event notifications — Notifications about new gym events.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <P>
                  Notifications are delivered only while your account is active. Deleting your account immediately
                  stops all push notifications for that account.
                </P>
              </motion.div>

              {/* ─ Section 11 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s11">11. Your Rights</SectionHeading>
                <P>
                  Depending on your jurisdiction, you may have the following rights regarding your personal data:
                </P>
                <ul className="space-y-2 mb-4">
                  {[
                    ["Access", "Request a copy of the personal data we hold about you."],
                    ["Correction", "Update or correct inaccurate personal information through the App's profile editing feature or by contacting us."],
                    ["Deletion", "Request permanent deletion of your personal data (see Section 7.2)."],
                    ["Account Deletion", "Permanently delete your account through the App (see Section 7.1)."],
                    ["Withdraw Consent", "Stop using the App at any time. Revoke notification permissions through your device settings."],
                  ].map(([right, desc]) => (
                    <li key={right} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>
                        <strong className="text-foreground">{right}</strong> — {desc}
                      </span>
                    </li>
                  ))}
                </ul>
                <P>
                  To exercise any of these rights, contact us at{" "}
                  <a
                    href="mailto:shivamkujaiswal322@gmail.com"
                    className="text-primary underline hover:text-primary/80 transition-colors"
                  >
                    shivamkujaiswal322@gmail.com
                  </a>
                  .
                </P>
              </motion.div>

              {/* ─ Section 12 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s12">12. Changes to This Privacy Policy</SectionHeading>
                <P>
                  We may update this Privacy Policy from time to time. Changes will be reflected by updating the
                  "Last Updated" date at the top of this document. If significant changes are made, we will notify
                  users through an in-app announcement. Continued use of the App after changes constitutes acceptance
                  of the updated policy.
                </P>
              </motion.div>

              {/* ─ Section 13 ─ */}
              <motion.div variants={itemVariants}>
                <SectionHeading id="s13">13. Contact Us</SectionHeading>
                <P>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or your personal
                  data, please contact:
                </P>
                <div className="bg-card border border-border/40 rounded-2xl p-6 inline-block mt-2">
                  <p className="font-semibold text-foreground mb-1">Shivam Jaiswal</p>
                  <a
                    href="mailto:shivamkujaiswal322@gmail.com"
                    className="text-primary underline hover:text-primary/80 transition-colors text-sm inline-flex items-center gap-1.5"
                  >
                    <Mail size={14} />
                    shivamkujaiswal322@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* ─ Footer note ─ */}
              <motion.div variants={itemVariants} className="mt-10 pt-6 border-t border-border/40">
                <p className="text-xs text-muted-foreground italic">
                  This Privacy Policy was created based on the actual implementation of the P-GYM application and
                  accurately reflects the data practices as of the date indicated above.
                </p>
              </motion.div>
            </motion.article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
