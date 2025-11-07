import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Icon } from '@iconify/react';
import {motion} from 'framer-motion'
interface ProjectsCardProps {
    title: string;
    description: string;
    image: string;
    liveLink?: string;
    githubLink?: string;
    icon?: {name: string; icon: string} [];
}

const ProjectCard = ({
    title,
    description,
    image,
    liveLink,
    githubLink,
    icon,
}: ProjectsCardProps) => {

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <motion.div 
        className="relative flex flex-col text-start bg-zinc-900 dark:bg-neutral-100  rounded-xl overflow-hidden w-[250px] h-[397px] shadow-md hover:shadow-xl dark:hover:scale-105 transition-all duration-300"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        >
            {/*Card github and livelink*/}
            <div className="absolute top-1 right-1 flex flex-row items-center gap-1">
                {liveLink && (
                    <a
                        href={liveLink}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="white-glassmorphism rounded-lg p-1 transition-all hover:scale-125 duration-300 group flex items-center justify-center"
                    >
                        <FiExternalLink className="text-xl text-gray-200  group-hover:text-amber-400"/>
                    </a>
                )}
                {githubLink && (
                    <a
                        href={githubLink}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="white-glassmorphism rounded-lg p-1 transition-all hover:scale-125 duration-300 group flex items-center justify-center"
                    >
                        <FiGithub className="text-gray-200 text-xl group-hover:text-amber-400"/>
                    </a>
                )}
            </div>
            {/*Project Image*/}
            <Image 
                alt="silversed"
                width={200}
                height={100}
                src={image}
                className="w-full object-cover"
            />
            <div className="p-2 flex flex-col justify-start items-start gap-5">
                <div className="flex flex-col gap-1">
                    <h1 className="text-white dark:text-black text-lg font-semibold font-sans">
                        {title}
                    </h1>
                    <p className="text-sm text-white dark:text-black font-sans">
                        {description}
                    </p>
                </div>
                {/*project sklills */}
                {icon && (
                    <div className="flex flex-wrap gap-1  ">
                        {icon.map((tech) => (
                            <div 
                             className="flex flex-row items-center gap-1 text-zinc-800 dark:text-neutral-300 bg-neutral-100 dark:bg-zinc-900 rounded-full p-1 px-2"
                             key={tech.name}
                            >
                                {tech.icon.startsWith("/") ? (
                                    <Image 
                                     src={tech.icon}
                                     alt={tech.name}
                                     width={15}
                                     height={15}
                                    />
                                    ) : (
                                    <Icon 
                                     icon={tech.icon}
                                     width={15}
                                     height={15}
                                    />
                                    )}
                                    <span className="text-sm font-semibold font-mono">
                                        {tech.name}
                                    </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default ProjectCard;