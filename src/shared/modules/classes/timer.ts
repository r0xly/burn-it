export default class Timer {
    private endTime;
    
    constructor(length: number = 0) {
        this.endTime = tick() + length;
    } 

    public set(length: number) {
        this.endTime = tick() + length;
    }

    public isCompleted() {
        return tick() >= this.endTime;
    }

    public toString() {
        let seconds = math.floor(this.endTime - tick())
        let minutes = (seconds - seconds % 60) / 60;
        seconds = seconds - minutes * 60;

        return `${string.format("%01i", minutes)}:${string.format("%02i", seconds)}`;
    }

}