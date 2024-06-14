import { Request, Response } from 'express';
import fs from 'fs';

const getImage = async (name: string, uploadPath: string, download: boolean, req: Request, res: Response) => {
  let file = `${uploadPath}${name}.png`;

  const fileExist = fs.existsSync(file);
  if (!fileExist) file = `${uploadPath}no-image.png`;

  if (download) {
    res.download(file, (err) => {
      if (err) res.status(404).json({ error: err.message });
    });
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) res.status(404).json({ error: 'image not found' });
    else res.writeHead(200, { 'Content-Type': 'image/jpeg' }).end(data);
  });
};

export { getImage };
