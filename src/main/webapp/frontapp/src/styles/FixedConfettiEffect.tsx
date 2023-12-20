import React, {useCallback, useEffect, useRef} from 'react';

import ReactCanvasConfetti from 'react-canvas-confetti';
import useJoinProgressStore from "../stores/useJoinProgressStore";

export default function FixedConfettiEffect() {
    const refAnimationInstance = useRef<any>(null);
    const {activeProgressTab} = useJoinProgressStore();

    const getInstance = useCallback((instance:any) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio:number, opts:{}) => {
        refAnimationInstance.current &&
        refAnimationInstance.current({
            ...opts,
            origin: { x:0.5, y: 0.5 },
            particleCount: Math.floor(200 * particleRatio)
        });
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fire(), []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 27,
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
            spread: 121,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 121,
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
                        height: '100%',
                        width: '100%',
                        top: '5%',
                        left: 0
                    }}
                />
                : <div />}
        </>
    );
}