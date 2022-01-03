import './Navbar.css';

const Navbar = () => {
	return (
		<header className='container'>
			<nav className='navbar'>
				<h1 className='navheader'>Rozliczajka</h1>

				<div className='navlinks'>
					<a href='#' className='navlink'>
						Zaloguj się
					</a>
					<a href='#' className='navlink'>
						Zarejestruj się
					</a>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
