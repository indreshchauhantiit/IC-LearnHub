
export const courses = [
  {
    id: 1,
    title: "Complete React Developer Course",
    subtitle: "Master React and build modern web applications",
    description:
      "Learn React from fundamentals to advanced concepts. Build interactive user interfaces, manage state, work with APIs, and develop real-world applications.",
    instructor: "John Smith",
    category: "Web Development",
    rating: 4.8,
    students: 2450,
    price: 499,
    originalPrice: 1999,
    duration: "32 hours",
    level: "Beginner",
    lectures: 48,
    language: "English",
    lastUpdated: "September 2026",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
    badge: "Bestseller",

    instructorInfo: {
      name: "John Smith",
      title: "Senior React Developer",
      bio: "An experienced frontend developer passionate about teaching modern web technologies.",
      students: 12000,
      courses: 8,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },

    outcomes: [
      "Understand React components and JSX",
      "Build applications using React Hooks",
      "Manage application state",
      "Integrate REST APIs",
      "Build and deploy a complete React project",
    ],

    requirements: [
      "Basic knowledge of HTML and CSS",
      "Basic JavaScript knowledge",
      "A computer with internet access",
    ],

    curriculum: [
      {
        id: 1,
        title: "Getting Started with React",
        lectures: [
          {
            id: 1,
            title: "Introduction to React",
            duration: "12:30",
            preview: true,
          },
          {
            id: 2,
            title: "Setting up the development environment",
            duration: "18:45",
            preview: true,
          },
          {
            id: 3,
            title: "Understanding JSX",
            duration: "20:15",
            preview: false,
          },
        ],
      },
      {
        id: 2,
        title: "Components and Props",
        lectures: [
          {
            id: 4,
            title: "Creating React components",
            duration: "16:20",
            preview: false,
          },
          {
            id: 5,
            title: "Working with props",
            duration: "22:10",
            preview: false,
          },
          {
            id: 6,
            title: "Component composition",
            duration: "19:40",
            preview: false,
          },
        ],
      },
      {
        id: 3,
        title: "React Hooks and State",
        lectures: [
          {
            id: 7,
            title: "Introduction to useState",
            duration: "25:00",
            preview: false,
          },
          {
            id: 8,
            title: "Understanding useEffect",
            duration: "28:30",
            preview: false,
          },
          {
            id: 9,
            title: "Building custom hooks",
            duration: "32:15",
            preview: false,
          },
        ],
      },
    ],
  },

  {
    id: 2,
    title: "UI/UX Design Masterclass",
    subtitle: "Learn to design beautiful user experiences",
    description:
      "Explore user research, wireframing, prototyping, visual design, and usability principles for modern digital products.",
    instructor: "Sarah Johnson",
    category: "UI/UX Design",
    rating: 4.7,
    students: 1820,
    price: 399,
    originalPrice: 1499,
    duration: "24 hours",
    level: "Beginner",
    lectures: 36,
    language: "English",
    lastUpdated: "September 2026",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
    badge: "Popular",

    instructorInfo: {
      name: "Sarah Johnson",
      title: "UI/UX Designer",
      bio: "A product designer focused on creating intuitive and user-friendly digital experiences.",
      students: 8500,
      courses: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },

    outcomes: [
      "Understand UI and UX design principles",
      "Create wireframes and prototypes",
      "Learn visual hierarchy and typography",
      "Improve usability and accessibility",
      "Build a portfolio-ready design project",
    ],

    requirements: [
      "No prior design experience required",
      "A computer with internet access",
    ],

    curriculum: [
      {
        id: 1,
        title: "UI/UX Fundamentals",
        lectures: [
          {
            id: 1,
            title: "Introduction to UI/UX",
            duration: "15:20",
            preview: true,
          },
          {
            id: 2,
            title: "Understanding user needs",
            duration: "20:10",
            preview: false,
          },
        ],
      },
      {
        id: 2,
        title: "Wireframing and Prototyping",
        lectures: [
          {
            id: 3,
            title: "Creating wireframes",
            duration: "22:15",
            preview: false,
          },
          {
            id: 4,
            title: "Building interactive prototypes",
            duration: "26:40",
            preview: false,
          },
        ],
      },
    ],
  },

  {
    id: 3,
    title: "Python for Data Science",
    subtitle: "Analyze data and discover meaningful insights",
    description:
      "Learn Python fundamentals, data analysis, data visualization, and essential techniques used in data science.",
    instructor: "Michael Brown",
    category: "Data Science",
    rating: 4.9,
    students: 3200,
    price: 599,
    originalPrice: 2499,
    duration: "40 hours",
    level: "Intermediate",
    lectures: 52,
    language: "English",
    lastUpdated: "September 2026",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600",
    badge: "Bestseller",

    instructorInfo: {
      name: "Michael Brown",
      title: "Data Scientist",
      bio: "A data professional who teaches Python and practical data analysis techniques.",
      students: 15000,
      courses: 7,
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    },

    outcomes: [
      "Understand Python programming fundamentals",
      "Work with data using Python",
      "Analyze datasets",
      "Create data visualizations",
      "Complete practical data science exercises",
    ],

    requirements: [
      "Basic computer knowledge",
      "Basic programming knowledge is helpful",
      "A computer with internet access",
    ],

    curriculum: [
      {
        id: 1,
        title: "Python Fundamentals",
        lectures: [
          {
            id: 1,
            title: "Introduction to Python",
            duration: "14:20",
            preview: true,
          },
          {
            id: 2,
            title: "Variables and data types",
            duration: "19:30",
            preview: false,
          },
        ],
      },
      {
        id: 2,
        title: "Data Analysis",
        lectures: [
          {
            id: 3,
            title: "Working with datasets",
            duration: "24:10",
            preview: false,
          },
          {
            id: 4,
            title: "Data visualization basics",
            duration: "28:15",
            preview: false,
          },
        ],
      },
    ],
  },

  {
    id: 4,
    title: "Digital Marketing Complete Guide",
    subtitle: "Grow brands with modern digital marketing",
    description:
      "Learn SEO, social media marketing, content strategy, analytics, and digital advertising fundamentals.",
    instructor: "Emily Davis",
    category: "Digital Marketing",
    rating: 4.6,
    students: 1450,
    price: 349,
    originalPrice: 1299,
    duration: "18 hours",
    level: "Beginner",
    lectures: 28,
    language: "English",
    lastUpdated: "September 2026",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    badge: "New",

    instructorInfo: {
      name: "Emily Davis",
      title: "Digital Marketing Specialist",
      bio: "A marketing professional specializing in SEO, content strategy, and digital campaigns.",
      students: 6200,
      courses: 4,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    },

    outcomes: [
      "Understand digital marketing fundamentals",
      "Learn SEO and keyword research",
      "Plan social media campaigns",
      "Understand content marketing",
      "Measure campaign performance using analytics",
    ],

    requirements: [
      "No prior marketing experience required",
      "Basic computer and internet knowledge",
    ],

    curriculum: [
      {
        id: 1,
        title: "Digital Marketing Fundamentals",
        lectures: [
          {
            id: 1,
            title: "Introduction to digital marketing",
            duration: "12:45",
            preview: true,
          },
          {
            id: 2,
            title: "Understanding your audience",
            duration: "17:20",
            preview: false,
          },
        ],
      },
      {
        id: 2,
        title: "SEO and Social Media",
        lectures: [
          {
            id: 3,
            title: "SEO basics",
            duration: "21:10",
            preview: false,
          },
          {
            id: 4,
            title: "Social media strategy",
            duration: "23:40",
            preview: false,
          },
        ],
      },
    ],
  },
];

export const categories = [
  { name: "Web Development", icon: "Code", courses: 120 },
  { name: "UI/UX Design", icon: "Palette", courses: 85 },
  { name: "Data Science", icon: "Database", courses: 65 },
  { name: "Digital Marketing", icon: "Megaphone", courses: 50 },
];
