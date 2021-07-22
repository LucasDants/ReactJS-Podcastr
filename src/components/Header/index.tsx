import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import Image from 'next/image'
import logoImg from '../../../public/logo.svg'

import styles from './styles.module.scss'

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR })

    return (
        <header className={styles.headerContainer} >
            <Image src={logoImg} alt="Podcastr" />
            <p>O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>
        </header>
    )
}