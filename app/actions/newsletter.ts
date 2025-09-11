'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToNewsletter(email: string, lang: string) {
  let cleanEmail = '';
  
  try {
    if (!email) {
      return {
        success: false,
        error: 'Email is required'
      };
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return {
        success: false,
        error: 'Newsletter service not configured'
      };
    }

    if (!process.env.RESEND_AUDIENCE_ID) {
      console.error('RESEND_AUDIENCE_ID is not configured');
      return {
        success: false,
        error: 'Newsletter audience not configured'
      };
    }

    // Parse email to get first and last name (if provided in format: "First Last <email@example.com>")
    let firstName = '';
    let lastName = '';
    cleanEmail = email;

    const nameMatch = email.match(/^(.+?)\s*<(.+)>$/);
    if (nameMatch) {
      const fullName = nameMatch[1].trim();
      cleanEmail = nameMatch[2].trim();
      const nameParts = fullName.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }

    // Create contact in Resend
    console.log('Attempting to create Resend contact:', {
      email: cleanEmail,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      hasApiKey: !!process.env.RESEND_API_KEY
    });

    const contactResponse = await resend.contacts.create({
      email: cleanEmail,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    // Log full response including status code
    console.log('Resend API full response:', {
      response: contactResponse,
      responseType: typeof contactResponse,
      responseKeys: contactResponse ? Object.keys(contactResponse) : null,
      email: cleanEmail,
      audienceId: process.env.RESEND_AUDIENCE_ID
    });

    // Check if contact was actually created - Resend SDK returns {data, error} structure
    if (!contactResponse || contactResponse.error) {
      console.error('Resend contact creation failed:', {
        response: contactResponse,
        error: contactResponse?.error,
        fullResponse: JSON.stringify(contactResponse)
      });
      throw new Error(contactResponse?.error?.message || 'Failed to create contact in Resend');
    }

    // Check if we have valid data
    if (!contactResponse.data || !contactResponse.data.id) {
      console.error('Resend contact creation - no contact ID in response:', {
        response: contactResponse,
        data: contactResponse?.data,
        fullResponse: JSON.stringify(contactResponse)
      });
      throw new Error('Failed to create contact in Resend - no contact ID returned');
    }

    console.log(`Newsletter subscription successful for ${cleanEmail} (lang: ${lang || 'en'})`, {
      resendResponse: contactResponse,
      resendContactId: contactResponse.data.id
    });

    return {
      success: true,
      message: 'Successfully subscribed to newsletter',
      contact: {
        email: cleanEmail,
        resendId: contactResponse.data.id
      }
    };
  } catch (error) {
    // Log full error details to console
    console.error('Newsletter subscription error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      email: cleanEmail,
      lang,
      timestamp: new Date().toISOString()
    });
    
    // Check if it's a Resend API error for duplicate email
    if (error instanceof Error && error.message.includes('already exists')) {
      console.log(`Email already subscribed: ${cleanEmail}`);
      return {
        success: true,
        message: 'Email already subscribed',
        alreadySubscribed: true
      };
    }

    // Return error response with details
    return {
      success: false,
      error: 'Failed to subscribe to newsletter',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}