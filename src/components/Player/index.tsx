import { PlayerContext } from '../../pages/contexts/PlayerContext'
import { useContext, useEffect, useRef } from 'react'

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

export function Player() {
    const { episodeList, currenteEpisodeIndex, isPlaying, togglePlay, setPlayingState } = useContext(PlayerContext)
    const episode = episodeList[currenteEpisodeIndex]
    const audioRef = useRef<HTMLAudioElement>(null)

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
                    <span>00:00</span>
                    <div className={styles.slider}>
                       { episode ? (
                           <Slider 
                           trackStyle={{ backgroundColor: '#04d361' }}
                           railStyle={{ backgroundColor: '#9f75ff' }}
                            handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                           />
                       ) : (
                            <div className = {styles.emptySlider} />
                       )}
                    </div>
                    <span>00:00</span>
                </div>

                {episode && (
                    <audio ref={audioRef} src={episode.url} autoPlay onPlay={() => setPlayingState(true)} onPause={() => setPlayingState(false)}/>
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <Image src={shuffleImg} alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <Image src={playPreviousImg} alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton} onClick={togglePlay} disabled={!episode}>
                        {isPlaying ? (
                            <Image src={pauseImg} alt="Pausar" />
                        ) : (
                            <Image src={playImg} alt="Tocar" />
                        )}
                    </button>
                    <button type="button" disabled={!episode}>
                        <Image src={playNextImg} alt="Tocar Próxima" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <Image src={repeatImg} alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    )
}