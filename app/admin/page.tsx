"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_token", data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <h1 className="font-display font-semibold text-2xl text-text-primary mb-6 text-center">
            Admin Access
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-text-secondary uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <p className="font-mono text-xs text-error-500">{error}</p>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Verifying..." : "Access Dashboard"}
            </Button>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
