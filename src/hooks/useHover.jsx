import { useState, useEffect, useRef } from 'react';

function useHover() {
	const [hovered, setHovered] = useState(false);

	function enter() {
		setHovered(true);
	}

	function leave() {
		setHovered(false);
	}

	const ref = useRef(null);

	useEffect(() => {
        ref.current.addEventListener("mouseenter", enter)
        ref.current.addEventListener("mouseleave", leave)
        
        return function(){    
            // console.log("This will be logged on unmount");
            // ref.current.removeEventListener("mouseenter", enter)
            // ref.current.removeEventListener("mouseleave", leave)
        }
    }, [])

    return [hovered, ref]
}

export default useHover