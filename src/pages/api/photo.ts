/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';

import { NextApiFunc, PhotoData } from '@/types';

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
const searchResults = 10;

interface UnsplashPhoto {
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description?: string;
  alt_description: string;
  urls: {
    regular: string;
  };
  links: {
    html?: string;
  };
  location?: {
    title?: string;
    country?: string;
  };
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiFunc> => {
  const { country } = req.query;
  const actualCountry = Array.isArray(country) ? country[0] : country;
  const request = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}&query=${actualCountry}%20landscape%20nature&orientation=landscape&count=${searchResults}&content_filter=high`,
  );
  const response = await request.json();
  const { status } = request;
  if (!response) {
    return res.status(status).json({});
  }

  try {
    const photo: UnsplashPhoto = (response || []).filter(
      (it: UnsplashPhoto) => {
        return (
          (it.location?.country || '')
            .toLowerCase()
            .includes(actualCountry.toLowerCase()) ||
          (it.description || '')
            .toLowerCase()
            .includes(actualCountry.toLowerCase())
        );
      },
    )[0];
    const data: PhotoData = {
      width: photo.width,
      height: photo.height,
      color: photo.color,
      blur_hash: photo.blur_hash,
      url: photo.urls.regular,
      description: photo.location?.title || '',
      alt_description: photo.alt_description,
      link: photo.links.html || '',
    };
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=43200',
    );
    return res.status(200).json(data);
  } catch (e: unknown) {
    return res.status(500).json({
      // @ts-ignore
      error: e?.message || 'Unexpected error',
    });
  }
};

export default handler;
