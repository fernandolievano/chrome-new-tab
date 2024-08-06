import { useState, useEffect } from 'react';

const useCustomWallpaper = () => {
  const [wallpaper, setWallpaper] = useState('');

  useEffect(() => {
    const savedImage = localStorage.getItem('wallpaper');

    if (savedImage) {
      setWallpaper(savedImage);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const reader = new FileReader();

        reader.onloadend = () => {
          resizeImage(reader.result, (resizedImage) => {
            localStorage.setItem('wallpaper', resizedImage);
            setWallpaper(resizedImage);
          });
        };

        reader.readAsDataURL(file);
      } catch (error) {
        alert('Hubo un error al cargar tu imagen, intentá con otra diferente, preferiblemente de menor tamaño.')
      }
    }
  };

  const resizeImage = (base64Str, callback) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxSize = 1024; // Tamaño máximo de la imagen en píxeles (ancho o alto)

      let width = img.width;
      let height = img.height;

      // Redimensionar la imagen si es más grande que el tamaño máximo permitido
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      // Intentar comprimir la imagen al 90% de calidad y ajustar si es necesario
      let quality = 0.9;
      let newBase64 = canvas.toDataURL('image/jpeg', quality);

      while (newBase64.length * 2 / 1024 / 1024 > 5 && quality > 0.1) {
        quality -= 0.1;
        newBase64 = canvas.toDataURL('image/jpeg', quality);
      }

      callback(newBase64);
    };
  };

  return {
    wallpaper,
    setWallpaper,
    handleImageChange
  };
};

export default useCustomWallpaper;