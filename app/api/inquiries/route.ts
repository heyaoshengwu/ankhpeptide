import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { gradeInquiry, getGradeActions, type InquiryGrade } from '@/lib/crm';
import { sendInquiryEmail } from '@/lib/email';

const inquirySchema = z.object({
  contactName: z.string().min(1).max(100),
  email: z.string().email(),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  product: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = inquirySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    const gradeResult = gradeInquiry(data);

    const gradeActions = getGradeActions(gradeResult.grade);

    try {
      const result = await sendInquiryEmail(data);
      if (!result.sent) {
        console.error('[inquiry] Email not sent (SMTP not configured)');
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inquiry: data,
            grade: gradeResult,
            actions: gradeActions,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      grade: gradeResult,
      actions: gradeActions,
    });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}