

import ProjectCard from "./subComponents/ProjectsCard";
import Reveal from "./motion/Reveal";
import { projects } from "../lib/constants";

export default function Projects() {
    return (
        <section id="projects" className="w-full py-24 ">
            <div className="container mx-auto px-4">
                <Reveal>
                    <h2 className="text-4xl md:text-5xl font-bold heading-font mb-8 text-zinc-900 dark:text-neutral-100 text-center">
                        Projects
                    </h2>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                    {projects.map((project, idx) => (
                        <Reveal key={project.title} delay={idx * 0.1}>
                            <ProjectCard {...project} priority={idx === 0} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
