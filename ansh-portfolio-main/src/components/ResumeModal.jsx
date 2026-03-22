import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ResumeModal = ({ isOpen, onClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle scroll events
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      e.stopPropagation();
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  // Load and render PDF when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const renderPDF = async () => {
      try {
        setLoading(true);
        const loadingTask = pdfjsLib.getDocument('/Ansh%20Singhal.pdf');
        const pdf = await loadingTask.promise;
        const pages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 }); // Higher scale for better quality

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;
          pages.push(canvas.toDataURL('image/jpeg', 0.95)); // JPEG with 95% quality
        }

        setImages(pages);
      } catch (error) {
        console.error('Error rendering PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    renderPDF();
  }, [isOpen]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Ansh%20Singhal.pdf';
    link.download = 'Ansh Singhal.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-0"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full h-[95vh] md:w-[800px] md:h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile header with close and download buttons */}
            <div className="md:hidden absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm p-2 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-800">Resume</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2 text-gray-600 hover:text-gray-800 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                  aria-label="Download resume"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-600 hover:text-gray-800 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop close and download buttons */}
            <div className="hidden md:flex absolute top-4 right-4 z-10 gap-2">
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:text-gray-800 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2"
                aria-label="Download resume"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="text-sm">Download</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-gray-800 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* PDF viewer */}
            <div
              ref={scrollContainerRef}
              className="flex-1 w-full overflow-y-auto custom-scrollbar mt-12 md:mt-0"
              onWheel={(e) => e.stopPropagation()}
            >
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 p-4">
                  {images.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Resume page ${idx + 1}`}
                      className="w-full shadow-lg rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Mobile swipe indicator */}
            <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-1 text-white/80 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span>Swipe down to close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal; 
