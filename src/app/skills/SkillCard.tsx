import React from "react";
import Image from "next/image";
import styles from "./SkillCard.module.css";

interface SkillCardProps {
  name: string;
  icon: string;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon }) => {
  return (
    <div className={styles.skillCardContainer}>
      <div className={styles.skillCard}>
        <div className={styles.skillCardContent}>
          <Image
            src={icon}
            alt={`${name} icon`}
            width={60}
            height={60}
            className={styles.skillIcon}
          />
          <div className={styles.skillName}>{name}</div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;