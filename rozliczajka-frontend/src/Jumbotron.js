import './Jumbotron.css';
import image from './guys.png';

const Jumbotron = () => {
	return (
		<div className='container'>
			<div className='section jumbotron'>
				<div className='jumbotron-text'>
					<h2 className='jumbotron-title'>Twoja aplikacja do rozliczania</h2>
					<p>
						Jedyna w swoim rodzaju aplikacja, służąca do rozliczania dla
						każdego, kto wyrusza w podróż z Green Tour. Załóż konto już dziś i
						korzystaj ze wszystkich możliwośći Rozliczajki.{' '}
					</p>
				</div>
				<img src={image} className='jumbotron-image' />
			</div>
		</div>
	);
};

export default Jumbotron;
