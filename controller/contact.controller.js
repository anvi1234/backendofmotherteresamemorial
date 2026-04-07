const nodemailer = require('nodemailer');

exports.contactHandler = async (req, res) => {
  try {
    const type = req.body.type;

    // ✅ Cloudinary file URL (if uploaded)
    const fileUrl = req.file ? req.file.path : '';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
      }
    });

    let htmlTemplate = '';

    // 🎯 Career Form
    if (type === 'career') {
      htmlTemplate = `
      <div style="font-family:Arial; max-width:600px; margin:auto; border:1px solid #ddd;">
        
        <div style="background:#000; color:#fff; padding:15px; text-align:center;">
          <h2>Mother Teresa Memorial School</h2>
        </div>

        <div style="background:#ffb606; padding:10px; text-align:center; font-weight:bold;">
          Career Enquiry
        </div>

        <div style="padding:20px;">
          <p><b>Name:</b> ${req.body.name}</p>
          <p><b>Email:</b> ${req.body.email}</p>
          <p><b>Phone:</b> ${req.body.phone}</p>
          <p><b>Position:</b> ${req.body.position}</p>

          ${fileUrl ? `<p><b>Resume:</b> <a href="${fileUrl}" target="_blank">View Resume</a></p>` : ''}
        </div>

      </div>
      `;
    }

    // 🎯 Education Form
    if (type === 'education') {
      htmlTemplate = `
      <div style="font-family:Arial; max-width:600px; margin:auto; border:1px solid #ddd;">
        
        <div style="background:#000; color:#fff; padding:15px; text-align:center;">
          <h2>Mother Teresa Memorial School</h2>
        </div>

        <div style="background:#ffb606; padding:10px; text-align:center; font-weight:bold;">
          Education Enquiry
        </div>

        <div style="padding:20px;">
          <p><b>Student Name:</b> ${req.body.studentName}</p>
          <p><b>Parent Name:</b> ${req.body.parentName}</p>
          <p><b>Email:</b> ${req.body.email}</p>
          <p><b>Phone:</b> ${req.body.phone}</p>
          <p><b>Class:</b> ${req.body.class}</p>
          <p><b>Message:</b> ${req.body.message}</p>
        </div>

      </div>
      `;
    }

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: type === 'career' ? 'Career Enquiry' : 'Education Enquiry',
      html: htmlTemplate
    });

    res.json({ message: 'Email sent successfully' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error sending email' });
  }
};