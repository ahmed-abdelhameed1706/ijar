/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const MotionTop = ({ children }) => {
	const variants = {
		hidden: {
			y: "50px",
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
			duration: 0.6,
			ease: "easeInOut",
			},
		},
	};

	return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default MotionTop;
