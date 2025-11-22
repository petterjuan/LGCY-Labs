import Card from "../../components/Card";
import Link from "next/link";

export default function AuditPage() {
  const auditFeatures = [
    {
      icon: "🔍",
      title: "Architecture Health Check",
      description: "Why do POCs work but production deployments fail?",
      details: [
        "Identify scalability bottlenecks before they hit your biggest clients",
        "Spot missing observability that leaves you blind to outages", 
        "Uncover security gaps that enterprise buyers will flag"
      ]
    },
    {
      icon: "🛠️", 
      title: "Developer Experience Audit",
      description: "Are integration hurdles silently killing your deals?",
      details: [
        "Map the exact friction points that make developers abandon your API",
        "Benchmark your docs and SDKs against conversion-optimized standards",
        "Identify missing quick-start guides that cost you pilot conversions"
      ]
    },
    {
      icon: "🚀",
      title: "Reliability & Observability",
      description: "Where are the hidden single points of failure?",
      details: [
        "Pinpoint missing error handling that crashes customer integrations",
        "Identify monitoring gaps that leave you reacting to outages",
        "Uncover deployment risks that threaten your SLA commitments"
      ]
    }
  ];

  const deliverables = [
    "Revenue Leak Assessment - Where prospects drop off and why",
    "Integration Friction Score - How onboarding complexity costs you deals", 
    "Reliability Gap Analysis - Spot single points of failure before they fail",
    "Prioritized 1-Week Fix Plan - Exactly what to fix first with timeline and costs",
    "Cost-Benefit Analysis - See ROI before you commit"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Stop Revenue Leaks. Ship Faster. Scale Confidently.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100 leading-relaxed">
            We transform brittle AI prototypes into production-ready revenue engines. Stop fighting integration fires and start converting pilots into paying customers.
          </p>
          
          <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Technical Growth Audit</h2>
            <div className="text-4xl font-bold text-green-300">$7,500</div>
            <p className="text-blue-200 mt-2">Identifies $50K-$250K in immediate revenue opportunities</p>
            <p className="text-sm text-blue-300 mt-1">1-week comprehensive analysis</p>
            
            <div className="mt-6">
              <Link 
                href="/payments?service=Technical Growth Audit&amount=7500"
                className="inline-block bg-green-500 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
              >
                Book Your Revenue Recovery Audit
              </Link>
              <p className="text-sm text-blue-200 mt-2">Next available slot: This week • Limited to 3 audits per week</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {auditFeatures.map((feature, index) => (
            <Card key={index} className="bg-white border border-gray-200">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="text-gray-700 space-y-2">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="text-sm">• {detail}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included in Your Audit</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Uncover Your Hidden Revenue?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Typically Recovers 15-30% of Lost Revenue Within 30 Days
          </p>
          <Link 
            href="/payments?service=Technical Growth Audit&amount=7500"
            className="inline-block bg-green-500 text-white py-4 px-12 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
          >
            Book Your $7,500 Audit Now
          </Link>
          <p className="text-sm text-gray-400 mt-4">Limited to 3 audits per week • Enterprise-ready assessments</p>
        </div>
      </section>
    </div>
  );
}
