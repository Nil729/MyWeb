import getDispositius from './get';
import insertDispositiu from './insert.js';
import updateDispositiu from './update';
import deleteDispositiu from './delete';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getDispositius(req, res);
    case 'POST':
      return insertDispositiu(req, res);
    case 'PUT':
      return updateDispositiu(req, res);
    case 'DELETE':
      return deleteDispositiu(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}