
import axios from 'axios';
import React from 'react';

const XarxaSelectDefaul = ({ vlan, onChange }) => {
  // ['V_infra']
  return (
    // set undefined to vlan
    <div className="form-group">
      <label>Network:</label>
      <select
        className="form-control"
        name="vlan"
        value={vlan}
        onChange={onChange}
      >
        <option value="Undefined network">Undefined network</option>
      </select>
    </div>


  );
};


export default XarxaSelectDefaul;


