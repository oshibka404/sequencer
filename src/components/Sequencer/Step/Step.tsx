import React from 'react';
import './Step.css';

interface Props {
    value: number;
    pitch: number;
    isCurrent: boolean;
    setStep(e: React.MouseEvent): void;
}

const Step: React.FC<Props> = (props: Props) => {
    return (
        <div className={`Step ${props.isCurrent ? 'Step-current' : ''}`} onClick={props.setStep}>
            <div className={`Step-content ${props.value > 0 ? 'Step-active' : ''}`} style={{opacity: props.value ? 0.3 + 0.7 * props.value : 1}}></div>
        </div>
    );
}

export default Step;
