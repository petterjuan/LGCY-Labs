import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface LeadData {
  email: string;
  company: string;
  challenge: string;
  detectedTier: string;
  budget: string;
  timestamp: Date;
}

// Simple JSON file storage - completely free
const getLeadsFilePath = () => {
  return path.join(process.cwd(), 'data', 'leads.json');
};

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const readLeads = (): LeadData[] => {
  try {
    ensureDataDirectory();
    const filePath = getLeadsFilePath();
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
};

const writeLeads = (leads: LeadData[]) => {
  try {
    ensureDataDirectory();
    const filePath = getLeadsFilePath();
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error('Error writing leads:', error);
  }
};

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();
    
    // Validate required fields
    if (!leadData.email || !leadData.challenge) {
      return NextResponse.json(
        { success: false, message: 'Email and challenge are required' },
        { status: 400 }
      );
    }

    // Read existing leads
    const leads = readLeads();
    
    // Check for duplicate email
    const existingLead = leads.find(lead => lead.email === leadData.email);
    if (existingLead) {
      return NextResponse.json(
        { success: false, message: 'Lead already exists' },
        { status: 409 }
      );
    }

    // Add new lead
    leads.push({
      ...leadData,
      timestamp: new Date() // Ensure fresh timestamp
    });

    // Save leads
    writeLeads(leads);

    console.log('🎯 NEW LEAD CAPTURED:');
    console.log('   Email:', leadData.email);
    console.log('   Company:', leadData.company || 'Not provided');
    console.log('   Tier:', leadData.detectedTier);
    console.log('   Budget:', leadData.budget);
    console.log('   Timestamp:', new Date().toISOString());
    console.log('   --- END LEAD ---');

    return NextResponse.json({ 
      success: true, 
      message: 'Lead saved successfully',
      lead: leadData
    });

  } catch (error: any) {
    console.error('💥 Lead save error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save lead' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to view leads (for dashboard)
export async function GET() {
  try {
    const leads = readLeads();
    return NextResponse.json({ 
      success: true, 
      leads,
      count: leads.length 
    });
  } catch (error: any) {
    console.error('Error reading leads:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to read leads' },
      { status: 500 }
    );
  }
}
