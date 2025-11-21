import Card from "../components/Card";

export default function Services() {
  return (
    <section id="services" className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Strategic Growth Partnerships</h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          For founders serious about technical excellence and accelerated growth.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Technical Growth Audit</h3>
            <div className="text-2xl font-bold text-primary mt-3">$7,500</div>
            <div className="text-sm text-green-600 font-semibold mt-1">Identifies $50K-$250K in immediate revenue opportunities</div>
            <div className="text-sm text-gray-600 mt-1">1-week comprehensive analysis</div>
          </div>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>✓ Pinpoint exact revenue leaks in your current systems</li>
            <li>✓ Performance bottlenecks costing you conversions</li>
            <li>✓ Security risks that could impact customer trust</li>
            <li>✓ Clear roadmap to 2-5x your automation ROI</li>
          </ul>
        </Card>

        <Card className="border-2 border-accent md:scale-105 shadow-lg relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-blue-900 px-4 py-1 rounded-full font-bold text-sm">MOST POPULAR</div>
          <div className="text-center mb-4 pt-4">
            <h3 className="text-2xl font-bold">Revenue-Generating AI System</h3>
            <div className="text-3xl font-bold text-primary mt-3">$47,500</div>
            <div className="text-sm text-green-600 font-semibold mt-1">Typically delivers $250K+ ROI within 6 months</div>
            <div className="text-sm text-gray-600 mt-1">4–6 week implementation</div>
          </div>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>✓ Custom AI agents that qualify leads & close deals automatically</li>
            <li>✓ End-to-end architecture that scales with your growth</li>
            <li>✓ 3 months of hands-on support & optimization</li>
            <li>✓ 90-day ROI guarantee</li>
          </ul>
        </Card>

        <Card>
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Fractional AI Leadership</h3>
            <div className="text-2xl font-bold text-primary mt-3">$12,500<span className="text-lg">/mo</span></div>
            <div className="text-sm text-green-600 font-semibold mt-1">Like having a world-class AI engineer on retainer</div>
            <div className="text-sm text-gray-600 mt-1">Ongoing strategic guidance</div>
          </div>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>✓ Weekly strategy sessions focused on revenue growth</li>
            <li>✓ Architecture decisions that prevent costly mistakes</li>
            <li>✓ Team mentoring to build internal AI capabilities</li>
            <li>✓ Priority access to emerging AI opportunities</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
