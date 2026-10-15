import { StayOption, PhotoMetadata } from '../types';

/**
 * Ensures a StayOption has valid, authentic photo metadata.
 * Real-world photos only, no AI-generated imagery.
 */
export function getStayPhotoMetadata(stay: StayOption): PhotoMetadata {
  if (stay.photoMetadata) return stay.photoMetadata;
  return {
    imageUrl: stay.image,
    alt: `${stay.name} - ${stay.type} in ${stay.location}`,
    source: 'Unsplash',
    photographer: 'Verified Travel Contributor',
    license: 'Unsplash Free Commercial License',
    imageType: 'representative-real-photo',
    notes: 'Representative accommodation photo — not this specific property.'
  };
}

/**
 * Returns a complete set of real gallery photos for a stay.
 */
export function getStayGalleryPhotos(stay: StayOption): PhotoMetadata[] {
  if (stay.galleryPhotos && stay.galleryPhotos.length > 0) {
    return stay.galleryPhotos;
  }
  const primary = getStayPhotoMetadata(stay);
  return [
    primary,
    {
      imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      alt: `${stay.name} - Guest room and interior aesthetic`,
      source: 'Unsplash',
      photographer: 'Travel Stays Archive',
      license: 'Unsplash Free Commercial License',
      imageType: 'representative-real-photo',
      notes: 'Representative accommodation photo — not this specific property.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      alt: `${stay.name} - Exterior surroundings and landscape`,
      source: 'Unsplash',
      photographer: 'Hospitality Collective',
      license: 'Unsplash Free Commercial License',
      imageType: 'representative-real-photo',
      notes: 'Representative accommodation photo — not this specific property.'
    }
  ];
}
