'use client';

import React, { useState } from 'react';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';
import { authApi, musicPreferencesApi } from '@/utils/apiClient';
import useSnackbar from '@/services/common/useSnackbar';
import globalAxios from 'axios';
import { LOCAL_STORAGE_KEY } from '@/type/localStorage';
import { useRouter } from 'next/navigation';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  musicPreferences: string[];
  socialMedia: {
    instagram: string;
    facebook: string;
    spotify: string;
  };
};

const RegistrationForm = () => {
  const [page, setPage] = useState(1);
  const { showError } = useSnackbar();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    musicPreferences: [],
    socialMedia: {
      instagram: '',
      facebook: '',
      spotify: '',
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'musicPreferences') {
      const musicPreferences = formData.musicPreferences;
      const indexToRemove = musicPreferences.findIndex(
        (item) => item === value
      );

      // Remove the item if found
      if (indexToRemove !== -1) {
        musicPreferences.splice(indexToRemove, 1);
      } else {
        musicPreferences.push(value);
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: musicPreferences,
      }));
    } else if (name.startsWith('socialMedia.')) {
      const socialMediaName = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        socialMedia: {
          ...prevData.socialMedia,
          [socialMediaName]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNext = async () => {
    try {
      const { access_token, user } = (
        await authApi.authControllerRegister({
          ...formData,
          first_name: formData.firstName,
          last_name: formData.lastName,
        })
      ).data;

      if (access_token) {
        localStorage.setItem(LOCAL_STORAGE_KEY.access_token, access_token);
        globalAxios.defaults.headers.common = {
          Authorization: `Bearer ${access_token}`,
        };

        setPage(2);
      } else {
        showError('User name is existing');
      }
    } catch (error) {
      console.log('[RegistrationForm][handleNext]', error);
      showError('Some thing went wrong');
    }
  };

  const onSubmit = async () => {
    const { data } =
      await musicPreferencesApi.musicPreferenceControllerSetUserPreferences({
        social_media: formData.socialMedia,
        selected_artists: formData.musicPreferences,
      });
    router.replace('/');
  };

  const handlePrevious = () => {
    setPage(1);
  };

  return (
    <div className="container mx-auto mt-10 text-black">
      {page === 1 ? (
        <PageOne
          formData={formData}
          onChange={handleChange}
          onNext={handleNext}
        />
      ) : (
        <PageTwo
          onSubmit={onSubmit}
          formData={formData}
          onChange={handleChange}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default RegistrationForm;
