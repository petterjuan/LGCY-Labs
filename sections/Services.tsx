import Card from "../components/Card";

export default function Services() {
  return (
    <section id="services" className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Strategic Partnership Tiers</h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          For founders serious about technical excellence and accelerated growth.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Architecture Deep Audit</h3>
            <div className="text-2xl font-bold text-primary mt-2">$2,500</div>
            <div className="text-sm text-gray-600">1-week comprehensive review</div>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li>Full system architecture review</li>
            <li>Performance & scalability assessment</li>
            <li>Security & technical debt report</li>
          </ul>
        </Card>

        <Card>
          <div className="text-center mb-4 border-4 border-accent relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-blue-900 px-3 py-1 rounded-full font-bold">MOST POPULAR</div>
            <h3 className="text-2xl font-bold">Custom AI Application</h3>
            <div className="text-2xl font-bold text-primary mt-2">$20,000</div>
            <div className="text-sm text-gray-600">4–6 week development</div>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li>Custom model & agent development</li>
            <li>End-to-end architecture & infra</li>
            <li>3 months of support</li>
          </ul>
        </Card>

        <Card>
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">CTO-as-a-Service</h3>
            <div className="text-2xl font-bold text-primary mt-2">$5,000/mo</div>
            <div className="text-sm text-gray-600">Ongoing technical leadership</div>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li>Weekly strategy sessions</li>
            <li>Architecture decision support</li>
            <li>Hiring & team mentoring</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
