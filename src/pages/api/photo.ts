/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';

import { NextApiFunc, PhotoData } from '@/types';

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
  user?: {
    name?: string;
    links?: {
      html?: string;
    };
  };
}

const defaultPhoto: PhotoData = {
  width: 6000,
  height: 3376,
  color: '#1789b4',
  blur_hash: 'LWHo2pVYDNWo-pbvIpivXTR*RPRk',
  url: 'https://images.unsplash.com/photo-1533699224246-6dc3b3ed3304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzgwMjJ8MHwxfGFsbHx8fHx8fHx8fDE2NTUyNTA2NTc&ixlib=rb-1.2.1&q=80&w=1080',
  description: 'Bogotá, Colombia',
  alt_description: 'yellow, blue, and red flag',
  link: 'https://unsplash.com/photos/P3PFi8THbUs',
  author: {
    name: 'Flavia Carpio',
    link: 'https://unsplash.com/@flacaral',
  },
};

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
const searchResults = 10;

const requestHeaders = new Headers();
requestHeaders.append('Content-Type', 'application/json');
requestHeaders.append('Authorization', `Client-ID ${unsplashAccessKey}`);

const buildReferralLink = (
  link: string | undefined | null,
): string | undefined => {
  if (!link) return undefined;
  return `${link}?utm_source=${encodeURIComponent(
    'colombian-holidays',
  )}&utm_medium=referral`;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiFunc> => {
  const { country } = req.query;
  const actualCountry = Array.isArray(country) ? country[0] : country;
  const request = await fetch(
    `https://api.unsplash.com/photos/random?query=${actualCountry}%20landscape%20nature&orientation=landscape&count=${searchResults}&content_filter=high`,
    {
      method: 'GET',
      headers: requestHeaders,
    },
  );

  const { status } = request;
  if (status < 200 || status >= 400) {
    const responseText = await request.text();
    return res.status(200).json({
      ...defaultPhoto,
      // @ts-ignore
      error: responseText || 'Unsplash API error. Probably rate limit',
    });
  }

  try {
    const response = await request.json();
    const photo: UnsplashPhoto = (response || []).filter(
      (it: UnsplashPhoto) => {
        return (
          (it.location?.country || '')
            .toLowerCase()
            .includes((actualCountry || '').toLowerCase()) ||
          (it.description || '')
            .toLowerCase()
            .includes((actualCountry || '').toLowerCase())
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
      link: buildReferralLink(photo.links.html) || photo.urls.regular,
      author: {
        name: photo.user?.name || 'Unknown',
        link:
          buildReferralLink(
            photo.user?.links?.html || 'https://unsplash.com/',
          ) || '',
      },
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
