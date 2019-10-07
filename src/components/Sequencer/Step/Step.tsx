import React from 'react';
import './Step.css';

interface Props {
    value: number;
    pitch: number;
    isCurrent: boolean;
    toggleStep: React. MouseEventHandler;
    isEditing: boolean;
    setIsEditing(isEditing: boolean): void;
    isGhostEditing: boolean;
    setIsGhostEditing(isEditing: boolean): void;
    toggleAccent: React.MouseEventHandler;
    toggleGhost: React.MouseEventHandler;

}

const Step: React.FC<Props> = (props: Props) => {
    return (
        <div
            className={`Step ${props.isCurrent ? 'Step-current' : ''}`}
            onMouseDown={(e) => {
                if (e.button === 0) {
                    props.toggleStep(e);
                    props.setIsEditing(true);
                } else if (e.button === 2) {
                    props.toggleGhost(e);
                    props.setIsGhostEditing(true);
                }
            }}
            onContextMenu={(e) => {
                e.preventDefault();
            }}
            onMouseEnter={(e) => {
                if (props.isEditing) {
                    props.toggleStep(e);
                }
            }}
            onDoubleClick={(e) => {
                props.toggleAccent(e);
            }}
        >
            <div className={`Step-content ${props.value > 0 ? 'Step-active' : ''}`} style={{opacity: props.value ? 0.1 + 0.9 * props.value : 1}}></div>
        </div>
    );
}

export default Step;
