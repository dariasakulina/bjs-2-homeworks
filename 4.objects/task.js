function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.marks = [];
  this.subject = null;
}

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
};

Student.prototype.addMarks = function (...marksToAdd) {
  if (this.marks === undefined || this.excluded) {
    return;
  }
  this.marks.push(...marksToAdd);
};

Student.prototype.getAverage = function () {
  if (!this.marks.length) {
    return 0;
  }
  const total = this.marks.reduce((acc, mark) => acc + mark, 0);
  return total / this.marks.length;
};

Student.prototype.exclude = function (reason) {
  this.subject = undefined;
  this.marks = undefined;
  this.excluded = reason;
};

let student1 = new Student("Василиса", "женский", 19);
student1.setSubject("Algebra");
console.log(student1.getAverage());
student1.addMarks(4, 5, 4, 5);
console.log(student1.getAverage());
console.log(student1);

let student2 = new Student("Артём", "мужской", 25);
student2.setSubject("Geometry");
student2.exclude('плохая учёба');
console.log(student2);
