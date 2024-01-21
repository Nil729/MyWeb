import React, { useEffect } from 'react';
import { useState } from 'react';

const TaulaDispositus = ({ dispositius, onEdit, onDelete, deviceType }) => {

  const [selectedRow, setSelectedRow] = useState(null);

  const [filters, setFilters] = useState({
    deviceType: "",
    NomDispositiu: "",
    ip: "",
    mac: "",
    quantitatPortsEth: "",
    zona_id: "",
  });

  const handleFilterChange = (column, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
  };

  const filteredDispositius = dispositius.filter(dispositiu => {
    return (
      dispositiu.deviceType && dispositiu.deviceType.includes(filters.deviceType) &&
      dispositiu.NomDispositiu && dispositiu.NomDispositiu.includes(filters.NomDispositiu) &&
      dispositiu.ip && dispositiu.ip.includes(filters.ip) &&
      dispositiu.mac && dispositiu.mac.includes(filters.mac) &&
      dispositiu.quantitatPortsEth && dispositiu.quantitatPortsEth.includes(filters.quantitatPortsEth) &&
      dispositiu.zona_id && dispositiu.zona_id.includes(filters.zona_id)
    );
  });

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handledeviceEdit = (index) => {
    setSelectedRow(index);
    if (onEdit) {
      onEdit(index);
    }
  };

  const handledeviceDelete = (index) => {
    setSelectedRow(index);
    if (onDelete) {
      onDelete(index);
    }
  };




  return (
    
    <div className="network-table">

      <table>
        <thead>
          <tr>
            <th>Type
              <div>
                <input
                  type="text"
                  value={filters.deviceType}
                  onChange={e => handleFilterChange("deviceType", e.target.value)}
                  placeholder="Filter by device type"
                />
              </div>
            </th>

            <th>Name
              <div>
                <input
                  type="text"
                  value={filters.NomDispositiu}
                  onChange={e => handleFilterChange("NomDispositiu", e.target.value)}
                  placeholder="Filter by device name"
                />
              </div>
            </th>


            <th>IP
              <div>
                <input
                  type="text"
                  value={filters.ip}
                  onChange={e => handleFilterChange("ip", e.target.value)}
                  placeholder="Filter by IP"
                />
              </div>
            </th>

            <th>MAC
              <div>
                <input
                  type="text"
                  value={filters.mac}
                  onChange={e => handleFilterChange("mac", e.target.value)}
                  placeholder="Filter by MAC"
                />

              </div>
            </th>
            <th>Ethernet ports
              <div>
                <input
                  type="number"
                  value={filters.quantitatPortsEth}
                  onChange={e => handleFilterChange("quantitatPortsEth", e.target.value)}
                  placeholder="Filter by Ethernet Ports"
                />
              </div>
            </th>
            <th>Location
              <div>
                <input
                  type="text"
                  value={filters.zona_id}
                  onChange={e => handleFilterChange("zona_id", e.target.value)}
                  placeholder="Filter by location"
                />
              </div>
            </th>

          </tr>
        </thead>
        <tbody>

          {filteredDispositius.map((dispositiu, index) => (
            <tr
              key={index}
              className={selectedRow === index ? 'selected' : ''}
              onClick={() => handleRowClick(index)}
            >
              <>
                <td>{dispositiu.deviceType}</td>
                <td>{dispositiu.NomDispositiu}</td>
                <td>{dispositiu.ip}</td>
                <td>{dispositiu.mac}</td>
                <td>{dispositiu.quantitatPortsEth}</td>
                <td>{dispositiu.zona_id}</td>
                <td>
                  <button onClick={() => handledeviceEdit(index)}>Edit</button>
                </td>

                <td>
                  <button onClick={() => handledeviceDelete(index)}>Delete</button>

                </td>
              </>

            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaulaDispositus;
