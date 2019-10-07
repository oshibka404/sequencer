import React from 'react';
import './Step.css';

interface Props {
    value: number;
    pitch: number;
    isCurrent: boolean;
    toggleStep(e: React.MouseEvent): void;
    isEditing: boolean;
    setIsEditing(isEditing: boolean): void;
}

const Step: React.FC<Props> = (props: Props) => {
    return (
        <div
            className={`Step ${props.isCurrent ? 'Step-current' : ''}`}
            onMouseDown={(e) => {
                props.toggleStep(e);
                props.setIsEditing(true);
            }}
            onMouseEnter={(e) => {
                if (props.isEditing) {
                    props.toggleStep(e);
                }
            }}
        >
            <div className={`Step-content ${props.value > 0 ? 'Step-active' : ''}`} style={{opacity: props.value ? 0.3 + 0.7 * props.value : 1}}></div>
        </div>
    );
}

export default Step;
