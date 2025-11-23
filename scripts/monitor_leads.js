const { getLeadStats } = require('../lib/storage/leads');

function monitorLeads() {
  const stats = getLeadStats();
  console.log('📊 LEAD DASHBOARD - ' + new Date().toISOString());
  console.log(`Total Leads: ${stats.total}`);
  console.log(`Qualified Leads: ${stats.qualified}`);
  console.log(`Conversion Rate: ${stats.conversionRate}%`);
  
  if (stats.qualified > 0) {
    console.log('🎯 ACTION: Follow up with qualified leads immediately!');
  }
  
  return stats;
}

// Export for testing
module.exports = { monitorLeads };

// Run if called directly
if (require.main === module) {
  monitorLeads();
}
