
// GBU Master Data Structure
const establishedYear = 2000;
const totalStudents = 1000;
const totalFaculty = 100;
const intake = 60;
const credits = 160;
const maxDays = 10;
let naacId = 1;

export const GBU_SCHOOLS= [
  {
    id: 'soict',
    name: 'School of Information and Communication Technology',
    code: 'SoICT',
    dean: 'Dr. Rajesh Kumar',
    establishedYear,
    totalStudents,
    totalFaculty,
    departments: [
      {
        id: 'cse',
        name: 'Computer Science & Engineering',
        code: 'CSE',
        hod: 'Dr. Priya Sharma',
        programs: [
          {
            id: 'btech-cse',
            name: 'B.Tech in Computer Science & Engineering',
            code: 'BTECH-CSE',
            level: 'UG',
            duration: '4 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'AKTU',
            electivePools: ['AI/ML', 'Cybersecurity', 'Data Science']
          },
          {
            id: 'btech-cse-ai',
            name: 'B.Tech in CSE (Artificial Intelligence)',
            code: 'BTECH-CSE-AI',
            level: 'UG',
            duration: '4 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'AKTU',
            electivePools: ['Machine Learning', 'Deep Learning', 'Computer Vision']
          }
        ]
      },
      {
        id: 'ece',
        name: 'Electronics & Communication Engineering',
        code: 'ECE',
        hod: 'Dr. Amit Singh',
        programs: [
          {
            id: 'btech-ece',
            name: 'B.Tech in Electronics & Communication',
            code: 'BTECH-ECE',
            level: 'UG',
            duration: '4 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'AKTU',
            electivePools: ['VLSI', 'Communication Systems', 'Embedded Systems']
          }
        ]
      }
    ]
  },
  {
    id: 'soe',
    name: 'School of Engineering',
    code: 'SoE',
    dean: 'Dr. Sunita Verma',
    establishedYear,
    totalStudents,
    totalFaculty,
    departments: [
      {
        id: 'civil',
        name: 'Civil Engineering',
        code: 'CE',
        hod: 'Dr. Rakesh Gupta',
        programs: [
          {
            id: 'btech-civil',
            name: 'B.Tech in Civil Engineering',
            code: 'BTECH-CE',
            level: 'UG',
            duration: '4 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'AKTU',
            electivePools: ['Structural', 'Environmental', 'Transportation']
          }
        ]
      },
      {
        id: 'mechanical',
        name: 'Mechanical Engineering',
        code: 'ME',
        hod: 'Dr. Vik',
        programs: [
          {
            id: 'btech-mech',
            name: 'B.Tech in Mechanical Engineering',
            code: 'BTECH-ME',
            level: 'UG',
            duration: '4 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'AKTU',
            electivePools: ['Thermal', 'Design', 'Manufacturing']
          }
        ]
      }
    ]
  },
  {
    id: 'som',
    name: 'School of Management',
    code: 'SoM',
    dean: 'Dr. Neha Agarwal',
    establishedYear,
    totalStudents,
    totalFaculty,
    departments: [
      {
        id: 'mba',
        name: 'Master of Business Administration',
        code: 'MBA',
        hod: 'Dr. Rohit Malhotra',
        programs: [
          {
            id: 'mba-regular',
            name: 'Master of Business Administration',
            code: 'MBA',
            level: 'PG',
            duration: '2 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'GBU',
            electivePools: ['Finance', 'Marketing', 'HR', 'Operations']
          },
          {
            id: 'bba-mba',
            name: 'BBA+MBA Integrated',
            code: 'BBA-MBA',
            level: 'UG',
            duration: '5 Years',
            intake,
            type: 'Integrated',
            credits,
            affiliation: 'GBU',
            electivePools: ['Finance', 'Marketing', 'Entrepreneurship']
          }
        ]
      }
    ]
  },
  {
    id: 'sohss',
    name: 'School of Humanities & Social Sciences',
    code: 'SoHSS',
    dean: 'Dr. Kavita Joshi',
    establishedYear,
    totalStudents,
    totalFaculty,
    departments: [
      {
        id: 'psychology',
        name: 'Psychology',
        code: 'PSY',
        hod: 'Dr. Meera Tandon',
        programs: [
          {
            id: 'ba-psychology',
            name: 'B.A. in Psychology',
            code: 'BA-PSY',
            level: 'UG',
            duration: '3 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'GBU',
            electivePools: ['Clinical', 'Counseling', 'Organizational']
          }
        ]
      },
      {
        id: 'political-science',
        name: 'Political Science',
        code: 'PS',
        hod: 'Dr. Arun Kumar',
        programs: [
          {
            id: 'ba-political-science',
            name: 'B.A. in Political Science',
            code: 'BA-PS',
            level: 'UG',
            duration: '3 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'GBU',
            electivePools: ['International Relations', 'Public Administration', 'Political Theory']
          }
        ]
      }
    ]
  },
  {
    id: 'sobsc',
    name: 'School of Buddhist Studies and Civilization',
    code: 'SoBSC',
    dean: 'Dr. Tenzin Norbu',
    establishedYear,
    totalStudents,
    totalFaculty,
    departments: [
      {
        id: 'buddhist-studies',
        name: 'Buddhist Studies',
        code: 'BS',
        hod: 'Dr. Lobsang Tenzin',
        programs: [
          {
            id: 'phd-buddhist-studies',
            name: 'Ph.D. in Buddhist Studies',
            code: 'PHD-BS',
            level: 'PhD',
            duration: '3-5 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'GBU',
            electivePools: ['Philosophy', 'History', 'Literature']
          }
        ]
      }
    ]
  },
  {
    id: 'sobt',
    name: 'School of Biotechnology',
    code: 'SoBT',
    dean: 'Dr. Sanjay Mishra',
    establishedYear,
    totalStudents,
    totalFaculty,
    departments: [
      {
        id: 'biotechnology',
        name: 'Biotechnology',
        code: 'BT',
        hod: 'Dr. Ritu Sharma',
        programs: [
          {
            id: 'btech-biotech',
            name: 'B.Tech in Biotechnology',
            code: 'BTECH-BT',
            level: 'UG',
            duration: '4 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'AKTU',
            electivePools: ['Medical', 'Agricultural', 'Industrial']
          }
        ]
      }
    ]
  },
  {
    id: 'soljg',
    name: 'School of Law, Justice & Governance',
    code: 'SoLJG',
    dean: 'Dr. Deepak Agarwal',
    establishedYear,
    totalStudents,
    totalFaculty,
    departments: [
      {
        id: 'law',
        name: 'Law',
        code: 'LAW',
        hod: 'Dr. Priyanka Singh',
        programs: [
          {
            id: 'ba-llb',
            name: 'B.A. LL.B.',
            code: 'BA-LLB',
            level: 'UG',
            duration: '5 Years',
            intake,
            type: 'Integrated',
            credits,
            affiliation: 'BCI',
            electivePools: ['Corporate Law', 'Criminal Law', 'Constitutional Law']
          }
        ]
      }
    ]
  },
  {
    id: 'sovsas',
    name: 'School of Vocational Studies & Applied Sciences',
    code: 'SoVSAS',
    dean: 'Dr. Anita Kumari',
    establishedYear,
    totalStudents,
    totalFaculty,
    departments: [
      {
        id: 'commerce',
        name: 'Commerce',
        code: 'COM',
        hod: 'Dr. Suresh Chand',
        programs: [
          {
            id: 'bcom',
            name: 'B.Com',
            code: 'BCOM',
            level: 'UG',
            duration: '3 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'GBU',
            electivePools: ['Accounting', 'Finance', 'Taxation']
          },
          {
            id: 'bca',
            name: 'Bachelor of Computer Applications',
            code: 'BCA',
            level: 'UG',
            duration: '3 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'GBU',
            electivePools: ['Web Development', 'Database', 'Software Engineering']
          }
        ]
      }
    ]
  },
  {
    id: 'soet',
    name: 'School of Education & Training',
    code: 'SoET',
    dean: 'Dr. Vijay Kumar',
    establishedYear,
    totalStudents,
    totalFaculty,
    departments: [
      {
        id: 'education',
        name: 'Education',
        code: 'EDU',
        hod: 'Dr. Sunita Devi',
        programs: [
          {
            id: 'bed',
            name: 'Bachelor of Education',
            code: 'BED',
            level: 'UG',
            duration: '2 Years',
            intake,
            type: 'Regular',
            credits,
            affiliation: 'NCTE',
            electivePools: ['Pedagogy', 'Educational Psychology', 'Curriculum Studies']
          }
        ]
      }
    ]
  }
];

