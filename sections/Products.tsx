import Card from "../components/Card";
import Link from "next/link";

export default function Products() {
  const products = [
    {
      name: "AI E-commerce Boilerplate",
      price: 1997, // $1,997
      description: "Complete AI storefront with recommendations, automated inventory & built-in funnels.",
      gradient: "from-blue-500 to-purple-600",
      features: ["AI-powered product recommendations", "Automated inventory management", "Built-in sales funnels", "Mobile-optimized design"]
    },
    {
      name: "AI Workflow Automation", 
      price: 4997, // $4,997
      description: "Automate complex workflows and eliminate manual bottlenecks.",
      gradient: "from-green-500 to-teal-600",
      features: ["Custom workflow automation", "API integrations", "No-code configuration", "Real-time monitoring"]
    },
    {
      name: "E-commerce Intelligence",
      price: 9997, // $9,997
      description: "Predict trends, optimize pricing, and maximize LTV with predictive analytics.",
      gradient: "from-purple-500 to-pink-600", 
      features: ["Predictive analytics dashboard", "Pricing optimization", "Customer LTV forecasting", "Real-time insights"]
    }
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ready-to-Deploy Solutions</h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          Battle-tested foundations to accelerate time-to-value.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card key={index}>
            <div className={`bg-gradient-to-r ${product.gradient} text-white p-3 rounded mb-4`}>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <div className="text-2xl font-bold mt-2">{formatPrice(product.price)}</div>
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <ul className="text-gray-700 space-y-2 text-sm mb-6">
              {product.features.map((feature, featureIndex) => (
                <li key={featureIndex}>✓ {feature}</li>
              ))}
            </ul>

            {/* PAYMENT CTA BUTTON */}
            <div className="mt-4">
              <Link 
                href={`/payments?service=${encodeURIComponent(product.name)}&amount=${product.price}`}
                className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Buy Now - {formatPrice(product.price)}
              </Link>
              <p className="text-xs text-gray-500 text-center mt-2">
                Instant download • 5 payment methods
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Digital Products Notice */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          All digital products include lifetime updates and support.
        </p>
      </div>
    </section>
  );
}
