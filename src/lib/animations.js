import { motion } from "framer-motion";

export const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: "easeOut" }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.2 } }
};

export const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};
