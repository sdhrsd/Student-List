
const fs = require('fs');

var fetchStudentList = () => {
  try {
   var studentsString = fs.readFileSync('students-data.json');
   return JSON.parse(studentsString);
  }
  catch(e) {
    return [];
  }
}

var saveStudentList = (students) => {
  fs.writeFileSync('students-data.json',JSON.stringify(students));
}

var addStudent = (studentId,lastName,firstName,major) => {
  console.log('Adding new student');
  var students = fetchStudentList();
  var student = {
    studentId,
    lastName,
    firstName,
    major
  };

  var idAlreadyExists = students.filter((student) => {
  return student.studentId === studentId});

  if(idAlreadyExists.length === 0) {
    students.push(student);
    saveStudentList(students);
    return student;
  }
}

var getDetailsofStudent = (studentId) => {
  console.log('Getting details of student');
  var students = fetchStudentList();
  var studentFound = students.filter((student) => {
  return student.studentId === studentId});
  return studentFound[0];
}

var removeStudent = (studentId) => {
  console.log('Removing student');
  var students = fetchStudentList();

  var filteredStudentList = students.filter((student) => {
  return student.studentId !== studentId});
  saveStudentList(filteredStudentList);

  return students.length !== filteredStudentList.length;
}

var getAllStudents = () => {
  console.log('Getting all students');
  return fetchStudentList();
}

var printDetails = (student) => {
  console.log('--');
  console.log(`StudentId : ${student.studentId}`);
  console.log(`Last Name: ${student.lastName}`);
  console.log(`First Name : ${student.firstName}`);
  console.log(`Major : ${student.major}`);
}

module.exports = {
  addStudent,
  getDetailsofStudent,
  removeStudent,
  getAllStudents,
  printDetails
}
