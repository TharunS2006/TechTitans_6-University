import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IStudent extends Document {
  rollNumber: string;
  rollNo?: string;
  name: string;
  password: string;
  department?: string;
  cgpa?: number;
  attendance?: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const StudentSchema = new mongoose.Schema<IStudent>(
  {
    rollNumber: { type: String, required: true, unique: true },
    rollNo: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    department: String,
    cgpa: Number,
    attendance: String,
  },
  { timestamps: true }
);

StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

StudentSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
