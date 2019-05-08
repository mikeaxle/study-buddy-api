exports.Course = {
  name: 'Course',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string?',
    description: 'string?',
    image: 'string?',
    modules: 'Module[]'
  }
}

exports.Institution = {
  name: 'Institution',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string?',
    description: 'string?',
    image: 'string?',
    url: 'string?',
    courses: 'Course[]'
  }
}

exports.Module = {
  name: 'Module',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string?',
    description: 'string?',
    image: 'string?',
    papers: 'Paper[]'
  }
}

exports.Paper = {
  name: 'Paper',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string?',
    year: 'string?',
    description: 'string?',
    image: 'string?',
    sections: 'Section[]'
  }
}

exports.Question = {
  name: 'Question',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string?',
    type: 'string?',
    allocatedMarks: 'int',
    question: 'string?',
    answer: 'string?',
    explanation: 'string?',
    a: 'string?',
    b: 'string?',
    c: 'string?',
    d: 'string?',
    questionImage: 'string?',
    answerImage: 'string?',
    explanationImage: 'string?',
    aImage: 'string?',
    bImage: 'string?',
    cImage: 'string?',
    dImage: 'string?',
    question2: 'string?'
  }
}

exports.Section = {
  name: 'Section',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string?',
    allocatedMarks: 'int',
    nestedQuestions: 'Section[]',
    questions: 'Question[]'
  }
}

