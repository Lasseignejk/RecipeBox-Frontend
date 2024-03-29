import { useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useAppDispatch } from "../../store";
import { setAllRecipes } from "../../reducers/showRecipeDetailsSlice";
import { useAppSelector } from "../../util/hooks";
import { RecipeProps } from "../../util/interfaces";

interface RecipeContainerProps {
	column: boolean;
	searchRecipes: RecipeProps[];
	setSearchRecipes: (arr: RecipeProps[]) => void;
}

interface FormattedData {
	[recipeName: string]: boolean;
}

const RecipeContainer = ({
	column,
	searchRecipes,
}: RecipeContainerProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const userRecipes: RecipeProps[] = useAppSelector(
		(state) => state.userRecipes.userRecipes
	);

	const columnClasses: string = column
		? "flex flex-col gap-5"
		: "flex flex-wrap gap-5 justify-center";

	// this adds the 'false' to each recipe and adds it to the setAllRecipes, in the showMore slice, to control the drop down.
	const formatRecipes = (userRecipes: RecipeProps[]): FormattedData => {
		let formattedData = {};
		userRecipes.map(
			(recipe) =>
				(formattedData = {
					...formattedData,
					[recipe.recipe_name]: false,
				})
		);
		return formattedData;
	};
	const recipeData: FormattedData = formatRecipes(userRecipes);

	useEffect(() => {
		dispatch(setAllRecipes(recipeData));
	}, []);

	return (
		<div className={`pt-3 ${columnClasses}`}>
			{searchRecipes.length == 0
				? userRecipes.map((recipe: RecipeProps, index: number) => (
						<RecipeCard data={recipe} key={index} column={column} />
				  ))
				: searchRecipes.map((recipe: RecipeProps, index: number) => (
						<RecipeCard data={recipe} key={index} column={column} />
				  ))}
		</div>
	);
};

export default RecipeContainer;
