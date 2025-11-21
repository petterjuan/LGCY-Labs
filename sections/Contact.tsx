import QualifierBot from '../components/QualifierBot';

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Get Your AI Technical Audit
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Chat with our AI qualifier to see if our agentic systems can solve your revenue challenges. 
          Qualified leads get a free technical audit with Juan.
        </p>
      </div>
      
      <QualifierBot />
      
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>Prefer email? Contact us directly at petter2025us@outlook.com</p>
      </div>
    </section>
  );
}
