import React from 'react';

const AudioPlayer = ({ src }) => {
	return <audio controls src={src?.url}></audio>;
};

export default AudioPlayer;
