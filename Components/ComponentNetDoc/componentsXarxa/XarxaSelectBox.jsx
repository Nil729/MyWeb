import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const XarxaSelectBox = ({ vlan, onChange }) => {
  const [xarxaOptions, setXarxaOptions] = useState([]);

  useEffect(() => {
    const fetchXarxa = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/netdoc/xarxa/getXarxa');
        const xarxaData = response.data.map((xarxa) => ({
          value: xarxa.NomXarxa,
          label: xarxa.NomXarxa,
        }));
        console.log('xarxaData', xarxaData); // [{ value: 'V_infra', label: 'V_infra' }]
        setXarxaOptions(xarxaData);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchXarxa();
  }, []);


  const handleOnChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    onChange({ target: { name: 'vlan', value: selectedValues } });
  };

  return (
    <div className="form-group">
      <label>Xarxa:</label>
      <Select 
        className='multi-select'
        name='vlan'
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        value={xarxaOptions.filter((option) => vlan.includes(option.value))}
        options={xarxaOptions}
        onChange={handleOnChange} // Use the new event handler
      />
    </div>
  );
};

export default XarxaSelectBox;
