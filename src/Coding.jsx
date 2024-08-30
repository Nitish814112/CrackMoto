import React, { useEffect, useState } from 'react';

const Coding = () => {
  const [codingData, setCodingData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedImageId, setExpandedImageId] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading
  const [error, setError] = useState(null); // New state for error

  const itemsPerPage = 5;

  // Function to fetch coding data
  async function fetchCodingData() {
    try {
      let res = await fetch('https://server2-ten-umber.vercel.app/data');
      if (!res.ok) throw new Error('Network response was not ok');
      let data = await res.json();
      setCodingData(data);
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  }

  useEffect(() => {
    fetchCodingData();
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(codingData.length / itemsPerPage);

  // Get the current items based on the current page
  const currentItems = codingData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle accordion for each question
  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setExpandedIndex(null); // Reset expanded index on page change
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setExpandedIndex(null); // Reset expanded index on page change
    }
  };

  // Handle image click to scale
  const handleImageClick = (id) => {
    setExpandedImageId(expandedImageId === id ? null : id);
  };

  return (
    <div className='container mx-auto mt-10 p-4'>
      {loading && (
        <div className='text-center font-bold text-gray-500 flex items-center justify-center mt-24'>
          Loading...
          <div className='border-8 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin ml-2'></div>
        </div>
      )}
      {error && <p className='text-center text-red-500'>{`Error: ${error}`}</p>}
      {!loading && !error && (
        <>
          <div className='flex flex-wrap gap-4 mt-14'>
            {currentItems.map((item, index) => (
              <div key={item._id} className="border-b mb-4 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-4 bg-white rounded shadow">
                <h2
                  className="text-lg cursor-pointer mb-2"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className='text-lg font-bold'>Question:</span> {item.Question}
                </h2>
                {expandedIndex === index && (
                  <div className="accordion-body">
                    {item.image && (
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt={`Answer to ${item.Question}`}
                        className={`w-full h-auto mt-4 transition-transform duration-200 ease-in-out ${expandedImageId === item._id ? 'scale-110' : 'scale-100'}`}
                        onClick={() => handleImageClick(item._id)}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex gap-5">
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Coding;
