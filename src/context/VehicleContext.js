// VehicleContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { mockVehicles } from '../data/mockVehicles';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('vehicles');
    return saved ? JSON.parse(saved) : mockVehicles;
  });

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const addVehicle = useCallback((vehicle) => {
    const newVehicle = {
      ...vehicle,
      vehicleId: `VEH${String(Math.max(...vehicles.map(v => parseInt(v.vehicleId.replace('VEH', '')) || 0)) + 1).padStart(3, '0')}`
    };
    setVehicles([...vehicles, newVehicle]);
    return newVehicle;
  }, [vehicles]);

  const updateVehicle = useCallback((vehicleId, updatedVehicle) => {
    setVehicles(vehicles.map(vehicle =>
      vehicle.vehicleId === vehicleId ? { ...vehicle, ...updatedVehicle } : vehicle
    ));
  }, [vehicles]);

  const deleteVehicle = useCallback((vehicleId) => {
    setVehicles(vehicles.filter(vehicle => vehicle.vehicleId !== vehicleId));
  }, [vehicles]);

  const getVehicleById = useCallback((vehicleId) => {
    return vehicles.find(vehicle => vehicle.vehicleId === vehicleId);
  }, [vehicles]);

  const searchVehicles = useCallback((query) => {
    if (!query.trim()) return vehicles;

    const lowerQuery = query.toLowerCase();
    return vehicles.filter(vehicle =>
      vehicle.vehicleId.toLowerCase().includes(lowerQuery) ||
      vehicle.plateNumber.toLowerCase().includes(lowerQuery) ||
      vehicle.vehicleType.toLowerCase().includes(lowerQuery)
    );
  }, [vehicles]);

  const filterByBranch = useCallback((branchId) => {
    if (!branchId || branchId === 'All') return vehicles;
    return vehicles.filter(vehicle => vehicle.branchId === branchId);
  }, [vehicles]);

  const getVehiclesByBranch = useCallback((branchId) => {
    if (!branchId || branchId === 'All') return vehicles;
    return vehicles.filter(vehicle => vehicle.branchId === branchId);
  }, [vehicles]);

  const value = {
    vehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleById,
    searchVehicles,
    filterByBranch,
    getVehiclesByBranch
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
};