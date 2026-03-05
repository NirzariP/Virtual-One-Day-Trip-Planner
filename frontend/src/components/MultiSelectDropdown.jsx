import React, { useState } from 'react';
import { Checkbox, Box, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

function MultiSelectDropdown() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSelectAll = () => {
    setSelectedOptions(['option1', 'option2', 'option3', 'option4', 'option5']);
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
  };

  return (
    <Box bg="#333" p={4} borderRadius="5px">
      <Menu>
        <MenuButton as={Button} color="white" bg="#444" borderRadius="5px">
          Select Options
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleSelectAll}>Select All</MenuItem>
          <MenuItem onClick={handleClearAll}>Clear All</MenuItem>
          <MenuItem>Options:</MenuItem>
          <MenuItem>
            <Checkbox isChecked={selectedOptions.includes('option1')} onChange={() => handleCheckboxChange('option1')} color="white">
              Option 1
            </Checkbox>
          </MenuItem>
          <MenuItem>
            <Checkbox isChecked={selectedOptions.includes('option2')} onChange={() => handleCheckboxChange('option2')} color="white">
              Option 2
            </Checkbox>
          </MenuItem>
          <MenuItem>
            <Checkbox isChecked={selectedOptions.includes('option3')} onChange={() => handleCheckboxChange('option3')} color="white">
              Option 3
            </Checkbox>
          </MenuItem>
          <MenuItem>
            <Checkbox isChecked={selectedOptions.includes('option4')} onChange={() => handleCheckboxChange('option4')} color="white">
              Option 4
            </Checkbox>
          </MenuItem>
          <MenuItem>
            <Checkbox isChecked={selectedOptions.includes('option5')} onChange={() => handleCheckboxChange('option5')} color="white">
              Option 5
            </Checkbox>
          </MenuItem>
        </MenuList>
      </Menu>
      <Box mt={4} color="white">Selected Options: {selectedOptions.join(', ')}</Box>
    </Box>
  );
}

export default MultiSelectDropdown;
