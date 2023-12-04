import React from 'react';
import { useParams } from 'react-router-dom';

// useParam to get the actor's id

const Actors = () => {
  const { id } = useParams();

  return (
    <div>
      Actors - {id}
    </div>
  );
};

export default Actors;
