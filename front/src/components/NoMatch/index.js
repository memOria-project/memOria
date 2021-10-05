import robert from '../../assets/Robert.jpeg';

const NoMatch = () => {
return (
        <div> 
            <h1>Oops, vous vous êtes trompé de chemin! </h1>
            <img src={robert} alt="404" />
        </div>
        )
}
export default NoMatch