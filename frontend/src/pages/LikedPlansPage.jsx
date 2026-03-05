import React, { useState, useEffect } from 'react';
import PlanCard from './PlanCard';

const LikedPlansPage = () => {
  const [likedPlans, setLikedPlans] = useState([]);

  useEffect(() => {
    // Retrieve liked plans from local storage
    const storedLikedPlans = JSON.parse(localStorage.getItem('likedPlans')) || [];
    setLikedPlans(storedLikedPlans);
  }, []);

  const toggleFavorite = (plan) => {
    // Toggle favorite status
    const updatedPlans = likedPlans.map((p) => (p.id === plan.id ? { ...p, isFavorite: !p.isFavorite } : p));
    setLikedPlans(updatedPlans);
    // Update local storage
    localStorage.setItem('likedPlans', JSON.stringify(updatedPlans));
  };

  return (
    <div>
      <h1>Liked Plans</h1>
      {likedPlans.map((plan, index) => (
        <PlanCard
          key={index}
          planNo={`Plan ${index + 1}`}
          data={plan}
          isFavorite={plan.isFavorite}
          onToggleFavorite={() => toggleFavorite(plan)}
        />
      ))}
    </div>
  );
};

export default LikedPlansPage;
