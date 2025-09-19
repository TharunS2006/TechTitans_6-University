import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const {
  MONGO_URI,
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_DB = "mydb",
  MONGO_CONNECT_RETRIES,
} = process.env;

let uri = MONGO_URI ?? "";
if (!uri && MONGO_USER && MONGO_PASS && MONGO_HOST) {
  uri = `mongodb+srv://${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(
    MONGO_PASS
  )}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;
}

if (!uri) {
  console.error("Provide MONGO_URI or MONGO_USER/MONGO_PASS/MONGO_HOST in .env");
  process.exit(1);
}

// --- added: retry connect helper with backoff and clearer logs ---
async function retryConnect(uri: string, maxRetries = Number(MONGO_CONNECT_RETRIES || 5)) {
  let attempt = 0;
  const baseDelay = 2000; // ms
  while (attempt <= maxRetries) {
    try {
      attempt++;
      console.log(`Mongo connect attempt ${attempt} / ${maxRetries + 1} -> ${uri.replace(/(\/\/[^:]+:)(.*?)(@)/, (_m, p1, _p2, p3) => `${p1}*****${p3}`)}`);
      // short serverSelectionTimeout so we fail fast on bad network
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log("Connected to MongoDB");
      return;
    } catch (err: any) {
      console.error(`Mongo connect failed (attempt ${attempt}):`, err?.message || err);
      if (attempt > maxRetries) {
        console.error("Exceeded maximum Mongo connect attempts.");
        // provide actionable hints
        console.error("\nTroubleshooting tips:");
        console.error("• Verify MONGO_URI / MONGO_USER / MONGO_PASS / MONGO_HOST values in backend/.env.");
        console.error("• If password contains special characters, ensure you used an encoded MONGO_URI or let the app encode MONGO_PASS.");
        console.error("• In MongoDB Atlas: ensure the cluster is running, the user exists, and Network Access includes your IP.");
        console.error("• Test connection using MongoDB Compass or `mongo` shell with the same connection string.");
        console.error("• Network issues (ECONNRESET) can be transient — try again or increase retries in env MONGO_CONNECT_RETRIES.");
        throw err;
      }
      // exponential backoff
      const delay = baseDelay * Math.pow(1.8, attempt - 1);
      console.log(`Retrying in ${Math.round(delay)}ms...`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

async function run() {
  // connect with retry/backoff for transient network hiccups
  await retryConnect(uri);

  // ensure model file registers model
  try { require("./models/Student"); } catch {}

  const Student = (mongoose.models as any).Student;
  if (!Student) {
    console.error("Student model not registered. Aborting seed.");
    await mongoose.disconnect();
    process.exit(1);
  }

  // Expanded list of test students
  const testStudents = [
    { roll: "TT21CS001", name: "Arjun Sharma", password: "testpassword", department: "Computer Science", cgpa: 8.7, attendance: "92%", subjects: [{name: "Algorithms", grade: "A"}, {name: "Data Structures", grade: "A-"}] },
    { roll: "TT21CS002", name: "Priya Singh", password: "testpassword2", department: "Computer Science", cgpa: 8.4, attendance: "90%", subjects: [{name: "DBMS", grade: "B+"}, {name: "OS", grade: "B"}] },
    { roll: "TT21EC001", name: "Rohit Verma", password: "testpassword3", department: "Electronics", cgpa: 7.8, attendance: "88%", subjects: [{name: "Signals", grade: "B+"}, {name: "VLSI", grade: "B"}] },
    { roll: "TT21ME001", name: "Sneha Rao", password: "mepass1", department: "Mechanical Engineering", cgpa: 7.2, attendance: "85%", subjects: [{name: "Thermodynamics", grade: "B"}, {name: "Robotics", grade: "B-"}] },
    { roll: "TT21CE001", name: "Karan Patel", password: "cepass1", department: "Civil Engineering", cgpa: 7.5, attendance: "89%", subjects: [{name: "Structural Analysis", grade: "B+"}] },
    { roll: "TT21EE001", name: "Ananya Gupta", password: "eepass1", department: "Electrical Engineering", cgpa: 8.0, attendance: "91%", subjects: [{name: "Power Systems", grade: "A-"}] },
    { roll: "TT21MB001", name: "Maya Iyer", password: "mbpass1", department: "Management", cgpa: 8.3, attendance: "93%", subjects: [{name: "Marketing", grade: "A"}, {name: "Finance", grade: "B+"}] },
    { roll: "TT21MD001", name: "Dr. Sunil Rao", password: "medpass1", department: "Medical Sciences", cgpa: 9.0, attendance: "95%", subjects: [{name: "Anatomy", grade: "A"}] },
    { roll: "TT21LAW001", name: "Arjun Mehta", password: "lawpass1", department: "Law", cgpa: 8.1, attendance: "90%", subjects: [{name: "Constitutional Law", grade: "A-"}] },
    { roll: "TT21DES001", name: "Neha Menon", password: "despass1", department: "Design", cgpa: 7.9, attendance: "87%", subjects: [{name: "UX Design", grade: "B+"}] },
    // add more entries if needed
  ];

  for (const s of testStudents) {
    try {
      const exists = await Student.findOne({ $or: [{ rollNo: s.roll }, { rollNumber: s.roll }] });
      if (exists) {
        // update non-sensitive fields (do not overwrite password)
        await Student.updateOne(
          { _id: exists._id },
          {
            $set: {
              name: s.name,
              department: s.department,
              cgpa: s.cgpa,
              attendance: s.attendance,
              subjects: s.subjects || [],
            },
          }
        );
        console.log("Updated:", s.roll);
      } else {
        // create new so pre-save hook hashes password
        await Student.create({
          rollNo: s.roll,
          rollNumber: s.roll,
          name: s.name,
          password: s.password,
          department: s.department,
          cgpa: s.cgpa,
          attendance: s.attendance,
          subjects: s.subjects || [],
        });
        console.log("Created:", s.roll);
      }
    } catch (err) {
      console.error("Error seeding", s.roll, err);
    }
  }

  await mongoose.disconnect();
  console.log("Seeding finished");
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
