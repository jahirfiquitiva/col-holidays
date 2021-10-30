/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';

import { NextApiFunc } from '@/types';
import { getColombianHolidays } from '@/utils/get-holidays';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiFunc> => {
  const { lang, year } = req.query;
  const actualLang = Array.isArray(lang) ? lang[0] : lang;
  const actualYear = parseInt(Array.isArray(year) ? year[0] : year);

  try {
    return res
      .status(200)
      .json(
        getColombianHolidays(
          actualLang || 'es-CO',
          actualYear || new Date().getFullYear(),
        ),
      );
  } catch (e: unknown) {
    return res.status(500).json({
      // @ts-ignore
      error: e?.message || 'Unexpected error',
    });
  }
};

export default handler;
