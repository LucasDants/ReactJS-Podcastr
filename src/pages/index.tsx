

export default function Home(props) {
  return (
    <h1>a</h1>
  )
}



export async function getStaticProps() { //pega antes da página ser carregada
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  //SSG, SÓ FUNCIONA EM BUILD

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8 //intervalo para os dados serem mudados ao ser retornado
  }
}