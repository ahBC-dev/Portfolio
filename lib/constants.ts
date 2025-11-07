import { Icon } from '@iconify/react';
import { SiShadcnui } from "react-icons/si";
import { SiFramer } from "react-icons/si";

import clerkIcon from '@/assets/Icon/Clerk.png';

export const NAV_ITEMS = [
    {href: '#about', label: 'About'},
    {href: '#tech-stack', label: 'Tech Stack'},
    {href: '#projects', label:'Projects'},
    {href: '#contact', label:'Contact'}
];

//tech stack section
export const FRONTEND = [
    {name: 'Javascript', icon: 'skill-icons:javascript'},
    {name: 'Typescript', icon: 'skill-icons:typescript'},
    {name: 'React', icon: 'vscode-icons:file-type-reactjs'},
    {name: 'Next.js', icon: 'vscode-icons:file-type-next'},
    {name: 'TailwindCSS', icon: 'vscode-icons:file-type-tailwind'},
    {name: 'Shadcn/Ui', icon: 'simple-icons:shadcnui' },
    {name: 'Vite', icon: 'vscode-icons:file-type-vite'},
    {name: 'HTML', icon: 'skill-icons:html'},
    {name: 'CSS', icon: 'skill-icons:css'},
    {name: 'Framer', icon: 'simple-icons:framer'},
    {name: 'Formik', icon: 'simple-icons:formik'}
];

export const BACKEND = [
    {name: 'MongoDB', icon: 'skill-icons:mongodb'},
    {name: 'Node.js', icon: 'vscode-icons:file-type-node'},
    {name: 'PostgreSQL', icon: 'vscode-icons:file-type-pgsql'},
    {name: 'Express.js', icon: 'simple-icons:express'}
];

export const OTHERS = [
    {name: 'Docker', icon: 'vscode-icons:file-type-docker' },
    {name: 'Better Auth', icon: '/assets/Icon/BetterAuth.png' },
    {name: 'Clerk', icon: '/assets/Icon/Clerk.png' },
    {name: 'Stripe', icon: '/assets/Icon/Stripe.png' },
    {name: 'Vercel', icon: 'simple-icons:vercel' },
    {name: 'Git', icon: 'vscode-icons:file-type-git' },
];

//projects section
export const projects = [
    {
    title: "Silversed",
    description: "A simple dApp for testing Ethereum transactions and displaying blockchain data.",
    image: "/assets/Pictures/silversed.png",
    liveLink: "https://silversed.netlify.app/",
    githubLink: "https://github.com/ahBC-dev/Shilverado",
    icon: [
        {name: 'Javascript', icon: 'skill-icons:javascript'},
        {name: 'React', icon: 'vscode-icons:file-type-reactjs'},
        {name: 'Vite', icon: 'vscode-icons:file-type-vite'},
        {name: 'Tailwind', icon: 'vscode-icons:file-type-tailwind'},
        {name: 'Ethers.js', icon: '/assets/Icon/ethersjs.png'},
        {name: 'Hardhat', icon: 'vscode-icons:file-type-hardhat'},
    ]
  },
  {
    title: "Portfolio",
    description: "My first React project ever, Simple to no-complexty at all project",
    image: "/assets/Pictures/portfolio.png",
    liveLink: "https://first-portfolio-hmad.netlify.app/",
    githubLink: "https://github.com/your-portfolio",
    icon: [
        {name: 'Javascript', icon: 'skill-icons:javascript'},
        {name: 'React', icon: 'vscode-icons:file-type-reactjs'},
        {name: 'Tailwind', icon: 'vscode-icons:file-type-tailwind'},
        {name: 'ChakraUI', icon: '/assets/Icon/chakra-ui.png'},
    ]
  },
];
