import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

import { format, parseISO } from 'date-fns'
import { convertDurationToTimeString } from '../../utils/ConvertDurationToTimeString'
import ptBR from 'date-fns/locale/pt-BR'

import { api } from '../../services/api'

import Image from 'next/image'
import arrowLeftImg from '../../../public/arrow-left.svg'
import playImg from '../../../public/play.svg'

import styles from './episode.module.scss'

type Episode = {
    id: string;
    title: string;
    members: string;
    thumbnail: string;
    publishedAt: string;
    duration: number;
    durationAsString: string
    description: string;
    url: string;
}

type EpisodeProps = {
    episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/" passHref>
                    <button type="button">
                        <Image src={arrowLeftImg} alt="Voltar" />
                    </button>
                </Link>
                <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" alt="Imagem ilustrativa" />
                <button type="button">
                    <Image src={playImg} alt="Tocar episódio" />
                </button>
            </div>
            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />

        </div>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get('episodes', {
        params: {
            _limit: 12,
            _sort: 'published_at',
            _order: 'desc'
        }
    })

    const paths = data.map(episode => {
        return {
            params: {
                slug: episode.id
            }
        }
    })

    return {
        paths, //n gera nenhum episodio no momento da build, pois n foi passado nd
        fallback: 'blocking' //ele roda a requisição na camada do next
    }

}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params
    const { data } = await api.get(`/episodes/${slug}`)

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
    }

    return {
        props: {
            episode
        },
        revalidate: 60 * 60 * 24 // 24 horas
    }
}