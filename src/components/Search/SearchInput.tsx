import GoogleLogo from '../svg/GoogleLogo';
import useSearchInput from './useSearchInput';

const GOOGLE_RED = '#DB4437';

const SearchInput = () => {
	const { handleSearch, handleInputChange } = useSearchInput();

	return (
		<div className="w-full h-full max-w-[600px] relative">
			<form onSubmit={handleSearch}>
				<input
					data-testid="searchbox"
					type="search"
					id="inputSearch"
					aria-label="Buscar Google"
					className="w-full h-16 pl-[64px] pr-[32px] py-4 rounded-full text-lg text-black bg-white"
					placeholder='Buscar'
					onChange={handleInputChange}
					required
				/>
			</form>

			<GoogleLogo
				fill_color={GOOGLE_RED}
			/>
		</div>
	);
};

export default SearchInput;
