"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { buildQuery } from "@/utils/buildQuery";
import { IWizardsRootObject } from "typings";

const WizardsList = async () => {
	const fetchWizards = async () => {
		const res = await fetch(
			"https://wizard-world-api.herokuapp.com/Wizards",
			{
				next: { revalidate: 3600 },
			},
		);
		const wizards: IWizardsRootObject[] = await res.json();
		return wizards;
	};
	const wizards = await fetchWizards();

	const [fname, setFName] = useState<string>("");
	const [lname, setLName] = useState<string>("");

	const getWizards = async (
		queryParams = { FirstName: fname.trim(), LastName: lname.trim() },
	) => {
		let queryString = buildQuery(queryParams);

		const response = await fetch(
			`https://wizard-world-api.herokuapp.com/Wizards${queryString}`,
		);
		const filteredWizard: IWizardsRootObject[] = await response.json();
		return filteredWizard;
	};

	const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// getWizards();
		setFName("");
		setLName("");
	};

	const filteredWizard = await getWizards();

	/* let wizz;
	filteredWizard ? (wizz = filteredWizard) : (wizz = wizards);
	 */

	return (
		<div>
			<form onSubmit={handleSearch} className="ml-4 mt-2 mb-4">
				<input
					type={"text"}
					value={fname}
					placeholder="enter wizard's firstname"
					onChange={(e) => setFName(e.target.value)}
					className="m-2 border px-4 py-2 rounded-lg"
				/>
				<input
					type={"text"}
					value={lname}
					placeholder="enter wizard's last name"
					onChange={(e) => setLName(e.target.value)}
					className="m-2 border px-4 py-2 rounded-lg"
				/>
				<button
					type="submit"
					className="bg-[#384679] block md:inline-block m-2 text-white font-bold py-2 px-4 rounded-lg "
					role={"button"}
				>
					Search
				</button>
			</form>
			{wizards.map((wizard) => (
				<p
					key={wizard.id}
					className="flex flex-col m-4 p-2 lg:p-4 rounded-lg overflow-hidden h-auto border"
				>
					<Link
						href={`/wizards/${wizard.id}`}
						className="font-semibold text-lg lg:text-2xl text-gray-700 hover:text-gray-400"
					>
						{`${
							wizard.firstName
								? `${wizard.firstName + " " + wizard.lastName}`
								: wizard.lastName
						}`}
					</Link>
					{wizard.elixirs.length &&
						wizard.elixirs.map((elixir) => (
							<div key={elixir.id}>{elixir.name}</div>
						))}
				</p>
			))}
		</div>
	);
};

export default WizardsList;
