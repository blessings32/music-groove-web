const listeners = {};

export function on(event, callback) { 
	if (!listeners[event]) listeners[event] = new Set();
	listeners[event].add(callback);
}
export function off(event, callback) { 
	listeners[event]?.delete(callback);
}

export function emit(event, payload) { 
	listeners[event]?.forEach((callback) => callback(payload));
}

export const AUDIO_EVENTS = {
	PLAY: "PLAY",
	PAUSE: "PAUSE",
	TIME: "TIME",
	VOLUME: "VOLUME",
	ENDED: "ENDED",
	REPEAT: "REPEAT",
	TRACK: "TRACK",

}