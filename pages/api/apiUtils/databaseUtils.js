// databaseUtils.js
export const handleDatabaseError = (res, error) => {
    console.error(error);
  
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Error: No es pot inserir el dispositiu perque ja existeix un dispositiu amb la mateixa ip' });
    } else {
      res.status(500).json({ error: 'Database error: ' + error.message });
    }
  };
  