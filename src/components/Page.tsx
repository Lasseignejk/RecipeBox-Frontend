import { ReactNode, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../util/hooks";
import PlanCalendar from "./Calendar--Plan/PlanCalendar";
import { TbFridge } from "react-icons/tb";
import PlanCard from "./Calendar--Plan/PlanCard";
import PageTitle from "./PageTitle";
import Button from "./Button";
import RecipeContainer from "./Recipe/RecipeContainer";
import SearchBar from "./Search/SearchBar";
import Modal from "./Modal";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import NewRecipeForm from "./Forms/NewRecipeForm";
import { useNavigate } from "react-router-dom";
import { setSelectedNav } from "../reducers/SelectedSlice";
import { fetchUserRecipes } from "../reducers/userRecipesSlice";
import { fetchUserDetails } from "../reducers/UserSlice";
import { RecipeProps } from "../util/interfaces";
import EditRecipeForm from "./Forms/EditRecipeForm";
import { setOpenNewRecipeModal } from "../reducers/openModalSlice";
import { fetchUserTags } from "../reducers/userTagsSlice";

interface PageProps {
	title: string;
}

interface CardsProps {
	title: string;
	icon?: ReactNode;
	show: boolean;
	highlight: boolean;
}

interface UserObject {
	email?: string;
	email_verified?: boolean;
	family_name?: string;
	given_name?: string;
	locale?: string;
	name?: string;
	nickname?: string;
	picture?: string;
	sub?: string;
	updated_at?: string;
}

const Page = ({ title }: PageProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [searchRecipes, setSearchRecipes] = useState<RecipeProps[]>([]);

	const { isLoading, error, isAuthenticated, user } = useAuth0();

	const selected: string = useAppSelector((state) => state.selected.nav);

	const openEditRecipeModal: boolean = useAppSelector(
		(state) => state.openModal.openEditModal
	);

	const openNewRecipeModal: boolean = useAppSelector(
		(state) => state.openModal.openNewRecipeModal
	);

	const userRecipes: RecipeProps[] = useAppSelector(
		(state) => state.userRecipes.userRecipes
	);
	const toggleRecipes: boolean = useAppSelector(
		(state) => state.toggle.toggleFetchRecipes
	);

	const getUserDetailsAndRecipes = async (
		user: UserObject
	): Promise<void> => {
		const data = await dispatch(fetchUserDetails(user));
		await dispatch(fetchUserRecipes(data.payload._id));
		await dispatch(fetchUserTags(data.payload._id));
	};

	useEffect(() => {
		if (isAuthenticated && user) {
			console.log("user authenticated");
			getUserDetailsAndRecipes(user);
		}
		if (!isAuthenticated) {
			dispatch(setSelectedNav("Home"));
			console.log("user not authenticated");
			handleNavigate();
		}
	}, [isAuthenticated, user, toggleRecipes]);

	const cards: CardsProps[] = [
		{
			title: "Prep",
			icon: <TbFridge />,
			show: true,
			highlight: true,
		},
		{
			title: "Breakfast",
			show: true,
			highlight: false,
		},
		{
			title: "Lunch",
			show: true,
			highlight: false,
		},
		{
			title: "Dinner",
			show: true,
			highlight: false,
		},
		{
			title: "Misc",
			show: true,
			highlight: false,
		},
	];

	const handleNavigate = (): void => {
		navigate("/");
	};
	return (
		<>
			{isAuthenticated && (
				<div className={`pb-20`}>
					{selected == "Plan" && (
						<>
							<PlanCalendar />
							<div className="flex flex-col gap-5 p-3">
								{cards.map(
									(card: CardsProps, index: number) => (
										<PlanCard card={card} key={index} />
									)
								)}
							</div>
						</>
					)}
					{selected == "Recipes" && (
						<div className={`p-3 flex flex-col gap-2`}>
							<PageTitle title={title} />
							<Button
								text={"New Recipe"}
								passedFunction={() =>
									dispatch(setOpenNewRecipeModal())
								}
								outline={true}
								absolute={true}
								top="top-5"
								right="right-3"
							/>
							<SearchBar
								searchRecipes={searchRecipes}
								setSearchRecipes={setSearchRecipes}
							/>
							{openNewRecipeModal && (
								<Modal
									form={<NewRecipeForm />}
									title={"New Recipe"}
								/>
							)}
							{openEditRecipeModal && (
								<Modal
									form={<EditRecipeForm />}
									title={"Edit Recipe"}
								/>
							)}
							{userRecipes.length != 0 ? (
								<RecipeContainer
									column={true}
									searchRecipes={searchRecipes}
									setSearchRecipes={setSearchRecipes}
								/>
							) : (
								<div className="flex justify-center items-center  ">
									<p className="text-center">
										"It looks like you don't have any
										recipes! Click the 'New Recipe' button
										to get started."
									</p>
								</div>
							)}
						</div>
					)}
					{selected == "Groceries" && (
						<div className={`p-3`}>
							<PageTitle title={title} />
						</div>
					)}
					{selected == "Account" && (
						<div className={`p-3`}>
							<PageTitle title={title} />

							{error && <p>Authentication error</p>}
							{!error && isLoading && <p>Loading...</p>}
							{!error && !isLoading && (
								<>
									<Profile />
									<LoginButton />
									<LogoutButton />
								</>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Page;
