export async function storeLead(data: any) {
  console.log('📥 Lead captured:', data);
  return { ...data, id: `lead_${Date.now()}`, stored: true };
}

export async function storePayment(data: any) {
  console.log('💰 Payment recorded:', data);
  return { ...data, id: `pay_${Date.now()}`, stored: true };
}
