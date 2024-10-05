'use client';

import React, { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import AddSmartMeterForm from './AddSmartMeterForm'; // Import the form component
import AddMeterForm from './AddMeterForm';
import EditHubForm from '../components/EditHubForm';

interface DropdownMenuProps {
  hubId: string; // Pass the hubId to delete the hub
  onMeterAdded: () => void; // Callback to refresh the meters list after adding a new meter
  onHubDeleted: () => void; // Callback to refresh the hubs list after deleting the hub
  onHubUpdated: () => void; // Callback to refresh the hubs list after editing the hub
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ hubId, onMeterAdded, onHubDeleted, onHubUpdated }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // For Edit Hub modal

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleAdd = () => {
    setIsAddModalVisible(true); // Show the modal when "Add Meter" is clicked
    setIsDropdownVisible(false); // Hide the dropdown
  };

  const handleEdit = () => {
    setIsEditModalVisible(true); // Show the modal when "Edit Hub" is clicked
    setIsDropdownVisible(false); // Hide the dropdown
  };

  const handleDeleteHub = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DELETE_HUB_SERVICE_URL}/api/hubs/${hubId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onHubDeleted(); // Call the callback to refresh the hubs list
      } else {
        console.error('Failed to delete hub');
      }
    } catch (error) {
      console.error('Error deleting hub:', error);
    }
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false); // Close the add meter modal
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false); // Close the edit hub modal
  };

  return (
    <>
      <div className="relative">
        <EllipsisVertical 
          size={25} 
          color="#9ca3af" 
          strokeWidth={3} 
          absoluteStrokeWidth 
          onClick={toggleDropdown} 
          className="cursor-pointer"
        />
        
        {/* Dropdown Menu */}
        <div
          className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out transform origin-top-right ${
            isDropdownVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100" 
            onClick={handleAdd}
          >
            Add Meter
          </button>          
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100" 
            onClick={handleEdit}
          >
            Edit Hub
          </button>

          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100" 
            onClick={handleEdit}
          >
            Send Configuration
          </button>

          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100" 
            onClick={handleDeleteHub}
          >
            Remove Hub
          </button>
        </div>
      </div>

      {/* Modal for Adding a New Meter */}
      <AddMeterForm isVisible={isAddModalVisible} onClose={closeAddModal} onMeterAdded={onMeterAdded} hubId={hubId} />

      {/* Modal for Editing the Hub */}
      <EditHubForm isVisible={isEditModalVisible} onClose={closeEditModal} onHubUpdated={onHubUpdated} hubId={hubId} />
    </>
  );
};

export default DropdownMenu;
