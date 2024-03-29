import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const XarxaSelectBox = ({ vlan, onChange, nomDispositiuInfraestructura, portInfra }) => {
  const [xarxaOptions, setXarxaOptions] = useState([]);

  useEffect(() => {
    const fetchXarxa = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/xarxa/getXarxaFromPortInfra?nomDispositiuInfraestructura=${nomDispositiuInfraestructura}&portInfra=${portInfra}`);
        const xarxaData = response.data.map((xarxa) => ({
          value: xarxa.NomXarxa,
          label: xarxa.NomXarxa,
        }));
        // [{ value: 'V_infra', label: 'V_infra' }]
        setXarxaOptions(xarxaData);
        handleOnChange(xarxaData);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchXarxa();
  }, [nomDispositiuInfraestructura]);


  const handleOnChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    onChange({ target: { name: 'vlan', value: selectedValues } }); // ['V_infra']
  };

  return (
    <div className="form-group">
      <label>Network:</label>
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
