const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data
let patients = [];
let doctors = [
  { id: 1, name: "Dr. Sharma", specialization: "Cardiologist", experience: 10 },
  { id: 2, name: "Dr. Khan", specialization: "Neurologist", experience: 8 },
  { id: 3, name: "Dr. Mehta", specialization: "Orthopedic", experience: 12 }
];
let appointments = [];

// ====================== UI HOME PAGE ======================
app.get("/", (req, res) => {
  const patientCards = patients.length
    ? patients.map(p => `
      <div class="card small-card">
        <h3>${p.name}</h3>
        <p><strong>Age:</strong> ${p.age}</p>
        <p><strong>Gender:</strong> ${p.gender}</p>
        <p><strong>Disease:</strong> ${p.disease}</p>
      </div>
    `).join("")
    : `<p class="empty-msg">No patients added yet.</p>`;

  const doctorCards = doctors.length
    ? doctors.map(d => `
      <div class="card doctor-card">
        <div class="doctor-avatar">👨‍⚕️</div>
        <h3>${d.name}</h3>
        <p><strong>Specialization:</strong> ${d.specialization}</p>
        <p><strong>Experience:</strong> ${d.experience} years</p>
      </div>
    `).join("")
    : `<p class="empty-msg">No doctors added yet.</p>`;

  const appointmentCards = appointments.length
    ? appointments.map(a => `
      <div class="card small-card">
        <h3>Appointment #${a.id}</h3>
        <p><strong>Patient:</strong> ${a.patientName}</p>
        <p><strong>Doctor:</strong> ${a.doctorName}</p>
        <p><strong>Date:</strong> ${a.date}</p>
        <p><strong>Time:</strong> ${a.time}</p>
      </div>
    `).join("")
    : `<p class="empty-msg">No appointments booked yet.</p>`;

  const doctorOptions = doctors.map(d => `<option value="${d.id}">${d.name} - ${d.specialization}</option>`).join("");
  const patientOptions = patients.map(p => `<option value="${p.id}">${p.name}</option>`).join("");

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CityCare Hospital</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
      }

      body {
        background: #f4f7fb;
        color: #222;
      }

      .navbar {
        background: linear-gradient(90deg, #0f766e, #0ea5e9);
        color: white;
        padding: 18px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .navbar h1 {
        font-size: 28px;
      }

      .navbar p {
        font-size: 14px;
        opacity: 0.95;
      }

      .hero {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
        padding: 50px 40px;
        background: linear-gradient(135deg, #dbeafe, #ecfeff);
        flex-wrap: wrap;
      }

      .hero-text {
        flex: 1;
        min-width: 280px;
      }

      .hero-text h2 {
        font-size: 42px;
        color: #0f172a;
        margin-bottom: 15px;
      }

      .hero-text p {
        font-size: 18px;
        color: #334155;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .hero-badges {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .badge {
        background: white;
        color: #0f766e;
        padding: 10px 16px;
        border-radius: 999px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }

      .hero-image {
        flex: 1;
        min-width: 280px;
        display: flex;
        justify-content: center;
      }

      .hero-box {
        width: 100%;
        max-width: 420px;
        background: white;
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.12);
      }

      .hero-box h3 {
        margin-bottom: 15px;
        color: #0f766e;
      }

      .hero-box ul {
        padding-left: 20px;
        color: #334155;
        line-height: 1.9;
      }

      .container {
        width: 92%;
        max-width: 1200px;
        margin: 30px auto 50px;
      }

      .section {
        margin-bottom: 40px;
      }

      .section-title {
        font-size: 28px;
        margin-bottom: 20px;
        color: #0f172a;
        border-left: 6px solid #0ea5e9;
        padding-left: 12px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
      }

      .card {
        background: white;
        border-radius: 18px;
        padding: 20px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        transition: 0.25s ease;
      }

      .card:hover {
        transform: translateY(-4px);
      }

      .doctor-card {
        text-align: center;
      }

      .doctor-avatar {
        font-size: 42px;
        margin-bottom: 10px;
      }

      .card h3 {
        margin-bottom: 10px;
        color: #0f172a;
      }

      .card p {
        margin: 6px 0;
        color: #475569;
      }

      .forms {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
      }

      .form-box {
        background: white;
        padding: 22px;
        border-radius: 18px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      }

      .form-box h3 {
        margin-bottom: 16px;
        color: #0f766e;
      }

      form input,
      form select,
      form button {
        width: 100%;
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 10px;
        border: 1px solid #cbd5e1;
        font-size: 15px;
      }

      form input:focus,
      form select:focus {
        outline: none;
        border-color: #0ea5e9;
        box-shadow: 0 0 0 3px rgba(14,165,233,0.12);
      }

      form button {
        background: linear-gradient(90deg, #0f766e, #0ea5e9);
        color: white;
        border: none;
        cursor: pointer;
        font-weight: bold;
      }

      form button:hover {
        opacity: 0.95;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 15px;
        margin-top: 20px;
      }

      .stat-box {
        background: white;
        padding: 20px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      }

      .stat-box h2 {
        font-size: 34px;
        color: #0f766e;
      }

      .stat-box p {
        margin-top: 8px;
        color: #475569;
      }

      .empty-msg {
        color: #64748b;
        background: white;
        padding: 16px;
        border-radius: 12px;
      }

      .footer {
        text-align: center;
        padding: 18px;
        background: #0f172a;
        color: #cbd5e1;
      }

      @media (max-width: 700px) {
        .hero-text h2 {
          font-size: 30px;
        }

        .navbar {
          padding: 16px 20px;
        }

        .hero {
          padding: 35px 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="navbar">
      <div>
        <h1>🏥 CityCare Hospital</h1>
        <p>Single File Hospital Management System</p>
      </div>
      <div>
        <p>Emergency: +91 98765 43210</p>
      </div>
    </div>

    <section class="hero">
      <div class="hero-text">
        <h2>Better Care. Better Doctors. Better Health.</h2>
        <p>
          Manage patients, doctors and appointments from one simple hospital dashboard.
          This project is built using <strong>Node.js + Express</strong> and rendered from a single file.
        </p>
        <div class="hero-badges">
          <span class="badge">24x7 Emergency</span>
          <span class="badge">Expert Doctors</span>
          <span class="badge">Online Appointments</span>
        </div>

        <div class="stats">
          <div class="stat-box">
            <h2>${patients.length}</h2>
            <p>Total Patients</p>
          </div>
          <div class="stat-box">
            <h2>${doctors.length}</h2>
            <p>Total Doctors</p>
          </div>
          <div class="stat-box">
            <h2>${appointments.length}</h2>
            <p>Total Appointments</p>
          </div>
        </div>
      </div>

      <div class="hero-image">
        <div class="hero-box">
          <h3>Hospital Services</h3>
          <ul>
            <li>General Checkup</li>
            <li>Heart Specialist Consultation</li>
            <li>Neurology Department</li>
            <li>Orthopedic Treatment</li>
            <li>Emergency Care & ICU</li>
            <li>Appointment Booking System</li>
          </ul>
        </div>
      </div>
    </section>

    <div class="container">

      <section class="section">
        <h2 class="section-title">Add Data</h2>
        <div class="forms">

          <div class="form-box">
            <h3>Add Patient</h3>
            <form action="/patients" method="POST">
              <input type="text" name="name" placeholder="Patient Name" required />
              <input type="number" name="age" placeholder="Age" required />
              <select name="gender" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="disease" placeholder="Disease / Problem" required />
              <button type="submit">Add Patient</button>
            </form>
          </div>

          <div class="form-box">
            <h3>Add Doctor</h3>
            <form action="/doctors" method="POST">
              <input type="text" name="name" placeholder="Doctor Name" required />
              <input type="text" name="specialization" placeholder="Specialization" required />
              <input type="number" name="experience" placeholder="Experience (years)" required />
              <button type="submit">Add Doctor</button>
            </form>
          </div>

          <div class="form-box">
            <h3>Book Appointment</h3>
            <form action="/appointments" method="POST">
              <select name="patientId" required>
                <option value="">Select Patient</option>
                ${patientOptions}
              </select>

              <select name="doctorId" required>
                <option value="">Select Doctor</option>
                ${doctorOptions}
              </select>

              <input type="date" name="date" required />
              <input type="text" name="time" placeholder="e.g. 11:00 AM" required />
              <button type="submit">Book Appointment</button>
            </form>
          </div>

        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Our Doctors</h2>
        <div class="grid">
          ${doctorCards}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Patients</h2>
        <div class="grid">
          ${patientCards}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Appointments</h2>
        <div class="grid">
          ${appointmentCards}
        </div>
      </section>

    </div>

    <div class="footer">
      <p>© 2026 CityCare Hospital | Built with Node.js + Express</p>
    </div>
  </body>
  </html>
  `);
});

// ====================== PATIENT ROUTES ======================
app.post("/patients", (req, res) => {
  const { name, age, gender, disease } = req.body;

  if (!name || !age || !gender || !disease) {
    return res.status(400).send("All patient fields are required");
  }

  const newPatient = {
    id: patients.length + 1,
    name,
    age,
    gender,
    disease
  };

  patients.push(newPatient);
  res.redirect("/");
});

app.get("/patients", (req, res) => {
  res.json({
    success: true,
    total: patients.length,
    data: patients
  });
});

// ====================== DOCTOR ROUTES ======================
app.post("/doctors", (req, res) => {
  const { name, specialization, experience } = req.body;

  if (!name || !specialization || !experience) {
    return res.status(400).send("All doctor fields are required");
  }

  const newDoctor = {
    id: doctors.length + 1,
    name,
    specialization,
    experience
  };

  doctors.push(newDoctor);
  res.redirect("/");
});

app.get("/doctors", (req, res) => {
  res.json({
    success: true,
    total: doctors.length,
    data: doctors
  });
});

// ====================== APPOINTMENT ROUTES ======================
app.post("/appointments", (req, res) => {
  const { patientId, doctorId, date, time } = req.body;

  if (!patientId || !doctorId || !date || !time) {
    return res.status(400).send("All appointment fields are required");
  }

  const patient = patients.find(p => p.id === Number(patientId));
  const doctor = doctors.find(d => d.id === Number(doctorId));

  if (!patient) {
    return res.status(404).send("Patient not found");
  }

  if (!doctor) {
    return res.status(404).send("Doctor not found");
  }

  const newAppointment = {
    id: appointments.length + 1,
    patientId: patient.id,
    patientName: patient.name,
    doctorId: doctor.id,
    doctorName: doctor.name,
    date,
    time
  };

  appointments.push(newAppointment);
  res.redirect("/");
});

app.get("/appointments", (req, res) => {
  res.json({
    success: true,
    total: appointments.length,
    data: appointments
  });
});

// ====================== SERVER ======================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
