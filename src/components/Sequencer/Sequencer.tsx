import React, { useEffect, useRef } from 'react';
import TrackView, { Track } from './Track/Track';
import ctx from '../../context';
import './Sequencer.css';

export const totalSteps = 16;

interface Props {
    isEditing: boolean;
    currentStep: number|null;
    sequence: Track[];
    setIsEditing(isEditing: boolean): void;
    setCurrentStep(currentStep: number|null): void;
    isPlaying: boolean;
    tempo: number;
}

const Sequencer: React.FC<Props> = (props: Props) => {
    const playIntervalID = useRef<number>();

    let currentStep = useRef<number|null>(props.currentStep);

    const {isPlaying, tempo, setCurrentStep} = props;

    useEffect(() => {
        window.clearInterval(playIntervalID.current);
    }, [tempo]);

    useEffect(() => {
        if (props.currentStep === null) {
            currentStep.current = null;
        }
    }, [props.currentStep]);

    useEffect(() => {
        if (isPlaying) {
            ctx.resume();
            const sixteenthTime = 60000 / tempo / 4;
            playIntervalID.current = window.setInterval(() => {
                if (currentStep.current === null) {
                    currentStep.current = 0;
                }
                setCurrentStep(currentStep.current++ % totalSteps);
            }, sixteenthTime);
        } else {
            window.clearInterval(playIntervalID.current);
        }
      }, [isPlaying, tempo, setCurrentStep]);

    return (
        <div className="Sequencer">
            <div className="Sequencer-stepNumbers">
            <div className="Sequencer-stepNumber"></div>
                {
                    (new Array(totalSteps))
                        .fill(0)
                        .map((_, i) => <div className="Sequencer-stepNumber" key={i}>{i+1}</div>)
                }
            </div>
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
