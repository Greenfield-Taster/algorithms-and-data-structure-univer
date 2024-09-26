class Student {
  constructor(
    lastName,
    firstName,
    middleName,
    address,
    gradeAverage,
    gender,
    birthDate
  ) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.address = address;
    this.gradeAverage = gradeAverage;
    this.gender = gender;
    this.birthDate = new Date(birthDate);  
  }
}

class StudentHeap {
  constructor(students) {
    this.students = students;
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  countStudentsByMonth() {
    const studentsByMonth = new Map();
    this.months.forEach((month) => studentsByMonth.set(month, 0));

    this.students.forEach((student) => {
      const month = this.months[student.birthDate.getMonth()];
      studentsByMonth.set(month, studentsByMonth.get(month) + 1);
    });

    return studentsByMonth;
  }

  heapSortByMonth() {
    const studentsByMonth = this.countStudentsByMonth();
    const sortedMonths = Array.from(studentsByMonth.entries());

    sortedMonths.sort((a, b) => {
      if (a[1] !== b[1]) {
        return b[1] - a[1];  
      } else {
        return a[0].localeCompare(b[0]);  
      }
    });

    return sortedMonths;
  }
}

export { Student, StudentHeap };
