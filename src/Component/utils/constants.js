
export const carouselImages = [
    './Images/slide3.jpg',
    './Images/slide2.jpg',
    './Images/slide1.jpg',
  ]

  const tableOptions = {
    filter: true, sort: true
  }
export const userTableColumns = [
  {
    name: "firstName + lastName",
    label: "Name", 
    options: tableOptions
  }
]

export const accountsAvailable = [
  {
      text: 'Faculty', 
      value: 2
  },
  {
      text: 'Administrator', 
      value: 2048
  },
  {
      text: 'Super Administrator', 
      value: 4096
  },
]

export const accountsAvailablePublic = [
  {
      text: 'Student', 
      value: 3
  },
  {
      text: 'Faculty', 
      value: 2
  },
  {
      text: 'Administrator', 
      value: 2048
  },
  {
      text: 'Super Administrator', 
      value: 4096
  },
]

export const schoolForms = [
  {
    name: 'SF1 (School Register)',
    value: 0
  },
  {
    name: 'SF2 (Learners Daily Class Attendance)',
    value: 1
  },
  {
    name: 'SF5 (Report on Promotion)',
    value: 2
  },
  {
    name: 'SF9 (Learner Progress Report Card / Form 138)',
    value: 3
  },
  {
    name: 'SF10 (Learners Permanent Academic Record / Form 137)',
    value: 4
  },
  {
    name: 'PDS (Personal Data Sheet)',
    value: 5
  },
]