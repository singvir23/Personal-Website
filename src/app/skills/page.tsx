"use client";

import React from 'react';
import SkillCard from './SkillCard';
import styles from './Skills.module.css';

export default function Skills() {
  const skills = {
    Languages: [
      { name: 'Java', icon: '/icons/java.svg' },
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'HTML', icon: '/icons/html.svg' },
      { name: 'CSS', icon: '/icons/css.svg' },
      { name: 'JavaScript', icon: '/icons/javascript.svg' },
      { name: 'C', icon: '/icons/c.svg' }
    ],
    Technologies: [
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Node.js', icon: '/icons/node.svg' },
      { name: 'Next.js', icon: '/icons/next.svg' },
      { name: 'Firebase', icon: '/icons/firebase.svg' },
      { name: 'AWS', icon: '/icons/AWS.svg' },
      { name: 'JUnit', icon: '/icons/JUnit.svg' },
    ],
    Tools: [
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'VS Code', icon: '/icons/vscode.svg' },
      { name: 'Microsoft Excel', icon: '/icons/excel.svg' },
    ]
  };

  return (
    <section className={styles.skillsSection}>
      <div className={styles.skillsContainer}>
        {Object.entries(skills).map(([category, skillList]) => (
          <div
            key={category}
            className={styles.category}
          >
            <h2 className={styles.categoryTitle}>{category}</h2>
            <div className={styles.skillsGrid}>
              {skillList.map((skill, index) => (
                <SkillCard 
                  key={skill.name} 
                  name={skill.name} 
                  icon={skill.icon}
                  index={index} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
