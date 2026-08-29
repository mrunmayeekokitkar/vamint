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
            [ Policy & Standard ]
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary mb-6">
            Code of Conduct & Privacy
          </h1>
          <p className="text-base">
            Club rules for event participation, academic code submission, and personal data storage protocols.
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
                  VAMINT is committed to fostering an inclusive, welcoming, and harassment-free tech community. This Code of Conduct outlines expectations for all club members, core committee members, and participants across all physical and virtual platforms, including events, workshops, online communication channels, and code repositories.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Expected Behavior</h3>
                <p>
                  Members are expected to engage in a collaborative and respectful manner. Be kind, inclusive, supportive of others&apos; learning journeys, and open to feedback. Focus on constructive critiques of ideas rather than personal attacks or gatekeeping.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Unacceptable Behavior</h3>
                <p>
                  We do not tolerate harassment, bullying, discrimination, personal insults, public or private intimidation, or sexualized language/imagery. Plagiarism, academic dishonesty, and spamming community resources are strictly prohibited.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Reporting Process</h3>
                <p>
                  If you witness or experience unacceptable behavior, please report the incident immediately. You can reach out directly via our Gmail compose portal:{" "}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=vamintcommunity@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mustard-500 hover:underline"
                  >
                    Report Incident
                  </a>{" "}
                  {/* TODO: Add escalation contact / specific name of student lead or faculty advisor here */}
                  to notify the community leadership team. All reports will be handled confidentially.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Consequences</h3>
                <p>
                  Failure to comply with these guidelines may result in a formal warning, temporary suspension from activities, or permanent expulsion from the VAMINT community, as determined by the core leadership.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary text-sm uppercase font-mono tracking-wide mb-1">Acknowledgement Clause</h3>
                <p>
                  By submitting the membership form or the committee application form, you explicitly acknowledge, agree, and pledge to adhere to this Code of Conduct and all associated community guidelines.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display font-semibold text-xl text-text-primary">
              2. Privacy &amp; Data Handling
            </h2>
            <p>
              When you submit applications, registrations, or logs via this portal, we collect details including your name, email, contact number, department, and academic year.
            </p>
            <p>
              This data is utilized solely for recruitment profiling, workshop coordinating, and official club registry. We do not share your details with external advertising agencies or databases. Your information is deleted once you graduate or formally request removal.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display font-semibold text-xl text-text-primary">
              3. Repository Licensing
            </h2>
            <p>
              Unless explicitly specified otherwise, all software compiled by VAMINT developers during official sprints is licensed under the MIT Open Source License. Contributors retain original copyright but grant permissions for public campus compilations.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
