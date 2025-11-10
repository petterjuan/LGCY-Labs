import Card from "../components/Card";

export default function Solutions() {
  return (
    <section id="solutions" className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Engineering Excellence Framework</h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          Three pillars that ensure your product scales reliably while driving measurable revenue.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="bg-primary text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Reliability Engineering</h3>
          <p className="text-gray-600 mb-4">Self-healing infrastructure, anomaly detection with causal context, and disaster-proof runbooks automated by agents.</p>
          <ul className="text-gray-700 space-y-2">
            <li>AI-Powered Anomaly Detection</li>
            <li>Automated Self-Healing Systems</li>
            <li>Incident Prevention Framework</li>
          </ul>
        </Card>

        <Card>
          <div className="bg-primary text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Revenue-Focused AI</h3>
          <p className="text-gray-600 mb-4">Agents that qualify leads, optimize funnels, and automate the follow-up that actually closes deals.</p>
          <ul className="text-gray-700 space-y-2">
            <li>Lead Conversion Automation</li>
            <li>Funnel Optimization Agents</li>
            <li>ROI-Driven Deliverables</li>
          </ul>
        </Card>

        <Card>
          <div className="bg-primary text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Scalable Architecture</h3>
          <p className="text-gray-600 mb-4">Designs and implementations that grow with demand — cloud-native, cost-optimized, and microservice-first.</p>
          <ul className="text-gray-700 space-y-2">
            <li>Microservices Ready</li>
            <li>Cloud-Native Patterns</li>
            <li>Cost-Optimized Scaling</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
