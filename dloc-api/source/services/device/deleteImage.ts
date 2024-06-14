import { Request, Response } from 'express';
import fs from 'fs';

/** Delete an image */
const deleteImage = async (name: string, uploadPath: string, req: Request, res: Response) => {
  let file = `${uploadPath}${name}.png`;

  if (fs.existsSync(file)) fs.unlinkSync(file);

  res.status(200).json({ data: { delete: true } });
};

export { deleteImage };
