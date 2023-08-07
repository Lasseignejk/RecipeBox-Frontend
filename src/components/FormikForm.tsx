import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";
import NewInput from "./NewInput";
import { FaTrash } from "react-icons/fa";
const FormikForm = () => {
	return (
		<div className="">
			<Formik
				initialValues={{
					recipe_name: "",
					prep_time: "",
					cook_time: "",
					total_time: "",
					servings: "",
					category: "",
					source: "",
					img: "",
					ingredients: [
						{
							ingredient_amount: "",
							ingredient_measurement: "",
							ingredient_name: "",
							ingredient_directions: "",
						},
					],
					instructions: [
						{
							step: 1,
							instruction: "",
						},
					],
					tags: [""],
				}}
				validationSchema={Yup.object({
					recipe_name: Yup.string().required("Required"),
					recipe_source: Yup.string().required("Required"),
				})}
				onSubmit={(values) =>
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
					}, 500)
				}>
				{({ isSubmitting }) => (
					<Form>
						<div className="flex flex-col gap-3">
							<NewInput
								label="Recipe Name*"
								name="recipe_name"
								type="text"
								placeholder="Chicken Parm"
							/>

							<NewInput
								label="Prep Time"
								name="prep_time"
								type="text"
								placeholder="10"
							/>

							<NewInput
								label="Cook Time"
								name="cook_time"
								type="text"
								placeholder="20"
							/>

							<NewInput
								label="Total Time"
								name="total_time"
								type="text"
								placeholder="30"
							/>

							<NewInput
								label="Recipe Source"
								name="source"
								type="text"
								placeholder="deliciousrecipes.com"
							/>

							<div>
								<p className="font-bold">Ingredients</p>
								<FieldArray name="ingredients">
									{(fieldArrayProps) => {
										const { push, remove, form } =
											fieldArrayProps;
										const { values } = form;
										const { ingredients } = values;
										return (
											<div className="pt-[2px]">
												<div className=" justify-around w-[96.3%] border-2 hidden md:flex">
													<p>Amount</p>
													<p>Measurement</p>
													<p>Ingredient</p>
													<p>Instruction</p>
												</div>
												{ingredients.map(
													(
														ingredient,
														index: number
													) => (
														<div className="flex">
															<Field
																name={`ingredients.${index}.ingredient_amount`}
																type="text"
																placeholder="2"
															/>
															<Field
																name={`ingredients.${index}.ingredient_amount`}
																type="text"
																placeholder="lbs"
															/>
															<Field
																name={`ingredients.${index}.ingredient_name`}
																type="text"
																placeholder="chicken"
															/>
															<Field
																name={`ingredients.${index}.ingredient_directions`}
																type="text"
																placeholder="diced"
															/>
															<button
																className="ml-3 text-lightError"
																type="button"
																onClick={() =>
																	remove(
																		index
																	)
																}>
																<FaTrash />
															</button>
														</div>
													)
												)}
												<div className="flex justify-center pt-2">
													<button
														type="button"
														onClick={() =>
															push({
																ingredient_name:
																	"",
															})
														}
														className="border-2 w-1/2 rounded-lg">
														Add
													</button>
												</div>
											</div>
										);
									}}
								</FieldArray>
							</div>
							{/* <FieldArray
							name="ingredients"
							render={(arrayHelpers) => (
								<div>
									{values.ingredients.map(
										(ingredient, index) => (
											<div key={index}>
												<Field
													name={`ingredients.${index}`}
												/>
												<button
													type="button"
													onClick={() =>
														arrayHelpers.remove(
															index
														)
													}>
													Remove
												</button>
												<button
													type="button"
													onClick={() =>
														arrayHelpers.insert(
															index,
															""
														)
													}>
													Add
												</button>
											</div>
										)
									)}
								</div>
							)}
						/> */}

							<button type="submit" disabled={isSubmitting}>
								Submit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormikForm;