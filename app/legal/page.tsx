import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Legal() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[800px] mx-auto px-6 w-full font-sans text-sm text-text-secondary leading-relaxed">
        {/* Header */}
        <div className="mb-16">
          <div className="font-mono text-xs text-mint-500 uppercase tracking-wider mb-3">
            [ Policy &amp; Standard ]
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary mb-6">
            Code of Conduct &amp; Privacy
          </h1>
          <p className="text-base">
            Our community rules for events and online spaces, and how we handle the personal data you share with us.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="font-display font-semibold text-xl text-text-primary">
              1. Code of Conduct
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Purpose &amp; Scope</h3>
                <p>
                  VAMINT is committed to keeping the community inclusive, welcoming, and free from harassment. This Code of Conduct applies to all members, committee members, and participants, covering everything from in-person events and workshops to online channels and code repositories.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Expected Behavior</h3>
                <p>
                  Be kind, collaborative, and supportive. Engage constructively, respect others&apos; learning journeys, and give feedback on ideas rather than people. Everyone is at a different stage, and that&apos;s the point.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Unacceptable Behavior</h3>
                <p>
                  We do not tolerate harassment, bullying, discrimination, personal insults, intimidation of any kind, or sexualized language and imagery. Plagiarism, academic dishonesty, and spamming community spaces are also strictly off-limits.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Reporting Process</h3>
                <p>
                  If you witness or experience something that violates this Code of Conduct, please report it as soon as possible. You can reach the community leadership team directly via our Gmail compose portal:{" "}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=vamintcommunity@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mustard-500 hover:underline"
                  >
                    Report Incident
                  </a>{" "}
                  {/* TODO: Add escalation contact / specific name of student lead or faculty advisor here */}
                  All reports will be handled with confidentiality.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Consequences</h3>
                <p>
                  Violations may result in a formal warning, temporary suspension from activities, or permanent removal from the VAMINT community, depending on the nature and severity of the incident, as determined by the core leadership.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Acknowledgement</h3>
                <p>
                  By submitting a membership or committee application, you acknowledge and agree to follow this Code of Conduct and all associated community guidelines.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display font-semibold text-xl text-text-primary">
              2. Privacy &amp; Data Handling
            </h2>
            <p>
              When you submit applications or registrations through this site, we collect details including your name, email, contact number, department, and academic year.
            </p>
            <p>
              This information is used solely for recruitment, workshop coordination, and maintaining the club registry. We do not share your details with any external parties, and your data will be removed once you graduate or request deletion.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
