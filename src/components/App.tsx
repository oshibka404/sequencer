import React, { useState, useEffect } from 'react';
import './App.css';
import TrackView, { Track } from './Sequencer/Track/Track';
import notes, {scale} from '../helpers/notes';

const totalSteps = 16;

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

const initialSequence = getEmptySequence();

let playIntervalID : number;

const App: React.FC = () => {
  const [sequence, setSequence] = useState(initialSequence);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(100);
  const [isEditing, setIsEditing] = useState(false);
  let [currentStep, setCurrentStep] = useState<number>();

  useEffect(() => {
    if (isPlaying) {
      const sixteenthTime = 60000 / tempo / 4;
      playIntervalID = window.setInterval(() => {
        if (currentStep === undefined) {
          currentStep = 0;
        }
        setCurrentStep(currentStep++ % totalSteps);
      }, sixteenthTime);
    } else {
      window.clearInterval(playIntervalID);
    }
  }, [isPlaying]);

  useEffect(() => {
    window.clearInterval(playIntervalID);
    if (isPlaying) {
      const sixteenthTime = 60000 / tempo / 4;
      playIntervalID = window.setInterval(() => {
        if (currentStep === undefined) {
          currentStep = 0;
        }
        setCurrentStep(currentStep++ % totalSteps);
      }, sixteenthTime);
    }
  }, [tempo]);


  return (
    <div
      className="App"
      onMouseUp={(e) => {
      setIsEditing(false);
    }}>
      <div className="controls">
        <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={() => {
          setCurrentStep(undefined);
          setIsPlaying(false);
        }}>Stop</button>
        <input type="number" value={tempo} onChange={(e) => setTempo(parseInt(e.target.value))} />
        <button onClick={() => setSequence(getEmptySequence())}>Clear</button>
        <button onClick={() => setSequence(getRandomSequence())}>Randomize</button>
      </div>
      <div className="sequencer">
      {
        sequence.map((track) => (
          <TrackView
            key={track.pitch}
            initialTrack={track}
            currentStep={currentStep}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ))
      }
      </div>
    </div>
  );
}

export default App;
