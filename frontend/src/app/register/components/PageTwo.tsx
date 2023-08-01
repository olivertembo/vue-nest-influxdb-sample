// components/PageTwo.tsx
import { useAllMusicArtists } from '@/services/auth/useAuth';
import React from 'react';

type PageTwoProps = {
  formData: {
    musicPreferences: string[];
    socialMedia: {
      instagram: string;
      facebook: string;
      spotify: string;
    };
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onPrevious: () => void;
  onSubmit: () => void;
};

const PageTwo: React.FC<PageTwoProps> = ({
  formData,
  onChange,
  onPrevious,
  onSubmit,
}) => {
  const { artists } = useAllMusicArtists();
  const { musicPreferences, socialMedia } = formData;
  if (!artists) {
    return <div>Loading...</div>;
  }
  return (
    <div className="py-4 bg-gray-300 max-w-xl mx-auto rounded px-8  ">
      <h1 className="text-3xl font-bold mb-6">Page Two</h1>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-primary mb-2">
          Music Preferences:
        </label>
        {artists.map(({ id, name }) => (
          <label key={id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="musicPreferences"
              value={id}
              checked={musicPreferences.includes(id)}
              onChange={onChange}
              className="form-checkbox h-5 w-5 text-primary focus:ring-primary"
            />
            <span>{name}</span>
          </label>
        ))}
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-primary mb-2">
          Instagram:
        </label>
        <input
          type="text"
          value={socialMedia.instagram}
          onChange={onChange}
          name="socialMedia.instagram"
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-primary mb-2">
          Facebook:
        </label>
        <input
          type="text"
          value={socialMedia.facebook}
          onChange={onChange}
          name="socialMedia.facebook"
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-primary mb-2">
          Spotify:
        </label>
        <input
          type="text"
          value={socialMedia.spotify}
          onChange={onChange}
          name="socialMedia.spotify"
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="px-4 py-2 text-white font-semibold bg-gray-500 rounded-md hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 text-white font-semibold bg-primary rounded-md hover:bg-opacity-90"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PageTwo;
