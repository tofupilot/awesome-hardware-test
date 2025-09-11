import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, lang } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_AUDIENCE_ID) {
      console.error('RESEND_AUDIENCE_ID is not configured');
      return NextResponse.json(
        { error: 'Newsletter audience not configured' },
        { status: 500 }
      );
    }

    // Parse email to get first and last name (if provided in format: "First Last <email@example.com>")
    let firstName = '';
    let lastName = '';
    let cleanEmail = email;

    const nameMatch = email.match(/^(.+?)\s*<(.+)>$/);
    if (nameMatch) {
      const fullName = nameMatch[1].trim();
      cleanEmail = nameMatch[2].trim();
      const nameParts = fullName.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }

    // Create contact in Resend
    const contact = await resend.contacts.create({
      email: cleanEmail,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    console.log(`Newsletter subscription successful for ${cleanEmail} (lang: ${lang || 'en'})`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        contact: { email: cleanEmail }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Check if it's a Resend API error
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Email already subscribed',
          alreadySubscribed: true 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to subscribe to newsletter',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}