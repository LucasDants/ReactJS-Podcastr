import { createContext, ReactNode, useContext, useState } from "react";

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[]
    currenteEpisodeIndex: number;
    isPlaying: boolean
    isLooping: boolean
    isShuffling: boolean
    hasNext: boolean
    hasPrevious: boolean
    play: (episode: Episode) => void
    playList: (episode: Episode[], index: number) => void
    playNext: () => void
    playPrevious: () => void
    togglePlay: () => void
    setPlayingState: (state: boolean) => void
    toggleLoop: () => void
    toggleShuffle: () => void
    clearPlayerState: () => void
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currenteEpisodeIndex, setCurrenteEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)


    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrenteEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrenteEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    const hasPrevious = currenteEpisodeIndex > 0
    const hasNext = isShuffling ||(currenteEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if(isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrenteEpisodeIndex(nextRandomEpisodeIndex)
        } else if(hasNext) {
            setCurrenteEpisodeIndex(currenteEpisodeIndex + 1)
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrenteEpisodeIndex(currenteEpisodeIndex - 1)
        }
    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrenteEpisodeIndex(0)
    }

    return (
        <PlayerContext.Provider 
        value={{ 
            episodeList,
            currenteEpisodeIndex, 
            isPlaying, 
            isLooping,
            isShuffling, 
            hasNext,
            hasPrevious,
            play,
            playList,
            playNext,
            playPrevious, 
            togglePlay, 
            setPlayingState,
            toggleLoop,
            toggleShuffle,
            clearPlayerState
            }}
        >
            { children }
        </PlayerContext.Provider>
    )
}

export const UserPlayer = () => {
    return useContext(PlayerContext)
}