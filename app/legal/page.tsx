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
            <p>
              VAMINT is dedicated to providing a harassment-free experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of club members or event participants in any form.
            </p>
            <p>
              All communication should be appropriate for a technical audience including people of many different backgrounds. Technical disagreements are normal, but personal attacks are unacceptable. Be kind to other contributors.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display font-semibold text-xl text-text-primary">
              2. Privacy & Data Handling
            </h2>
            <p>
              When you submit applications, registrations, or contact logs via this portal, we collect details including your name, email, roll number, department, and academic year.
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
