import { UserPlayer } from '../../contexts/PlayerContext'
import { useEffect, useRef, useState } from 'react'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import Image from 'next/image'
import playingImg from '../../../public/playing.svg'
import shuffleImg from '../../../public/shuffle.svg'
import playPreviousImg from '../../../public/play-previous.svg'
import playImg from '../../../public/play.svg'
import pauseImg from '../../../public/pause.svg'
import playNextImg from '../../../public/play-next.svg'
import repeatImg from '../../../public/repeat.svg'

import styles from './styles.module.scss'
import { convertDurationToTimeString } from '../../utils/ConvertDurationToTimeString'

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState(0)
    
    const { 
        episodeList, 
        currenteEpisodeIndex, 
        hasPrevious,
        hasNext, 
        isPlaying,
        isLooping,
        isShuffling,
        togglePlay, 
        setPlayingState, 
        playNext, 
        playPrevious,
        toggleLoop,
        toggleShuffle,
        clearPlayerState
    } = UserPlayer()

    const episode = episodeList[currenteEpisodeIndex]

    function setupProgressListener() {
        audioRef.current.currentTime = 0

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount
        setProgress(amount)
    }

    function handleEpisodeEnded() {
        if(hasNext) {
            playNext()
        } else {
            clearPlayerState()
        }
    }

    useEffect(() => {
        if(!audioRef.current) {
            return
        }
        if(isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    return (
        <div className={styles.playerContainer}>
            <header>
                <Image src={playingImg} alt="Tocando agora" />
                <strong>Tocando agora {episode?.title}</strong>
            </header>
            {episode ? (
                <div className={styles.currentEpisode}>
                    <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" alt="Tocando agora" />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )
            }
            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                       { episode ? (
                           <Slider
                           max={episode.duration}
                           value={progress}
                           onChange={handleSeek}
                           trackStyle={{ backgroundColor: '#04d361' }}
                           railStyle={{ backgroundColor: '#9f75ff' }}
                            handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                           />
                       ) : (
                            <div className = {styles.emptySlider} />
                       )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                {episode && (
                    <audio 
                        ref={audioRef} 
                        src={episode.url} 
                        loop={isLooping} 
                        autoPlay 
                        onPlay={() => setPlayingState(true)} 
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                        onEnded={handleEpisodeEnded}
                    />
                )}

                <div className={styles.buttons}>
                    <button type="button" className={isShuffling ? styles.isActive : ''} onClick={toggleShuffle} disabled={!episode || episodeList.length === 1}>
                        <Image src={shuffleImg} alt="Embaralhar" />
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                        <Image src={playPreviousImg} alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton} onClick={togglePlay} disabled={!episode}>
                        {isPlaying ? (
                            <Image src={pauseImg} alt="Pausar" />
                        ) : (
                            <Image src={playImg} alt="Tocar" />
                        )}
                    </button>
                    <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
                        <Image src={playNextImg} alt="Tocar Próxima" />
                    </button>
                    <button type="button" className={isLooping ? styles.isActive : ''} onClick={toggleLoop} disabled={!episode}>
                        <Image src={repeatImg} alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    )
}