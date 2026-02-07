// Email notification service using Nodemailer
const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send appointment confirmation email
const sendAppointmentConfirmation = async (appointmentData) => {
  const { patientEmail, patientName, doctorName, date, time, reason } = appointmentData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: patientEmail,
    subject: '✅ Appointment Confirmed - Indhira Little Hearts',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .appointment-card { background: #f0f9ff; border-left: 4px solid #0284c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
          .label { font-weight: 600; color: #64748b; }
          .value { color: #0f172a; }
          .footer { text-align: center; padding: 20px; background: #f8fafc; color: #64748b; font-size: 14px; }
          .button { display: inline-block; background: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 Appointment Confirmed!</h1>
            <p>Indhira Little Hearts - Pediatric Clinic</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${patientName}</strong>,</p>
            <p>Your appointment has been successfully booked. We look forward to seeing you!</p>
            
            <div class="appointment-card">
              <h3 style="margin-top: 0; color: #0284c7;">📅 Appointment Details</h3>
              <div class="detail-row">
                <span class="label">Doctor:</span>
                <span class="value">${doctorName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date:</span>
                <span class="value">${new Date(date).toLocaleDateString()}</span>
              </div>
              <div class="detail-row">
                <span class="label">Time:</span>
                <span class="value">${time || 'As scheduled'}</span>
              </div>
              <div class="detail-row" style="border-bottom: none;">
                <span class="label">Reason:</span>
                <span class="value">${reason}</span>
              </div>
            </div>
            
            <p><strong>Important Reminders:</strong></p>
            <ul style="color: #64748b;">
              <li>Please arrive 10 minutes before your scheduled time</li>
              <li>Bring any relevant medical records or reports</li>
              <li>Don't forget your insurance card (if applicable)</li>
            </ul>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
              Need to reschedule? Please contact us at least 24 hours in advance.
            </p>
          </div>
          
          <div class="footer">
            <p><strong>Indhira Little Hearts</strong></p>
            <p>📞 Contact: +91-XXXXXXXXXX | 📧 Email: info@indhiralittlehearts.com</p>
            <p style="font-size: 12px; margin-top: 10px;">This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${patientEmail}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Send appointment reminder (24 hours before)
const sendAppointmentReminder = async (appointmentData) => {
  const { patientEmail, patientName, doctorName, date, time } = appointmentData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: patientEmail,
    subject: '⏰ Appointment Reminder - Tomorrow at Indhira Little Hearts',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .reminder-card { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; background: #f8fafc; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Appointment Reminder</h1>
          </div>
          
          <div class="content">
            <p>Hi <strong>${patientName}</strong>,</p>
            <p>This is a friendly reminder about your upcoming appointment:</p>
            
            <div class="reminder-card">
              <h3 style="margin-top: 0; color: #f59e0b;">📅 Tomorrow's Appointment</h3>
              <p><strong>Doctor:</strong> ${doctorName}</p>
              <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${time || 'As scheduled'}</p>
            </div>
            
            <p>We're looking forward to seeing you! Please arrive 10 minutes early.</p>
          </div>
          
          <div class="footer">
            <p><strong>Indhira Little Hearts</strong></p>
            <p>Need to cancel? Contact us at +91-XXXXXXXXXX</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Reminder email sent to ${patientEmail}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Reminder email failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendAppointmentConfirmation,
  sendAppointmentReminder
};
