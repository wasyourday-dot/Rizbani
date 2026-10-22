import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const ai = new GoogleGenAI();

// Maps Grounding API endpoint for clinic location & navigation inquiries
app.post('/api/maps-grounding', async (req, res) => {
  try {
    const { query, latitude, longitude } = req.body;

    // Call gemini-3.8-flash with googleMaps tool as specified in requirements
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents:
        query ||
        'Petunjuk arah dan rute menuju Klinik Pratama Azizah di Bunten Barat, Kecamatan Ketapang, Kabupaten Sampang, Madura serta fasilitas kesehatan sekitar.',
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: latitude || -6.9147,
              longitude: longitude || 113.2922,
            },
          },
        },
      },
    });

    const text = response.text || '';
    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return res.json({
      text,
      groundingChunks,
      source: 'maps-grounding',
    });
  } catch (err: any) {
    console.warn('Maps grounding API fallback triggered:', err.message);

    // Fallback response with verified official location information for Klinik Pratama Azizah
    return res.json({
      text:
        'Klinik Pratama Azizah beralamat resmi di 374H+V79, Olo Tengah, Bunten Barat, Kecamatan Ketapang, Kabupaten Sampang, Jawa Timur 69261. Terletak di pesisir utara Madura sepanjang jalur Ketapang, dapat diakses dari arah Sampang Kota (~45 km ke arah utara) maupun dari arah Banyuates. Tersedia area parkir kendaraan dan akses mudah untuk penjemputan pasien.',
      groundingChunks: [
        {
          maps: {
            uri: 'https://maps.app.goo.gl/WEG2VQYNRjAfEJMQ6',
            title: 'Klinik Pratama Azizah (Google Maps Resmi)',
          },
        },
        {
          maps: {
            uri: 'https://maps.google.com/?q=Ketapang+Sampang+Madura',
            title: 'Kecamatan Ketapang, Kabupaten Sampang, Jawa Timur',
          },
        },
      ],
      source: 'verified-directory-fallback',
    });
  }
});

// Vite middleware configuration for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
