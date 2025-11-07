import { projects } from "@/lib/constants"
import ProjectCard from "./subComponents/ProjectsCard"

import {motion} from 'framer-motion'


const Projects = () => {

    

  return (
    <div className="container flex flex-col p-3 gap-5">
        <div className="text-center lg:text-start">
            <h1 className="text-3xl font-serif text-zinc-900 dark:text-neutral-100">
                PROJECTS
            </h1>
        </div>
        <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="flex flex-col justify-center items-center md:flex-row md:flex-wrap lg:justify-start gap-5"
        >
            {projects.map((project) => (
                <ProjectCard key={project.title} {...project}/>
            ))}
        </motion.div>
    </div>
  )
}

export default Projects