export const LEAVE_TYPES = [
  { id: 'cl', name: 'Casual Leave', maxDays },
  { id: 'dl', name: 'Duty Leave', maxDays },
  { id: 'el', name: 'Earned Leave', maxDays },
  { id: 'al', name: 'Academic Leave', maxDays },
  { id: 'maternity', name: 'Maternity Leave', maxDays },
  { id: 'paternity', name: 'Paternity Leave', maxDays },
  { id: 'fdp', name: 'FDP Leave', maxDays },
  { id: 'research', name: 'Research Visit', maxDays }
];

export const GRIEVANCE_CATEGORIES = [
  'Academic',
  'Facility',
  'Disciplinary',
  'Administrative',
  'Hostel',
  'Library',
  'Examination',
  'Financial'
];

export const FILE_CATEGORIES = [
  'School Circulars',
  'Admissions',
  'Research Projects',
  'Council Minutes',
  'Leave Applications',
  'Course Approvals',
  'Grievance Files',
  'Administrative Orders'
];

export const NAAC_CRITERIA = [
  { id: naacId++, name: 'Curricular Aspects' },
  { id: naacId++, name: 'Teaching-Learning and Evaluation' },
  { id: naacId++, name: 'Research, Innovations and Extension' },
  { id: naacId++, name: 'Infrastructure and Learning Resources' },
  { id: naacId++, name: 'Student Support and Progression' },
  { id: naacId++, name: 'Governance, Leadership and Management' },
  { id: naacId++, name: 'Institutional Values and Best Practices' }
];
