import React, { useState, useEffect } from 'react';
import './Track.css';
import Step from '../Step/Step';
import ctx, { filter } from '../../../context';

export interface Track {
    pitch: number;
    steps: number[];
    name: string;
}

interface Props {
    initialTrack: Track,
    currentStep: number
}

const TrackView: React.FC<Props> = (props: Props) => {
    const [osc, setOscillator] = useState<OscillatorNode>();
    const [gainNode, setGainNode] = useState<GainNode>();
    const [track, setTrack] = useState<Track>(props.initialTrack);

    useEffect(() => {
        setTrack(props.initialTrack);
    }, [props.initialTrack]);

    useEffect(() => {
        const value = track.steps[props.currentStep];
        if (value && gainNode) {
            gainNode.gain.setTargetAtTime(value, ctx.currentTime, 0.03);
            gainNode.gain.setTargetAtTime(0, ctx.currentTime + 0.03, 0.3);
        }
    }, [props.currentStep, gainNode, track.steps]);

    useEffect(() => {
        if (osc && gainNode) {
            osc.frequency.value = track.pitch;
            osc.connect(gainNode);
            gainNode.connect(filter);
            gainNode.gain.value = 0;
            osc.start();
        } else {
            setOscillator(ctx.createOscillator());
            setGainNode(ctx.createGain());
        }
    }, [osc, gainNode, track.pitch]);

    function setStep(index: number, value: number) {
        track.steps.splice(index, 1, value);
        setTrack(Object.assign({}, track, {
            steps: track.steps
        }));
    }

    return (
        <div className="TrackView">
            <div className="TrackTitle">{track.name}</div>
            {
                track.steps.map((value, index) => (
                    <Step
                        key={index}
                        value={value}
                        pitch={track.pitch}
                        isCurrent={props.currentStep === index}
                        setStep={() => setStep(index, value ? 0 : 1)}
                    />
                ))
            }
        </div>
    );
}

export default TrackView;
