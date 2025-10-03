import Employee from "../models/Employee.js";

// Create employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, gender, languages, country, state, district } = req.body;
    const employee = new Employee({ name, email, mobile, gender, languages, country, state, district });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("country", "name")
      .populate("state", "name")
      .populate("district", "name");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, gender, languages, country, state, district } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, email, mobile, gender, languages, country, state, district },
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};
