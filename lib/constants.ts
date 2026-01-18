import { Icon } from '@iconify/react';
import { SiShadcnui } from "react-icons/si";
import { SiFramer } from "react-icons/si";

import clerkIcon from '@/assets/Icon/Clerk.png';

export const NAV_ITEMS = [
    {href: '#services', label: 'Services'},
    {href: '#about', label: 'About'},
    {href: '#skills', label: 'Skills'},
    {href: '#projects', label:'Projects'},
    {href: '#contact', label:'Contact'}
];

//tech stack section
export const FRONTEND = [
    {name: 'JavaScript', icon: 'skill-icons:javascript'},
    {name: 'TypeScript', icon: 'skill-icons:typescript'},
    {name: 'React', icon: 'vscode-icons:file-type-reactjs'},
    {name: 'React Native', icon: 'skill-icons:react-dark'},
    {name: 'Expo', icon: 'skill-icons:expo-dark'},
    {name: 'Next.js', icon: 'vscode-icons:file-type-next'},
    {name: 'TailwindCSS', icon: 'vscode-icons:file-type-tailwind'},
    {name: 'Shadcn/UI', icon: 'simple-icons:shadcnui' },
    {name: 'Vite', icon: 'vscode-icons:file-type-vite'},
    {name: 'HTML5', icon: 'skill-icons:html'},
    {name: 'CSS3', icon: 'skill-icons:css'},
    {name: 'Framer Motion', icon: 'simple-icons:framer'},
    {name: 'Formik', icon: 'simple-icons:formik'}
];

export const BACKEND = [
    {name: 'MongoDB', icon: 'skill-icons:mongodb'},
    {name: 'Node.js', icon: 'vscode-icons:file-type-node'},
    {name: 'PostgreSQL', icon: 'vscode-icons:file-type-pgsql'},
    {name: 'Express.js', icon: 'skill-icons:expressjs-light'},
];

export const OTHERS = [
    {name: 'Better Auth', icon: '/assets/Icon/BetterAuth.png' },
    {name: 'Clerk', icon: '/assets/Icon/Clerk.png' },
    {name: 'Stripe', icon: '/assets/Icon/Stripe.png' },
    {name: 'Vercel', icon: 'simple-icons:vercel' },
    {name: 'Git', icon: 'vscode-icons:file-type-git' },
    {name: 'GitHub', icon: 'skill-icons:github-dark' },
];

//projects section
export const projects = [
    {
    title: "Silversed",
    description: "A decentralized application (dApp) for executing Ethereum transactions and visualizing blockchain data in real-time. Features wallet integration, smart contract interaction, and a clean modern interface.",
    image: "/assets/Pictures/silversed.png",
    liveLink: "https://silversed.netlify.app/",
    githubLink: "https://github.com/ahBC-dev/Shilverado",
    icon: [
        {name: 'JavaScript', icon: 'skill-icons:javascript'},
        {name: 'React', icon: 'vscode-icons:file-type-reactjs'},
        {name: 'Vite', icon: 'vscode-icons:file-type-vite'},
        {name: 'Tailwind', icon: 'vscode-icons:file-type-tailwind'},
        {name: 'Ethers.js', icon: '/assets/Icon/ethersjs.png'},
        {name: 'Hardhat', icon: 'vscode-icons:file-type-hardhat'},
    ]
  },
  {
    title: "SilMark Tracker",
    description: "A comprehensive full-stack stock tracking platform built with Next.js. Features real-time price monitoring, personalized watchlists, and automated email notifications for significant price movements using INNGEST.",
    image: "/assets/Pictures/silmark.png",
    liveLink: "https://sil-stock-tracker-app-c48v.vercel.app/",
    githubLink: "https://github.com/ahBC-dev/SilStock-tracker-app",
    icon: [
        {name: 'TypeScript', icon: 'skill-icons:typescript'},
        {name: 'React', icon: 'vscode-icons:file-type-reactjs'},
        {name: 'MongoDB', icon: 'skill-icons:mongodb'},
        {name: 'Node.js', icon: 'vscode-icons:file-type-node'},
        {name: 'INNGEST', icon: '/assets/Icon/inngest.png'},
        {name: 'BetterAuth', icon: '/assets/Icon/BetterAuth.png'},
        {name: 'Nodemailer', icon: '/assets/Icon/nodemailer.png' },
        {name: 'Shadcn/UI', icon: 'simple-icons:shadcnui' },
        {name: 'Next.js', icon: 'vscode-icons:file-type-next'},
    ]
  },
  {
    title: "Portfolio v1",
    description: "My first venture into React development — a clean, minimalist portfolio showcasing the foundations of component-based architecture and responsive design principles.",
    image: "/assets/Pictures/portfolio.png",
    liveLink: "https://first-portfolio-hmad.netlify.app/",
    githubLink: "https://github.com/your-portfolio",
    icon: [
        {name: 'JavaScript', icon: 'skill-icons:javascript'},
        {name: 'React', icon: 'vscode-icons:file-type-reactjs'},
        {name: 'Tailwind', icon: 'vscode-icons:file-type-tailwind'},
        {name: 'ChakraUI', icon: '/assets/Icon/chakra-ui.png'},
    ]
  },
];
