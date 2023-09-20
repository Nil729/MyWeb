
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const XarxaSelectDefaul = ({ vlan }) => {
  return (
    <div className="form-group">
      <label>Xarxa:</label>
      <select name="vlan" value={vlan} required>
        <option value="Undefined netork">Undefined netork</option>
      </select>
    </div>
  );
};


export default XarxaSelectDefaul;


