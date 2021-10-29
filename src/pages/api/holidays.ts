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
  return res
    .status(200)
    .json(getColombianHolidays(actualLang || 'es-CO', actualYear || 2021));
};

export default handler;
