import fs from 'fs/promises';
import path from 'path';

const LEADS_FILE = './data/leads.jsonl';

export async function saveLead(leadData: any) {
  try {
    await fs.mkdir('./data', { recursive: true });
    const lead = {
      id: `lead_${Date.now()}`,
      ...leadData,
      timestamp: new Date().toISOString(),
      source: 'website'
    };
    
    await fs.appendFile(LEADS_FILE, JSON.stringify(lead) + '\n');
    console.log('✅ LEAD CAPTURED:', lead.email, lead.budget);
    return lead;
  } catch (error) {
    console.error('❌ Failed to save lead:', error);
    return { ...leadData, stored: false, timestamp: new Date().toISOString() };
  }
}

export async function getRecentLeads() {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf8');
    return data.trim().split('\n').map(line => JSON.parse(line));
  } catch (error) {
    return [];
  }
}
