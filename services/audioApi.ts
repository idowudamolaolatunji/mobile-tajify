const API_BASE_URL = "https://api-tajify.koyeb.app";

const audioApi = {
  uploadMusic: async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/channels/audio/upload`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  getMyMusic: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/channels/music/my-music`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  updateMusic: async (id: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/channels/music/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteMusic: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/channels/music/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Podcast APIs
  createPodcast: async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/channels/podcast/create`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  uploadPodcastEpisode: async (podcastId: string, formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/channels/podcast/episode/${podcastId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default audioApi; 