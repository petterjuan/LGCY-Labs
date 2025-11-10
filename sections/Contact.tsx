"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Ready to Build Revenue-Generating AI Systems?</h2>
        <p className="mt-4 text-gray-600 text-center">Let's design a roadmap that increases uptime and drives predictable revenue.</p>

        <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border rounded"
                placeholder="Your full name"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border rounded"
                placeholder="you@company.com"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Message</span>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 p-2 border rounded h-32"
                placeholder="Tell us about your project or the challenge you're facing"
              />
            </label>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              <a
                className="text-sm text-gray-600 underline"
                href="mailto:juan@lgcylabs.com"
              >
                Or email Juan directly
              </a>
            </div>

            {status === "success" && <p className="text-sm text-green-600">Thanks — we'll be in touch soon.</p>}
            {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again or email juan@lgcylabs.com.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
