import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="font-semibold">LGCY Labs</div>
          </div>
          <p className="text-gray-400">
            Building resilient, agentic AI systems that grow revenue and reduce operational risk.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Solutions</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a className="hover:text-white" href="#solutions">Reliability Engineering</a></li>
            <li><a className="hover:text-white" href="#solutions">Revenue-Focused AI</a></li>
            <li><a className="hover:text-white" href="#solutions">Scalable Architecture</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a className="hover:text-white" href="https://linkedin.com/in/juanpetter">LinkedIn</a></li>
            <li><a className="hover:text-white" href="https://github.com/petterjuan">GitHub</a></li>
            <li><a className="hover:text-white" href="https://huggingface.co/petterjuan">Hugging Face</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a className="hover:text-white" href="#">Privacy</a></li>
            <li><a className="hover:text-white" href="#">Terms</a></li>
            <li><a className="hover:text-white" href="#">Security</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} LGCY Labs. Building agentic systems, reliably.</p>
      </div>
    </footer>
  );
}
