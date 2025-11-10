"use client";
import Image from "next/image";
import Card from "../components/Card";
import { motion } from "framer-motion";

export default function Founder() {
  return (
    <section id="founder" className="py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
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
              <div className="italic text-gray-700">"We don't believe automation should just reduce toil — it should increase predictability and revenue." — Juan Petter</div>
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
                <div className="bg-green-100 text-green-600 p-3 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                </div>
                <div>
                  <div className="font-bold">8x ROAS</div>
                  <div className="text-sm text-gray-600">Omnichannel revenue experiments</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                </div>
                <div>
                  <div className="font-bold">80% Automation</div>
                  <div className="text-sm text-gray-600">Reduction in manual follow-up</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <div>
                  <div className="font-bold">99.9% Uptime</div>
                  <div className="text-sm text-gray-600">Enterprise reliability at scale</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-orange-100 text-orange-600 p-3 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
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
