import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import { FaPlus, FaTrash } from "react-icons/fa";
import Button from "./Button";
import { useAppSelector } from "../util/hooks";

const FormikForm = (): JSX.Element => {
	const mongoUser = useAppSelector((state) => state.mongoUser.values);
	return (
		<div className="md:w-3/4">
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
					_id: mongoUser._id,
				}}
				validationSchema={Yup.object({
					recipe_name: Yup.string().required("Required"),
					source: Yup.string().required("Required"),
				})}
				onSubmit={(values, { resetForm }) =>
					setTimeout(async () => {
						console.log(JSON.stringify(values, null, 2));
						const response = await fetch(
							import.meta.env.VITE_BACKEND + "/recipe/new",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(values),
							}
						);
						resetForm();
					}, 500)
				}>
				{({ isSubmitting }) => (
					<Form>
						<div className="flex flex-col gap-3">
							<Input
								label="Recipe Name*"
								name="recipe_name"
								type="text"
								placeholder="Chicken Parm"
								lg={true}
							/>
							<div
								className={`flex flex-wrap justify-between gap-3 md:w-1/2`}>
								<Input
									label="Prep"
									name="prep_time"
									type="text"
									placeholder="10"
									xsm={true}
									center={true}
								/>

								<Input
									label="Cook"
									name="cook_time"
									type="text"
									placeholder="20"
									xsm={true}
									center={true}
								/>

								<Input
									label="Total Time"
									name="total_time"
									type="text"
									placeholder="30"
									xsm={true}
									center={true}
								/>
							</div>
							<Input
								label="Recipe Source*"
								name="source"
								type="text"
								placeholder="recipes.com"
								lg={true}
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
											<>
												<div className="md:hidden flex flex-col gap-3">
													{ingredients.map(
														(
															_: string,
															index: number
														) => (
															<div className="flex flex-col relative gap-2 my-1 rounded-xl p-4 bg-lightSurfConHigh">
																<Input
																	label="Amount"
																	name={`ingredients.${index}.ingredient_amount`}
																	type="text"
																	placeholder="2"
																	smText={
																		true
																	}
																	md={true}
																/>

																<Input
																	label="Measurement"
																	name={`ingredients.${index}.ingredient_measurement`}
																	type="text"
																	placeholder="lbs"
																	smText={
																		true
																	}
																	md={true}
																/>
																<Input
																	label="Ingredient"
																	name={`ingredients.${index}.ingredient_name`}
																	type="text"
																	placeholder="chicken"
																	smText={
																		true
																	}
																	md={true}
																/>
																<Input
																	label="Directions"
																	name={`ingredients.${index}.ingredient_directions`}
																	type="text"
																	placeholder="diced"
																	smText={
																		true
																	}
																	md={true}
																/>
																<Button
																	icon={
																		<FaTrash />
																	}
																	passedFunction={() =>
																		remove(
																			index
																		)
																	}
																	outline={
																		false
																	}
																	absolute={
																		true
																	}
																	top={
																		"top-[10px]"
																	}
																	right={
																		"right-[10px]"
																	}
																	color="text-lightError"
																/>
															</div>
														)
													)}
													<div className="flex justify-center items-center">
														<Button
															icon={<FaPlus />}
															outline={false}
															color="text-lightTertiary"
															passedFunction={() =>
																push({
																	ingredient_name:
																		"",
																})
															}
															extraClasses="w-1/2 border-2 flex justify-center py-1 rounded-xl hover:bg-lightTertiary hover:text-lightSurfCon duration-200 ease-in-out"
														/>
													</div>
												</div>
												<div className="pt-[2px] hidden md:block">
													{/* <div className="w-[100%] border-2 border-lightOutline hidden md:flex gap-3 bg-lightSurfConHigh rounded-lg">
														<p className="w-24 text-sm grid place-items-center">
															Amount
														</p>
														<p className="w-24 text-sm grid place-items-center">
															Measurement
														</p>
														<p className="w-36  text-sm grid place-items-center">
															Ingredient
														</p>
														<p className="w-24 text-sm grid place-items-center">
															Instruction
														</p>
													</div> */}
													{ingredients.map(
														(
															_: string,
															index: number
														) => (
															<div className="flex gap-3 my-1 bg-lightSurfConHigh p-4 rounded-xl">
																<p className="grid place-content-center font-bold">
																	{index + 1}
																</p>
																<Input
																	name={`ingredients.${index}.ingredient_amount`}
																	type="text"
																	placeholder="2"
																	xsm={true}
																/>

																<Input
																	name={`ingredients.${index}.ingredient_measurement`}
																	type="text"
																	placeholder="lbs"
																	sm={true}
																/>
																<Input
																	name={`ingredients.${index}.ingredient_name`}
																	type="text"
																	placeholder="chicken"
																	xl={true}
																/>
																<Input
																	name={`ingredients.${index}.ingredient_directions`}
																	type="text"
																	placeholder="diced"
																	sm={true}
																/>
																<Button
																	icon={
																		<FaTrash />
																	}
																	passedFunction={() =>
																		remove(
																			index
																		)
																	}
																	outline={
																		false
																	}
																	color="text-lightError"
																/>
															</div>
														)
													)}
													<div className="flex justify-center pt-2 items-center">
														<Button
															icon={<FaPlus />}
															outline={false}
															color="text-lightTertiary"
															passedFunction={() =>
																push({
																	ingredient_name:
																		"",
																})
															}
															extraClasses="w-1/2 md:w-1/3 border-2 flex justify-center py-1 rounded-xl hover:scale-105 hover:shadow-lg duration-200 ease-in-out"
														/>
													</div>
												</div>
											</>
										);
									}}
								</FieldArray>
							</div>
							<div>
								<p className="font-bold">Instructions</p>
								<FieldArray name="instructions">
									{(fieldArrayProps) => {
										const { push, remove, form } =
											fieldArrayProps;
										const { values } = form;
										const { instructions } = values;
										return (
											<div className="flex flex-col gap-2">
												{instructions.map(
													(
														_: string,
														index: number
													) => (
														<div className="flex gap-3 bg-lightSurfConHigh rounded-xl p-4">
															<p className="grid place-content-center font-bold">
																{index + 1}
															</p>
															<Input
																name={`instructions.${index}.instruction`}
																type="text"
																xl={true}
															/>

															<Button
																icon={
																	<FaTrash />
																}
																passedFunction={() =>
																	remove(
																		index
																	)
																}
																outline={false}
																color="text-lightError"
															/>
														</div>
													)
												)}
												<div className="flex justify-center">
													<Button
														icon={<FaPlus />}
														outline={false}
														color="text-lightTertiary"
														passedFunction={() =>
															push({
																instruction: "",
															})
														}
														extraClasses="w-1/2 border-2 flex justify-center py-1 rounded-xl hover:scale-105 hover:shadow-lg duration-200 ease-in-out md:w-1/3"
													/>
												</div>
											</div>
										);
									}}
								</FieldArray>
							</div>
							<div className="flex justify-center">
								<button
									type="submit"
									disabled={isSubmitting}
									className={`font-bold rounded-xl border-2 w-1/3 py-1 mt-3  text-lightSurfCon bg-lightPrimary duration-200 ease-in-out hover:scale-105 hover:shadow-lg `}>
									Create
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormikForm;
