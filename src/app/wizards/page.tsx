import SearchWizards from "./SearchWizards";
import WizardsList from "./WizardsList";
// import SearchWizards from "./SearchWizards";

const Wizards = () => {
	return (
		<div>
			<SearchWizards />
			{/* @ts-ignore */}
			<WizardsList />
		</div>
	);
};
export default Wizards;
