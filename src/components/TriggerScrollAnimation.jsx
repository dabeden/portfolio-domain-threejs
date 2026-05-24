import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TriggerScrollAnimation = () => {
    const {ref, inView } = useInView({
        threshhold: 0.5,
    });

    return (
        <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 50}}
        animate={inView ? {opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="classname"
        >
            <p>Scrolling Fading Text</p>
        </motion.div>
    )
}

export default TriggerScrollAnimation;