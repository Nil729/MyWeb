export const validateIpAddress = (ip) => {
  // Regular expression for IP address validation
  const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

  if (!ipRegex.test(ip)) {
    return 'Invalid IP address format';
  }

  return null; // No error
};


// Function to validate MAC address
export const validateMacAddress = (mac) => {
  // Regular expression for MAC address validation
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

  if (!macRegex.test(mac)) {
    return 'Invalid MAC address format';
  }

  return null; // No error
};