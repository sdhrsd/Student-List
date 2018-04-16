
const list = require('./students-list.js');
const yargs = require('yargs');
const _ = require('lodash');

const argv = yargs.command('add','Add a new student',{
  studentId : {
    describe: 'Unique student Id',
    demand: true,
    alias: 'i'
  },
  lastName : {
    describe: 'Last Name of Student',
    demand: true,
    alias: 'l'
  },
  firstName : {
    describe: 'First Name of Student',
    demand: true,
    alias: 'f'
  },
  major : {
    describe: 'Major of Student',
    demand: true,
    alias: 'm'
  }
})
.command('details','Details of a particular student',{
  studentId : {
    describe: 'Unique student Id',
    demand: true,
    alias: 'i'
  }
})
.command('remove','Remove a particular student',{
  studentId : {
    describe: 'Unique student Id',
    demand: true,
    alias: 'i'
  }
})
.command('list','List of all students.')
.help()
.argv;

var command = argv._[0];

if(command === 'add') {
    var student = list.addStudent(argv.studentId,argv.lastName,argv.firstName,argv.major);
    if(student) {
      console.log('Student Added');
      list.printDetails(student);
    }
    else {
      console.log('Student Id already in use.');
    }
}
else if(command === 'details') {
    var student = list.getDetailsofStudent(argv.studentId);
    if(student){
      console.log('Student Found');
      list.printDetails(student);
    }
    else {
      console.log('Student Id does not exist.');
    }
}
else if(command === 'remove') {
    var removedStudent = list.removeStudent(argv.studentId) ? console.log(`Sudent with id ${argv.studentId} removed.`) : console.log('SudentId does not exist');
}
else if(command === 'list') {
    var completeList = list.getAllStudents();
    if(completeList.length === 0) {
      console.log('No students in the list')
    }
    else {
    completeList.forEach((student) => {
      list.printDetails(student);
    });
  }
}
