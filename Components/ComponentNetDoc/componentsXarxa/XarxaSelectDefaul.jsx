
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const XarxaSelectDefaul = ({ vlan, onChange }) => {
  console.log('vlan', vlan); // ['V_infra']
  return (
    // set undefined to vlan
    <div className="form-group">
      <label>Xarxa:</label>
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


