/**
 * Email Notification Service for Annapurnabasecamp.org
 * Directs all booking queries and customer inquiries to: subhash.link123@gmail.com
 */

const TARGET_EMAIL = 'subhash.link123@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

export interface BookingEmailPayload {
  bookingCode: string;
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  tier: string;
  porterOption: string;
  groupSize: number;
  startDate: string;
  totalPrice: number;
  currency: string;
  heliReturn: boolean;
  gearRental: boolean;
  satelliteDevice: boolean;
  privateJeep: boolean;
  dietary?: string;
  specialRequests?: string;
  passportUrl?: string | null;
  insuranceUrl?: string | null;
}

export interface GeneralInquiryPayload {
  fullName: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  preferredSeason?: string;
}

export interface EmailSendResult {
  success: boolean;
  message: string;
}

/**
 * Sends an email notification when a booking / permit reservation is submitted on the website.
 */
export async function sendBookingNotificationEmail(
  data: BookingEmailPayload
): Promise<EmailSendResult> {
  const tierNames: Record<string, string> = {
    '3-star': '3-Star Alpine Explorer (Standard Teahouse)',
    '4-star': '4-Star Mountain Premier (Private 1:1 Porter)',
    '5-star': '5-Star Himalayan Sanctuary Luxury (Helicopter Descent)'
  };

  const payload = {
    _subject: `🏔️ New ABC Booking [${data.bookingCode}] - ${data.fullName} (${data.groupSize} Pax, ${data.currency} ${data.totalPrice.toLocaleString()})`,
    _replyto: data.email,
    _template: 'table',
    _captcha: 'false',
    
    // Formatted details for Gmail Table view
    'Booking Reference Code': data.bookingCode,
    'Lead Trekker Name': data.fullName,
    'Trekker Email': data.email,
    'Trekker Phone / WhatsApp': data.phone,
    'Nationality': data.nationality,
    'Selected Package Tier': tierNames[data.tier] || data.tier,
    'Group Size': `${data.groupSize} ${data.groupSize === 1 ? 'Trekker' : 'Trekkers'}`,
    'Trek Start Date': data.startDate,
    'Porter Arrangement': data.porterOption,
    'Estimated Total Price': `${data.currency} ${data.totalPrice.toLocaleString()}`,
    'Helicopter Return (4,130m to Pokhara)': data.heliReturn ? 'YES (Requested)' : 'No (Standard Trail Descent)',
    'Rental Gear Bundle': data.gearRental ? 'YES (-20°C Sleeping Bag + Down Jacket)' : 'No (Bringing Own Gear)',
    'Garmin InReach Satellite Device': data.satelliteDevice ? 'YES (SOS Satellite Messenger)' : 'No',
    'Private 4x4 Jeep Transfer': data.privateJeep ? 'YES (Private KTM/Pokhara Transfer)' : 'No',
    'Dietary Requirements': data.dietary || 'Standard Himalayan Full Board',
    'Special Requests / Custom Notes': data.specialRequests || 'None specified',
    'Passport Document Attached': data.passportUrl ? data.passportUrl : 'Not uploaded during checkout',
    'Insurance Document Attached': data.insuranceUrl ? data.insuranceUrl : 'Not uploaded during checkout',
    'Submission Date & Time': new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }) + ' (Nepal Time)',
    'Source Website': 'https://www.annapurnabasecamp.org'
  };

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log('[EmailService] Booking alert sent to', TARGET_EMAIL, result);

    return {
      success: true,
      message: 'Booking notification dispatched successfully.'
    };
  } catch (error) {
    console.error('[EmailService] Failed to send booking email:', error);
    // Return gracefully so customer reservation flow is never broken
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error'
    };
  }
}

/**
 * Sends an email notification when a general question / custom itinerary inquiry is submitted.
 */
export async function sendGeneralInquiryEmail(
  data: GeneralInquiryPayload
): Promise<EmailSendResult> {
  const payload = {
    _subject: `💬 New ABC Expedition Query: ${data.fullName} - "${data.topic}"`,
    _replyto: data.email,
    _template: 'table',
    _captcha: 'false',

    // Formatted details for Gmail Table view
    'Inquirer Name': data.fullName,
    'Reply-To Email': data.email,
    'Phone / WhatsApp': data.phone || 'Not provided',
    'Inquiry Subject / Topic': data.topic,
    'Preferred Travel Window': data.preferredSeason || 'Flexible',
    'Inquiry Message': data.message,
    'Submission Date & Time': new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }) + ' (Nepal Time)',
    'Source Website': 'https://www.annapurnabasecamp.org'
  };

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log('[EmailService] General inquiry alert sent to', TARGET_EMAIL, result);

    return {
      success: true,
      message: 'Inquiry dispatched to subhash.link123@gmail.com'
    };
  } catch (error) {
    console.error('[EmailService] Failed to send general inquiry email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error'
    };
  }
}
