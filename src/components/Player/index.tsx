import styles from './styles.module.scss'

import Image from 'next/image'
import playingImg from '../../../public/playing.svg'
import shuffleImg from '../../../public/shuffle.svg'
import playPreviousImg from '../../../public/play-previous.svg'
import playImg from '../../../public/play.svg'
import playNextImg from '../../../public/play-next.svg'
import repeatImg from '../../../public/repeat.svg'


export function Player() {
    return (
        <div className={styles.playerContainer}>
            <header>
                <Image src={playingImg} alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>
            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>
            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider}></div>
                    </div>
                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button">
                        <Image src={shuffleImg} alt="Embaralhar" />
                    </button>
                    <button type="button">
                        <Image src={playPreviousImg} alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton}>
                        <Image src={playImg} alt="Tocar" />
                    </button>
                    <button type="button">
                        <Image src={playNextImg} alt="Tocar Próxima" />
                    </button>
                    <button type="button">
                        <Image src={repeatImg} alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    )
}