"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Agentic AI that prevents failures — and generates revenue
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100">
            We fuse enterprise-grade reliability engineering with revenue-focused automation to
            deliver AI systems that self-heal, optimize funnels, and scale predictably.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CTAButton href="#solutions" variant="solid">
              Explore Our Framework
            </CTAButton>
            <CTAButton href="#contact" variant="outline">
              Schedule Technical Audit
            </CTAButton>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
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
