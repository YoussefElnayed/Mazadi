import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'أحمد محمد',
    location: 'القاهرة، مصر',
    avatar: '/images/testimonials/avatar1.jpg',
    rating: 5,
    text: 'مزادي هو أفضل منصة للمزادات الإلكترونية استخدمتها. الواجهة سهلة الاستخدام والمنتجات عالية الجودة. حصلت على هاتف ذكي بسعر رائع!',
    productBought: 'iPhone 13 Pro',
    date: '15 مارس 2023'
  },
  {
    id: 2,
    name: 'سارة علي',
    location: 'الإسكندرية، مصر',
    avatar: '/images/testimonials/avatar2.jpg',
    rating: 5,
    text: 'تجربتي مع مزادي كانت ممتازة. عملية المزايدة سهلة وممتعة، والشحن سريع جدًا. سأستخدم المنصة مرة أخرى بالتأكيد!',
    productBought: 'Samsung Galaxy S22',
    date: '3 أبريل 2023'
  },
  {
    id: 3,
    name: 'محمود عبد الرحمن',
    location: 'الجيزة، مصر',
    avatar: '/images/testimonials/avatar3.jpg',
    rating: 4,
    text: 'منصة مزادي توفر تجربة مزايدة آمنة وشفافة. خدمة العملاء ممتازة وساعدتني في حل مشكلة واجهتها بسرعة. أنصح بها بشدة.',
    productBought: 'MacBook Air M2',
    date: '22 مايو 2023'
  },
  {
    id: 4,
    name: 'فاطمة حسين',
    location: 'الإسماعيلية، مصر',
    avatar: '/images/testimonials/avatar4.jpg',
    rating: 5,
    text: 'أحب كيف يمكنني متابعة المزادات في الوقت الفعلي. واجهة المستخدم سلسة والإشعارات مفيدة جدًا. اشتريت جهاز لوحي بسعر أقل بكثير من سعر السوق!',
    productBought: 'iPad Pro 11',
    date: '7 يونيو 2023'
  },
  {
    id: 5,
    name: 'عمر خالد',
    location: 'أسيوط، مصر',
    avatar: '/images/testimonials/avatar5.jpg',
    rating: 5,
    text: 'مزادي غيرت طريقة تسوقي للإلكترونيات. المنتجات أصلية والأسعار تنافسية. أنا عميل دائم الآن!',
    productBought: 'Sony WH-1000XM4',
    date: '19 يوليو 2023'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  // Navigation handlers
  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const goToSlide = (index) => {
    setActiveIndex(index);
  };
  
  return (
    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            ماذا يقول عملاؤنا
          </motion.h2>
          <motion.p 
            className="text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            آراء حقيقية من عملاء سعداء استخدموا منصة مزادي للمزايدة على المنتجات الإلكترونية
          </motion.p>
        </div>
        
        <div 
          className="max-w-4xl mx-auto relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                x: `-${activeIndex * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full px-4"
                >
                  <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center mb-6">
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                          {testimonial.avatar ? (
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/150?text=User';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 text-xl font-bold">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-gray-900" dir="rtl">{testimonial.name}</h3>
                        <p className="text-gray-600" dir="rtl">{testimonial.location}</p>
                        <div className="flex mt-1" dir="rtl">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="md:ml-auto mt-4 md:mt-0 text-right">
                        <div className="text-xs text-gray-500" dir="rtl">{testimonial.date}</div>
                        <div className="text-sm font-medium text-primary-600" dir="rtl">
                          اشترى: {testimonial.productBought}
                        </div>
                      </div>
                    </div>
                    
                    <blockquote className="text-gray-700 text-lg leading-relaxed" dir="rtl">
                      "{testimonial.text}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/90 hover:bg-white text-primary-600 p-2 rounded-full shadow-md z-10 transform -translate-x-1/2"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/90 hover:bg-white text-primary-600 p-2 rounded-full shadow-md z-10 transform translate-x-1/2"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
          
          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
