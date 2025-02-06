# .context/Context.MD 

# Current Application Context

This is a personal website project built using Next.js, React, and Tailwind CSS.

**Key Features:**

- **Homepage:**  A single-page website showcasing the developer's profile, skills, and projects. Includes sections for:
    - Header with name and title (lines 118-125 of `app/page.tsx`).
    - "My Journey" section with bio paragraphs (lines 128-137 of `app/page.tsx`).
    - "My Projects" section displaying project cards and a project video (lines 156-193 of `app/page.tsx`).
    - "Connect With Me" section with social media links (lines 195-208 of `app/page.tsx`).
    - Footer with copyright information (lines 211-217 of `app/page.tsx`).
- **Background Animations:**
    - Constellation background using canvas (lines 30-227 of `components/ConstellationBackground.tsx`).
    - Animated code snippets in the background (lines 79-116 of `components/BackgroundCode.tsx`).
- **Styling and UI:**
    - Tailwind CSS for utility-first styling (lines 1-3 of `app/globals.css`).
    - Custom styles for glassmorphism using Tailwind CSS configuration (lines 45-61 of `tailwind.config.js`).
    - Smooth animations and transitions using Framer Motion (line 4 of `app/page.tsx`).
    - Custom font 'Space Grotesk' (lines 6-9 of `app/layout.tsx`).
- **Responsiveness:** The layout adapts to different screen sizes using Tailwind CSS grid and responsive utilities (line 160 of `app/page.tsx`).
- **Chat Widget**:
    - Interactive Chat Widget.

**Current State:**

The website is functional and displays basic information. It includes visual elements like background animations, glassmorphism, and a loading screen. The project section is implemented with placeholder videos. Social links are present in the footer. A chat widget is integrated.

**Next Steps (Development Features - see `.context/DevelopmentFeatures.MD`):**

The development features outline visual enhancements, typography improvements, micro-interactions, project section enhancements and additions to the "Connect With Me" section to further improve the website's aesthetics and user experience. 