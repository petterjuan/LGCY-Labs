export interface Lead {
  id: string;
  email: string;
  budget: string;
  timeline: string;
  challenge: string;
  qualified: boolean;
  createdAt: Date;
}

export const leads: Lead[] = [];

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
  const newLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}`,
    createdAt: new Date()
  };
  leads.push(newLead);
  console.log('💰 NEW QUALIFIED LEAD:', newLead);
  return newLead;
}

export function getQualifiedLeads(): Lead[] {
  return leads.filter(lead => lead.qualified && parseInt(lead.budget) >= 7500);
}

export function getLeadStats() {
  const total = leads.length;
  const qualified = getQualifiedLeads().length;
  return { total, qualified, conversionRate: total > 0 ? (qualified / total * 100).toFixed(1) : '0' };
}
