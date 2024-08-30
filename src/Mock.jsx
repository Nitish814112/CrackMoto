import React, { useState, useEffect } from 'react';
import './index.css';

const Mock = () => {
  const [mockData, setMockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedImageId, setExpandedImageId] = useState(null);

  const itemsPerPage = 7;

  const handleImageClick = (id) => {
    setExpandedImageId(expandedImageId === id ? null : id);
  };

  const fetchMockData = async () => {
    try {
      const res = await fetch('https://server2-ten-umber.vercel.app/datata');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setMockData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMockData();
  }, []);

  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const currentItems = mockData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='container mx-auto mt-10 p-4'>
      {loading && (
        <p className='text-center font-bold text-gray-500 flex items-center justify-center mt-24'>
          Loading... 
          <div className='border-8 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin ml-2'></div>
        </p>
      )}
      {error && <p className='text-center text-red-500'>{`Error: ${error}`}</p>}
      {!loading && !error && (
        <>
          <div className='flex flex-wrap justify-center gap-4'>
            {currentItems.map((item) => (
              <div key={item._id} className="w-full md:w-1/2 p-4 border rounded-lg shadow-md">
                <h2 className='text-lg font-bold mb-2'>Question: {item.Question}</h2>
                <p className='mb-2'>
                  <span className='text-lg font-bold'>Answer:</span> {item.Answer}
                </p>
                {item.image && (
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.Question || "Fetched image"}
                    className={`w-full h-auto mt-4 transition-transform duration-200 ease-in-out ${expandedImageId === item._id ? 'scale-125' : 'scale-100'}`}
                    onClick={() => handleImageClick(item._id)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className='flex justify-between mt-4'>
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

export default Mock;
