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
            Agentic AI that prevents failures — and generates revenue
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100 leading-relaxed">
            We fuse enterprise-grade reliability engineering with revenue-focused automation to
            deliver AI systems that self-heal, optimize funnels, and scale predictably.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <CTAButton href="#solutions" variant="solid">
              Explore Our Framework
            </CTAButton>
            <CTAButton href="#contact" variant="outline">
              Schedule Technical Audit
            </CTAButton>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} viewport={{ once: true }}>
          <div className="mt-16 flex justify-center">
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
