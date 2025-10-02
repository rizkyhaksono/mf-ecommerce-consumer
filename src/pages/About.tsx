const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              About ShopHub
            </h1>
            <p className="text-xl text-gray-600">
              Built with modern micro frontend architecture
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                ShopHub is a modern e-commerce platform built using cutting-edge micro frontend architecture
                with Module Federation. This innovative approach allows us to create a scalable, maintainable,
                and performant shopping experience.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This project demonstrates the power of micro frontends by breaking down the application into
                three independent, self-contained modules:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900">Product Provider:</strong>
                    <span className="text-gray-700"> Manages the product catalog, filtering, and detailed views</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900">Payment Provider:</strong>
                    <span className="text-gray-700"> Handles shopping cart, checkout flow, and payment processing</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900">Consumer Application:</strong>
                    <span className="text-gray-700"> Orchestrates the entire experience with routing and state management</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Module Federation for seamless integration',
                  'React 18 with modern hooks',
                  'Tailwind CSS for beautiful styling',
                  'Responsive design for all devices',
                  'TypeScript for type safety',
                  'Rsbuild for optimal builds',
                  'State management with Context API',
                  'React Router for navigation',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide an exceptional online shopping experience by combining the best
                in modern web technologies with user-centric design. Our micro frontend architecture
                ensures that we can rapidly iterate, scale independently, and maintain high code quality
                across all parts of the application.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Join Our Journey</h3>
              <p className="mb-4">Experience the future of e-commerce today</p>
              <div className="flex gap-4 justify-center">
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">React</span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">TypeScript</span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">Tailwind</span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">Module Federation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
