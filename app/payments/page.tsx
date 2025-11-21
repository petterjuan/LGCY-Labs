import PaymentForm from '../../components/PaymentForm';

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LGCY Labs Payments</h1>
          <p className="text-gray-600 mt-2">Secure payment processing for our AI solutions</p>
        </div>
        <PaymentForm />
      </div>
    </div>
  );
}
