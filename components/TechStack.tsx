import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJava, 
  FaDocker, 
  FaGitAlt,
  FaCode
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiPostgresql, 
  SiMongodb, 
  SiKubernetes,
  SiStreamlit,
  SiSupabase,
  SiGooglegemini
} from 'react-icons/si';

// Mapping of tech names to icons and colors
const techIcons: { [key: string]: { Icon: React.ComponentType<{size?: number, color?: string}>, color: string } } = {
  'React': { Icon: FaReact, color: '#61DAFB' },
  'Next.js': { Icon: SiNextdotjs, color: '#000000' },
  'TypeScript': { Icon: SiTypescript, color: '#3178C6' },
  'Node.js': { Icon: FaNodeJs, color: '#68A063' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  'Python': { Icon: FaPython, color: '#3776AB' },
  'PostgreSQL': { Icon: SiPostgresql, color: '#4169E1' },
  'Docker': { Icon: FaDocker, color: '#2496ED' },
  'MongoDB': { Icon: SiMongodb, color: '#47A248' },
  'Java': { Icon: FaJava, color: '#007396' },
  'Kubernetes': { Icon: SiKubernetes, color: '#326CE5' },
  'Git': { Icon: FaGitAlt, color: '#F05032' },
  'Streamlit': { Icon: SiStreamlit, color: '#FF4B4B' },
  'Supabase': { Icon: SiSupabase, color: '#3ECF8E' },
  'Google Gemini': { Icon: SiGooglegemini, color: '#4285F4' },
  'Vite': { Icon: FaCode, color: '#646CFF' },
  'PDF.js': { Icon: FaCode, color: '#FF6600' },
  'default': { Icon: FaCode, color: '#777777' }
};

const TechStack: React.FC<{ stack?: { name: string, icon: string }[] }> = ({ stack }) => {
  if (!stack || stack.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-900/50 rounded-xl border border-cyan-500/30 shadow-lg">
      <h3 className="text-lg font-semibold text-cyan-300 mb-3 text-center">
        Technology Stack
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {stack.map((tech, index) => {
          const { Icon, color } = techIcons[tech.name] || techIcons['default'];
          
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 200 
                }
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5
              }}
              className="flex flex-col items-center"
            >
              <div 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 p-2"
                style={{ border: `2px solid ${color}` }}
              >
                <Icon size={24} color={color} />
              </div>
              <span className="text-xs text-gray-300 mt-2">{tech.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;
