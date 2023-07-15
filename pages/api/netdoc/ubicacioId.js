import pool from "../../../database/db.connection.js";



export default function handler(req, res) {
  const { ubicacioId } = req.query;

  if (req.method === 'DELETE') {
    // Perform the deletion operation based on ubicacioId
    pool.query("DELETE FROM Zona WHERE Id_zona = ?", [ubicacioId], (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting location from database" });
      } else {
        res.status(200).json({ message: "Location deleted successfully" });
      }
    })
  
  } else if (req.method === 'PUT') {

    const { ubicacioName, descriptionUbicacio } = req.body;

    console.log("nom_ubicacio: " + ubicacioName, "descripcio_ubicacio: " + descriptionUbicacio);

    pool.query("UPDATE Zona SET NomZona = ?, DescZona = ? WHERE Id_zona = ?", [ubicacioName, descriptionUbicacio, ubicacioId], (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating location in database" });
      } else {
        res.status(200).json({ message: "Location updated successfully" });
      }
    });

  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}