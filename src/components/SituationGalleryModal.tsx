import React from 'react';
import { SituationPhoto } from '../types';
import { X, ChevronLeft, ChevronRight, Tag, Calendar } from 'lucide-react';

interface SituationGalleryModalProps {
  photos: SituationPhoto[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const SituationGalleryModal: React.FC<SituationGalleryModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onSelectIndex
}) => {
  if (photos.length === 0) return null;
  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % photos.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-navy-900 rounded-3xl overflow-hidden shadow-2xl border border-navy-700 flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-navy-950/60 text-white hover:bg-navy-950 transition-colors backdrop-blur-sm"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Container with Prev/Next buttons */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            className="w-full h-full object-contain select-none"
          />

          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Caption and Tags */}
        <div className="p-6 bg-navy-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-semibold text-white drop-shadow">
              {currentPhoto.caption}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-saffron-400" />
                <span className="capitalize">{currentPhoto.category}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                <span>Best in: {currentPhoto.seasons.join(', ')}</span>
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
};
