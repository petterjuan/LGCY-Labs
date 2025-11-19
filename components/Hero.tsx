"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary text-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Stop Revenue Leaks with Self-Healing AI Systems
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100 leading-relaxed">
            Most AI automation fails silently, costing you customers and revenue. We build bulletproof agentic AI that not only prevents catastrophic failures — it actively identifies and captures missed revenue opportunities 24/7.
          </p>

          {/* Benefit Bullets */}
          <div className="mt-8 max-w-2xl mx-auto grid gap-3 text-left">
            <div className="flex items-center gap-3 text-blue-100">
              <span className="text-green-300">✓</span>
              <span>Prevent system failures before they impact customers</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100">
              <span className="text-green-300">✓</span>
              <span>Automatically recover 99.9% of abandoned carts and leads</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100">
              <span className="text-green-300">✓</span>
              <span>Deploy revenue-generating AI in weeks, not months</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <CTAButton href="#solutions" variant="solid">
              See How It Works
            </CTAButton>
            <CTAButton href="#contact" variant="outline">
              Get Free Revenue Analysis
            </CTAButton>
          </div>

          {/* Urgency Indicator */}
          <p className="mt-6 text-sm text-blue-200 opacity-80">
            🚀 Only 3 implementation spots available this month
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} viewport={{ once: true }}>
          <div className="mt-24 flex justify-center">
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <Image
                src="/images/hero.svg"
                alt="LGCY Labs hero graphic"
                width={1200}
                height={420}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
