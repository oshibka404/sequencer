const ctx = new AudioContext();

export const master = ctx.createGain();
export const filter = ctx.createBiquadFilter();
export const reverb = ctx.createConvolver();
export const reverbGain = ctx.createGain();
export const comp = ctx.createDynamicsCompressor();

filter.frequency.value = 8000; //Lo pass filter

filter.connect(reverb);
reverb.connect(reverbGain);
reverbGain.connect(comp);

filter.connect(master);
master.connect(comp);
comp.connect(ctx.destination);

comp.threshold.value = -40; // The comp. here is used to compress the mix between the raw sound of the Osc and the reverb.
comp.knee.value = 7;

reverbGain.gain.value = 0.5; // Wet gain
master.gain.value = 0.7; // Dry Gain

export default ctx;


fetch('https://raw.githubusercontent.com/afuh/sequencer/master/assets/Large%20Long%20Echo%20Hall.wav')
    .then(async res => {
        ctx.decodeAudioData(await res.arrayBuffer())
            .then(buffer => {
                // const source = ctx.createBufferSource();
                // source.buffer = buffer;
                reverb.buffer = buffer;
            })
        .catch(e =>  "Error with decoding audio data" + e)
    })