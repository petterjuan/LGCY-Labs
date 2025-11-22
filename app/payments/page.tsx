import PaymentForm from '../../components/PaymentForm';

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LGCY Labs - Multiple Payment Options</h1>
          <p className="text-gray-600 mt-2">Choose your preferred payment method</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Venmo</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Cash App</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Crypto</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Gift Cards</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">PayPal</span>
          </div>
        </div>
        <PaymentForm />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>All payments are secure. You'll receive immediate email confirmation.</p>
          <p className="mt-1">Questions? Email petter2025us@outlook.com</p>
        </div>
      </div>
    </div>
  );
}
