import Card from "../components/Card";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      name: "Technical Growth Audit",
      price: 7500,
      description: "Identifies $50K-$250K in immediate revenue opportunities",
      duration: "1-week comprehensive analysis",
      features: [
        "Pinpoint exact revenue leaks in your current systems",
        "Performance bottlenecks costing you conversions",
        "Security risks that could impact customer trust",
        "Clear roadmap to 2-5x your automation ROI"
      ],
      popular: false
    },
    {
      name: "Revenue-Generating AI System",
      price: 47500,
      description: "Typically delivers $250K+ ROI within 6 months",
      duration: "4–6 week implementation",
      features: [
        "Custom AI agents that qualify leads & close deals automatically",
        "End-to-end architecture that scales with your growth",
        "3 months of hands-on support & optimization",
        "90-day ROI guarantee"
      ],
      popular: true
    },
    {
      name: "Fractional AI Leadership",
      price: 12500,
      description: "Like having a world-class AI engineer on retainer",
      duration: "Ongoing strategic guidance",
      features: [
        "Weekly strategy sessions focused on revenue growth",
        "Architecture decisions that prevent costly mistakes",
        "Team mentoring to build internal AI capabilities",
        "Priority access to emerging AI opportunities"
      ],
      popular: false
    }
  ];

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <section id="services" className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Strategic Growth Partnerships</h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          For founders serious about technical excellence and accelerated growth.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className={service.popular ? "border-2 border-accent md:scale-105 shadow-lg relative" : ""}>
            {service.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-blue-900 px-4 py-1 rounded-full font-bold text-sm">
                MOST POPULAR
              </div>
            )}
            
            <div className="text-center mb-4 pt-4">
              <h3 className="text-2xl font-bold">{service.name}</h3>
              <div className="text-3xl font-bold text-primary mt-3">
                {service.price === 12500 ? (
                  <>
                    {formatPrice(service.price)}<span className="text-lg">/mo</span>
                  </>
                ) : (
                  formatPrice(service.price)
                )}
              </div>
              <div className="text-sm text-green-600 font-semibold mt-1">{service.description}</div>
              <div className="text-sm text-gray-600 mt-1">{service.duration}</div>
            </div>

            <ul className="text-gray-700 space-y-2 text-sm mb-6">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex}>✓ {feature}</li>
              ))}
            </ul>

            {/* PAYMENT CTA BUTTON */}
            <div className="mt-6">
              <Link 
                href={`/payments?service=${encodeURIComponent(service.name)}&amount=${service.price}`}
                className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {service.price === 12500 ? 'Subscribe Now' : 'Get Started Now'}
              </Link>
              
              {service.price !== 12500 && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Secure payment • 5 methods available
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Payment Options */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Flexible Payment Options</h3>
          <p className="text-gray-600 mb-4">
            Accept Venmo, Cash App, Crypto, Gift Cards, or PayPal. No bank account required.
          </p>
          <Link 
            href="/payments"
            className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            View All Payment Methods
          </Link>
        </div>
      </div>
    </section>
  );
}
