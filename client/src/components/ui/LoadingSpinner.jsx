import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'primary', fullScreen = false }) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
    xl: 'h-24 w-24 border-4'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };
  
  // Animation variants
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }
    }
  };
  
  const spinner = (
    <motion.div
      className={`rounded-full ${sizeClasses[size]} border-t-transparent ${colorClasses[color]}`}
      variants={spinnerVariants}
      animate="animate"
    />
  );
  
  // If fullScreen, center in viewport
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {spinner}
      </div>
    );
  }
  
  // Otherwise, just return the spinner
  return spinner;
};

export default LoadingSpinner;
