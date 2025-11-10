import Card from "../components/Card";

export default function Products() {
  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ready-to-Deploy Solutions</h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          Battle-tested foundations to accelerate time-to-value.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded mb-4">
            <h3 className="text-xl font-bold">AI E-commerce Boilerplate</h3>
            <div className="text-2xl font-bold mt-2">$299</div>
          </div>
          <p className="text-gray-600">Complete AI storefront with recommendations, automated inventory & built-in funnels.</p>
        </Card>

        <Card>
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-3 rounded mb-4">
            <h3 className="text-xl font-bold">AI Workflow Automation</h3>
            <div className="text-lg font-bold mt-2">Agencies & Enterprises</div>
          </div>
          <p className="text-gray-600">Automate complex workflows and eliminate manual bottlenecks.</p>
        </Card>

        <Card>
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3 rounded mb-4">
            <h3 className="text-xl font-bold">E-commerce Intelligence</h3>
            <div className="text-lg font-bold mt-2">Analytics Dashboard</div>
          </div>
          <p className="text-gray-600">Predict trends, optimize pricing, and maximize LTV with predictive analytics.</p>
        </Card>
      </div>
    </section>
  );
}
