"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"join" | "events" | "team">("join");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);
    fetchSubmissions();
  }, [router]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/join-submissions");
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-semibold text-3xl text-text-primary">
            Admin Dashboard
          </h1>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border-subtle">
          <button
            onClick={() => setActiveTab("join")}
            className={`pb-4 px-4 font-sans text-sm font-semibold transition-colors ${
              activeTab === "join"
                ? "text-mustard-500 border-b-2 border-mustard-500"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Join Submissions
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`pb-4 px-4 font-sans text-sm font-semibold transition-colors ${
              activeTab === "events"
                ? "text-mustard-500 border-b-2 border-mustard-500"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Manage Events
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`pb-4 px-4 font-sans text-sm font-semibold transition-colors ${
              activeTab === "team"
                ? "text-mustard-500 border-b-2 border-mustard-500"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Manage Team
          </button>
        </div>

        {/* Join Submissions Tab */}
        {activeTab === "join" && (
          <div>
            {loading ? (
              <p className="text-text-secondary">Loading submissions...</p>
            ) : submissions.length === 0 ? (
              <Card className="p-8 text-center text-text-secondary">
                No submissions yet
              </Card>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => (
                  <Card key={sub.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-display font-semibold text-lg text-text-primary">
                          {sub.name}
                        </h3>
                        <p className="font-mono text-xs text-text-secondary">
                          {sub.email} • {sub.rollNo}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-mustard-500">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-mono text-text-tertiary">Year:</span> {sub.year}</p>
                      <p><span className="font-mono text-text-tertiary">Branch:</span> {sub.branch}</p>
                      <p><span className="font-mono text-text-tertiary">Domains:</span> {sub.domains}</p>
                      <p><span className="font-mono text-text-tertiary">Reason:</span> {sub.reason}</p>
                      {sub.github && (
                        <p><span className="font-mono text-text-tertiary">GitHub:</span> {sub.github}</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <Card className="p-8 text-center">
            <p className="text-text-secondary mb-4">
              Event management coming soon
            </p>
            <p className="font-mono text-xs text-text-tertiary">
              // TODO(content): Implement event CRUD operations
            </p>
          </Card>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <Card className="p-8 text-center">
            <p className="text-text-secondary mb-4">
              Team management coming soon
            </p>
            <p className="font-mono text-xs text-text-tertiary">
              // TODO(content): Implement team CRUD operations
            </p>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
