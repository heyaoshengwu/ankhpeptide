export type InquiryGrade = 'A' | 'B' | 'C';

export interface InquiryData {
  contactName: string;
  email: string;
  companyName?: string;
  phone?: string;
  country?: string;
  product?: string;
  quantity?: string;
  message?: string;
}

export interface GradeResult {
  grade: InquiryGrade;
  score: number;
  reasons: string[];
}

export interface GradeAction {
  grade: InquiryGrade;
  action: string;
  priority: 'high' | 'medium' | 'low';
  nextSteps: string[];
}

export function gradeInquiry(data: InquiryData): GradeResult {
  let score = 0;
  const reasons: string[] = [];

  // Company name scoring (0-30 points)
  if (data.companyName && data.companyName.trim().length > 0) {
    score += 20;
    if (data.companyName.trim().length >= 3) {
      score += 10;
    }
  } else {
    reasons.push('No company name provided');
  }

  // Product inquiry scoring (0-25 points)
  if (data.product && data.product.trim().length > 0) {
    score += 25;
    reasons.push('Product interest specified');
  } else {
    reasons.push('No specific product mentioned');
  }

  // Message quality scoring (0-25 points)
  if (data.message && data.message.trim().length > 0) {
    const messageLength = data.message.trim().length;
    score += 15;
    if (messageLength >= 30) {
      score += 10;
    }
    if (messageLength >= 100) {
      score += 5;
      reasons.push('Detailed inquiry message');
    }
  } else {
    reasons.push('No message provided');
  }

  // Quantity specified scoring (0-20 points)
  if (data.quantity && data.quantity.trim().length > 0) {
    score += 20;
    reasons.push('Quantity specified');
  }

  // Determine grade based on score
  let grade: InquiryGrade;
  if (score >= 70) {
    grade = 'A';
  } else if (score >= 40) {
    grade = 'B';
  } else {
    grade = 'C';
  }

  return { grade, score, reasons };
}

export function getGradeActions(grade: InquiryGrade): GradeAction {
  switch (grade) {
    case 'A':
      return {
        grade: 'A',
        action: 'Priority follow-up within 2 hours',
        priority: 'high',
        nextSteps: [
          'Send personalized response with product details',
          'Schedule call with sales team',
          'Prepare quote based on mentioned quantity',
          'Add to VIP customer list'
        ]
      };
    case 'B':
      return {
        grade: 'B',
        action: 'Standard follow-up within 24 hours',
        priority: 'medium',
        nextSteps: [
          'Send product catalog',
          'Response with answer to questions',
          'Add to regular nurture sequence',
          'Flag for potential upsell'
        ]
      };
    case 'C':
      return {
        grade: 'C',
        action: 'Automated response within 48 hours',
        priority: 'low',
        nextSteps: [
          'Send automated acknowledgment',
          'Include general product information',
          'Add to marketing list for newsletters',
          'Re-engage in 30 days if no response'
        ]
      };
  }
}
