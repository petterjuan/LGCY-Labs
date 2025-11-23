'use client';
import React, { memo, useMemo } from 'react';

interface QualifiedLead {
  email: string;
  budget: string;
  timeline: string;
  score: number;
}

interface QualifiedLeadDisplayProps {
  lead: QualifiedLead;
  onFollowUp: (lead: QualifiedLead) => void;
}

const QualifiedLeadDisplay: React.FC<QualifiedLeadDisplayProps> = ({ 
  lead, 
  onFollowUp 
}) => {
  const leadScoreColor = useMemo(() => {
    if (lead.score >= 85) return 'text-green-600';
    if (lead.score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  }, [lead.score]);

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{lead.email}</h3>
          <p className="text-sm text-gray-600">Budget: {lead.budget}</p>
          <p className="text-sm text-gray-600">Timeline: {lead.timeline}</p>
        </div>
        <div className={`text-lg font-bold ${leadScoreColor}`}>
          {lead.score}%
        </div>
      </div>
      <button
        onClick={() => onFollowUp(lead)}
        className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Follow Up
      </button>
    </div>
  );
};

export default memo(QualifiedLeadDisplay);
