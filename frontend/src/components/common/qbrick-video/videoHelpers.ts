export const getTimestampFromDuration = (duration: number) => {
    const halfMinute = 30
    const roundedSeconds = Math.round(duration / halfMinute) * halfMinute
    const minutes = Math.floor(roundedSeconds / 60)
    if (roundedSeconds % 60 === 0) {
        return minutes
    } else {
        const decimalMinutes = (roundedSeconds % 60) / 60
        return (minutes + decimalMinutes).toFixed(1).replace('.', ',')
    }
}
