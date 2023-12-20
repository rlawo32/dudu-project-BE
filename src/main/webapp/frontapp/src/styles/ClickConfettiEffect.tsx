import React, {useCallback, useEffect, useRef} from 'react';

import ReactCanvasConfetti from 'react-canvas-confetti';
import useJoinProgressStore from "../stores/useJoinProgressStore";

interface Props {
    coordinate: {x:any, y:any};
}

export default function ClickConfettiEffect(props: Props) {
    const refAnimationInstance = useRef<any>(null);
    const {activeProgressTab} = useJoinProgressStore();

    const getInstance = useCallback((instance:any) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio:number, opts:{}) => {
        refAnimationInstance.current &&
        refAnimationInstance.current({
            ...opts,
            origin: { x: 0.5, y: 1 },
            particleCount: Math.floor(200 * particleRatio)
        });
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fire(), [props.coordinate]);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, {
            spread: 60
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        });
    }, [makeShot]);

    return (
        <>
            {activeProgressTab === 'joinProgress4' ?
                <ReactCanvasConfetti
                    refConfetti={getInstance}
                    style={{
                        position: 'fixed',
                        pointerEvents: 'none',
                        width: '1000px',
                        height: '500px',
                        top: props.coordinate.y,
                        left: props.coordinate.x
                    }}
                />
                : <div />}
        </>
    );
}