import Work1 from '../../assets/images/work1.png' // eCABS
import Work2 from '../../assets/images/work2.png' // Linang
import Work3 from '../../assets/images/work3.png' // BGPMS 
import Work4 from '../../assets/images/work4.png' // TaskFlow 
import Work5 from '../../assets/images/work5.png' // Idle Realm

export const projectsNav = [
  { name: 'All' },
  { name: 'Web' },
  { name: 'Game' },
];

export const projectsData = [
    {
        id: 1,
        image: Work1,
        title: 'eCABS: Web-Based Operations Management System for Cabuyao Athletes Basic School',
        description: 'Collaborated with my team to bring eCABS to life—a web-based operations management system built with Laravel, designed for Cabuyao Athletes Basic School. Delivered a fully responsive and intuitive interface with dynamic data features, including QR code verification and SMS notifications.',
        year: '2023-2024',
        role: 'Frontend Developer',
        category: 'web',
        demo: '', // open source only — no live demo
        link: 'https://github.com/CrissanDondriano/ECABS.git'
    },
    {
        id: 2,
        image: Work2,
        title: 'Linang: Living Interactions — Navigating Aquatic and Natural Geography',
        description: 'Contributed to Linang, an educational and interactive application (Unity/C#) designed to promote awareness of the 17 Sustainable Development Goals, with a focus on life below water and life on land, built during my internship at the Public Employment Service Office.',
        year: '2024',
        role: 'Programmer Intern',
        category: 'game',
        demo: '',
        link: 'https://github.com/CrissanDondriano/Linang.git'
    },
    {
        id: 3,
        image: Work3,
        title: 'BGPMS: Barangay Governance Performance Management System',
        description: 'A PHP/MySQL web application for tracking and scoring barangay (local government unit) compliance and performance — automated scoring across Administrative Reports, Submission Reports, SGLGB, and LTIA criteria, with a color-coded compliance tracker and CSV export.',
        year: '2024-2026',
        role: 'Full Stack Developer',
        category: 'web',
        demo: 'https://bgpms.onrender.com/',
        link: ''
    },
    {
        id: 4,
        image: Work4,
        title: 'TaskFlow AI',
        description: 'TaskFlow AI is a modern task and productivity management application designed to help users organize, track, and manage their work efficiently. It combines a Laravel REST API backend with a React + TypeScript frontend to provide a responsive and interactive task management experience.',
        year: '2026',
        role: 'Full Stack Developer',
        category: 'web',
        demo: 'https://taskflow-frontend-liard-eight.vercel.app/',
        link: '' // add your repo link here
    },
    {
        id: 5,
        image: Work5,
        title: 'Idle Realm',
        description: 'A browser-based idle RPG built with Vue 3, Laravel, and Three.js — dark fantasy aesthetic rendered entirely on Canvas 2D with glow/shadow effects and no static image assets, featuring an actively developed battle system.',
        year: '2026',
        role: 'Full Stack / Game Developer',
        category: 'game',
        demo: 'https://idle-realm.onrender.com/',
        link: '' // add your repo link here
    },
];