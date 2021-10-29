// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getColombianHolidays } from '../../utils/get-holidays';

export default function handler(req, res) {
  return res.status(200).json(getColombianHolidays(req.query.lang || 'es-CO'));
}
