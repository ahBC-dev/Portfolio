import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion'

interface ProjectsCardProps {
    title: string;
    description: string;
    image: string;
    liveLink?: string;
    githubLink?: string;
    icon?: {name: string; icon: string}[];
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
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        }
    }

    return (
        <motion.div 
            className="relative flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden w-[280px] h-[420px] shadow-lg hover:shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 group"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -8 }}
        >
            {/* Image Container with Overlay */}
            <div className="relative h-48 overflow-hidden flex-shrink-0">
                <Image 
                    alt={title}
                    width={280}
                    height={192}
                    src={image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Links - Positioned on hover */}
                <div className="absolute top-3 right-3 flex flex-row items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {githubLink && (
                        <a
                            href={githubLink}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="bg-black/80 backdrop-blur-md rounded-full p-2 transition-all hover:scale-110 duration-300 group/link"
                        >
                            <FiGithub className="text-white text-lg group-hover/link:text-amber-400"/>
                        </a>
                    )}
                    {liveLink && (
                        <a
                            href={liveLink}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="bg-black/80 backdrop-blur-md rounded-full p-2 transition-all hover:scale-110 duration-300 group/link"
                        >
                            <FiExternalLink className="text-white text-lg group-hover/link:text-amber-400"/>
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-grow overflow-y-scroll dark:scrollbar-dark scrollbar-light scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <div className="flex flex-col gap-3">
                    {/* Title */}
                    <h1 className="text-zinc-900 dark:text-neutral-100 text-xl font-bold font-sans group-hover:text-amber-400 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {title}
                    </h1>
                    
                    {/* Description */}
                    <p className="text-zinc-700 dark:text-neutral-300 text-sm font-sans leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Technologies - Show all without limit */}
                {icon && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {icon.map((tech) => (
                            <div 
                                className="flex flex-row items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-neutral-300 rounded-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 group/tech hover:bg-amber-50 dark:hover:bg-blue-950/50 transition-colors duration-300"
                                key={tech.name}
                            >
                                {tech.icon.startsWith("/") ? (
                                    <Image 
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={18}
                                        height={18}
                                        className="flex-shrink-0 "
                                    />
                                ) : (
                                    <Icon 
                                        icon={tech.icon}
                                        width={18}
                                        height={18}
                                        className="flex-shrink-0"
                                    />
                                )}
                                <span className="text-xs font-semibold font-mono whitespace-nowrap">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Accent Border Bottom */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-amber-400 to-blue-400 group-hover:w-full transition-all duration-500" />
        </motion.div>
    )
}

export default ProjectCard;