import React, { useState, useEffect } from 'react';
import TrackView, { Track } from './Track/Track';

export const totalSteps = 16;

interface Props {
    isEditing: boolean;
    currentStep?: number;
    sequence: Track[];
    setIsEditing(isEditing: boolean): void;
    setCurrentStep(currentStep: number): void;
    isPlaying: boolean;
    tempo: number;
}

let playIntervalID : number;

const Sequencer: React.FC<Props> = (props: Props) => {
    let currentStep = props.currentStep;
    useEffect(() => {
        if (props.isPlaying) {
            const sixteenthTime = 60000 / props.tempo / 4;
            playIntervalID = window.setInterval(() => {
                if (currentStep === undefined) {
                    currentStep = 0;
                }
                props.setCurrentStep(currentStep++ % totalSteps);
            }, sixteenthTime);
        } else {
            window.clearInterval(playIntervalID);
        }
      }, [props.isPlaying]);
    
    useEffect(() => {
        window.clearInterval(playIntervalID);
        if (props.isPlaying) {
            const sixteenthTime = 60000 / props.tempo / 4;
            playIntervalID = window.setInterval(() => {
                if (currentStep === undefined) {
                    currentStep = 0;
                }
                props.setCurrentStep(currentStep++ % totalSteps);
            }, sixteenthTime);
        }
    }, [props.tempo]);
    return (
        <div className="sequencer">
      {
        props.sequence.map((track: Track) => (
            <TrackView
                key={track.pitch}
                initialTrack={track}
                currentStep={props.currentStep}
                isEditing={props.isEditing}
                setIsEditing={props.setIsEditing}
            />
        ))
      }
      </div>
    );
}

export default Sequencer;
