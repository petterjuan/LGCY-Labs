import Card from "../components/Card";
import Link from "next/link";
import { CheckCircle, Clock, TrendingUp, Zap, Shield, Users } from "lucide-react";

export default function Services() {
  const services = [
    {
      name: "Technical Growth Audit",
      price: 7500,
      tagline: "Identifies \$50K-\$250K in immediate revenue opportunities",
      duration: "1-week comprehensive analysis",
      roi: "\$50K-\$250K",
      isPopular: true,
      urgency: "2 spots left this week",
      features: [
        "Pinpoint exact revenue leaks in your current systems",
        "Performance bottlenecks costing you conversions",
        "Security risks that could impact customer trust",
        "Clear roadmap to 2-5x your automation ROI"
      ],
      badge: "FASTEST ROI",
      badgeColor: "bg-green-500"
    },
    {
      name: "Revenue-Generating AI System",
      price: 47500,
      tagline: "Typically delivers \$250K+ ROI within 6 months",
      duration: "4–6 week implementation",
      roi: "\$250K+",
      isPopular: false,
      urgency: "Next availability: 2 weeks",
      features: [
        "Custom AI agents that qualify leads & close deals automatically",
        "End-to-end architecture that scales with your growth",
        "3 months of hands-on support & optimization",
        "90-day ROI guarantee"
      ],
      badge: "ENTERPRISE",
      badgeColor: "bg-blue-500"
    },
    {
      name: "Fractional AI Leadership",
      price: 12500,
      tagline: "Like having a world-class AI engineer on retainer",
      duration: "Ongoing strategic guidance",
      roi: "Continuous",
      recurring: "/mo",
      urgency: "1 spot available",
      features: [
        "Weekly strategy sessions focused on revenue growth",
        "Architecture decisions that prevent costly mistakes",
        "Team mentoring to build internal AI capabilities",
        "Priority access to emerging AI opportunities"
      ],
      badge: "STRATEGIC",
      badgeColor: "bg-purple-500"
    }
  ];

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US')}`;
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Strategic Growth Partnerships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For founders serious about technical excellence and accelerated growth.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">60+ successful deployments</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">8x average ROAS</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">90-day ROI guarantee</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`relative \${service.isPopular ? 'transform scale-105 z-10' : ''}`}
            >
              {service.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    MOST POPULAR ⭐
                  </span>
                </div>
              )}

              <Card>
                <div
                  className={`\${
                    service.isPopular
                      ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900'
                  } p-6 rounded-xl mb-4 shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 \${service.badgeColor} text-white rounded-full text-xs font-bold`}>
                      {service.badge}
                    </span>
                    {service.urgency && (
                      <span className="flex items-center gap-1 text-xs font-semibold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className={service.isPopular ? 'text-yellow-300' : 'text-red-600'}>
                          {service.urgency}
                        </span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        {formatPrice(service.price)}
                      </span>
                      {service.recurring && (
                        <span className="text-xl opacity-90">{service.recurring}</span>
                      )}
                    </div>
                    <div className={`text-sm font-semibold mt-1 \${service.isPopular ? 'text-green-300' : 'text-green-700'}`}>
                      Expected ROI: {service.roi}
                    </div>
                  </div>

                  <p className="text-sm opacity-90 mb-2">{service.tagline}</p>
                  <p className="text-xs opacity-75 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.duration}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/payments?service=\${encodeURIComponent(service.name)}&amount=\${service.price}`}
                  className={`block w-full py-4 px-6 rounded-lg font-bold text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105 \${
                    service.isPopular
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-500 hover:to-orange-500'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Get Started Now
                  </span>
                </Link>

                <p className="text-xs text-center text-gray-500 mt-3">
                  Secure payment • 5 methods available
                </p>
              </Card>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900">90-Day Guarantee</div>
              <div className="text-sm text-gray-600">Or full refund</div>
            </div>
            
            <div className="text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900">Fortune 500 Grade</div>
              <div className="text-sm text-gray-600">Enterprise reliability</div>
            </div>
            
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900">8x Avg ROAS</div>
              <div className="text-sm text-gray-600">Proven results</div>
            </div>
            
            <div className="text-center">
              <Clock className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900">Fast Delivery</div>
              <div className="text-sm text-gray-600">1-6 week launch</div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 font-semibold mb-4">
            Flexible Payment Options
          </p>
          <p className="text-gray-600">
            Accept Venmo, Cash App, Crypto, Gift Cards, or PayPal. No bank account required.
          </p>
          <Link
            href="/payments"
            className="inline-block mt-4 text-primary hover:text-secondary font-semibold underline"
          >
            View All Payment Methods
          </Link>
        </div>
      </div>
    </section>
  );
}