"use client";

import React from "react";
import Image from "next/image";
import styles from "./Skills.module.css";

interface Skill {
  name: string;
  icon: string;
}

const skillsData: Record<string, Skill[]> = {
  "Programming Languages": [
    { name: "Java", icon: "/icons/java.svg" },
    { name: "Python", icon: "/icons/python.svg" },
    { name: "C", icon: "/icons/c.svg" },
    { name: "HTML", icon: "/icons/html.svg" },
    { name: "CSS", icon: "/icons/css.svg" },
    { name: "JavaScript", icon: "/icons/javascript.svg" },
  ],
  "Frameworks & Libraries": [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Node.js", icon: "/icons/node.svg" },
    { name: "Next.js", icon: "/icons/next.svg" },
    { name: "Pandas", icon: "/icons/pandas.svg" },
    { name: "Scikit-learn", icon: "/icons/scikit.png" },
    { name: "NumPy", icon: "/icons/numpy.svg" },
  ],
  "Technologies & Tools": [
    { name: "Git", icon: "/icons/git.svg" },
    { name: "GCP", icon: "/icons/gcp.svg" },
    { name: "AWS", icon: "/icons/AWS.svg" },
    { name: "Firebase", icon: "/icons/firebase.svg" },
    { name: "Jupyter Notebook", icon: "/icons/jupyter.svg" },
    { name: "Ubuntu", icon: "/icons/ubuntu.png" },
    { name: "Microsoft Excel", icon: "/icons/excel.svg" },
    { name: "VS Code", icon: "/icons/vscode.svg" },
  ],
};

export default function Skills() {
  return (
    <section className={styles.skillsSection}>
      <h2 className={styles.skillsHeader}>Skills</h2>

      <div className={styles.skillsWrapper}>
        {Object.entries(skillsData).map(([category, skillList]) => (
          <div className={styles.skillCategoryCard} key={category}>
            <h3 className={styles.skillCategoryHeader}>{category}</h3>
            <div className={styles.skillCategoryGrid}>
              {skillList.map((skill) => (
                <div className={styles.skillIconWrapper} key={skill.name}>
                  <Image
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    width={40}
                    height={40}
                    className={styles.skillIcon}
                  />
                  <span className={styles.skillName}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
