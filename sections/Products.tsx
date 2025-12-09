import Card from "../components/Card";
import Link from "next/link";
import { Zap, Download, Shield, TrendingUp } from "lucide-react";

export default function Products() {
  const products = [
    {
      name: "AI E-commerce Boilerplate",
      price: 1997, // Proven psychological pricing
      description: "Complete AI storefront with recommendations, automated inventory & built-in funnels.",
      gradient: "from-blue-500 to-purple-600",
      icon: "🛒",
      idealFor: "E-commerce startups",
      deliveryTime: "Instant download",
      features: [
        "AI-powered product recommendations",
        "Automated inventory management", 
        "Built-in sales funnels",
        "Mobile-optimized design"
      ]
    },
    {
      name: "AI Workflow Automation", 
      price: 4947, // Odd pricing converts 8-12% better
      description: "Automate complex workflows and eliminate manual bottlenecks.",
      gradient: "from-green-500 to-teal-600",
      icon: "⚙️",
      idealFor: "Agencies/Enterprises",
      deliveryTime: "2-day setup",
      features: [
        "Custom workflow automation",
        "API integrations",
        "No-code configuration",
        "Real-time monitoring"
      ]
    },
    {
      name: "E-commerce Intelligence",
      price: 9747, // Strategic odd pricing
      description: "Predict trends, optimize pricing, and maximize LTV with predictive analytics.",
      gradient: "from-purple-500 to-pink-600", 
      icon: "📊",
      idealFor: "Data-driven teams",
      deliveryTime: "1-week deployment",
      features: [
        "Predictive analytics dashboard",
        "Pricing optimization",
        "Customer LTV forecasting",
        "Real-time insights"
      ]
    }
  ];

  const formatPrice = (price: number) => {
    // Remove .00 for cleaner pricing display
    return `$${price.toLocaleString('en-US')}`;
  };

  return (
    <section id="products" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Ready-to-Deploy Solutions
        </h2>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
          Battle-tested foundations to accelerate time-to-value.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Card key={index}>
            <div className="relative">
              {/* Product Header */}
              <div className={`bg-gradient-to-r \${product.gradient} text-white p-6 rounded-lg mb-4 shadow-lg`}>
                <div className="text-4xl mb-2">{product.icon}</div>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                </div>
              </div>

              {/* Ideal For Badge */}
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Ideal for: {product.idealFor}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {product.description}
              </p>
              
              {/* Features List */}
              <ul className="text-gray-700 space-y-2 text-sm mb-6">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Delivery Info */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <Download className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">{product.deliveryTime}</span>
              </div>

              {/* Primary CTA Button */}
              <div className="space-y-2">
                <Link 
                  href={`/payments?service=\${encodeURIComponent(product.name)}&amount=\${product.price}`}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-4 px-6 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Zap className="w-5 h-5" />
                  Buy Now - {formatPrice(product.price)}
                </Link>
                
                {/* Trust Signals */}
                <p className="text-xs text-gray-500 text-center">
                  <span className="font-semibold">Instant download</span> • 5 payment methods • Lifetime updates
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Trust Bar */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <div className="font-bold text-gray-900">Lifetime Updates</div>
              <div className="text-sm text-gray-600">Free forever</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <div className="font-bold text-gray-900">Production Ready</div>
              <div className="text-sm text-gray-600">Deploy in minutes</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Download className="w-8 h-8 text-purple-600" />
            <div>
              <div className="font-bold text-gray-900">Instant Access</div>
              <div className="text-sm text-gray-600">Download immediately</div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Urgency Element */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-700 font-medium">
          🔥 <span className="font-bold text-red-600">3 implementations spots available this week</span> — 
          All products include priority support
        </p>
      </div>
    </section>
  );
}
