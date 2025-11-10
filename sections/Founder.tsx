"use client";
import Image from "next/image";
import Card from "../components/Card";
import { motion } from "framer-motion";

export default function Founder() {
  return (
    <section id="founder" className="py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold">From Enterprise Reliability to Revenue-First AI</h2>
          </motion.div>
          <p className="mt-4 text-gray-600">
            Juan Petter cut his teeth at NetApp resolving complex system failures for Fortune 500 clients. He pairs that engineering rigor with hands-on revenue strategy to build AI that not only stays up — it earns.
          </p>

          <p className="mt-4 text-gray-600">
            His approach blends self-healing architecture, causal anomaly detection, and agentic automation that converts leads and accelerates onboarding — delivering measurable ROI in weeks, not months.
          </p>

          <div className="mt-6">
            <Card>
              <div className="italic text-gray-700">“We don’t believe automation should just reduce toil — it should increase predictability and revenue.” — Juan Petter</div>
            </Card>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-8 rounded-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">Proven Outcomes</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-green-100 text-green-600 p-3 rounded-lg mr-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div className="font-bold">8x ROAS</div>
                  <div className="text-sm text-gray-600">Omnichannel revenue experiments</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="currentColor" strokeWidth="2"/></svg>
                </div>
                <div>
                  <div className="font-bold">80% Automation</div>
                  <div className="text-sm text-gray-600">Reduction in manual follow-up</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-lg mr-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/></svg>
                </div>
                <div>
                  <div className="font-bold">99.9% Uptime</div>
                  <div className="text-sm text-gray-600">Enterprise reliability at scale</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-orange-100 text-orange-600 p-3 rounded-lg mr-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="currentColor" strokeWidth="2"/></svg>
                </div>
                <div>
                  <div className="font-bold">3x Acceleration</div>
                  <div className="text-sm text-gray-600">Client onboarding speed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
