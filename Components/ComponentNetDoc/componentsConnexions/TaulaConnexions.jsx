import React, { useState } from 'react';

const ConnexionsTable = ({ connexions, onEditConnexions, onDeleteConnexions }) => {

  const [selectedRow, setSelectedRow] = useState(null);
  console.log('connexions: ', connexions);

  const [filters, setFilters] = useState({
    infraDeviceName: "",
    // filter by integer endPort
    portInfra: "",
    portStatus: "",
    finalDeviceName: "",
    // filter by integer endPort
    endPort: "",
    pachpanelName: "",
    vlan: "",
    descriptionConnexions: "",
  });


  const handleRowClick = (index) => {
    setSelectedRow(index);
  };
  
  const handleEditRowconnexions = (index) => {
    setSelectedRow(index);
    // Si existeix la propietat onEditconnexions, crida a la funció
    if (onEditConnexions) {
      console.log('Edita la fila: ', index);
      onEditConnexions(index);
    }

  };

  const handleDeleteRowconnexions = (index) => {
    setSelectedRow(index);
    if (onDeleteConnexions) { // Si existeix la propietat onEditconnexions, crida a la funció
      onDeleteConnexions(index);
    }
  };

  const handleFilterChange = (column, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
  };
  
  console.log("Filters:", filters); // Log filter values to check if they are as expected
  const filteredConnexions = connexions.filter(connexion => {
    const match =
      connexion.infraDeviceName && connexion.infraDeviceName.includes(filters.infraDeviceName) &&
      connexion.portStatus && connexion.portStatus.includes(filters.portStatus) &&
      connexion.finalDeviceName && connexion.finalDeviceName.includes(filters.finalDeviceName) &&
      connexion.pachpanelName && connexion.pachpanelName.includes(filters.pachpanelName) &&
      connexion.vlan && connexion.vlan.includes(filters.vlan) &&
      connexion.descriptionConnexions && connexion.descriptionConnexions.includes(filters.descriptionConnexions) &&
      connexion.portInfra && connexion.portInfra.includes(filters.portInfra) &&
      (
        (filters.portInfra === '' || (connexion.portInfra && connexion.portInfra.toString().includes(filters.portInfra))) &&
        (filters.endPort === '' || (connexion.endPort && connexion.endPort.toString().includes(filters.endPort)))
      );
    return match;
  });
  
  
  



  return (
    <div className="connexions-table">
      <table>
        <thead>
          <tr>
            <th>Dispositiu Infrarestuctura
              <div>
                <input
                  type="text"
                  value={filters.infraDeviceName}
                  onChange={e => handleFilterChange("infraDeviceName", e.target.value)}
                />
              </div>

            </th>
            <th>Port Dispositiu
              <div>
                <input
                  type="text"
                  value={filters.portInfra}
                  onChange={e => handleFilterChange("portInfra", e.target.value)}
                />
              </div>

            </th>
            <th>Configuracio port
              <div>
                <input
                  type="text"
                  value={filters.portStatus}
                  onChange={e => handleFilterChange("portStatus", e.target.value)}
                />
              </div>
            </th>
            <th>Dispositiu Final
              <div>
                <input
                  type="text"
                  value={filters.finalDeviceName}
                  onChange={e => handleFilterChange("finalDeviceName", e.target.value)}
                />
              </div>
            </th>
            <th>Port Final
              <div>
                <input
                  type="text"
                  value={filters.endPort}
                  onChange={e => handleFilterChange("endPort", e.target.value)}
                />
              </div>
            </th>
            {/* <th>Pach panel
              <div>
                <input
                  type="text"
                  value={filters.pachpanelName}
                  onChange={e => handleFilterChange("pachpanelName", e.target.value)}
                />
              </div>
            </th> */}
            <th>Nom de la Xarxa
              <div>
                <input
                  type="text"
                  value={filters.vlan}
                  onChange={e => handleFilterChange("vlan", e.target.value)}
                />
              </div>
            </th>
            {/* <th>Descripció
              <div>
                <input
                  type="text"
                  value={filters.descriptionConnexions}
                  onChange={e => handleFilterChange("descriptionConnexions", e.target.value)}
                />
              </div>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {connexions.map((connexions, index) => (
            <tr 
              key={index}
              className={selectedRow === index ? 'selected' : ''}
              onClick={() => handleRowClick(index)}
            >
              <td>{connexions.infraDeviceName}</td>
              <td>{connexions.portInfra}</td>
              <td>{connexions.portStatus}</td>
              <td>{connexions.finalDeviceName}</td>
              <td>{connexions.endPort}</td>
              {/*<td>{connexions.pachpanelName}</td>*/}
              <td>{connexions.vlan}</td>
              {/*<td>{connexions.descriptionConnexions}</td>*/}
              <td><button type='button' className='editButonXarxa' onClick={() => handleEditRowconnexions(index)}>Edita</button></td>
              <td><button type='button' className='delButonXarxa' onClick={() => handleDeleteRowconnexions(index)}>Eliminar</button></td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConnexionsTable;