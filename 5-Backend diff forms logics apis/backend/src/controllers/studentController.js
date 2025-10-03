import Student from "../models/Student.js";

// Add new student
export const createStudent = async (req, res) => {
  try {
    const { name, email, mobile, country, state, district, gender } = req.body;

    const student = new Student({
      name,
      email,
      mobile,
      country,
      state,
      district,
      gender,
    });

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};


// GET /api/students?page=1&limit=5&name=abc&email=test
export const getStudents = async (req, res) => {
  try {
    let { page = 1, limit = 5, name, email, mobile } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (mobile) filter.mobile = { $regex: mobile, $options: "i" };

    const total = await Student.countDocuments(filter);

    const students = await Student.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("country", "name")
      .populate("state", "name")
      .populate("district", "name");

    res.json({
      students,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, country, state, district, gender } = req.body;

    const updateData = { name, email, mobile, country, state, district, gender };

    const student = await Student.findByIdAndUpdate(id, updateData, { new: true });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
