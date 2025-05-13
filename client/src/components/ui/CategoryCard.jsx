import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-lg shadow-md hover-lift"
    >
      <Link to={`/products?category=${category._id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img
            src={`/uploads/categories/${category.cImage}`}
            alt={category.cName}
            className="h-40 w-full object-cover object-center transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-semibold text-white">{category.cName}</h3>
            <p className="text-sm text-gray-200 line-clamp-2">{category.cDescription}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CategoryCard
