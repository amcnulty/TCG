/*
  AnimateOnScroll — wraps any content in a Framer Motion fade-up animation
  that triggers once when the element enters the viewport.

  Props:
    children   – content to animate
    className  – forwarded to the motion.div (use "h-full" inside CSS grids
                 so the wrapper doesn't collapse shorter than its cell)
    delay      – seconds before the animation starts (default 0)
    direction  – entry direction: "up" | "down" | "left" | "right" (default "up")
*/
import { motion } from 'framer-motion'

export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 32 : direction === 'down' ? -32 : 0,
      x: direction === 'left' ? 32 : direction === 'right' ? -32 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
