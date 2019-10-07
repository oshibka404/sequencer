import React, { useState } from 'react';
import './App.css';
import { Track } from './Sequencer/Track/Track';
import notes, {scale} from '../helpers/notes';
import Sequencer, { totalSteps } from './Sequencer/Sequencer';

function getEmptySequence(): Track[] {
  return scale.map((note) => ({
    pitch: notes[note],
    name: note,
    steps: new Array(totalSteps).fill(0)
  }));
}

function getRandomSequence(): Track[] {
  return scale.map((note) => ({
    pitch: notes[note],
    name: note,
    steps: new Array(totalSteps).fill(0).map(() => Math.random() < 0.125 ? Math.random() : 0)
  }));
}

const App: React.FC = () => {
  const [sequence, setSequence] = useState(getEmptySequence());
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(100);
  const [isEditing, setIsEditing] = useState(false);
  const [isGhostEditing, setIsGhostEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number|null>(null);

  return (
    <div
      className="App"
      onMouseUp={(e) => {
        setIsEditing(false);
        setIsGhostEditing(false);
      }}
    >
      <div className="controls">
        <button 
          className={`Controls-button ${isPlaying ? 'Pause' : 'Play'}`}
          title={isPlaying ? 'Pause' : 'Play'}
          onClick={() => setIsPlaying(!isPlaying)}
        />
        <button
          className="Controls-button Stop"
          title="Stop"
          onClick={() => {
            setCurrentStep(null);
            setIsPlaying(false);
          }} />
        <input type="number" value={tempo} onChange={(e) => setTempo(parseInt(e.target.value))} />
        <button
          className="Controls-button Clear"
          title="Clear"
          onClick={() => setSequence(getEmptySequence())}/>
        <button onClick={() => setSequence(getRandomSequence())}>Randomize</button>
      </div>
      <Sequencer
        sequence={sequence}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        currentStep={currentStep}
        tempo={tempo}
        setCurrentStep={setCurrentStep}
        isPlaying={isPlaying}
        isGhostEditing={isGhostEditing}
        setIsGhostEditing={setIsGhostEditing}
      />
    </div>
  );
}

export default App;
