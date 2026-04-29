// ActivityLogContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ActivityLogContext = createContext();

export const ActivityLogProvider = ({ children }) => {
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('activityLogs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('activityLogs', JSON.stringify(activities));
  }, [activities]);

  const addActivity = useCallback((activity) => {
    const newActivity = {
      ...activity,
      activityId: `ACT${String(Math.max(...activities.map(a => parseInt(a.activityId.replace('ACT', '')) || 0)) + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString()
    };
    setActivities([newActivity, ...activities]);
    return newActivity;
  }, [activities]);

  const getActivitiesByUser = useCallback((userName) => {
    if (!userName) return activities;
    return activities.filter(activity => activity.userName === userName);
  }, [activities]);

  const getActivitiesByAction = useCallback((action) => {
    if (!action) return activities;
    return activities.filter(activity => activity.action === action);
  }, [activities]);

  const getActivitiesByEntity = useCallback((entityType, entityId) => {
    return activities.filter(activity =>
      activity.entityType === entityType && activity.entityId === entityId
    );
  }, [activities]);

  const filterActivities = useCallback((filters) => {
    let filtered = activities;

    if (filters.userName) {
      filtered = filtered.filter(activity => activity.userName === filters.userName);
    }

    if (filters.action) {
      filtered = filtered.filter(activity => activity.action === filters.action);
    }

    if (filters.entityType) {
      filtered = filtered.filter(activity => activity.entityType === filters.entityType);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(activity => new Date(activity.timestamp) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(activity => new Date(activity.timestamp) <= new Date(filters.dateTo));
    }

    return filtered;
  }, [activities]);

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, []);

  const value = {
    activities,
    addActivity,
    getActivitiesByUser,
    getActivitiesByAction,
    getActivitiesByEntity,
    filterActivities,
    clearActivities
  };

  return (
    <ActivityLogContext.Provider value={value}>
      {children}
    </ActivityLogContext.Provider>
  );
};